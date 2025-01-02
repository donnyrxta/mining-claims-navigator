import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.tif,.tiff";

type FileUploadProps = {
  onFilesSelected: (files: FileList) => void;
  multiple?: boolean;
};

const FileUpload = ({ onFilesSelected, multiple = true }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        multiple={multiple}
        accept={ACCEPTED_FILE_TYPES}
        className="hidden"
      />
      <Upload className="mx-auto mb-2" size={24} />
      <p className="text-sm text-gray-600">
        Click to upload files or drag and drop
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, TIF
      </p>
    </div>
  );
};

export default FileUpload;