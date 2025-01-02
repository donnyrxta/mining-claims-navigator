import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import { toast } from 'sonner';

export function useSupabaseStatus() {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);
    
    if (!configured) {
      toast.error(
        'Supabase configuration is missing. Please connect to Supabase in the Lovable interface.',
        {
          duration: 5000,
        }
      );
    }
  }, []);

  return { isConfigured };
}