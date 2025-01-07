import React, { useState } from 'react';
import { Claim, ClaimStatus, OpportunityType } from '../types/claim';
import { MineralType } from '@/types/minerals';
import ClaimFilters from '../components/ClaimFilters';
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseStatus } from '@/hooks/useSupabaseStatus';
import AddClaimForm from '@/components/claims/AddClaimForm';
import ClaimsList from '@/components/claims/ClaimsList';
import SearchBar from '@/components/claims/SearchBar';
import { useAttachments } from '@/hooks/useAttachments';
import { supabase } from '@/lib/supabase';

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
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList, claimId?: string) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Storage is not configured",
        variant: "destructive",
      });
      return;
    }

    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      toast({
        title: "Error",
        description: "You must be logged in to upload files",
        variant: "destructive",
      });
      return;
    }

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${claimId || 'temp'}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('claim-attachments')
        .upload(filePath, file);

      if (uploadError) {
        toast({
          title: "Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('claim-attachments')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('claim_attachments')
        .insert({
          claim_id: claimId || 'temp',
          file_name: file.name,
          file_type: file.type,
          file_url: publicUrl,
          user_id: user.data.user.id,
        });

      if (dbError) {
        toast({
          title: "Error",
          description: `Failed to save ${file.name} metadata`,
          variant: "destructive",
        });
        continue;
      }

      toast({
        title: "Success",
        description: `${file.name} uploaded successfully`,
      });
    }
  };

  const handleAddClaim = async (newClaim: Partial<Claim>) => {
    const today = new Date().toISOString().split('T')[0];
    const claim: Claim = {
      ...newClaim as Claim,
      dateAdded: today,
      lastUpdated: today,
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

  const regions = Array.from(new Set(claims.map(claim => claim.region)));

  const filteredClaims = claims.filter(claim => {
    const typeMatch = filterType === 'all' || claim.type === filterType;
    const regionMatch = filterRegion === 'all' || claim.region === filterRegion;
    const statusMatch = filterStatus === 'all' || claim.status === filterStatus;
    const opportunityMatch = filterOpportunity === 'all' || claim.opportunityType === filterOpportunity;
    const mineralMatch = filterMineral === 'all' || claim.mineral === filterMineral;
    
    const searchMatch = searchTerm === '' || 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.sellerPhone.includes(searchTerm) ||
      claim.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.sellerName.toLowerCase().includes(searchTerm.toLowerCase());

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
        onAddNew={() => setShowAddForm(true)}
      />

      <ClaimsList
        claims={filteredClaims as Claim[]}
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
          onFileUpload={(files) => handleFileUpload(files)}
        />
      )}
    </div>
  );
};

export default PersonalClaimsDirectory;
