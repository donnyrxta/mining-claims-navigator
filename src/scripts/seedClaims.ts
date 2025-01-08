import { supabase } from '@/lib/supabase';

const claims = [
  {
    id: 'G1',
    region: 'Rusape Headlands',
    type: 'gold',
    sellerName: 'Contact Agent',
    sellerPhone: '+263 77 295 3982',
    potential: 'high',
    estimatedValue: 'Contact for details',
    description: '440ha, 15 km from Inyathi Mine Copper and Gold mine. Place with good and visible outcrops for mineral identification and requiring further exploration. We share the same dolerite with Inyathi mine. Ideal for big project.',
    status: 'available',
    opportunityType: 'seeking_joint_venture',
    partnershipDetails: 'Security deposit plus a 70/30 share split',
    user_id: 'default-user-id'
  },
  {
    id: 'C1',
    region: 'Zvishavane',
    type: 'chrome',
    sellerName: 'Contact Agent',
    sellerPhone: '+263 78 204 0231',
    potential: 'high',
    estimatedValue: '375,000 USD',
    description: 'CHROME ALLUVIALS/SOILS/FINES MINE. 150 HECTARES. 48% PLUS. ROADS ACCESSIBLE',
    status: 'available',
    opportunityType: 'for_sale',
    askingPrice: '375,000 USD',
    user_id: 'default-user-id'
  },
  // ... Add more claims following the same pattern
];

export const seedClaims = async () => {
  const { error } = await supabase
    .from('claims')
    .insert(claims);

  if (error) {
    console.error('Error seeding claims:', error);
    return false;
  }
  return true;
};