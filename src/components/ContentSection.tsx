import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { AlertCircle } from 'lucide-react';

const ContentSection: React.FC = () => {
  const { subtitles, setSubtitles } = useAppStore();

  const lines = subtitles.split('\n');
  const hasLongLines = lines.some(line => line.length > 60);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">字幕内容</h3>
        <span className="text-xs text-gray-500">每行建议不超过60字</span>
      </div>
      
      <textarea
        value={subtitles}
        onChange={(e) => setSubtitles(e.target.value)}
        className={`w-full h-40 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 resize-none ${
          hasLongLines ? 'border-orange-300 focus:ring-orange-500' : 'border-gray-300 focus:ring-blue-500'
        }`}
        placeholder="请输入字幕内容，每一行为一句字幕"
      />
      
      {hasLongLines && (
        <div className="mt-2 flex items-center text-orange-500 text-sm">
          <AlertCircle size={14} className="mr-1" />
          <span>部分行文字过长，可能会超出图片宽度，建议换行或调小字号</span>
        </div>
      )}
    </div>
  );
};

export default ContentSection;
