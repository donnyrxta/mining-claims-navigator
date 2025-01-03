import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { ClaimMineral, MineralType } from '@/types/minerals';
import { toast } from 'sonner';

export function useMinerals(claimId?: string) {
  const queryClient = useQueryClient();

  const { data: minerals = [], isLoading } = useQuery({
    queryKey: ['minerals', claimId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('claim_minerals')
        .select('*')
        .eq('claim_id', claimId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ClaimMineral[];
    },
    enabled: !!claimId,
  });

  const addMineral = useMutation({
    mutationFn: async ({ claimId, mineral, grade, notes }: {
      claimId: string;
      mineral: MineralType;
      grade?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase
        .from('claim_minerals')
        .insert({
          claim_id: claimId,
          mineral,
          grade,
          notes,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['minerals'] });
      toast.success('Mineral added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add mineral: ' + error.message);
    },
  });

  const removeMineral = useMutation({
    mutationFn: async (mineralId: string) => {
      const { error } = await supabase
        .from('claim_minerals')
        .delete()
        .eq('id', mineralId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['minerals'] });
      toast.success('Mineral removed successfully');
    },
    onError: (error) => {
      toast.error('Failed to remove mineral: ' + error.message);
    },
  });

  return {
    minerals,
    isLoading,
    addMineral,
    removeMineral,
  };
}