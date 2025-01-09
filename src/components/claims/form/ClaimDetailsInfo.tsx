import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Book, Trees, TrendingUp } from 'lucide-react';
import { Claim } from '@/types/claim';

type ClaimDetailsInfoProps = {
  claim: Partial<Claim>;
  onChange: (updates: Partial<Claim>) => void;
};

const ClaimDetailsInfo = ({ claim, onChange }: ClaimDetailsInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Book className="w-4 h-4 text-blue-500" />
          Legal Details
        </label>
        <Textarea
          placeholder="Enter legal details"
          value={claim.legalDetails || ''}
          onChange={(e) => onChange({ legalDetails: e.target.value })}
          className="min-h-[100px] border-2 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Trees className="w-4 h-4 text-blue-500" />
          Environmental Information
        </label>
        <Textarea
          placeholder="Enter environmental details"
          value={claim.environmentalInfo || ''}
          onChange={(e) => onChange({ environmentalInfo: e.target.value })}
          className="min-h-[100px] border-2 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          Investment Highlights
        </label>
        <Textarea
          placeholder="Enter investment highlights"
          value={claim.investmentHighlights || ''}
          onChange={(e) => onChange({ investmentHighlights: e.target.value })}
          className="min-h-[100px] border-2 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </div>
  );
};

export default ClaimDetailsInfo;