import React from 'react';
import { ClaimStatus, OpportunityType } from '@/types/claim';
import { MineralType } from '@/types/minerals';
import { Plus } from 'lucide-react';
import MineralsFilter from './minerals/MineralsFilter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type ClaimFiltersProps = {
  filterType: 'all' | 'gold' | 'chrome';
  setFilterType: (type: 'all' | 'gold' | 'chrome') => void;
  filterRegion: string;
  setFilterRegion: (region: string) => void;
  filterStatus: 'all' | ClaimStatus;
  setFilterStatus: (status: 'all' | ClaimStatus) => void;
  filterOpportunity: 'all' | OpportunityType;
  setFilterOpportunity: (type: 'all' | OpportunityType) => void;
  filterMineral: 'all' | MineralType;
  setFilterMineral: (mineral: 'all' | MineralType) => void;
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
  filterMineral,
  setFilterMineral,
  regions,
  onAddNew
}: ClaimFiltersProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <Select value={filterType} onValueChange={(value) => setFilterType(value as 'all' | 'gold' | 'chrome')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="gold">Gold</SelectItem>
          <SelectItem value="chrome">Chrome</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterRegion} onValueChange={setFilterRegion}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          {regions.map(region => (
            <SelectItem key={region} value={region}>{region}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as 'all' | ClaimStatus)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="under_negotiation">Under Negotiation</SelectItem>
          <SelectItem value="sold">Sold</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filterOpportunity} 
        onValueChange={(value) => setFilterOpportunity(value as 'all' | OpportunityType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by opportunity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Opportunities</SelectItem>
          <SelectItem value="for_sale">For Sale</SelectItem>
          <SelectItem value="seeking_joint_venture">Seeking Joint Venture</SelectItem>
          <SelectItem value="not_available">Not Available</SelectItem>
        </SelectContent>
      </Select>

      <MineralsFilter
        selectedMineral={filterMineral}
        onMineralChange={setFilterMineral}
      />

      <Button
        onClick={onAddNew}
        className="ml-auto flex items-center gap-2"
        variant="default"
      >
        <Plus size={20} /> Add New Claim
      </Button>
    </div>
  );
};

export default ClaimFilters;