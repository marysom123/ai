import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SettingsSection: React.FC = () => {
  const { settings, updateSettings } = useAppStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (key: keyof typeof settings, value: string | number) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-4">
      <h3 className="font-bold text-lg mb-4">字幕设置</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">字幕高度</label>
          <div className="relative">
            <input
              type="number"
              value={settings.subtitleHeight}
              onChange={(e) => handleChange('subtitleHeight', Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-400 text-sm">px</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">字体大小</label>
          <div className="relative">
            <input
              type="number"
              value={settings.fontSize}
              onChange={(e) => handleChange('fontSize', Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-400 text-sm">px</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">字体颜色</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              type="color"
              value={settings.fontColor}
              onChange={(e) => handleChange('fontColor', e.target.value)}
              className="w-6 h-6 border-none p-0 mr-2 bg-transparent cursor-pointer"
            />
            <span className="text-gray-500 text-sm uppercase">{settings.fontColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">轮廓颜色</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              type="color"
              value={settings.outlineColor}
              onChange={(e) => handleChange('outlineColor', e.target.value)}
              className="w-6 h-6 border-none p-0 mr-2 bg-transparent cursor-pointer"
            />
            <span className="text-gray-500 text-sm uppercase">{settings.outlineColor}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">字体样式</label>
          <select
            value={settings.fontStyle}
            onChange={(e) => handleChange('fontStyle', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Microsoft YaHei">微软雅黑</option>
            <option value="SimHei">黑体</option>
            <option value="SimSun">宋体</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">字体粗细</label>
          <select
            value={settings.fontWeight}
            onChange={(e) => handleChange('fontWeight', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="normal">正常</option>
            <option value="bold">粗体</option>
            <option value="lighter">细体</option>
          </select>
        </div>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center text-blue-600 text-sm font-medium mt-2 hover:text-blue-800 transition-colors"
      >
        {showAdvanced ? <ChevronUp size={16} className="mr-1" /> : <ChevronDown size={16} className="mr-1" />}
        {showAdvanced ? '收起高级设置' : '展开高级设置'}
      </button>

      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">背景颜色</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-6 h-6 border-none p-0 mr-2 bg-transparent cursor-pointer"
              />
              <span className="text-gray-500 text-sm uppercase">{settings.backgroundColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">背景不透明度</label>
             <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.backgroundOpacity}
                onChange={(e) => handleChange('backgroundOpacity', Number(e.target.value))}
                className="w-full mr-2"
              />
              <span className="text-gray-500 text-sm w-8 text-right">{settings.backgroundOpacity}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">行间距</label>
            <div className="relative">
              <input
                type="number"
                value={settings.lineGap}
                onChange={(e) => handleChange('lineGap', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2 text-gray-400 text-sm">px</span>
            </div>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">底部距离</label>
            <div className="relative">
              <input
                type="number"
                value={settings.bottomOffset}
                onChange={(e) => handleChange('bottomOffset', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2 text-gray-400 text-sm">px</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">对齐方式</label>
            <select
              value={settings.textAlign}
              onChange={(e) => handleChange('textAlign', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="left">左对齐</option>
              <option value="center">居中</option>
              <option value="right">右对齐</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;
