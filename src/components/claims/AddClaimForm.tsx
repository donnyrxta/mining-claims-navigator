import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from '@/lib/supabase';
import { Claim } from '@/types/claim';
import ClaimAttachments from './ClaimAttachments';
import { MapPin, User, Phone, DollarSign, Scale, Book, Trees, TrendingUp, Mail, Clock, Handshake } from 'lucide-react';

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

  const handleFileUploadWrapper = (files: FileList) => {
    if (onFileUpload && newClaim.id) {
      onFileUpload(newClaim.id, files);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  Claim ID
                </label>
                <Input
                  placeholder="Enter claim ID (required)"
                  value={newClaim.id || ''}
                  onChange={(e) => setNewClaim({ ...newClaim, id: e.target.value })}
                  className="border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <Select
                  value={newClaim.type}
                  onValueChange={(value) => setNewClaim({ ...newClaim, type: value as 'gold' | 'chrome' })}
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
                  value={newClaim.region || ''}
                  onChange={(e) => setNewClaim({ ...newClaim, region: e.target.value })}
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
                  value={newClaim.sellerName || ''}
                  onChange={(e) => setNewClaim({ ...newClaim, sellerName: e.target.value })}
                  className="border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  Phone Number
                </label>
                <Input
                  placeholder="Enter phone number"
                  value={newClaim.sellerPhone || ''}
                  onChange={(e) => setNewClaim({ ...newClaim, sellerPhone: e.target.value })}
                  className="border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  Estimated Value
                </label>
                <Input
                  placeholder="Enter estimated value"
                  value={newClaim.estimatedValue || ''}
                  onChange={(e) => setNewClaim({ ...newClaim, estimatedValue: e.target.value })}
                  className="border-2 focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-500" />
                Resource Estimate
              </label>
              <Textarea
                placeholder="Enter resource estimate details"
                value={newClaim.resourceEstimate || ''}
                onChange={(e) => setNewClaim({ ...newClaim, resourceEstimate: e.target.value })}
                className="min-h-[100px] border-2 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Book className="w-4 h-4 text-blue-500" />
                Legal Details
              </label>
              <Textarea
                placeholder="Enter legal details"
                value={newClaim.legalDetails || ''}
                onChange={(e) => setNewClaim({ ...newClaim, legalDetails: e.target.value })}
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
                value={newClaim.environmentalInfo || ''}
                onChange={(e) => setNewClaim({ ...newClaim, environmentalInfo: e.target.value })}
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
                value={newClaim.investmentHighlights || ''}
                onChange={(e) => setNewClaim({ ...newClaim, investmentHighlights: e.target.value })}
                className="min-h-[100px] border-2 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Contact Preference
                </label>
                <Select
                  value={newClaim.contactPreference}
                  onValueChange={(value) => setNewClaim({ ...newClaim, contactPreference: value as 'email' | 'phone' })}
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-blue-500" />
                  Opportunity Type
                </label>
                <Select
                  value={newClaim.opportunityType}
                  onValueChange={(value) => setNewClaim({ ...newClaim, opportunityType: value as 'for_sale' | 'seeking_joint_venture' | 'not_available' })}
                >
                  <SelectTrigger className="border-2 hover:border-blue-400 transition-all">
                    <SelectValue placeholder="Select opportunity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for_sale">For Sale</SelectItem>
                    <SelectItem value="seeking_joint_venture">Seeking Joint Venture</SelectItem>
                    <SelectItem value="not_available">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Attachments
              </label>
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
