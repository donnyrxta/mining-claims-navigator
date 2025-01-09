import React, { useState } from 'react';
import { Claim, ClaimStatus, OpportunityType } from '../types/claim';
import { MineralType } from '@/types/minerals';
import { useFileManagement } from '@/hooks/useFileManagement';
import { seedClaims } from '../scripts/seedClaims';
import { toast } from 'sonner';
import { useSupabaseStatus } from '@/hooks/useSupabaseStatus';
import SearchAndFilters from '@/components/claims/SearchAndFilters';
import ClaimsContainer from '@/components/claims/ClaimsContainer';

const initialClaims: Claim[] = [
  {
    id: 'G1',
    region: 'Mashonaland West',
    type: 'gold',
    sellerName: 'John Doe',
    sellerPhone: '123-456-7890',
    potential: 'high',
    estimatedValue: '$1.2M',
    description: 'High potential gold claim with significant historical yields.',
    dateAdded: '2025-01-02',
    lastUpdated: '2025-01-02',
    status: 'available',
    contactPreference: 'phone',
    attachments: [],
    isFavorite: false,
    opportunityType: 'for_sale'
  },
  {
    id: 'C1',
    region: 'Midlands',
    type: 'chrome',
    sellerName: 'Jane Smith',
    sellerPhone: '987-654-3210',
    potential: 'medium',
    estimatedValue: '$800K',
    description: 'Large chrome deposit with established infrastructure.',
    dateAdded: '2025-01-02',
    lastUpdated: '2025-01-02',
    status: 'available',
    contactPreference: 'email',
    attachments: [],
    isFavorite: false,
    opportunityType: 'seeking_joint_venture'
  }
];

const PersonalClaimsDirectory = () => {
  const { isConfigured } = useSupabaseStatus();
  const [claims, setClaims] = useState<Partial<Claim>[]>(initialClaims);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClaim, setEditingClaim] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'gold' | 'chrome'>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | ClaimStatus>('all');
  const [filterOpportunity, setFilterOpportunity] = useState<'all' | OpportunityType>('all');
  const [filterMineral, setFilterMineral] = useState<'all' | MineralType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { handleFileUpload, handleDeleteFile } = useFileManagement();

  const handleAddClaim = async (newClaim: Partial<Claim>) => {
    const today = new Date().toISOString().split('T')[0];
    const claim: Claim = {
      ...newClaim as Claim,
      dateAdded: today,
      lastUpdated: today,
    };
    
    setClaims([...claims, claim]);
    setShowAddForm(false);
    toast('Success', {
      description: "New claim added successfully",
    });
  };

  const handleUpdateClaim = (id: string, updatedData: Partial<Claim>) => {
    setClaims(claims.map(claim => {
      if (claim.id === id) {
        return {
          ...claim,
          ...updatedData,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return claim;
    }));
    setEditingClaim(null);
    toast('Success', {
      description: "Claim updated successfully",
    });
  };

  const handleDeleteClaim = (id: string) => {
    setClaims(claims.filter(claim => claim.id !== id));
    toast('Success', {
      description: "Claim deleted successfully",
      style: { backgroundColor: 'red', color: 'white' }
    });
  };

  const handleToggleFavorite = (id: string) => {
    setClaims(claims.map(claim => {
      if (claim.id === id) {
        return {
          ...claim,
          isFavorite: !claim.isFavorite
        };
      }
      return claim;
    }));
  };

  const handleSeedClaims = async () => {
    const success = await seedClaims();
    if (success) {
      toast('Success', {
        description: 'Sample claims have been added to the database.',
      });
    } else {
      toast('Error', {
        description: 'Failed to add sample claims.',
        style: { backgroundColor: 'red', color: 'white' }
      });
    }
  };

  const regions = Array.from(new Set(claims.map(claim => claim.region)));

  const filteredClaims = claims.filter(claim => {
    const typeMatch = filterType === 'all' || claim.type === filterType;
    const regionMatch = filterRegion === 'all' || claim.region === filterRegion;
    const statusMatch = filterStatus === 'all' || claim.status === filterStatus;
    const opportunityMatch = filterOpportunity === 'all' || claim.opportunityType === filterOpportunity;
    const mineralMatch = filterMineral === 'all' || claim.mineral === filterMineral;
    
    const searchMatch = searchTerm === '' || 
      claim.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.sellerPhone?.includes(searchTerm) ||
      claim.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.sellerName?.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && regionMatch && statusMatch && opportunityMatch && mineralMatch && searchMatch;
  });

  if (!isConfigured) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Setup Required</h1>
          <p className="text-gray-600 mb-4">
            Please connect to Supabase in the Lovable interface to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Mining Claims Directory</h1>
        <p className="text-gray-600">Manage and track mining claim opportunities</p>
      </header>

      <SearchAndFilters
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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        regions={regions}
        onAddNew={() => setShowAddForm(true)}
        onSeedClaims={handleSeedClaims}
      />

      <ClaimsContainer
        claims={filteredClaims as Claim[]}
        showAddForm={showAddForm}
        editingClaim={editingClaim}
        onEdit={setEditingClaim}
        onDelete={handleDeleteClaim}
        onUpdate={handleUpdateClaim}
        onToggleFavorite={handleToggleFavorite}
        onFileUpload={(id: string, files: FileList) => handleFileUpload(files, id)}
        onDeleteFile={handleDeleteFile}
        onAddClaim={handleAddClaim}
        onCancelAdd={() => setShowAddForm(false)}
      />
    </div>
  );
};

export default PersonalClaimsDirectory;
