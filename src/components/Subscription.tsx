import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { CheckCircle, Crown, CreditCard, Calendar } from 'lucide-react';

const Subscription: React.FC = () => {
  const { isSubscribed, setIsSubscribed } = useAppContext();
  const { createSession } = usePaymentContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      await createSession();
      setIsSubscribed(true);
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const features = [
    'AI-powered trading signals',
    'Real-time market analysis',
    'DAO voting insights',
    'Automated portfolio optimization',
    'Advanced risk management',
    'Priority customer support',
    'Exclusive market reports',
    'Mobile app access'
  ];

  if (isSubscribed) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Subscription</h1>
          <p className="text-gray-400">Manage your Crypto Autopilot subscription</p>
        </div>

        <div className="card p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Premium Active</h2>
            <p className="text-green-400">Your subscription is active and running</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card p-6 border" style={{borderColor: 'rgba(34, 197, 94, 0.2)'}}>
              <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Next Billing</h3>
              <p className="text-gray-400">February 15, 2024</p>
              <p className="text-2xl font-bold text-white mt-2">$9.99</p>
            </div>

            <div className="card p-6 border" style={{borderColor: 'rgba(59, 130, 246, 0.2)'}}>
              <CreditCard className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Payment Method</h3>
              <p className="text-gray-400">Connected Wallet</p>
              <p className="text-sm text-blue-400 mt-2">Auto-renewal enabled</p>
            </div>
          </div>

          <div className="text-left">
            <h3 className="text-xl font-semibold text-white mb-4">Your Premium Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <button className="btn-secondary mr-4">
              Update Payment Method
            </button>
            <button className="btn-secondary text-red-400" style={{
              borderColor: 'rgba(248, 113, 113, 0.2)'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Subscription</h1>
        <p className="text-gray-400">Upgrade to unlock premium features</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="card p-8 text-center border-2" style={{borderColor: 'rgba(59, 130, 246, 0.2)'}}>
          <div className="mb-6">
            <Crown className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Premium Plan</h2>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-4xl font-bold text-white">$9.99</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-gray-400 mt-2">Get AI-powered insights and automation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-left">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <button 
            className="btn-primary text-lg px-8 py-4 w-full md:w-auto"
            onClick={handleSubscribe}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              'Subscribe Now'
            )}
          </button>

          <p className="text-sm text-gray-400 mt-4">
            Cancel anytime • Secure payment via blockchain
          </p>
        </div>

        <div className="mt-6 card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Why Choose Premium?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)'
              }}>
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">AI-Powered</h4>
              <p className="text-sm text-gray-400">Advanced algorithms analyze market data and DAO votes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)'
              }}>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Automated</h4>
              <p className="text-sm text-gray-400">Set it and forget it investment strategy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{
                backgroundColor: 'rgba(168, 85, 247, 0.2)'
              }}>
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Governance</h4>
              <p className="text-sm text-gray-400">Participate in DAO decisions that matter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;