import React from 'react';
import { Claim, ClaimStatus } from '@/types/claim';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ClaimAttachments from './ClaimAttachments';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type AddClaimFormProps = {
  onSubmit: (claim: Partial<Claim>) => void;
  onCancel: () => void;
  onFileUpload?: (files: FileList) => void;
};

const AddClaimForm = ({ onSubmit, onCancel, onFileUpload }: AddClaimFormProps) => {
  const { user } = useAuth();
  const [newClaim, setNewClaim] = React.useState<Partial<Claim>>({
    type: 'gold',
    potential: 'medium',
    status: 'available',
    contactPreference: 'phone',
    attachments: [],
    opportunityType: 'for_sale'
  });

  const handleSubmit = async () => {
    // For development purposes, use a default user ID if not authenticated
    const userId = user?.id || 'default-user-id';

    if (newClaim.id && newClaim.region && newClaim.type && newClaim.sellerName && newClaim.sellerPhone) {
      try {
        const { data, error } = await supabase
          .from('claims')
          .insert({
            ...newClaim,
            user_id: userId
          })
          .select()
          .single();

        if (error) throw error;

        onSubmit(data);
        toast.success('Claim added successfully');
      } catch (error) {
        console.error('Error adding claim:', error);
        toast.error('Failed to add claim');
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleFileUploadWrapper = (claimId: string, files: FileList) => {
    if (onFileUpload) {
      onFileUpload(files);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-semibold">Add New Claim</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="px-6 pb-6 max-h-[calc(90vh-8rem)]">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

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

            <ClaimAttachments
              attachments={newClaim.attachments || []}
              claimId={newClaim.id || ''}
              isEditing={true}
              onFileUpload={handleFileUploadWrapper}
              onDeleteFile={undefined}
            />
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 p-6 border-t">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Claim
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClaimForm;
