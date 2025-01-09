import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from '@/lib/supabase';
import { Claim } from '@/types/claim';
import ClaimAttachments from './ClaimAttachments';
import ClaimBasicInfo from './form/ClaimBasicInfo';
import ClaimContactInfo from './form/ClaimContactInfo';
import ClaimDetailsInfo from './form/ClaimDetailsInfo';

type AddClaimFormProps = {
  onSubmit: (claim: Partial<Claim>) => void;
  onCancel: () => void;
  onFileUpload?: (claimId: string, files: FileList) => void;
};

const AddClaimForm = ({ onSubmit, onCancel, onFileUpload }: AddClaimFormProps) => {
  const [newClaim, setNewClaim] = useState<Partial<Claim>>({
    type: 'gold',
    status: 'available',
    opportunityType: 'for_sale'
  });

  const handleSubmit = async () => {
    try {
      const userId = 'default-user-id'; // For development
      
      const { data, error } = await supabase
        .from('claims')
        .insert({
          ...newClaim,
          user_id: userId,
          created_at: new Date().toISOString(),
          asking_price: newClaim.askingPrice,
          seller_name: newClaim.sellerName,
          seller_phone: newClaim.sellerPhone,
          estimated_value: newClaim.estimatedValue,
          resource_estimate: newClaim.resourceEstimate,
          legal_details: newClaim.legalDetails,
          environmental_info: newClaim.environmentalInfo,
          investment_highlights: newClaim.investmentHighlights,
          contact_preference: newClaim.contactPreference,
          partnership_details: newClaim.partnershipDetails,
          is_favorite: false
        })
        .select()
        .single();

      if (error) throw error;
      
      onSubmit(data);
      toast.success("Claim added successfully!");
    } catch (error) {
      console.error('Error adding claim:', error);
      toast.error("Failed to add claim. Please try again.");
    }
  };

  const handleChange = (updates: Partial<Claim>) => {
    setNewClaim(prev => ({ ...prev, ...updates }));
  };

  const handleFileUploadWrapper = (claimId: string, files: FileList) => {
    if (onFileUpload) {
      onFileUpload(claimId, files);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 bg-gradient-to-br from-white to-blue-50">
        <DialogHeader className="px-6 pt-6 border-b">
          <DialogTitle className="text-2xl font-bold text-blue-900">Add New Mining Claim</DialogTitle>
          <p className="text-gray-600 mt-1">Fill in the details below to register a new mining claim</p>
        </DialogHeader>
        
        <ScrollArea className="px-6 pb-6 max-h-[calc(90vh-8rem)]">
          <div className="space-y-6 py-4">
            <ClaimBasicInfo claim={newClaim} onChange={handleChange} />
            <ClaimContactInfo claim={newClaim} onChange={handleChange} />
            <ClaimDetailsInfo claim={newClaim} onChange={handleChange} />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Attachments</label>
              <ClaimAttachments
                attachments={[]}
                claimId={newClaim.id || ''}
                isEditing={true}
                onFileUpload={handleFileUploadWrapper}
                onDeleteFile={undefined}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-4 p-4 border-t bg-gray-50">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Add Claim
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClaimForm;