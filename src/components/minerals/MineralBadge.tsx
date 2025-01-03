import React from 'react';
import { Badge } from "@/components/ui/badge";
import { MineralType } from '@/types/minerals';

const mineralColors: Record<MineralType, { bg: string; text: string }> = {
  gold: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  chrome: { bg: 'bg-gray-100', text: 'text-gray-800' },
  platinum: { bg: 'bg-blue-100', text: 'text-blue-800' },
  diamond: { bg: 'bg-purple-100', text: 'text-purple-800' },
  copper: { bg: 'bg-orange-100', text: 'text-orange-800' },
  nickel: { bg: 'bg-green-100', text: 'text-green-800' },
  lithium: { bg: 'bg-pink-100', text: 'text-pink-800' },
  coal: { bg: 'bg-slate-100', text: 'text-slate-800' },
  iron_ore: { bg: 'bg-red-100', text: 'text-red-800' },
  tantalite: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  other: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

type MineralBadgeProps = {
  mineral: MineralType;
  grade?: string | null;
};

const MineralBadge = ({ mineral, grade }: MineralBadgeProps) => {
  const { bg, text } = mineralColors[mineral];
  
  return (
    <Badge variant="outline" className={`${bg} ${text} border-0`}>
      {mineral.replace('_', ' ')} {grade && `(${grade})`}
    </Badge>
  );
};

export default MineralBadge;