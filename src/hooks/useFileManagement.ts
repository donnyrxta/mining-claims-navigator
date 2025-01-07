import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { FileAttachment } from '@/types/claim';

export const useFileManagement = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList, claimId: string) => {
    setIsUploading(true);
    
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        toast({
          title: "Error",
          description: "You must be logged in to upload files",
          variant: "destructive",
        });
        return;
      }

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${claimId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('claim-attachments')
          .upload(filePath, file);

        if (uploadError) {
          toast({
            title: "Error",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          });
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('claim-attachments')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('claim_attachments')
          .insert({
            claim_id: claimId,
            file_name: file.name,
            file_type: file.type,
            file_url: publicUrl,
            user_id: user.data.user.id,
          });

        if (dbError) {
          toast({
            title: "Error",
            description: `Failed to save ${file.name} metadata`,
            variant: "destructive",
          });
          continue;
        }

        toast({
          title: "Success",
          description: `${file.name} uploaded successfully`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (claimId: string, fileId: string) => {
    try {
      const { error } = await supabase
        .from('claim_attachments')
        .delete()
        .eq('id', fileId)
        .eq('claim_id', claimId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete file",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  return {
    isUploading,
    handleFileUpload,
    handleDeleteFile
  };
};