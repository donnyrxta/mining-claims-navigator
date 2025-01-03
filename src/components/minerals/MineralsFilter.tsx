import React from 'react';
import { MineralType } from '@/types/minerals';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MineralsFilterProps = {
  selectedMineral: MineralType | 'all';
  onMineralChange: (mineral: MineralType | 'all') => void;
};

const minerals: MineralType[] = [
  'gold',
  'chrome',
  'platinum',
  'diamond',
  'copper',
  'nickel',
  'lithium',
  'coal',
  'iron_ore',
  'tantalite',
  'emerald',
  'other'
];

const MineralsFilter = ({ selectedMineral, onMineralChange }: MineralsFilterProps) => {
  return (
    <Select
      value={selectedMineral}
      onValueChange={(value) => onMineralChange(value as MineralType | 'all')}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by mineral" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Minerals</SelectItem>
        {minerals.map((mineral) => (
          <SelectItem key={mineral} value={mineral}>
            {mineral.replace('_', ' ')}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MineralsFilter;