
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import SpotCard from './components/SpotCard';
import CreateSpotModal from './components/CreateSpotModal';
import { MOCK_SPOTS, MOCK_TAGGOS, CURRENT_USER } from './constants';
// Added missing Settings and Search icons to the lucide-react import list
import { MapPin, LayoutGrid, Heart, Users, Map as MapIcon, ChevronRight, Lock, Globe, Filter, Share2, Plus, Info, Settings, Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [spots, setSpots] = useState(MOCK_SPOTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

  const filteredSpots = useMemo(() => {
    return spots.filter(spot => {
      const matchesSearch = spot.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            spot.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || 
                              spot.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  }, [spots, searchQuery, activeCategory]);

  const handleLike = (id: string) => {
    setSpots(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Interactive Map</h2>
                <p className="text-slate-500">Explore recommendations across the globe.</p>
              </div>
              <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm shrink-0">
                <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold">Standard</button>
                <button className="px-4 py-1.5 text-slate-500 hover:text-slate-800 rounded-lg text-sm font-medium">Satellite</button>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden relative map-container">
              {/* Map Canvas Background (Simulated) */}
              
              {filteredSpots.map((spot, i) => (
                <div 
                  key={spot.id}
                  onClick={() => setSelectedSpotId(spot.id)}
                  className={`absolute p-2 bg-white rounded-xl shadow-lg border-2 transition-all cursor-pointer hover:z-20 hover:scale-110 flex items-center gap-2 group
                    ${selectedSpotId === spot.id ? 'border-indigo-500 scale-110 z-20' : 'border-white z-10'}`}
                  style={{ top: `${20 + i * 15}%`, left: `${15 + i * 20}%` }}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 shadow-inner">
                    <img src={spot.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="pr-1">
                    <p className="text-[10px] font-bold text-slate-900 leading-none truncate max-w-[80px]">{spot.title}</p>
                    <div className="flex items-center gap-1 text-[8px] text-slate-400 mt-0.5">
                      <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" /> {spot.likes}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Map UI elements */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all active:scale-90">
                  <Plus className="w-5 h-5" />
                </button>
                <div className="h-px w-6 bg-slate-100 self-center"></div>
                <button className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all active:scale-90">
                  <span className="text-xl font-bold">−</span>
                </button>
              </div>

              {/* Selected Spot Details on Map */}
              {selectedSpotId && (
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white max-w-[280px] animate-in slide-in-from-right-4 duration-300">
                  <button 
                    onClick={() => setSelectedSpotId(null)}
                    className="absolute -top-2 -left-2 w-6 h-6 bg-white border border-slate-100 rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-slate-900"
                  >
                    <ChevronRight className="w-3 h-3 rotate-180" />
                  </button>
                  {spots.find(s => s.id === selectedSpotId) && (
                    <div className="space-y-3">
                      <img src={spots.find(s => s.id === selectedSpotId)?.image} className="w-full h-32 rounded-xl object-cover" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{spots.find(s => s.id === selectedSpotId)?.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{spots.find(s => s.id === selectedSpotId)?.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <button className="text-xs font-bold text-indigo-600 px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100">View Detail</button>
                        <button 
                          onClick={() => handleLike(selectedSpotId)}
                          className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">{spots.find(s => s.id === selectedSpotId)?.likes}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {!selectedSpotId && (
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white max-w-xs hidden md:block">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-500" /> Recommendations
                  </h4>
                  <div className="space-y-3">
                    {filteredSpots.slice(0, 3).map(s => (
                      <div key={s.id} onClick={() => setSelectedSpotId(s.id)} className="flex gap-3 cursor-pointer group hover:bg-slate-50 p-1 rounded-xl transition-colors">
                        <img src={s.image} className="w-10 h-10 rounded-lg object-cover group-hover:ring-2 ring-indigo-500 transition-all" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{s.title}</p>
                          <p className="text-[10px] text-slate-500 truncate">{s.location.address}</p>
                        </div>
                      </div>
                    ))}
                    {filteredSpots.length === 0 && <p className="text-xs text-slate-400">No spots found in this area.</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'taggos':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Your Taggos</h2>
                <p className="text-slate-500">Organized collections of your favorite spots.</p>
              </div>
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all">
                New Collection
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_TAGGOS.map(taggo => (
                <div key={taggo.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-slate-200 transition-all cursor-pointer group relative overflow-hidden">
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-${taggo.color}-100 flex items-center justify-center text-${taggo.color}-600 shadow-sm`}>
                      <LayoutGrid className="w-7 h-7" />
                    </div>
                    {taggo.isPrivate ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-full text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <Lock className="w-3 h-3" /> Private
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                        <Globe className="w-3 h-3" /> Public
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors relative z-10">{taggo.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 relative z-10">{taggo.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 relative z-10">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-sm">
                           <img src={`https://picsum.photos/seed/${taggo.id}${i}/100`} alt="" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-400">{taggo.spotIds.length} spots</span>
                  </div>

                  {/* Aesthetic Accent */}
                  <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${taggo.color}-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                </div>
              ))}
              
              <button className="group flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-white hover:shadow-lg transition-all min-h-[250px] active:scale-95">
                <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-all mb-4">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">Create new collection</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium tracking-wide">ORGANIZED & PRIVATE</p>
              </button>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
             {/* Profile Header */}
             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-600 to-indigo-800"></div>
                <div className="relative pt-16 flex flex-col md:flex-row items-end gap-6">
                  <div className="relative group">
                    <img src={CURRENT_USER.avatar} alt="" className="w-32 h-32 rounded-3xl border-4 border-white shadow-2xl object-cover" />
                    <button className="absolute bottom-2 right-2 p-1.5 bg-white rounded-lg shadow-lg text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Fixed: Settings is now imported from lucide-react */}
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-bold text-slate-900">{CURRENT_USER.name}</h2>
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                      </div>
                    </div>
                    <p className="text-slate-500 font-medium tracking-wide">{CURRENT_USER.handle}</p>
                    <p className="mt-2 text-slate-600 max-w-xl text-sm leading-relaxed font-medium">Curating the best architecture and quiet spots in the city. Architecture student & urban explorer. Based in São Paulo.</p>
                  </div>
                  <div className="flex gap-2 pb-2">
                    <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm">Edit Profile</button>
                    <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all active:scale-95 shadow-sm">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
                   {[
                     { label: 'Spots', val: CURRENT_USER.stats.spots },
                     { label: 'Taggos', val: CURRENT_USER.stats.taggos },
                     { label: 'Likes', val: CURRENT_USER.stats.likes },
                     { label: 'Followers', val: CURRENT_USER.stats.followers }
                   ].map(stat => (
                     <div key={stat.label} className="text-center md:text-left p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-default">
                       <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.val.toLocaleString()}</p>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">Your Activity</h3>
                    <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200">
                      <button className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md"><LayoutGrid className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-md"><MapIcon className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {spots.slice(0, 4).map(s => <SpotCard key={s.id} spot={s} onLike={() => handleLike(s.id)} onComment={() => {}} />)}
                  </div>
                  <button className="w-full py-3 bg-white border border-slate-200 rounded-2xl text-slate-500 font-bold text-sm hover:border-indigo-300 hover:text-indigo-600 transition-all">
                    Load More Activity
                  </button>
                </div>

                <div className="space-y-6">
                   <h3 className="text-xl font-bold text-slate-900">People You Follow</h3>
                   <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img src={`https://picsum.photos/seed/user${i}/100`} className="w-10 h-10 rounded-full object-cover ring-2 ring-white" alt="" />
                              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">User_{i}42</p>
                              <p className="text-[10px] text-slate-500 font-medium">Urban Explorer • 24 spots</p>
                            </div>
                          </div>
                          <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-all">Following</button>
                        </div>
                      ))}
                      <button className="w-full text-center py-2 text-indigo-600 text-xs font-bold hover:underline mt-2">Find more explorers</button>
                   </div>
                   
                   <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-100 text-white relative overflow-hidden group">
                      <div className="relative z-10">
                        <h4 className="font-bold text-lg mb-1">Invite Friends</h4>
                        <p className="text-indigo-100 text-sm mb-4">Share Taggo with your network and earn exclusive rewards.</p>
                        <button className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold shadow-lg hover:shadow-white/20 transition-all active:scale-95">
                          Copy Invite Link
                        </button>
                      </div>
                      <Users className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-500/30 group-hover:scale-110 transition-transform" />
                   </div>
                </div>
             </div>
          </div>
        );

      case 'explore':
      case 'feed':
      default:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{activeTab === 'explore' ? 'Explore New Spots' : 'Your Feed'}</h2>
                <p className="text-slate-500">Discover what's trending and what's new in the community.</p>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <button 
                  className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm"
                  title="Filter"
                >
                  <Filter className="w-5 h-5" />
                </button>
                {['All', 'Parks', 'Food', 'Culture', 'Secret', 'Architecture'].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm border ${
                      cat === activeCategory 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredSpots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSpots.map(spot => (
                  <SpotCard 
                    key={spot.id} 
                    spot={spot} 
                    onLike={() => handleLike(spot.id)} 
                    onComment={() => {}} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mb-4">
                  {/* Fixed: Search is now imported from lucide-react */}
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No results found</h3>
                <p className="text-slate-500 mt-2 max-w-xs">We couldn't find any spots matching your search or category filter. Try clearing your filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  Reset all filters
                </button>
              </div>
            )}
            
            {filteredSpots.length > 0 && (
              <div className="py-12 border-t border-slate-200 text-center">
                <button className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-slate-500 font-bold hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
                  View more discoveries
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onOpenCreate={() => setIsCreateModalOpen(true)}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      {renderContent()}
      
      <CreateSpotModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSave={(data) => {
          const newSpot = {
            id: `s${Date.now()}`,
            title: data.title,
            description: data.description,
            location: { lat: -23.5, lng: -46.6, address: data.location || 'Unknown Location' },
            image: `https://picsum.photos/seed/${data.title}/800/600`,
            tags: data.tags.length > 0 ? data.tags : ['new'],
            ownerId: CURRENT_USER.id,
            likes: 0,
            comments: 0,
            createdAt: new Date().toISOString()
          };
          setSpots([newSpot, ...spots]);
          setIsCreateModalOpen(false);
          setActiveTab('feed');
          // Add a simple localized "toast" logic could be here
        }}
      />
    </Layout>
  );
};

export default App;
