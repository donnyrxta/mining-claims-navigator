import React from 'react';
import { FileText, Image, File, X } from 'lucide-react';
import { FileAttachment } from '../types/claim';

type FilePreviewProps = {
  file: FileAttachment;
  onDelete?: (id: string) => void;
};

const FilePreview = ({ file, onDelete }: FilePreviewProps) => {
  const isImage = file.type.startsWith('image/');
  
  const getFileIcon = () => {
    if (isImage) return <Image size={24} />;
    if (file.type.includes('pdf')) return <FileText size={24} />;
    return <File size={24} />;
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
      {getFileIcon()}
      <a 
        href={file.url} 
        download={file.name}
        className="flex-1 text-sm text-blue-600 hover:underline truncate"
      >
        {file.name}
      </a>
      {onDelete && (
        <button
          onClick={() => onDelete(file.id)}
          className="text-gray-500 hover:text-red-500"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default FilePreview;