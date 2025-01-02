import React from 'react';
import { Edit2, X, Star, MessageCircle, Download } from 'lucide-react';
import { Claim, FileAttachment, OpportunityType } from '@/types/claim';
import FilePreview from './FilePreview';
import FileUpload from './FileUpload';

type ClaimCardProps = {
  claim: Claim;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Claim>) => void;
  onToggleFavorite: (id: string) => void;
  onFileUpload: (id: string, files: FileList) => void;
  onDeleteFile: (claimId: string, fileId: string) => void;
};

const ClaimCard = ({
  claim,
  isEditing,
  onEdit,
  onDelete,
  onUpdate,
  onToggleFavorite,
  onFileUpload,
  onDeleteFile
}: ClaimCardProps) => {
  const formatOpportunityType = (type: OpportunityType) => {
    return type ? type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          value={claim.sellerName}
          onChange={(e) => onUpdate(claim.id, { sellerName: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          value={claim.sellerPhone}
          onChange={(e) => onUpdate(claim.id, { sellerPhone: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          value={claim.estimatedValue}
          onChange={(e) => onUpdate(claim.id, { estimatedValue: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={claim.status}
          onChange={(e) => onUpdate(claim.id, { status: e.target.value as Claim['status'] })}
        >
          <option value="available">Available</option>
          <option value="under_negotiation">Under Negotiation</option>
          <option value="sold">Sold</option>
        </select>
        <input
          className="w-full p-2 border rounded"
          placeholder="Resource Estimate"
          value={claim.resourceEstimate || ''}
          onChange={(e) => onUpdate(claim.id, { resourceEstimate: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Legal Details"
          value={claim.legalDetails || ''}
          onChange={(e) => onUpdate(claim.id, { legalDetails: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Accessibility"
          value={claim.accessibility || ''}
          onChange={(e) => onUpdate(claim.id, { accessibility: e.target.value })}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Environmental Information"
          value={claim.environmentalInfo || ''}
          onChange={(e) => onUpdate(claim.id, { environmentalInfo: e.target.value })}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Investment Highlights"
          value={claim.investmentHighlights || ''}
          onChange={(e) => onUpdate(claim.id, { investmentHighlights: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={claim.contactPreference}
          onChange={(e) => onUpdate(claim.id, { contactPreference: e.target.value as Claim['contactPreference'] })}
        >
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="in_person">In Person</option>
        </select>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Notes"
          value={claim.notes || ''}
          onChange={(e) => onUpdate(claim.id, { notes: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={claim.opportunityType}
          onChange={(e) => onUpdate(claim.id, { opportunityType: e.target.value as OpportunityType })}
        >
          <option value="for_sale">For Sale</option>
          <option value="seeking_joint_venture">Seeking Joint Venture</option>
          <option value="not_available">Not Available</option>
        </select>
        <input
          className="w-full p-2 border rounded"
          placeholder="Asking Price"
          value={claim.askingPrice || ''}
          onChange={(e) => onUpdate(claim.id, { askingPrice: e.target.value })}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Partnership Details"
          value={claim.partnershipDetails || ''}
          onChange={(e) => onUpdate(claim.id, { partnershipDetails: e.target.value })}
        />
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Attachments</h4>
          <FileUpload onFilesSelected={(files) => onFileUpload(claim.id, files)} />
          <div className="mt-2 space-y-2">
            {claim.attachments.map(file => (
              <FilePreview
                key={file.id}
                file={file}
                onDelete={(fileId) => onDeleteFile(claim.id, fileId)}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => onEdit(claim.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {claim.type.charAt(0).toUpperCase() + claim.type.slice(1)} Claim ({claim.id})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleFavorite(claim.id)}
            className={`text-gray-600 hover:text-yellow-500 ${claim.isFavorite ? 'text-yellow-500' : ''}`}
          >
            <Star size={16} />
          </button>
          <button
            onClick={() => onEdit(claim.id)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(claim.id)}
            className="text-gray-600 hover:text-red-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-1">Region: {claim.region}</p>
      <p className="text-gray-600 mb-1">Status: {claim.status}</p>
      <p className="text-gray-600 mb-1">
        Seller: <a href={`tel:${claim.sellerPhone}`} className="text-blue-600 hover:underline">
          {claim.sellerName}
        </a>
      </p>
      <p className="text-gray-600 mb-1">Estimated Value: {claim.estimatedValue}</p>
      <p className="text-gray-600 mb-1">Resource Estimate: {claim.resourceEstimate}</p>
      <p className="text-gray-600 mb-1">Legal Details: {claim.legalDetails}</p>
      <p className="text-gray-600 mb-1">Accessibility: {claim.accessibility}</p>
      <p className="text-gray-600 mb-1">Environmental Info: {claim.environmentalInfo}</p>
      <p className="text-gray-600 mb-2">Investment Highlights: {claim.investmentHighlights}</p>
      
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

      {claim.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h4 className="text-sm font-semibold mb-1">Notes</h4>
          <p className="text-sm text-gray-600">{claim.notes}</p>
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
      <div className="mb-4 p-3 bg-blue-50 rounded-md">
        <h4 className="text-sm font-semibold mb-1">Opportunity</h4>
        <p className="text-sm text-gray-600">
          Type: {formatOpportunityType(claim.opportunityType)}
        </p>
        {claim.askingPrice && (
          <p className="text-sm text-gray-600">Asking Price: {claim.askingPrice}</p>
        )}
        {claim.partnershipDetails && (
          <p className="text-sm text-gray-600">Partnership Details: {claim.partnershipDetails}</p>
        )}
      </div>
    </>
  );
};

export default ClaimCard;
