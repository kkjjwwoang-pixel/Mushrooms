import React, { useState } from 'react';
import { generateImageResponse } from '../services/gemini';
import { Image as ImageIcon, Sparkles, Download, AlertCircle } from 'lucide-react';

export const ImageView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await generateImageResponse(prompt);
      setGeneratedImage(base64Image);
    } catch (err) {
      setError("Failed to generate image. Please try a different prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Control Panel */}
      <div className="bg-darker p-6 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ImageIcon className="text-purple-500" />
          AI Image Studio
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Prompt</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="예: A futuristic city with flying cars at sunset..."
                className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 min-w-[140px] justify-center"
              >
                {isLoading ? (
                  <span className="animate-spin text-xl">⟳</span>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Canvas / Result Area */}
      <div className="flex-1 bg-darker rounded-2xl shadow-xl border border-gray-800 flex items-center justify-center relative overflow-hidden group">
        {isLoading ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 animate-pulse">Dreaming up your image...</p>
          </div>
        ) : generatedImage ? (
          <div className="relative w-full h-full flex items-center justify-center p-4">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="max-h-full max-w-full rounded-lg shadow-2xl object-contain"
            />
            <a 
              href={generatedImage} 
              download={`gemini-gen-${Date.now()}.png`}
              className="absolute bottom-6 right-6 bg-gray-900/80 hover:bg-black text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            >
              <Download size={24} />
            </a>
          </div>
        ) : (
          <div className="text-center text-gray-600 space-y-3">
            <ImageIcon size={64} className="mx-auto opacity-20" />
            <p>Enter a prompt above to generate an image</p>
          </div>
        )}
      </div>
    </div>
  );
};