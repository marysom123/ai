import React, { useRef, useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useCanvasDrawer } from '../hooks/useCanvasDrawer';
import { Download, Save } from 'lucide-react';

const PreviewSection: React.FC = () => {
  const { image, imageName } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setImageElement(img);
      };
    } else {
      setImageElement(null);
    }
  }, [image]);

  useCanvasDrawer(canvasRef, imageElement);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14);
    const originalName = imageName ? imageName.split('.')[0] : 'image';
    link.download = `${originalName}_subtitled_${timestamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="font-bold text-lg mb-4">预览</h3>
      
      <div className="flex-1 bg-gray-50 flex items-center justify-center overflow-hidden rounded-md border border-gray-200 relative">
        {!image ? (
          <div className="text-gray-400 text-center">
            <p>请先在左侧上传图片</p>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center p-4">
             {/* We use styles to make the canvas fit within the container while maintaining aspect ratio */}
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-full object-contain shadow-lg"
            />
          </div>
        )}
      </div>

      {image && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleDownload}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} />
            生成字幕图片
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2 border border-gray-200"
          >
            <Save size={20} />
            保存图片
          </button>
        </div>
      )}
      
      {showSuccess && (
        <div className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md text-center animate-pulse">
          字幕图片生成成功!
        </div>
      )}
    </div>
  );
};

export default PreviewSection;
