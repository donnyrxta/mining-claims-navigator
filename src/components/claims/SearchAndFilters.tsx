import React from 'react';
import { ClaimStatus, OpportunityType } from '@/types/claim';
import { MineralType } from '@/types/minerals';
import ClaimFilters from '../ClaimFilters';
import SearchBar from './SearchBar';
import { Button } from "@/components/ui/button";

type SearchAndFiltersProps = {
  filterType: 'all' | 'gold' | 'chrome';
  setFilterType: (type: 'all' | 'gold' | 'chrome') => void;
  filterRegion: string;
  setFilterRegion: (region: string) => void;
  filterStatus: 'all' | ClaimStatus;
  setFilterStatus: (status: 'all' | ClaimStatus) => void;
  filterOpportunity: 'all' | OpportunityType;
  setFilterOpportunity: (type: 'all' | OpportunityType) => void;
  filterMineral: 'all' | MineralType;
  setFilterMineral: (type: 'all' | MineralType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  regions: string[];
  onAddNew: () => void;
  onSeedClaims: () => void;
};

const SearchAndFilters = ({
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
  searchTerm,
  setSearchTerm,
  regions,
  onAddNew,
  onSeedClaims,
}: SearchAndFiltersProps) => {
  return (
    <div>
      <div className="mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <ClaimFilters
        filterType={filterType}
        setFilterType={setFilterType}
        filterRegion={filterRegion}
        setFilterRegion={setFilterRegion}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterOpportunity={filterOpportunity}
        setFilterOpportunity={setFilterOpportunity}
        filterMineral={filterMineral}
        setFilterMineral={setFilterMineral}
        regions={regions}
        onAddNew={onAddNew}
      />

      <Button 
        onClick={onSeedClaims}
        className="mt-4"
        variant="outline"
      >
        Seed Sample Claims
      </Button>
    </div>
  );
};

export default SearchAndFilters;