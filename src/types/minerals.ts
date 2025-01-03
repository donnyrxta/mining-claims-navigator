export type MineralType = 
  | 'gold'
  | 'chrome'
  | 'platinum'
  | 'diamond'
  | 'copper'
  | 'nickel'
  | 'lithium'
  | 'coal'
  | 'iron_ore'
  | 'tantalite'
  | 'emerald'
  | 'other';

export type ClaimMineral = {
  id: string;
  claim_id: string;
  mineral: MineralType;
  grade?: string | null;
  notes?: string | null;
  created_at: string;
};