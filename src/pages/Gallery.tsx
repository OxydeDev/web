import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = ['All', 'Banners', 'Logos', 'Icons'];

  const artworks = [
    {
      id: 1,
      title: 'Hope\'s Services Logo',
      type: 'Logos',
      category: 'Static',
      image: 'https://media.discordapp.net/attachments/1380820797261746317/1397528226171060365/HS_Services.png?ex=68820d15&is=6880bb95&hm=adbfa396d844b34d87e1adbb0e6d319c0a15250f5aea01fbb36d997ecc907c9a&=&format=webp&quality=lossless'
    },
    {
      id: 2,
      title: 'TT Server Logo',
      type: 'Logos',
      category: 'Static',
      image: 'https://media.discordapp.net/attachments/1380820797261746317/1397228121786155049/tt.png?ex=68819e57&is=68804cd7&hm=f29a7960eaa6ab5c34edf6c9c091ef6f0f770b8ff41b336da270a8e8f5d0018b&=&format=webp&quality=lossless&width=743&height=743'
    },
    {
      id: 3,
      title: 'MC Shop Server Logo',
      type: 'Logos',
      category: 'Static',
      image: 'https://media.discordapp.net/attachments/1380820797261746317/1380821042334797974/MC_Shop_green.png?ex=6881ea4e&is=688098ce&hm=543a964b01c47caaeddd5ea3ab381850209cc27de393748556b60e6db42a4582&=&format=webp&quality=lossless&width=743&height=743'
    },
    {
      id: 4,
      title: 'Hope Anime Profile Banner',
      type: 'Banners',
      category: 'Animated',
      image: 'https://media.discordapp.net/attachments/1380820797261746317/1381235586601586698/hopeanimebannersafe.gif?ex=68817221&is=688020a1&hm=92af0c6d91fbcef5fcbde8abf0e6c225e24be98f28d80bebf30eba75857be262&='
    },
    {
      id: 5,
      title: 'Vorrak Profile Banner',
      type: 'Banners',
      category: 'Animated',
      image: 'https://media.discordapp.net/attachments/1380820797261746317/1380852501762281603/vorrak_watermarked.gif?ex=68815edb&is=68800d5b&hm=1e97500ac30ea13a9b225e45c5bf957f3c8604f07a1d170f185c17df4ee766b2&='
    },
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesFilter = selectedFilter === 'All' || artwork.type === selectedFilter;
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">My Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through my collection of custom Discord artwork. Each piece is crafted with care and attention to detail.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search artwork..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-105"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2">{artwork.title}</h3>
                <div className="flex gap-2">
                  <span className="inline-block bg-pink-100 text-black px-3 py-1 rounded-full text-sm font-medium">
                    {artwork.type}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {artwork.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No artwork found matching your criteria.</p>
          </div>
        )}

        {/* Discord Button */}
        <div className="text-center mt-12">
          <a
            href="https://discord.gg/cQX6GQqE39"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
          >
            ⭐More On Discord
          </a>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-pink-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-black mb-4">Love What You See?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Ready to get your own custom Discord artwork? Let's bring your vision to life!
          </p>
          <a
            href="/commission"
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
          >
            Request a Commission
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;