import React from 'react';
import UploadSection from '../components/UploadSection';
import SettingsSection from '../components/SettingsSection';
import ContentSection from '../components/ContentSection';
import PreviewSection from '../components/PreviewSection';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">图片字幕生成器</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel */}
        <div className="lg:col-span-5 space-y-6">
          <UploadSection />
          <SettingsSection />
          <ContentSection />
        </div>
        
        {/* Right Panel */}
        <div className="lg:col-span-7 sticky top-8">
          <PreviewSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
