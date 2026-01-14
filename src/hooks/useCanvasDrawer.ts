import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const useCanvasDrawer = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageElement: HTMLImageElement | null
) => {
  const { image, subtitles, settings } = useAppStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image || !imageElement) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match image
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    ctx.drawImage(imageElement, 0, 0);

    const lines = subtitles.split('\n').filter((line) => line.trim() !== '');
    if (lines.length === 0) return;

    // Drawing settings
    const {
      subtitleHeight,
      fontSize,
      fontColor,
      outlineColor,
      fontStyle,
      fontWeight,
      backgroundColor,
      backgroundOpacity,
      lineGap,
      bottomOffset,
      textAlign,
      paddingX,
    } = settings;

    // Convert hex color to rgba for background opacity
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const bgFillStyle = hexToRgba(backgroundColor, backgroundOpacity);

    ctx.font = `${fontWeight} ${fontSize}px "${fontStyle}"`;
    ctx.textAlign = textAlign;
    ctx.textBaseline = 'middle';
    ctx.lineWidth = fontSize * 0.05; // Stroke width proportional to font size
    ctx.strokeStyle = outlineColor;
    ctx.fillStyle = fontColor;

    // Calculate start Y position (from bottom)
    // The bottom of the last subtitle block should be at (canvas.height - bottomOffset)
    let currentY = canvas.height - bottomOffset - subtitleHeight;
    
    // Reverse lines to draw from bottom up
    const reversedLines = [...lines].reverse();

    reversedLines.forEach((line) => {
      // Draw background rectangle
      ctx.fillStyle = bgFillStyle;
      
      // Calculate rectangle width
      // The PRD says "Background rectangle width consistent (same as image width or set safe area width)"
      // Here we use canvas.width
      ctx.fillRect(0, currentY, canvas.width, subtitleHeight);

      // Calculate Text X Position based on alignment
      let textX: number;
      if (textAlign === 'left') {
        textX = paddingX;
      } else if (textAlign === 'right') {
        textX = canvas.width - paddingX;
      } else {
        textX = canvas.width / 2;
      }

      const textY = currentY + subtitleHeight / 2;

      // Stroke first
      ctx.strokeText(line, textX, textY);
      // Then fill
      ctx.fillStyle = fontColor;
      ctx.fillText(line, textX, textY);

      // Move up for next line
      currentY -= (subtitleHeight + lineGap);
    });

  }, [image, subtitles, settings, imageElement]);
};
