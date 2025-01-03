import React from 'react';
import { Claim, ClaimStatus } from '@/types/claim';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

type AddClaimFormProps = {
  onSubmit: (claim: Partial<Claim>) => void;
  onCancel: () => void;
};

const AddClaimForm = ({ onSubmit, onCancel }: AddClaimFormProps) => {
  const [newClaim, setNewClaim] = React.useState<Partial<Claim>>({
    type: 'gold',
    potential: 'medium',
    status: 'available',
    contactPreference: 'phone',
    attachments: [],
    opportunityType: 'for_sale'
  });

  const handleSubmit = () => {
    if (newClaim.id && newClaim.region && newClaim.type && newClaim.sellerName && newClaim.sellerPhone) {
      onSubmit(newClaim);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Claim</h2>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4 px-4">
              <Input
                placeholder="Claim ID (e.g., G1, C1)"
                value={newClaim.id || ''}
                onChange={(e) => setNewClaim({ ...newClaim, id: e.target.value })}
              />
              <Select
                value={newClaim.type}
                onValueChange={(value) => setNewClaim({ ...newClaim, type: value as 'gold' | 'chrome' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="chrome">Chrome</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Region"
                value={newClaim.region || ''}
                onChange={(e) => setNewClaim({ ...newClaim, region: e.target.value })}
              />
              <Input
                placeholder="Seller Name"
                value={newClaim.sellerName || ''}
                onChange={(e) => setNewClaim({ ...newClaim, sellerName: e.target.value })}
              />
              <Input
                placeholder="Seller Phone"
                value={newClaim.sellerPhone || ''}
                onChange={(e) => setNewClaim({ ...newClaim, sellerPhone: e.target.value })}
              />
              <Input
                placeholder="Estimated Value"
                value={newClaim.estimatedValue || ''}
                onChange={(e) => setNewClaim({ ...newClaim, estimatedValue: e.target.value })}
              />
              <Select
                value={newClaim.potential}
                onValueChange={(value) => setNewClaim({ ...newClaim, potential: value as 'high' | 'medium' | 'low' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select potential" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Potential</SelectItem>
                  <SelectItem value="medium">Medium Potential</SelectItem>
                  <SelectItem value="low">Low Potential</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newClaim.status}
                onValueChange={(value) => setNewClaim({ ...newClaim, status: value as ClaimStatus })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="under_negotiation">Under Negotiation</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Resource Estimate"
                value={newClaim.resourceEstimate || ''}
                onChange={(e) => setNewClaim({ ...newClaim, resourceEstimate: e.target.value })}
              />
              <Input
                placeholder="Legal Details"
                value={newClaim.legalDetails || ''}
                onChange={(e) => setNewClaim({ ...newClaim, legalDetails: e.target.value })}
              />
              <Input
                placeholder="Accessibility"
                value={newClaim.accessibility || ''}
                onChange={(e) => setNewClaim({ ...newClaim, accessibility: e.target.value })}
              />
              <Textarea
                placeholder="Environmental Information"
                value={newClaim.environmentalInfo || ''}
                onChange={(e) => setNewClaim({ ...newClaim, environmentalInfo: e.target.value })}
              />
              <Textarea
                placeholder="Investment Highlights"
                value={newClaim.investmentHighlights || ''}
                onChange={(e) => setNewClaim({ ...newClaim, investmentHighlights: e.target.value })}
              />
              <Select
                value={newClaim.contactPreference}
                onValueChange={(value) => setNewClaim({ ...newClaim, contactPreference: value as Claim['contactPreference'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="in_person">In Person</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Description"
                value={newClaim.description || ''}
                onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
              />
            </div>
          </ScrollArea>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Claim
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClaimForm;