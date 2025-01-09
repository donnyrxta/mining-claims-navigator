import { supabase } from '@/lib/supabase';

const claims = [
  {
    id: 'G1',
    region: 'Rusape Headlands',
    type: 'gold',
    seller_name: 'Contact Agent',
    seller_phone: '+263 77 295 3982',
    potential: 'high',
    estimated_value: 'Contact for details',
    description: '440ha, 15 km from Inyathi Mine Copper and Gold mine. Place with good and visible outcrops for mineral identification and requiring further exploration. We share the same dolerite with Inyathi mine. Ideal for big project.',
    status: 'available',
    opportunity_type: 'seeking_joint_venture',
    partnership_details: 'Security deposit plus a 70/30 share split',
    user_id: 'default-user-id'
  },
  {
    id: 'C1',
    region: 'Zvishavane',
    type: 'chrome',
    seller_name: 'Contact Agent',
    seller_phone: '+263 78 204 0231',
    potential: 'high',
    estimated_value: '375,000 USD',
    description: 'CHROME ALLUVIALS/SOILS/FINES MINE. 150 HECTARES. 48% PLUS. ROADS ACCESSIBLE',
    status: 'available',
    opportunity_type: 'for_sale',
    asking_price: '375,000 USD',
    user_id: 'default-user-id'
  }
];

export const seedClaims = async () => {
  try {
    const { error } = await supabase
      .from('claims')
      .insert(claims);

    if (error) {
      console.error('Error seeding claims:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error seeding claims:', error);
    return false;
  }
};