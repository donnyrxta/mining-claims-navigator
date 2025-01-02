import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';

type FileUploadProps = {
  onFilesSelected: (files: FileList) => void;
};

const FileUpload = ({ onFilesSelected }: FileUploadProps) => {
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
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.tif,.tiff"
      />
      <Button onClick={handleClick} variant="outline" className="w-full">
        <Upload className="mr-2 h-4 w-4" /> Upload Files
      </Button>
    </div>
  );
};

export default FileUpload;