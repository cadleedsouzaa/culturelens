import React, { useEffect, useState } from 'react';
import { Search, Loader, MapPin } from 'lucide-react';
import { getArtifacts } from '../services/db';

const Archive = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Real Data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtifacts();
        setArtifacts(data);
      } catch (error) {
        console.error("Failed to load archive:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredArtifacts = artifacts.filter(item => 
    (item.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.region?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-900 pb-24 px-4 pt-12">
      <h1 className="text-3xl text-yellow-500 mb-2 font-serif">The Archive</h1>
      <p className="text-gray-400 mb-6">Preserving India's Living Heritage</p>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search crafts, regions..." 
          className="w-full bg-gray-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center mt-20 text-yellow-500">
          <Loader size={40} className="animate-spin" />
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-2 gap-4">
          {filteredArtifacts.length === 0 ? (
            <p className="text-gray-500 col-span-2 text-center mt-10">No artifacts found yet. Go add one!</p>
          ) : (
            filteredArtifacts.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col">
                {/* Image Area */}
                <div className="h-32 bg-gray-700 relative">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                </div>
                
                {/* Text Area */}
                <div className="p-3 flex-grow">
                  <h3 className="font-bold text-white text-sm truncate">{item.title}</h3>
                  <div className="flex items-center text-xs text-yellow-600 mt-1">
                    <MapPin size={10} className="mr-1" />
                    <span className="truncate">{item.region}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Archive;