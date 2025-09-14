import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Mic, Play, Pause, Zap } from 'lucide-react';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import TextDisplay from './TextDisplay';

const audioSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'];
    return allowedTypes.includes(file.type) || file.name.endsWith('.mp3') || file.name.endsWith('.wav');
  }, 'Please select a valid audio file (MP3, WAV, or OGG)'),
});

type AudioFormData = z.infer<typeof audioSchema>;

const AudioToText: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { handleSubmit, setValue, reset } = useForm<AudioFormData>({
    resolver: zodResolver(audioSchema),
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setValue('file', file);
    
    // Create audio URL for preview
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setAudioUrl('');
    setExtractedText('');
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    reset();
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data: AudioFormData) => {
    setIsProcessing(true);
    setExtractedText('');

    try {
      const formData = new FormData();
      formData.append('audio', data.file);

      const response = await fetch('/api/audio-to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe audio');
      }

      const result = await response.json();
      setExtractedText(result.text || 'No speech detected in the audio.');
      toast.success('Audio transcribed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to transcribe audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Audio to Text
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Upload an audio file and get an AI-powered transcription
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile || undefined}
          onClear={handleClear}
          accept="audio/*"
          maxSize={10485760*2} // 20MB
          title="Drop your audio file here"
          description="Drag and drop or click to select an audio file (MP3, WAV, OGG)"
        />

        {audioUrl && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Audio Preview
            </h3>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlayPause}
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full transition-all duration-300 hover:shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <audio
              ref={audioRef}
              src={audioUrl}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}

        {selectedFile && !isProcessing && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Transcribe Audio
            </button>
          </div>
        )}
      </form>

      {isProcessing && (
        <LoadingSpinner message="Transcribing audio..." />
      )}

      {extractedText && (
        <TextDisplay
          text={extractedText}
          filename={`${selectedFile?.name || 'audio'}-transcript.txt`}
          title="Transcribed Text"
        />
      )}
    </div>
  );
};

export default AudioToText;