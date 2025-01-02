import React, { useState } from 'react';
import { Plus, X, Edit2 } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import FilePreview from '../components/FilePreview';
import { FileAttachment } from '../types/claim';

type Claim = {
  id: string;
  region: string;
  type: 'gold' | 'chrome';
  sellerName: string;
  sellerPhone: string;
  potential: 'high' | 'medium' | 'low';
  estimatedValue: string;
  description?: string;
  dateAdded: string;
  lastUpdated: string;
  attachments: FileAttachment[];
};

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
    attachments: []
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
    attachments: []
  }
];

const PersonalClaimsDirectory = () => {
  const [claims, setClaims] = useState<Claim[]>(initialClaims);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClaim, setEditingClaim] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'gold' | 'chrome'>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  
  const [newClaim, setNewClaim] = useState<Partial<Claim>>({
    type: 'gold',
    potential: 'medium',
    attachments: []
  });

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
      setNewClaim({ type: 'gold', potential: 'medium', attachments: [] });
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
  };

  const handleDeleteClaim = (id: string) => {
    setClaims(claims.filter(claim => claim.id !== id));
  };

  const handleFileUpload = (claimId: string, files: FileList) => {
    const newAttachments: FileAttachment[] = Array.from(files).map(file => ({
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
    return typeMatch && regionMatch;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Mining Claims Directory</h1>
        <p className="text-gray-600">Manage and track mining claim opportunities</p>
      </header>

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

        <button
          onClick={() => setShowAddForm(true)}
          className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={20} /> Add New Claim
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClaims.map((claim) => (
          <div key={claim.id} className="bg-white rounded-lg shadow-md p-5">
            {editingClaim === claim.id ? (
              <div className="space-y-3">
                <input
                  className="w-full p-2 border rounded"
                  value={claim.sellerName}
                  onChange={(e) => handleUpdateClaim(claim.id, { sellerName: e.target.value })}
                />
                <input
                  className="w-full p-2 border rounded"
                  value={claim.sellerPhone}
                  onChange={(e) => handleUpdateClaim(claim.id, { sellerPhone: e.target.value })}
                />
                <input
                  className="w-full p-2 border rounded"
                  value={claim.estimatedValue}
                  onChange={(e) => handleUpdateClaim(claim.id, { estimatedValue: e.target.value })}
                />
                <select
                  className="w-full p-2 border rounded"
                  value={claim.potential}
                  onChange={(e) => handleUpdateClaim(claim.id, { potential: e.target.value as 'high' | 'medium' | 'low' })}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <textarea
                  className="w-full p-2 border rounded"
                  value={claim.description || ''}
                  onChange={(e) => handleUpdateClaim(claim.id, { description: e.target.value })}
                />
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Attachments</h4>
                  <FileUpload onFilesSelected={(files) => handleFileUpload(claim.id, files)} />
                  <div className="mt-2 space-y-2">
                    {claim.attachments.map(file => (
                      <FilePreview
                        key={file.id}
                        file={file}
                        onDelete={(fileId) => handleDeleteFile(claim.id, fileId)}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setEditingClaim(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {claim.type.charAt(0).toUpperCase() + claim.type.slice(1)} Claim ({claim.id})
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingClaim(claim.id)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClaim(claim.id)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-1">Region: {claim.region}</p>
                <p className="text-gray-600 mb-1">
                  Seller: <a href={`tel:${claim.sellerPhone}`} className="text-blue-600 hover:underline">
                    {claim.sellerName}
                  </a>
                </p>
                <p className="text-gray-600 mb-1">Estimated Value: {claim.estimatedValue}</p>
                <p className="text-gray-600 mb-2">{claim.description}</p>
                {claim.attachments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Attachments ({claim.attachments.length})</h4>
                    <div className="space-y-2">
                      {claim.attachments.map(file => (
                        <FilePreview key={file.id} file={file} />
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center mt-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    claim.potential === 'high' ? 'bg-green-100 text-green-800' :
                    claim.potential === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {claim.potential}
                  </span>
                  <span className="text-xs text-gray-500">
                    Last updated: {claim.lastUpdated}
                  </span>
                </div>
              </>
            )}
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
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={newClaim.description || ''}
                onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
              />
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Attachments</h4>
                <FileUpload
                  onFilesSelected={(files) => {
                    const newAttachments: FileAttachment[] = Array.from(files).map(file => ({
                      id: Math.random().toString(36).substr(2, 9),
                      name: file.name,
                      type: file.type,
                      url: URL.createObjectURL(file),
                      dateAdded: new Date().toISOString().split('T')[0]
                    }));
                    setNewClaim({
                      ...newClaim,
                      attachments: [...(newClaim.attachments || []), ...newAttachments]
                    });
                  }}
                />
                {newClaim.attachments && newClaim.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {newClaim.attachments.map(file => (
                      <FilePreview
                        key={file.id}
                        file={file}
                        onDelete={(fileId) => {
                          setNewClaim({
                            ...newClaim,
                            attachments: newClaim.attachments!.filter(f => f.id !== fileId)
                          });
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
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
