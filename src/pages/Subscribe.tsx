import React from 'react';
import SubscriptionPlans from '@/components/SubscriptionPlans';

const Subscribe = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Subscription Plan
          </h1>
          <p className="text-lg text-gray-600">
            Get access to our comprehensive mining claims directory
          </p>
        </div>
        <SubscriptionPlans />
      </div>
    </div>
  );
};

export default Subscribe;