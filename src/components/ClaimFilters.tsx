import React from 'react';
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { ClaimStatus, OpportunityType } from '@/types/claim';

type ClaimFiltersProps = {
  filterType: 'all' | 'gold' | 'chrome';
  setFilterType: (type: 'all' | 'gold' | 'chrome') => void;
  filterRegion: string;
  setFilterRegion: (region: string) => void;
  filterStatus: 'all' | ClaimStatus;
  setFilterStatus: (status: 'all' | ClaimStatus) => void;
  filterOpportunity: 'all' | OpportunityType;
  setFilterOpportunity: (type: 'all' | OpportunityType) => void;
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
  filterOpportunity,
  setFilterOpportunity,
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

      <select
        className="p-2 border rounded-md"
        value={filterOpportunity}
        onChange={(e) => setFilterOpportunity(e.target.value as 'all' | OpportunityType)}
      >
        <option value="all">All Opportunities</option>
        <option value="for_sale">For Sale</option>
        <option value="seeking_joint_venture">Seeking Joint Venture</option>
        <option value="not_available">Not Available</option>
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