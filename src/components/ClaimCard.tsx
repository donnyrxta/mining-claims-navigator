import React from 'react';
import { Claim } from '@/types/claim';
import ClaimHeader from './claims/ClaimHeader';
import ClaimDetails from './claims/ClaimDetails';
import ClaimAttachments from './claims/ClaimAttachments';
import ClaimOpportunity from './claims/ClaimOpportunity';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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
          value={claim.opportunityType}
          onChange={(e) => onUpdate(claim.id, { opportunityType: e.target.value as Claim['opportunityType'] })}
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
        <ClaimAttachments
          attachments={claim.attachments}
          claimId={claim.id}
          isEditing={true}
          onFileUpload={onFileUpload}
          onDeleteFile={onDeleteFile}
        />
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
      <ClaimHeader
        id={claim.id}
        type={claim.type}
        isFavorite={claim.isFavorite || false}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
      />
      <ClaimDetails claim={claim} />
      <ClaimAttachments
        attachments={claim.attachments}
        claimId={claim.id}
      />
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
      <ClaimOpportunity
        opportunityType={claim.opportunityType}
        askingPrice={claim.askingPrice}
        partnershipDetails={claim.partnershipDetails}
      />
    </>
  );
};

export default ClaimCard;