import { useEffect } from 'react';

export const useTheme = () => {
  const theme = 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
  }, []);

  return { theme };
};