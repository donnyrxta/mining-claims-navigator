import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import { toast } from 'sonner';

type Claim = Database['public']['Tables']['claims']['Row'];
type ClaimInsert = Database['public']['Tables']['claims']['Insert'];
type ClaimUpdate = Database['public']['Tables']['claims']['Update'];

export function useClaims() {
  const queryClient = useQueryClient();

  const { data: claims, isLoading } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const addClaim = useMutation({
    mutationFn: async (newClaim: ClaimInsert) => {
      const { data, error } = await supabase
        .from('claims')
        .insert(newClaim)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success('Claim added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add claim: ' + error.message);
    },
  });

  const updateClaim = useMutation({
    mutationFn: async ({ id, ...updates }: ClaimUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('claims')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success('Claim updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update claim: ' + error.message);
    },
  });

  const deleteClaim = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('claims')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success('Claim deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete claim: ' + error.message);
    },
  });

  return {
    claims,
    isLoading,
    addClaim,
    updateClaim,
    deleteClaim,
  };
}