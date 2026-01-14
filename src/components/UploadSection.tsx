import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { clsx } from 'clsx';

const UploadSection: React.FC = () => {
  const { image, imageName, setImage } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg mb-4">上传图片</h3>
      <div 
        className={clsx(
          "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        {image ? (
          <div className="flex flex-col items-center">
            <img 
              src={image} 
              alt="Preview" 
              className="w-24 h-24 object-cover rounded-md mb-2 shadow-sm"
            />
             <p className="text-sm text-gray-500 max-w-[200px] truncate">{imageName}</p>
             <p className="text-xs text-blue-500 mt-2">点击或拖拽更换图片</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <ImageIcon size={24} />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors mb-2"
            >
              <Upload size={18} />
              选择图片
            </button>
            <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG, WEBP (最大 20MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
