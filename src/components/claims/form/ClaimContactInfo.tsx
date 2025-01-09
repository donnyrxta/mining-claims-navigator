import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail } from 'lucide-react';
import { Claim } from '@/types/claim';

type ClaimContactInfoProps = {
  claim: Partial<Claim>;
  onChange: (updates: Partial<Claim>) => void;
};

const ClaimContactInfo = ({ claim, onChange }: ClaimContactInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-500" />
          Phone Number
        </label>
        <Input
          placeholder="Enter phone number"
          value={claim.sellerPhone || ''}
          onChange={(e) => onChange({ sellerPhone: e.target.value })}
          className="border-2 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-500" />
          Contact Preference
        </label>
        <Select
          value={claim.contactPreference}
          onValueChange={(value) => onChange({ contactPreference: value as 'email' | 'phone' })}
        >
          <SelectTrigger className="border-2 hover:border-blue-400 transition-all">
            <SelectValue placeholder="Select contact preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ClaimContactInfo;