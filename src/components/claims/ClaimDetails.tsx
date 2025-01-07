import React from 'react';
import { Claim } from '@/types/claim';

type ClaimDetailsProps = {
  claim: Claim;
};

const ClaimDetails = ({ claim }: ClaimDetailsProps) => {
  return (
    <div className="space-y-1">
      <p className="text-gray-600">Region: {claim.region}</p>
      <p className="text-gray-600">Status: {claim.status}</p>
      <p className="text-gray-600">
        Seller: <a href={`tel:${claim.sellerPhone}`} className="text-blue-600 hover:underline">
          {claim.sellerName}
        </a>
      </p>
      <p className="text-gray-600">Estimated Value: {claim.estimatedValue}</p>
      <p className="text-gray-600">Resource Estimate: {claim.resourceEstimate}</p>
      <p className="text-gray-600">Legal Details: {claim.legalDetails}</p>
      <p className="text-gray-600">Accessibility: {claim.accessibility}</p>
      <p className="text-gray-600">Environmental Info: {claim.environmentalInfo}</p>
      <p className="text-gray-600">Investment Highlights: {claim.investmentHighlights}</p>
    </div>
  );
};

export default ClaimDetails;