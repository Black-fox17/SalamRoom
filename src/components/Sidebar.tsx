import { useState } from 'react';
import { Upload, Sofa, PaintBucket, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Sidebar() {
  const [selectedTab, setSelectedTab] = useState<'upload' | 'furniture' | 'style'>('upload');
  const isLoading = useStore((state) => state.isLoading);

  return (
    <div className="w-80 bg-white h-full border-r border-gray-200 p-4">
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedTab('upload')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${
              selectedTab === 'upload' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Upload size={20} />
            <span>Upload</span>
          </button>
          <button
            onClick={() => setSelectedTab('furniture')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${
              selectedTab === 'furniture' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Sofa size={20} />
            <span>Furniture</span>
          </button>
          <button
            onClick={() => setSelectedTab('style')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${
              selectedTab === 'style' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <PaintBucket size={20} />
            <span>Style</span>
          </button>
        </div>

        <div className="mt-6">
          {selectedTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop your room photo here, or click to select
                </p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>
          )}

          {selectedTab === 'furniture' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {['Sofa', 'Chair', 'Table', 'Lamp', 'Bed', 'Cabinet'].map((item) => (
                  <button
                    key={item}
                    className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'style' && (
            <div className="space-y-4">
              {['Modern', 'Minimalist', 'Industrial', 'Scandinavian', 'Bohemian'].map((style) => (
                <button
                  key={style}
                  className="w-full p-4 text-left bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {style}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
          disabled={isLoading}
        >
          <Share2 size={20} />
          <span>Share Design</span>
        </button>
      </div>
    </div>
  );
}