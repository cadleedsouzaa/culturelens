import React from 'react';
import { Search } from 'lucide-react';

const Archive = () => {
  // Mock Data for UI
  const artifacts = [
    { id: 1, title: "Warli Painting", region: "Maharashtra", img: "https://placehold.co/600x400/1a1a1a/gold?text=Warli" },
    { id: 2, title: "Thanjavur Doll", region: "Tamil Nadu", img: "https://placehold.co/600x400/1a1a1a/gold?text=Doll" },
    { id: 3, title: "Blue Pottery", region: "Rajasthan", img: "https://placehold.co/600x400/1a1a1a/gold?text=Pottery" },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 pb-24 px-4 pt-12">
      <h1 className="text-3xl text-yellow-500 mb-2">The Archive</h1>
      <p className="text-gray-400 mb-6">Preserving India's Living Heritage</p>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        <input 
          type="text" 
          placeholder="Search crafts, regions..." 
          className="w-full bg-gray-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {artifacts.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="h-32 bg-gray-700">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="p-3">
              <h3 className="font-bold text-white text-sm">{item.title}</h3>
              <p className="text-xs text-yellow-600">{item.region}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;