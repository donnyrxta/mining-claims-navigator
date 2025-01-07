import React from 'react';
import { Claim, OpportunityType } from '@/types/claim';

type ClaimOpportunityProps = {
  opportunityType: OpportunityType;
  askingPrice?: string;
  partnershipDetails?: string;
};

const ClaimOpportunity = ({ 
  opportunityType, 
  askingPrice, 
  partnershipDetails 
}: ClaimOpportunityProps) => {
  const formatOpportunityType = (type: OpportunityType) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-md">
      <h4 className="text-sm font-semibold mb-1">Opportunity</h4>
      <p className="text-sm text-gray-600">
        Type: {formatOpportunityType(opportunityType)}
      </p>
      {askingPrice && (
        <p className="text-sm text-gray-600">Asking Price: {askingPrice}</p>
      )}
      {partnershipDetails && (
        <p className="text-sm text-gray-600">Partnership Details: {partnershipDetails}</p>
      )}
    </div>
  );
};

export default ClaimOpportunity;