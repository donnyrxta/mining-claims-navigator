import React from 'react';
import { Claim } from '@/types/claim';
import ClaimHeader from './claims/ClaimHeader';
import ClaimDetails from './claims/ClaimDetails';
import ClaimAttachments from './claims/ClaimAttachments';
import ClaimOpportunity from './claims/ClaimOpportunity';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-4">
            <input
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={claim.sellerName}
              onChange={(e) => onUpdate(claim.id, { sellerName: e.target.value })}
              placeholder="Seller Name"
            />
            <input
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={claim.sellerPhone}
              onChange={(e) => onUpdate(claim.id, { sellerPhone: e.target.value })}
              placeholder="Phone Number"
            />
            <input
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={claim.estimatedValue}
              onChange={(e) => onUpdate(claim.id, { estimatedValue: e.target.value })}
              placeholder="Estimated Value"
            />
            <select
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={claim.status}
              onChange={(e) => onUpdate(claim.id, { status: e.target.value as Claim['status'] })}
            >
              <option value="available">Available</option>
              <option value="under_negotiation">Under Negotiation</option>
              <option value="sold">Sold</option>
            </select>
            <textarea
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Resource Estimate"
              value={claim.resourceEstimate || ''}
              onChange={(e) => onUpdate(claim.id, { resourceEstimate: e.target.value })}
            />
            <textarea
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Legal Details"
              value={claim.legalDetails || ''}
              onChange={(e) => onUpdate(claim.id, { legalDetails: e.target.value })}
            />
            <textarea
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Accessibility"
              value={claim.accessibility || ''}
              onChange={(e) => onUpdate(claim.id, { accessibility: e.target.value })}
            />
            <textarea
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Environmental Information"
              value={claim.environmentalInfo || ''}
              onChange={(e) => onUpdate(claim.id, { environmentalInfo: e.target.value })}
            />
            <textarea
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Investment Highlights"
              value={claim.investmentHighlights || ''}
              onChange={(e) => onUpdate(claim.id, { investmentHighlights: e.target.value })}
            />
            <select
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={claim.opportunityType}
              onChange={(e) => onUpdate(claim.id, { opportunityType: e.target.value as Claim['opportunityType'] })}
            >
              <option value="for_sale">For Sale</option>
              <option value="seeking_joint_venture">Seeking Joint Venture</option>
              <option value="not_available">Not Available</option>
            </select>
            <input
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Asking Price"
              value={claim.askingPrice || ''}
              onChange={(e) => onUpdate(claim.id, { askingPrice: e.target.value })}
            />
            <textarea
              className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Partnership Details"
              value={claim.partnershipDetails || ''}
              onChange={(e) => onUpdate(claim.id, { partnershipDetails: e.target.value })}
            />
          </div>
          
          <ClaimAttachments
            attachments={claim.attachments}
            claimId={claim.id}
            isEditing={true}
            onFileUpload={onFileUpload}
            onDeleteFile={onDeleteFile}
          />
          
          <button
            onClick={() => onEdit(claim.id)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <ClaimHeader
          id={claim.id}
          type={claim.type}
          isFavorite={claim.isFavorite || false}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <ClaimDetails claim={claim} />
        <ClaimAttachments
          attachments={claim.attachments}
          claimId={claim.id}
        />
        {claim.notes && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Notes</h4>
            <p className="text-sm text-blue-800">{claim.notes}</p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
            claim.potential === 'high' ? 'bg-green-100 text-green-800' :
            claim.potential === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {claim.potential}
          </span>
          <span className="text-sm text-gray-500">
            Last updated: {claim.lastUpdated}
          </span>
        </div>
        <ClaimOpportunity
          opportunityType={claim.opportunityType}
          askingPrice={claim.askingPrice}
          partnershipDetails={claim.partnershipDetails}
        />
      </CardContent>
    </Card>
  );
};

export default ClaimCard;