import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

type Plan = {
  name: string;
  price: string;
  features: string[];
  priceId: string;
};

const plans: Plan[] = [
  {
    name: 'Basic',
    price: '$49/month',
    features: [
      'View basic claim information',
      'Access to public documents',
      'Basic search filters',
    ],
    priceId: 'price_basic'
  },
  {
    name: 'Premium',
    price: '$149/month',
    features: [
      'Full claim details',
      'Contact sellers directly',
      'Download all documents',
      'Advanced search filters',
      'Favorite claims',
      'Add private notes'
    ],
    priceId: 'price_premium'
  }
];

const SubscriptionPlans = () => {
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start subscription process. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6">
      {plans.map((plan) => (
        <div key={plan.name} className="border rounded-lg p-6 bg-white shadow-sm">
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className="text-3xl font-bold mb-6">{plan.price}</p>
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            className="w-full" 
            onClick={() => handleSubscribe(plan.priceId)}
          >
            Subscribe Now
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;