export type FileAttachment = {
  id: string;
  name: string;
  type: string;
  url: string;
  dateAdded: string;
};

export type ClaimStatus = 'available' | 'under_negotiation' | 'sold';
export type ContactPreference = 'phone' | 'email' | 'in_person';
export type OpportunityType = 'for_sale' | 'seeking_joint_venture' | 'not_available';

export type Claim = {
  id: string;
  region: string;
  type: 'gold' | 'chrome';
  sellerName: string;
  sellerPhone: string;
  potential: 'high' | 'medium' | 'low';
  estimatedValue: string;
  description?: string;
  dateAdded: string;
  lastUpdated: string;
  attachments: FileAttachment[];
  status: ClaimStatus;
  resourceEstimate?: string;
  legalDetails?: string;
  accessibility?: string;
  environmentalInfo?: string;
  investmentHighlights?: string;
  contactPreference: ContactPreference;
  isFavorite?: boolean;
  notes?: string;
  opportunityType: OpportunityType;
  partnershipDetails?: string;
  askingPrice?: string;
  mineral?: string;
};