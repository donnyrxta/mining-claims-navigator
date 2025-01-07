import React from 'react';
import { Edit2, X, Star } from 'lucide-react';

type ClaimHeaderProps = {
  id: string;
  type: string;
  isFavorite: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

const ClaimHeader = ({ 
  id, 
  type, 
  isFavorite, 
  onEdit, 
  onDelete, 
  onToggleFavorite 
}: ClaimHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-xl font-semibold text-gray-800">
        {type.charAt(0).toUpperCase() + type.slice(1)} Claim ({id})
      </h3>
      <div className="flex gap-2">
        <button
          onClick={() => onToggleFavorite(id)}
          className={`text-gray-600 hover:text-yellow-500 ${isFavorite ? 'text-yellow-500' : ''}`}
        >
          <Star size={16} />
        </button>
        <button
          onClick={() => onEdit(id)}
          className="text-gray-600 hover:text-blue-600"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-600 hover:text-red-600"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ClaimHeader;