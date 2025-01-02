import React from 'react';
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

type ClaimFiltersProps = {
  filterType: 'all' | 'gold' | 'chrome';
  setFilterType: (type: 'all' | 'gold' | 'chrome') => void;
  filterRegion: string;
  setFilterRegion: (region: string) => void;
  filterStatus: 'all' | ClaimStatus;
  setFilterStatus: (status: 'all' | ClaimStatus) => void;
  regions: string[];
  onAddNew: () => void;
};

const ClaimFilters = ({
  filterType,
  setFilterType,
  filterRegion,
  setFilterRegion,
  filterStatus,
  setFilterStatus,
  regions,
  onAddNew
}: ClaimFiltersProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <select
        className="p-2 border rounded-md"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value as 'all' | 'gold' | 'chrome')}
      >
        <option value="all">All Types</option>
        <option value="gold">Gold</option>
        <option value="chrome">Chrome</option>
      </select>

      <select
        className="p-2 border rounded-md"
        value={filterRegion}
        onChange={(e) => setFilterRegion(e.target.value)}
      >
        <option value="all">All Regions</option>
        {regions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>

      <select
        className="p-2 border rounded-md"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as 'all' | ClaimStatus)}
      >
        <option value="all">All Statuses</option>
        <option value="available">Available</option>
        <option value="under_negotiation">Under Negotiation</option>
        <option value="sold">Sold</option>
      </select>

      <button
        onClick={onAddNew}
        className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        <Plus size={20} /> Add New Claim
      </button>
    </div>
  );
};

export default ClaimFilters;