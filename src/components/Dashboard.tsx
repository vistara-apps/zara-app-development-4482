import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { TrendingUp, Vote, DollarSign, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, portfolio, daoVotes, aiSignals } = useAppContext();

  const stats = [
    {
      title: 'Portfolio Value',
      value: `$${portfolio?.totalValue.toLocaleString() || '0'}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Active DAO Votes',
      value: daoVotes.filter(vote => vote.voteOutcome === 'pending').length,
      icon: Vote,
      change: '2 pending',
      changeType: 'neutral'
    },
    {
      title: 'AI Confidence',
      value: `${aiSignals[0]?.confidence || 0}%`,
      icon: TrendingUp,
      change: 'Strong signal',
      changeType: 'positive'
    },
    {
      title: 'Stablecoin Balance',
      value: `$${user?.stablecoinBalance.toLocaleString() || '0'}`,
      icon: AlertTriangle,
      change: 'Available',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Your crypto autopilot overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  stat.changeType === 'positive' ? 'text-green-400 bg-green-400' :
                  stat.changeType === 'negative' ? 'text-red-400 bg-red-400' :
                  'text-gray-400 bg-gray-800'
                }`} style={{
                  backgroundColor: stat.changeType === 'positive' ? 'rgba(74, 222, 128, 0.1)' :
                                   stat.changeType === 'negative' ? 'rgba(248, 113, 113, 0.1)' :
                                   'rgba(156, 163, 175, 0.1)'
                }}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent DAO Activity</h3>
          <div className="space-y-3">
            {daoVotes.slice(0, 3).map((vote) => (
              <div key={vote.id} className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: 'rgba(31, 41, 55, 0.5)'}}>
                <div>
                  <p className="text-white font-medium">{vote.proposalTitle}</p>
                  <p className="text-gray-400 text-sm">{new Date(vote.timestamp).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  vote.voteOutcome === 'approved' ? 'text-green-400' :
                  vote.voteOutcome === 'rejected' ? 'text-red-400' :
                  'text-yellow-400'
                }`} style={{
                  backgroundColor: vote.voteOutcome === 'approved' ? 'rgba(74, 222, 128, 0.1)' :
                                   vote.voteOutcome === 'rejected' ? 'rgba(248, 113, 113, 0.1)' :
                                   'rgba(250, 204, 21, 0.1)'
                }}>
                  {vote.voteOutcome}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Latest AI Signals</h3>
          <div className="space-y-3">
            {aiSignals.slice(0, 3).map((signal) => (
              <div key={signal.id} className="p-3 rounded-lg" style={{backgroundColor: 'rgba(31, 41, 55, 0.5)'}}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    signal.type === 'buy' ? 'text-green-400' :
                    signal.type === 'sell' ? 'text-red-400' :
                    'text-yellow-400'
                  }`} style={{
                    backgroundColor: signal.type === 'buy' ? 'rgba(74, 222, 128, 0.1)' :
                                     signal.type === 'sell' ? 'rgba(248, 113, 113, 0.1)' :
                                     'rgba(250, 204, 21, 0.1)'
                  }}>
                    {signal.type.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-sm">{signal.confidence}%</span>
                </div>
                <p className="text-white text-sm">{signal.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;