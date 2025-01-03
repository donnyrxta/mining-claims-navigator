import React from 'react';
import { ClaimMineral } from '@/types/minerals';
import MineralBadge from './MineralBadge';

type MineralsListProps = {
  minerals: ClaimMineral[];
};

const MineralsList = ({ minerals }: MineralsListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {minerals.map((mineral) => (
        <MineralBadge
          key={mineral.id}
          mineral={mineral.mineral}
          grade={mineral.grade}
        />
      ))}
    </div>
  );
};

export default MineralsList;