import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MineralType } from '@/types/minerals';
import { Badge } from "@/components/ui/badge";

type MineralsManagerProps = {
  minerals: Array<{
    id: string;
    mineral: MineralType;
    grade?: string | null;
  }>;
  onAddMineral: (mineral: MineralType, grade?: string) => void;
  onRemoveMineral: (id: string) => void;
};

const MineralsManager = ({ minerals, onAddMineral, onRemoveMineral }: MineralsManagerProps) => {
  const [selectedMineral, setSelectedMineral] = React.useState<MineralType>('gold');
  const [grade, setGrade] = React.useState('');

  const handleAdd = () => {
    onAddMineral(selectedMineral, grade);
    setGrade('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {minerals.map((m) => (
          <Badge key={m.id} variant="secondary" className="flex items-center gap-2">
            {m.mineral} {m.grade && `(${m.grade})`}
            <button
              onClick={() => onRemoveMineral(m.id)}
              className="hover:text-red-500"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Select
          value={selectedMineral}
          onValueChange={(value) => setSelectedMineral(value as MineralType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select mineral" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="chrome">Chrome</SelectItem>
            <SelectItem value="platinum">Platinum</SelectItem>
            <SelectItem value="diamond">Diamond</SelectItem>
            <SelectItem value="copper">Copper</SelectItem>
            <SelectItem value="nickel">Nickel</SelectItem>
            <SelectItem value="lithium">Lithium</SelectItem>
            <SelectItem value="coal">Coal</SelectItem>
            <SelectItem value="iron_ore">Iron Ore</SelectItem>
            <SelectItem value="tantalite">Tantalite</SelectItem>
            <SelectItem value="emerald">Emerald</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        
        <Input
          placeholder="Grade (optional)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-[150px]"
        />
        
        <Button onClick={handleAdd} size="icon">
          <Plus size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MineralsManager;