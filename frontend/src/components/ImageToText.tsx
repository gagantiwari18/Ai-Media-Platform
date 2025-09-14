import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Image, Zap } from 'lucide-react';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import TextDisplay from './TextDisplay';

const imageSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
  }, 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'),
});

type ImageFormData = z.infer<typeof imageSchema>;

const ImageToText: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const { handleSubmit, setValue, reset } = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setValue('file', file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImagePreview('');
    setExtractedText('');
    reset();
  };

  const onSubmit = async (data: ImageFormData) => {
    setIsProcessing(true);
    setExtractedText('');

    try {
      const formData = new FormData();
      formData.append('image', data.file);

      const response = await fetch('/api/image-to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompt from image');
      }

      const result = await response.json();
      setExtractedText(result.text || 'No content detected in the image.');
      toast.success('Prompt generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate prompt. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
            <Image className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Image to Text
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Upload an image and generate prompt for that image using AI
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile || undefined}
          onClear={handleClear}
          accept="image/*"
          maxSize={10485760} // 10MB
          title="Drop your image here"
          description="Drag and drop or click to select an image file"
        />

        {imagePreview && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Image Preview
            </h3>
            <div className="flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 max-w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}

        {selectedFile && !isProcessing && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Generate Prompt
            </button>
          </div>
        )}
      </form>

      {isProcessing && (
        <LoadingSpinner message="Generating image prompt..." />
      )}

      {extractedText && (
        <TextDisplay
          text={extractedText}
          filename={`${selectedFile?.name || 'image'}-extracted.txt`}
          title="Generated Prompt"
        />
      )}
    </div>
  );
};

export default ImageToText;