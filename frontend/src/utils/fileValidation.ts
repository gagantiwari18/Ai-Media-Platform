// File validation utilities

export const validateImageFile = (file: File): string | null => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
  }

  if (file.size > maxSize) {
    return 'Image file size must be less than 10MB';
  }

  return null;
};

export const validateAudioFile = (file: File): string | null => {
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'];
  const maxSize = 20 * 1024 * 1024; // 20MB

  if (!allowedTypes.includes(file.type) && 
      !file.name.endsWith('.mp3') && 
      !file.name.endsWith('.wav')) {
    return 'Please select a valid audio file (MP3, WAV, or OGG)';
  }

  if (file.size > maxSize) {
    return 'Audio file size must be less than 50MB';
  }

  return null;
};

export const validateVideoFile = (file: File): string | null => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
  const maxSize = 20 * 1024 * 1024; // 20MB

  if (!allowedTypes.includes(file.type) && 
      !file.name.endsWith('.mp4') && 
      !file.name.endsWith('.webm') && 
      !file.name.endsWith('.mov') &&
      !file.name.endsWith('.avi')) {
    return 'Please select a valid video file (MP4, WebM, MOV, or AVI)';
  }

  if (file.size > maxSize) {
    return 'Video file size must be less than 100MB';
  }

  return null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};