import React, { useState } from 'react';
import { Claim, ClaimStatus, OpportunityType } from '../types/claim';
import ClaimFilters from '../components/ClaimFilters';
import ClaimCard from '../components/ClaimCard';
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseStatus } from '@/hooks/useSupabaseStatus';

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
    opportunityType: 'for_sale' // Added this field
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
    opportunityType: 'seeking_joint_venture' // Added this field
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
  
  const [newClaim, setNewClaim] = useState<Partial<Claim>>({
    type: 'gold',
    potential: 'medium',
    status: 'available',
    contactPreference: 'phone',
    attachments: [],
    opportunityType: 'for_sale'
  });

  const { toast } = useToast();
  const regions = Array.from(new Set(claims.map(claim => claim.region)));

  const handleAddClaim = () => {
    if (newClaim.id && newClaim.region && newClaim.type && newClaim.sellerName && newClaim.sellerPhone) {
      const today = new Date().toISOString().split('T')[0];
      const claim: Claim = {
        ...newClaim as Claim,
        dateAdded: today,
        lastUpdated: today
      };
      setClaims([...claims, claim]);
      setShowAddForm(false);
      setNewClaim({
        type: 'gold',
        potential: 'medium',
        status: 'available',
        contactPreference: 'phone',
        attachments: [],
        opportunityType: 'for_sale'
      });
      toast({
        title: "Success",
        description: "New claim added successfully",
      });
    }
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
    return typeMatch && regionMatch && statusMatch && opportunityMatch;
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
        regions={regions}
        onAddNew={() => setShowAddForm(true)}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClaims.map((claim) => (
          <div key={claim.id} className="bg-white rounded-lg shadow-md p-5">
            <ClaimCard
              claim={claim}
              isEditing={editingClaim === claim.id}
              onEdit={setEditingClaim}
              onDelete={handleDeleteClaim}
              onUpdate={handleUpdateClaim}
              onToggleFavorite={handleToggleFavorite}
              onFileUpload={handleFileUpload}
              onDeleteFile={handleDeleteFile}
            />
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Claim</h2>
            <div className="space-y-4">
              <input
                placeholder="Claim ID (e.g., G1, C1)"
                className="w-full p-2 border rounded"
                value={newClaim.id || ''}
                onChange={(e) => setNewClaim({ ...newClaim, id: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded"
                value={newClaim.type}
                onChange={(e) => setNewClaim({ ...newClaim, type: e.target.value as 'gold' | 'chrome' })}
              >
                <option value="gold">Gold</option>
                <option value="chrome">Chrome</option>
              </select>
              <input
                placeholder="Region"
                className="w-full p-2 border rounded"
                value={newClaim.region || ''}
                onChange={(e) => setNewClaim({ ...newClaim, region: e.target.value })}
              />
              <input
                placeholder="Seller Name"
                className="w-full p-2 border rounded"
                value={newClaim.sellerName || ''}
                onChange={(e) => setNewClaim({ ...newClaim, sellerName: e.target.value })}
              />
              <input
                placeholder="Seller Phone"
                className="w-full p-2 border rounded"
                value={newClaim.sellerPhone || ''}
                onChange={(e) => setNewClaim({ ...newClaim, sellerPhone: e.target.value })}
              />
              <input
                placeholder="Estimated Value"
                className="w-full p-2 border rounded"
                value={newClaim.estimatedValue || ''}
                onChange={(e) => setNewClaim({ ...newClaim, estimatedValue: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded"
                value={newClaim.potential}
                onChange={(e) => setNewClaim({ ...newClaim, potential: e.target.value as 'high' | 'medium' | 'low' })}
              >
                <option value="high">High Potential</option>
                <option value="medium">Medium Potential</option>
                <option value="low">Low Potential</option>
              </select>
              <select
                className="w-full p-2 border rounded"
                value={newClaim.status}
                onChange={(e) => setNewClaim({ ...newClaim, status: e.target.value as ClaimStatus })}
              >
                <option value="available">Available</option>
                <option value="under_negotiation">Under Negotiation</option>
                <option value="sold">Sold</option>
              </select>
              <input
                placeholder="Resource Estimate"
                className="w-full p-2 border rounded"
                value={newClaim.resourceEstimate || ''}
                onChange={(e) => setNewClaim({ ...newClaim, resourceEstimate: e.target.value })}
              />
              <input
                placeholder="Legal Details"
                className="w-full p-2 border rounded"
                value={newClaim.legalDetails || ''}
                onChange={(e) => setNewClaim({ ...newClaim, legalDetails: e.target.value })}
              />
              <input
                placeholder="Accessibility"
                className="w-full p-2 border rounded"
                value={newClaim.accessibility || ''}
                onChange={(e) => setNewClaim({ ...newClaim, accessibility: e.target.value })}
              />
              <textarea
                placeholder="Environmental Information"
                className="w-full p-2 border rounded"
                value={newClaim.environmentalInfo || ''}
                onChange={(e) => setNewClaim({ ...newClaim, environmentalInfo: e.target.value })}
              />
              <textarea
                placeholder="Investment Highlights"
                className="w-full p-2 border rounded"
                value={newClaim.investmentHighlights || ''}
                onChange={(e) => setNewClaim({ ...newClaim, investmentHighlights: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded"
                value={newClaim.contactPreference}
                onChange={(e) => setNewClaim({ ...newClaim, contactPreference: e.target.value as Claim['contactPreference'] })}
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="in_person">In Person</option>
              </select>
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={newClaim.description || ''}
                onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClaim}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalClaimsDirectory;
