import React from 'react';
import { Claim } from '@/types/claim';
import ClaimCard from '../ClaimCard';

type ClaimsListProps = {
  claims: Claim[];
  editingClaim: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Claim>) => void;
  onToggleFavorite: (id: string) => void;
  onFileUpload: (id: string, files: FileList) => void;
  onDeleteFile: (claimId: string, fileId: string) => void;
};

const ClaimsList = ({
  claims,
  editingClaim,
  onEdit,
  onDelete,
  onUpdate,
  onToggleFavorite,
  onFileUpload,
  onDeleteFile
}: ClaimsListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {claims.map((claim) => (
        <div key={claim.id} className="bg-white rounded-lg shadow-md p-5">
          <ClaimCard
            claim={claim}
            isEditing={editingClaim === claim.id}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggleFavorite={onToggleFavorite}
            onFileUpload={onFileUpload}
            onDeleteFile={onDeleteFile}
          />
        </div>
      ))}
    </div>
  );
};

export default ClaimsList;