import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MapPin, Search, Compass, Navigation, Clock, Phone, Building2 } from 'lucide-react';
import api from '../services/api';
import { CampusLocationItem } from '../types';

export const CampusMapPage: React.FC = () => {
  const [locations, setLocations] = useState<CampusLocationItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<CampusLocationItem | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'Library',
    'Labs',
    'Administrative block',
    'Academic blocks',
    'Canteen',
    'Hostel',
    'Sports ground',
    'Medical center',
  ];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get('/campus/locations');
        setLocations(res.data.data || []);
        if (res.data.data?.length > 0) {
          setSelectedLocation(res.data.data[0]);
        }
      } catch (err) {
        console.error('Failed to load campus locations', err);
      }
    };
    fetchLocations();
  }, []);

  const filtered = locations.filter((loc) => {
    const matchesCategory = selectedCategory === 'ALL' || loc.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = search === '' ||
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.building.toLowerCase().includes(search.toLowerCase()) ||
      loc.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary">Campus Geospatial Directory</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Interactive Campus Map & Building Guide
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Locate lecture halls, departmental labs, reading pods, dining plazas, and health clinics instantly.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search: Where is the library? Or Lab 3, Auditorium..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map Layout: Interactive Map on Left, Location Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Visual Campus Map SVG */}
        <Card className="lg:col-span-2 p-6 sm:p-8 space-y-6 relative overflow-hidden bg-slate-900 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-400" />
              <h3 className="font-bold text-sm tracking-wide">120-Acre Campus Grid Simulation</h3>
            </div>
            <span className="text-[11px] text-slate-400">Click any pin marker to inspect location</span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl border border-slate-800 bg-slate-950/70 p-4 overflow-hidden flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Campus Pathways */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50 380 Q 200 200 450 150 T 800 120" stroke="#026fc3" strokeWidth="4" fill="none" opacity="0.3" strokeDasharray="8 8" />
              <path d="M 250 40 L 250 400" stroke="#6366f1" strokeWidth="3" fill="none" opacity="0.2" />
              <path d="M 650 40 L 650 400" stroke="#6366f1" strokeWidth="3" fill="none" opacity="0.2" />
            </svg>

            {/* Map Locations Markers */}
            {locations.map((loc) => {
              const isSelected = selectedLocation?._id === loc._id;
              return (
                <button
                  key={loc._id}
                  onClick={() => setSelectedLocation(loc)}
                  style={{
                    left: `${loc.mapCoordinates?.x || 50}%`,
                    top: `${loc.mapCoordinates?.y || 50}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all transform hover:scale-125 z-10 ${
                    isSelected ? 'scale-125 z-20' : ''
                  }`}
                >
                  <div className={`p-2.5 rounded-full shadow-lg border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-brand-500 border-white text-white ring-4 ring-brand-400/40'
                      : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-brand-600 hover:text-white'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className={`absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none ${
                    isSelected ? 'bg-brand-500 text-white' : 'bg-slate-900/90 text-slate-300 opacity-0 group-hover:opacity-100'
                  }`}>
                    {loc.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Selected Location Inspector: Building -> Floor -> Room */}
        <Card className="p-6 space-y-6 flex flex-col justify-between">
          {selectedLocation ? (
            <div className="space-y-5">
              <div>
                <Badge variant="primary">{selectedLocation.category}</Badge>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                  {selectedLocation.name}
                </h3>
              </div>

              {/* Precise Path Breadcrumbs: Building -> Floor -> Room */}
              <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 space-y-2">
                <span className="text-[11px] font-bold text-brand-800 dark:text-brand-300 uppercase tracking-wider block">
                  📍 Precise Wayfinding Coordinates
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                  <span>{selectedLocation.building}</span>
                  <span className="text-brand-500">→</span>
                  <span>{selectedLocation.floor}</span>
                  {selectedLocation.roomNumber && (
                    <>
                      <span className="text-brand-500">→</span>
                      <span className="text-brand-600 dark:text-brand-400 font-mono">
                        {selectedLocation.roomNumber}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedLocation.description}
              </p>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Hours: {selectedLocation.timing}</span>
                </div>
                {selectedLocation.contactNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Contact: {selectedLocation.contactNumber}</span>
                  </div>
                )}
              </div>

              {/* Facilities tags */}
              {selectedLocation.facilities?.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Amenities:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLocation.facilities.map((fac, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-medium">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-10">Select a location to view detailed wayfinding.</p>
          )}

          <Button
            onClick={() => alert(`Starting turn-by-turn navigation to ${selectedLocation?.name}`)}
            className="w-full gap-2"
            size="sm"
          >
            <Navigation className="w-4 h-4" />
            <span>Start Campus Navigation</span>
          </Button>
        </Card>
      </div>
    </div>
  );
};
