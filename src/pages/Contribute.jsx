import React, { useState } from 'react';
import { Camera, Mic, Upload, Loader } from 'lucide-react';
import { addArtifact } from '../services/db';
import { useNavigate } from 'react-router-dom';

const Contribute = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    region: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !formData.title) {
      alert("Please provide at least an image and a title!");
      return;
    }

    setLoading(true);
    const success = await addArtifact(formData, image, audio);
    setLoading(false);

    if (success) {
      alert("Artifact added to the Archive!");
      navigate('/archive');
    } else {
      alert("Upload failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 pb-24 px-4 pt-12">
      <h1 className="text-3xl text-yellow-500 mb-6 font-serif">Contribute</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* IMAGE UPLOAD AREA - NOW USING LABEL FOR 100% RELIABILITY */}
        <label 
          className={`w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden
            ${image ? 'border-green-500 bg-green-900/20' : 'border-gray-600 bg-gray-800 hover:border-yellow-500 text-gray-400'}`}
        >
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Preview" className="h-full w-full object-cover opacity-80" />
          ) : (
            <>
              <Camera size={40} className="mb-2" />
              <span className="text-sm">Tap to Upload Photo</span>
            </>
          )}
          {/* Input inside label automatically triggers on click */}
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            className="hidden" 
            accept="image/*"
          />
        </label>

        {/* TEXT FIELDS */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Name of Craft</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-800 rounded-lg p-3 text-white focus:ring-1 focus:ring-yellow-500 outline-none" 
              placeholder="e.g. Warli Painting"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-1">Region / Origin</label>
            <input 
              type="text" 
              value={formData.region}
              onChange={(e) => setFormData({...formData, region: e.target.value})}
              className="w-full bg-gray-800 rounded-lg p-3 text-white focus:ring-1 focus:ring-yellow-500 outline-none"
              placeholder="e.g. Maharashtra"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Story / Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-800 rounded-lg p-3 text-white h-24 focus:ring-1 focus:ring-yellow-500 outline-none"
              placeholder="Describe the history..."
            ></textarea>
          </div>
        </div>

        {/* AUDIO UPLOAD AREA - ALSO USING LABEL */}
        <label 
          className="p-4 bg-gray-800 rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-700"
        >
          <div>
            <h3 className={`font-bold ${audio ? 'text-green-400' : 'text-white'}`}>
              {audio ? "Audio Selected" : "Oral History"}
            </h3>
            <p className="text-xs text-gray-400">{audio ? audio.name : "Upload an audio recording"}</p>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${audio ? 'bg-green-500 text-black' : 'bg-red-500/20 text-red-500'}`}>
            {audio ? <Upload size={20} /> : <Mic size={20} />}
          </div>
          <input 
            type="file" 
            onChange={(e) => setAudio(e.target.files[0])} 
            className="hidden" 
            accept="audio/*"
          />
        </label>

        {/* SUBMIT BUTTON */}
        <button 
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-bold py-4 rounded-xl shadow-lg shadow-yellow-600/20 mt-4 flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader className="animate-spin" /> : "Submit to Archive"}
        </button>
      </form>
    </div>
  );
};

export default Contribute;