import { create } from 'zustand';

export interface SubtitleSettings {
  subtitleHeight: number;
  fontSize: number;
  fontColor: string;
  outlineColor: string;
  fontStyle: string;
  fontWeight: string;
  backgroundColor: string;
  backgroundOpacity: number;
  lineGap: number;
  paddingX: number;
  borderRadius: number;
  bottomOffset: number;
  textAlign: 'left' | 'center' | 'right';
}

interface AppState {
  image: string | null;
  imageName: string | null;
  subtitles: string;
  settings: SubtitleSettings;
  
  setImage: (image: string | null, name: string | null) => void;
  setSubtitles: (subtitles: string) => void;
  updateSettings: (settings: Partial<SubtitleSettings>) => void;
}

const DEFAULT_SETTINGS: SubtitleSettings = {
  subtitleHeight: 80,
  fontSize: 40,
  fontColor: '#FFFFFF',
  outlineColor: '#000000',
  fontStyle: 'Microsoft YaHei',
  fontWeight: 'normal',
  backgroundColor: '#000000',
  backgroundOpacity: 0.6,
  lineGap: 8,
  paddingX: 24,
  borderRadius: 8,
  bottomOffset: 24,
  textAlign: 'center',
};

const DEFAULT_SUBTITLES = `这是Manus的相关照片
也是一个历史性的时刻
Manus不一定会笑到最后
但世界已经因此开始发生一些变化`;

export const useAppStore = create<AppState>((set) => ({
  image: null,
  imageName: null,
  subtitles: DEFAULT_SUBTITLES,
  settings: DEFAULT_SETTINGS,

  setImage: (image, name) => set({ image, imageName: name }),
  setSubtitles: (subtitles) => set({ subtitles }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));
