"use client";

import { CreditCard, Check, Zap, Calendar, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/common/components/Button';
import { useApi } from '@/hooks/useApi';
import BillingSkeleton from '@/components/skeletons/BillingSkeleton';
import { useSession } from 'next-auth/react';

export default function BillingPage() {
  const { data: session } = useSession();
  
  const { data: billingData, loading, error } = useApi(async () => {
    // Mock billing data - replace with actual API call
    return {
      data: {
        currentPlan: {
          name: 'Community',
          price: 0,
          period: 'forever',
          usage: {
            bots: { current: 1, limit: 1 },
            messages: { current: 24, limit: 500 },
            aiSpend: { current: 0.34, limit: 5.00 },
            storage: { current: 946.3, limit: 100000 },
          }
        },
        billingHistory: [
          { date: '2024-01-01', description: 'Pro Plan - Monthly', amount: 29.00, status: 'paid' },
          { date: '2023-12-01', description: 'Pro Plan - Monthly', amount: 29.00, status: 'paid' },
          { date: '2023-11-01', description: 'Pro Plan - Monthly', amount: 29.00, status: 'paid' },
        ]
      }
    };
  });

  const plans = [
    {
      name: 'Community',
      price: 0,
      period: 'forever',
      current: true,
      features: [
        '1 Bot',
        '500 Messages/month',
        '$5 AI Spend',
        '100MB Storage',
        'Community Support'
      ]
    },
    {
      name: 'Pro',
      price: 29,
      period: 'month',
      current: false,
      popular: true,
      features: [
        '10 Bots',
        '10,000 Messages/month',
        '$50 AI Spend',
        '10GB Storage',
        'Priority Support',
        'Advanced Analytics'
      ]
    },
    {
      name: 'Enterprise',
      price: 99,
      period: 'month',
      current: false,
      features: [
        'Unlimited Bots',
        'Unlimited Messages',
        '$200 AI Spend',
        '100GB Storage',
        'Dedicated Support',
        'Custom Integrations',
        'SSO & Advanced Security'
      ]
    }
  ];

  if (loading) {
    return <BillingSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Failed to load billing data</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Plans</h1>
        <p className="text-gray-400">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Current Plan</h3>
            <p className="text-gray-400">You're currently on the {billingData?.currentPlan?.name || 'Community'} plan</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">${billingData?.currentPlan?.price || 0}</div>
            <div className="text-sm text-gray-400">per {billingData?.currentPlan?.period || 'month'}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-full bg-gray-700 rounded-full h-2 max-w-xs">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ 
                  width: `${((billingData?.currentPlan?.usage?.bots?.current || 1) / (billingData?.currentPlan?.usage?.bots?.limit || 1)) * 100}%` 
                }} 
              />
            </div>
            <span className="text-sm text-gray-400">
              {billingData?.currentPlan?.usage?.bots?.current || 1}/{billingData?.currentPlan?.usage?.bots?.limit || 1} Bots used
            </span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800 border rounded-lg p-6 ${
                plan.current 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : plan.popular
                  ? 'border-green-500 ring-2 ring-green-500/20'
                  : 'border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">{plan.name}</h4>
                <div className="text-3xl font-bold text-white mb-1">
                  ${plan.price}
                  <span className="text-lg text-gray-400">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.current
                    ? 'bg-gray-600 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Billing History</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        {billingHistory.length > 0 ? (
        {(billingData?.billingHistory || []).length > 0 ? (
          <div className="space-y-4">
            {(billingData?.billingHistory || []).map((invoice, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-white font-medium">{invoice.description}</div>
                    <div className="text-sm text-gray-400">{invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-white font-medium">${invoice.amount}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'paid' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {invoice.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No billing history available</p>
          </div>
        )}
      </div>
    </div>
  );
}