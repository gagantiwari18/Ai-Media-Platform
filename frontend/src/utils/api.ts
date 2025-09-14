// API utility functions for Flask backend communication

const API_BASE_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000')
  : ''; // Use relative URLs in development (Vite proxy will handle it)

export const imageToText = async (file: File): Promise<{ text: string }> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE_URL}/image-to-text`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to extract text from image');
  }

  return response.json();
};

export const audioToText = async (file: File): Promise<{ text: string }> => {
  const formData = new FormData();
  formData.append('audio', file);

  const response = await fetch(`${API_BASE_URL}/audio-to-text`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to transcribe audio');
  }

  return response.json();
};

export const videoToText = async (file: File): Promise<{ text: string }> => {
  const formData = new FormData();
  formData.append('video', file);

  const response = await fetch(`${API_BASE_URL}/video-to-text`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to transcribe video');
  }

  return response.json();
};