import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Image, Mic, Video, Sparkles } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import ImageToText from './components/ImageToText';
import AudioToText from './components/AudioToText';
import VideoToText from './components/VideoToText';
import 'react-toastify/dist/ReactToastify.css';

type TabType = 'image' | 'audio' | 'video';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('image');
  const { theme } = useTheme();

  const tabs = [
    { id: 'image' as TabType, label: 'Image to Text', icon: Image },
    { id: 'audio' as TabType, label: 'Audio to Text', icon: Mic },
    { id: 'video' as TabType, label: 'Video to Text', icon: Video },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'image':
        return <ImageToText />;
      case 'audio':
        return <AudioToText />;
      case 'video':
        return <VideoToText />;
      default:
        return <ImageToText />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Media Text Generation
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Generate text from images, audio, and video files using advanced AI technology
          </p>
        </header>

        {/* Tab Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        className="!z-50"
      />
    </div>
  );
}

export default App;