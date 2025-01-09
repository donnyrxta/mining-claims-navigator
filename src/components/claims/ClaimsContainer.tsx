import React from 'react';
import { Claim } from '@/types/claim';
import ClaimsList from './ClaimsList';
import AddClaimForm from './AddClaimForm';

type ClaimsContainerProps = {
  claims: Claim[];
  showAddForm: boolean;
  editingClaim: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Claim>) => void;
  onToggleFavorite: (id: string) => void;
  onFileUpload: (id: string, files: FileList) => void;
  onDeleteFile: (claimId: string, fileId: string) => void;
  onAddClaim: (claim: Partial<Claim>) => void;
  onCancelAdd: () => void;
};

const ClaimsContainer = ({
  claims,
  showAddForm,
  editingClaim,
  onEdit,
  onDelete,
  onUpdate,
  onToggleFavorite,
  onFileUpload,
  onDeleteFile,
  onAddClaim,
  onCancelAdd,
}: ClaimsContainerProps) => {
  return (
    <>
      <ClaimsList
        claims={claims}
        editingClaim={editingClaim}
        onEdit={onEdit}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onToggleFavorite={onToggleFavorite}
        onFileUpload={onFileUpload}
        onDeleteFile={onDeleteFile}
      />

      {showAddForm && (
        <AddClaimForm
          onSubmit={onAddClaim}
          onCancel={onCancelAdd}
          onFileUpload={(files: FileList) => {
            if (files.length > 0) {
              const tempId = `temp-${Date.now()}`;
              onFileUpload(tempId, files);
            }
          }}
        />
      )}
    </>
  );
};

export default ClaimsContainer;