export type FileAttachment = {
  id: string;
  name: string;
  type: string;
  url: string;
  dateAdded: string;
};

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
};