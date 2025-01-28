import { useState, useCallback } from 'react';
import { Upload, Sofa, PaintBucket, Share2 , CheckCircle} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useDropzone } from 'react-dropzone';
import {cn} from '../utils'
import { Room } from '../types';
export function Sidebar() {
  const [selectedTab, setSelectedTab] = useState<'upload' | 'furniture' | 'style'>('upload');
  const isLoading = useStore((state) => state.isLoading);
  const [currentRoom, setCurrentRoom] = useStore((state) => [state.currentRoom, state.setCurrentRoom]);
  const [isUploaded, setIsUploaded] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    // Simulate processing the file
  const reader = new FileReader();
  reader.onload = () => {
    const imageUrl = reader.result as string; // Base64 string of the image

    const roomId = `room-${Date.now()}`;
    const newRoom: Room = {
      id: roomId,
      name: file.name.replace(/\.[^/.]+$/, ""), // Use the file name without the extension
      imageUrl, // Store the base64 string as the room's image
      style: "Default", // You can set a default style or allow the user to choose later
      furniture: [], // Initially empty, can be populated later
      userId: "current-user-id", // Replace with the actual user ID if you have authentication
      createdAt: new Date().toISOString(), // Current timestamp
    };

    setCurrentRoom(newRoom); // Update the store with the new room
  };

  reader.readAsDataURL(file); // Read the file as a data URL
  setIsUploaded(true);

  }, [setCurrentRoom]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

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
              {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"> */}
              <div
                    {...getRootProps()}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                      isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
                    )}
                  >
                <input {...getInputProps()} />
                {
                  isUploaded ? (
                    <>
                      <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                      <p className="text-lg font-medium text-gray-900">File uploaded successfully!</p>
                    </>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Drop your room photo here, or <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Support for image files only
                        </p>
                      </div>
                    </>
                )}
                </div>
            {/* </div> */}
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