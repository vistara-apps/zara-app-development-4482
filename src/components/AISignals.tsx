import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Brain } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const AISignals: React.FC = () => {
  const { aiSignals, isSubscribed, setIsSubscribed } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const { createSession } = usePaymentContext();

  const handleSubscribe = async () => {
    try {
      await createSession();
      setIsSubscribed(true);
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    }
  };

  const generateNewSignal = async () => {
    if (!isSubscribed) {
      alert('Subscribe to access AI signal generation');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI signal generation
    setTimeout(() => {
      // This would be replaced with actual OpenAI API call
      console.log('Generating new AI signal...');
      setIsGenerating(false);
    }, 2000);
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <TrendingUp className="w-6 h-6 text-green-400" />;
      case 'sell':
        return <TrendingDown className="w-6 h-6 text-red-400" />;
      default:
        return <Minus className="w-6 h-6 text-yellow-400" />;
    }
  };

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'border-green-400';
      case 'sell':
        return 'border-red-400';
      default:
        return 'border-yellow-400';
    }
  };

  const getSignalBackground = (type: string) => {
    switch (type) {
      case 'buy':
        return { backgroundColor: 'rgba(74, 222, 128, 0.05)' };
      case 'sell':
        return { backgroundColor: 'rgba(248, 113, 113, 0.05)' };
      default:
        return { backgroundColor: 'rgba(250, 204, 21, 0.05)' };
    }
  };

  if (!isSubscribed) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Trading Signals</h1>
          <p className="text-gray-400">Get AI-powered buy/sell recommendations</p>
        </div>

        <div className="card p-8 text-center">
          <div className="mb-6">
            <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Premium AI Signals</h2>
            <p className="text-gray-400 mb-6">
              Access advanced AI-driven trading recommendations based on DAO voting patterns 
              and market analysis for just $9.99/month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg" style={{backgroundColor: 'rgba(31, 41, 55, 0.5)'}}>
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Smart Recommendations</h3>
              <p className="text-sm text-gray-400">AI-powered buy/sell signals</p>
            </div>
            <div className="p-4 rounded-lg" style={{backgroundColor: 'rgba(31, 41, 55, 0.5)'}}>
              <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">DAO Integration</h3>
              <p className="text-sm text-gray-400">Analysis based on governance votes</p>
            </div>
            <div className="p-4 rounded-lg" style={{backgroundColor: 'rgba(31, 41, 55, 0.5)'}}>
              <RefreshCw className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Real-time Updates</h3>
              <p className="text-sm text-gray-400">Live market analysis</p>
            </div>
          </div>

          <button className="btn-primary text-lg px-8 py-3" onClick={handleSubscribe}>
            Subscribe for $9.99/month
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Trading Signals</h1>
          <p className="text-gray-400">AI-powered investment recommendations</p>
        </div>
        <button
          className="btn-primary flex items-center space-x-2"
          onClick={generateNewSignal}
          disabled={isGenerating}
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating...' : 'Generate New Signal'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiSignals.map((signal) => (
          <div 
            key={signal.id} 
            className={`card border-2 p-6 ${getSignalColor(signal.type)}`}
            style={getSignalBackground(signal.type)}
          >
            <div className="flex items-center justify-between mb-4">
              {getSignalIcon(signal.type)}
              <span className="text-2xl font-bold text-white">{signal.confidence}%</span>
            </div>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              signal.type === 'buy' ? 'text-green-400' :
              signal.type === 'sell' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {signal.type.toUpperCase()} Signal
            </h3>
            
            {signal.targetPrice && (
              <p className="text-white font-medium mb-2">
                Target: ${signal.targetPrice.toLocaleString()}
              </p>
            )}
            
            <p className="text-gray-400 text-sm mb-4">{signal.reason}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {new Date(signal.timestamp).toLocaleString()}
              </span>
              <div className={`w-4 h-4 rounded-full ${
                signal.confidence > 80 ? 'bg-green-400' :
                signal.confidence > 60 ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Signal Interpretation Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-400 rounded-full" />
            <span className="text-gray-300">High Confidence (80%+)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-yellow-400 rounded-full" />
            <span className="text-gray-300">Medium Confidence (60-79%)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-400 rounded-full" />
            <span className="text-gray-300">Low Confidence (below 60%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISignals;