import React from 'react';
import { Camera, Mic, Upload } from 'lucide-react';

const Contribute = () => {
  return (
    <div className="min-h-screen bg-neutral-900 pb-24 px-4 pt-12">
      <h1 className="text-3xl text-yellow-500 mb-6">Contribute</h1>
      
      <form className="space-y-6">
        {/* Image Upload */}
        <div className="w-full h-48 bg-gray-800 border-2 border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-colors cursor-pointer">
          <Camera size={40} className="mb-2" />
          <span className="text-sm">Tap to Capture or Upload</span>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Name of Craft / Artifact</label>
            <input type="text" className="w-full bg-gray-800 rounded-lg p-3 text-white focus:ring-1 focus:ring-yellow-500 outline-none" />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-1">Location / Origin</label>
            <input type="text" className="w-full bg-gray-800 rounded-lg p-3 text-white focus:ring-1 focus:ring-yellow-500 outline-none" />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Description & History</label>
            <textarea className="w-full bg-gray-800 rounded-lg p-3 text-white h-24 focus:ring-1 focus:ring-yellow-500 outline-none"></textarea>
          </div>
        </div>

        {/* Audio Recorder */}
        <div className="p-4 bg-gray-800 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold">Oral History</h3>
            <p className="text-xs text-gray-400">Record elders explaining the craft</p>
          </div>
          <button type="button" className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
            <Mic size={20} />
          </button>
        </div>

        {/* Submit */}
        <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-bold py-4 rounded-xl shadow-lg shadow-yellow-600/20 mt-4">
          Submit to Archive
        </button>
      </form>
    </div>
  );
};

export default Contribute;