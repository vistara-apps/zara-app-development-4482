import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Wallet, TrendingUp, BarChart3, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Portfolio: React.FC = () => {
  const { portfolio, user } = useAppContext();

  const mockPriceData = [
    { date: '1/1', price: 42000 },
    { date: '1/2', price: 43500 },
    { date: '1/3', price: 41000 },
    { date: '1/4', price: 45000 },
    { date: '1/5', price: 44500 },
    { date: '1/6', price: 46000 },
    { date: '1/7', price: 45000 },
  ];

  const currentPrice = 45000;
  const priceChange = currentPrice - (portfolio?.coinXAverageBuyPrice || 0);
  const priceChangePercent = ((priceChange / (portfolio?.coinXAverageBuyPrice || 1)) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
        <p className="text-gray-400">Manage your crypto investments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8 text-blue-500" />
            <span className={`text-sm px-2 py-1 rounded ${
              priceChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`} style={{
              backgroundColor: priceChange >= 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'
            }}>
              {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            ${portfolio?.totalValue.toLocaleString() || '0'}
          </h3>
          <p className="text-gray-400">Total Portfolio Value</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <span className="text-gray-400">BTC</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {portfolio?.coinXBalance.toFixed(4) || '0'}
          </h3>
          <p className="text-gray-400">Bitcoin Holdings</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-purple-500" />
            <span className="text-gray-400">USD</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            ${user?.stablecoinBalance.toLocaleString() || '0'}
          </h3>
          <p className="text-gray-400">Available Cash</p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Price Chart</h3>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-white">${currentPrice.toLocaleString()}</span>
            <button className="btn-secondary p-2">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Position Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Holdings</span>
              <span className="text-white">{portfolio?.coinXBalance.toFixed(4)} BTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Average Buy Price</span>
              <span className="text-white">${portfolio?.coinXAverageBuyPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Price</span>
              <span className="text-white">${currentPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Unrealized P&amp;L</span>
              <span className={priceChange >= 0 ? 'text-green-400' : 'text-red-400'}>
                ${priceChange.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary">
              Execute AI Recommendation
            </button>
            <button className="w-full btn-secondary">
              Rebalance Portfolio
            </button>
            <button className="w-full btn-secondary">
              Set Stop Loss
            </button>
            <button className="w-full btn-secondary">
              Add Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;