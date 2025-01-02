import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';

type FileUploadProps = {
  onFilesSelected: (files: FileList) => void;
};

const FileUpload = ({ onFilesSelected }: FileUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.tif"
      />
      <label htmlFor="file-upload">
        <Button variant="outline" className="cursor-pointer" asChild>
          <span>
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </span>
        </Button>
      </label>
    </div>
  );
};

export default FileUpload;