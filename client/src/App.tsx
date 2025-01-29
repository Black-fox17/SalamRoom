import React from 'react';
import { Wand2 } from 'lucide-react';
import { RoomCanvas } from './components/RoomCanvas';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Wand2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Interior Designer</span>
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900">Gallery</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">My Designs</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Help</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar />
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <RoomCanvas />
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">Room Preview</h2>
                <p className="text-sm text-gray-500">
                  Upload a photo of your room to get started with AI-powered redesign suggestions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;