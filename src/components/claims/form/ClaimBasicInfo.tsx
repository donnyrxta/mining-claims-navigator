import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, User } from 'lucide-react';
import { Claim } from '@/types/claim';

type ClaimBasicInfoProps = {
  claim: Partial<Claim>;
  onChange: (updates: Partial<Claim>) => void;
};

const ClaimBasicInfo = ({ claim, onChange }: ClaimBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            Claim ID
          </label>
          <Input
            placeholder="Enter claim ID (required)"
            value={claim.id || ''}
            onChange={(e) => onChange({ id: e.target.value })}
            className="border-2 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Type</label>
          <Select
            value={claim.type}
            onValueChange={(value) => onChange({ type: value as 'gold' | 'chrome' })}
          >
            <SelectTrigger className="border-2 hover:border-blue-400 transition-all">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="chrome">Chrome</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            Region
          </label>
          <Input
            placeholder="Enter region (required)"
            value={claim.region || ''}
            onChange={(e) => onChange({ region: e.target.value })}
            className="border-2 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            Seller Name
          </label>
          <Input
            placeholder="Enter seller name (required)"
            value={claim.sellerName || ''}
            onChange={(e) => onChange({ sellerName: e.target.value })}
            className="border-2 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimBasicInfo;