import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File } from 'lucide-react';
import { clsx } from 'clsx';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File;
  onClear?: () => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  title: string;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onClear,
  accept = '*',
  maxSize = 10485760, // 10MB default
  className,
  title,
  description,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    multiple: false,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (selectedFile) {
    return (
      <div className={clsx('relative', className)}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <File className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            {onClear && (
              <button
                onClick={onClear}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('relative', className)}>
      <div
        {...getRootProps()}
        className={clsx(
          'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',
          'hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10',
          isDragActive && !isDragReject && 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
          isDragReject && 'border-red-500 bg-red-50 dark:bg-red-900/20',
          !isDragActive && !isDragReject && 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Max size: {formatFileSize(maxSize)}</span>
              {isDragActive && !isDragReject && (
                <span className="text-purple-600 dark:text-purple-400 font-medium">
                  Drop your file here
                </span>
              )}
              {isDragReject && (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Invalid file type or size
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;