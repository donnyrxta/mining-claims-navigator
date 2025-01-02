import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import { toast } from 'sonner';

type ClaimAttachment = Database['public']['Tables']['claim_attachments']['Row'];

export function useAttachments(claimId: string) {
  const queryClient = useQueryClient();

  const { data: attachments, isLoading } = useQuery({
    queryKey: ['attachments', claimId],
    queryFn: async () => {
      if (!supabase) {
        return [];
      }

      const { data, error } = await supabase
        .from('claim_attachments')
        .select('*')
        .eq('claim_id', claimId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const uploadFile = useMutation({
    mutationFn: async ({ file, userId }: { file: File; userId: string }) => {
      if (!supabase) {
        throw new Error('Supabase is not configured');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${claimId}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('claim-attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('claim-attachments')
        .getPublicUrl(filePath);

      // Create attachment record
      const { data, error: dbError } = await supabase
        .from('claim_attachments')
        .insert({
          claim_id: claimId,
          file_name: file.name,
          file_type: file.type,
          file_url: publicUrl,
          user_id: userId,
        })
        .select()
        .single();

      if (dbError) throw dbError;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attachments', claimId] });
      toast.success('File uploaded successfully');
    },
    onError: (error) => {
      toast.error('Failed to upload file: ' + error.message);
    },
  });

  const deleteFile = useMutation({
    mutationFn: async (attachment: ClaimAttachment) => {
      if (!supabase) {
        throw new Error('Supabase is not configured');
      }

      // Delete from storage
      const filePath = attachment.file_url.split('/').pop();
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from('claim-attachments')
          .remove([`${claimId}/${filePath}`]);

        if (storageError) throw storageError;
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('claim_attachments')
        .delete()
        .eq('id', attachment.id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attachments', claimId] });
      toast.success('File deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete file: ' + error.message);
    },
  });

  return {
    attachments,
    isLoading,
    uploadFile,
    deleteFile,
  };
}