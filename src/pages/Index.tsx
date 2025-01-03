import React, { useState } from 'react';
import { Claim, ClaimStatus, OpportunityType } from '../types/claim';
import { MineralType } from '@/types/minerals';
import ClaimFilters from '../components/ClaimFilters';
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseStatus } from '@/hooks/useSupabaseStatus';
import AddClaimForm from '@/components/claims/AddClaimForm';
import ClaimsList from '@/components/claims/ClaimsList';

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
  const [claims, setClaims] = useState<Claim[]>(initialClaims);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClaim, setEditingClaim] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'gold' | 'chrome'>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | ClaimStatus>('all');
  const [filterOpportunity, setFilterOpportunity] = useState<'all' | OpportunityType>('all');
  const [filterMineral, setFilterMineral] = useState<'all' | MineralType>('all');

  const { toast } = useToast();
  const regions = Array.from(new Set(claims.map(claim => claim.region)));

  const handleAddClaim = (newClaim: Partial<Claim>) => {
    const today = new Date().toISOString().split('T')[0];
    const claim: Claim = {
      ...newClaim as Claim,
      dateAdded: today,
      lastUpdated: today
    };
    setClaims([...claims, claim]);
    setShowAddForm(false);
    toast({
      title: "Success",
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
    toast({
      title: "Success",
      description: "Claim updated successfully",
    });
  };

  const handleDeleteClaim = (id: string) => {
    setClaims(claims.filter(claim => claim.id !== id));
    toast({
      title: "Success",
      description: "Claim deleted successfully",
      variant: "destructive"
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

  const handleFileUpload = (claimId: string, files: FileList) => {
    const newAttachments = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      dateAdded: new Date().toISOString().split('T')[0]
    }));

    setClaims(claims.map(claim => {
      if (claim.id === claimId) {
        return {
          ...claim,
          attachments: [...claim.attachments, ...newAttachments],
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return claim;
    }));
    
    toast({
      title: "Success",
      description: "Files uploaded successfully",
    });
  };

  const handleDeleteFile = (claimId: string, fileId: string) => {
    setClaims(claims.map(claim => {
      if (claim.id === claimId) {
        return {
          ...claim,
          attachments: claim.attachments.filter(file => file.id !== fileId),
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return claim;
    }));
  };

  const filteredClaims = claims.filter(claim => {
    const typeMatch = filterType === 'all' || claim.type === filterType;
    const regionMatch = filterRegion === 'all' || claim.region === filterRegion;
    const statusMatch = filterStatus === 'all' || claim.status === filterStatus;
    const opportunityMatch = filterOpportunity === 'all' || claim.opportunityType === filterOpportunity;
    const mineralMatch = filterMineral === 'all' || claim.mineral === filterMineral;
    return typeMatch && regionMatch && statusMatch && opportunityMatch && mineralMatch;
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
        onAddNew={() => setShowAddForm(true)}
      />

      <ClaimsList
        claims={filteredClaims}
        editingClaim={editingClaim}
        onEdit={setEditingClaim}
        onDelete={handleDeleteClaim}
        onUpdate={handleUpdateClaim}
        onToggleFavorite={handleToggleFavorite}
        onFileUpload={handleFileUpload}
        onDeleteFile={handleDeleteFile}
      />

      {showAddForm && (
        <AddClaimForm
          onSubmit={handleAddClaim}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default PersonalClaimsDirectory;
