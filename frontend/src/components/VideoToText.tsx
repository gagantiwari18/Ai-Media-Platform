import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Video, Play, Pause, Zap, Clock, HardDrive } from 'lucide-react';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import TextDisplay from './TextDisplay';

const videoSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
    return allowedTypes.includes(file.type) || 
           file.name.endsWith('.mp4') || 
           file.name.endsWith('.webm') || 
           file.name.endsWith('.mov') ||
           file.name.endsWith('.avi');
  }, 'Please select a valid video file (MP4, WebM, MOV, or AVI)'),
});

type VideoFormData = z.infer<typeof videoSchema>;

const VideoToText: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { handleSubmit, setValue, reset } = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setValue('file', file);
    
    // Create video URL for preview
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setVideoUrl('');
    setExtractedText('');
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    reset();
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const onSubmit = async (data: VideoFormData) => {
    setIsProcessing(true);
    setExtractedText('');

    try {
      const formData = new FormData();
      formData.append('video', data.file);

      const response = await fetch('/api/video-to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompt from video');
      }

      const result = await response.json();
      setExtractedText(result.text || 'No speech detected in the video.');
      toast.success('Video prompt generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate video prompt. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Video to Text
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Upload a video file and summarize the content using AI
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile || undefined}
          onClear={handleClear}
          accept="video/*"
          maxSize={10485760*2} // 20MB
          title="Drop your video file here"
          description="Drag and drop or click to select a video file (MP4, WebM, MOV, AVI)"
        />

        {videoUrl && selectedFile && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Video Preview
              </h3>
              
              {/* Video Metadata */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {formatTime(duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  <span>Size: {formatFileSize(selectedFile.size)}</span>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  onLoadedMetadata={handleLoadedMetadata}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full max-h-100 object-contain"
                  preload="metadata"
                />
                
                {/* Custom Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      className="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 ml-1" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-white/80 mb-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-1 rounded-full transition-all duration-300"
                          style={{
                            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedFile && !isProcessing && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Summarize Video
            </button>
          </div>
        )}
      </form>

      {isProcessing && (
        <LoadingSpinner message="Summarizing video..." />
      )}

      {extractedText && (
        <TextDisplay
          text={extractedText}
          filename={`${selectedFile?.name || 'video'}-transcript.txt`}
          title="Summarized Video Text"
        />
      )}
    </div>
  );
};

export default VideoToText;