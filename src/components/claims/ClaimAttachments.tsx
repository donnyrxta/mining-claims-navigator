import React from 'react';
import { FileAttachment } from '@/types/claim';
import FilePreview from '../FilePreview';
import FileUpload from '../FileUpload';

type ClaimAttachmentsProps = {
  attachments: FileAttachment[];
  claimId: string;
  isEditing?: boolean;
  onFileUpload?: (claimId: string, files: FileList) => void;
  onDeleteFile?: (claimId: string, fileId: string) => void;
};

const ClaimAttachments = ({
  attachments,
  claimId,
  isEditing,
  onFileUpload,
  onDeleteFile
}: ClaimAttachmentsProps) => {
  if (attachments.length === 0 && !isEditing) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-2">
        Attachments {attachments.length > 0 && `(${attachments.length})`}
      </h4>
      {isEditing && onFileUpload && (
        <FileUpload onFilesSelected={(files) => onFileUpload(claimId, files)} />
      )}
      <div className="mt-2 space-y-2">
        {attachments.map(file => (
          <FilePreview
            key={file.id}
            file={file}
            onDelete={onDeleteFile ? (fileId) => onDeleteFile(claimId, fileId) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimAttachments;