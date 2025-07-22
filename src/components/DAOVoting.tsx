import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Vote, Clock, CheckCircle, XCircle } from 'lucide-react';

const DAOVoting: React.FC = () => {
  const { daoVotes, setDaoVotes, user } = useAppContext();
  const [votingOn, setVotingOn] = useState<string | null>(null);

  const handleVote = (voteId: string, choice: 'for' | 'against') => {
    if (!user || user.stablecoinBalance < 100) {
      alert('You need at least $100 in stablecoins to vote');
      return;
    }

    setDaoVotes(daoVotes.map(vote =>
      vote.id === voteId ? { ...vote, userVote: choice } : vote
    ));
    setVotingOn(null);
  };

  const getStatusIcon = (outcome: string) => {
    switch (outcome) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">DAO Voting</h1>
        <p className="text-gray-400">Participate in governance decisions</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Voting Requirements</h2>
          <div className="text-right">
            <p className="text-gray-400">Your Balance</p>
            <p className="text-2xl font-bold text-white">${user?.stablecoinBalance.toLocaleString()}</p>
          </div>
        </div>
        <div className="border rounded-lg p-4" style={{ 
          backgroundColor: 'rgba(59, 130, 246, 0.1)', 
          borderColor: 'rgba(59, 130, 246, 0.2)' 
        }}>
          <p className="text-blue-400">
            <Vote className="w-5 h-5 inline mr-2" />
            Minimum $100 in stablecoins required to vote on proposals
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {daoVotes.map((vote) => (
          <div key={vote.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(vote.voteOutcome)}
                  <h3 className="text-xl font-semibold text-white">{vote.proposalTitle}</h3>
                </div>
                <p className="text-gray-400 mb-4">{vote.proposalDescription}</p>
                <p className="text-sm text-gray-500">
                  Submitted: {new Date(vote.timestamp).toLocaleString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                vote.voteOutcome === 'approved' ? 'text-green-400' :
                vote.voteOutcome === 'rejected' ? 'text-red-400' :
                'text-yellow-400'
              }`} style={{
                backgroundColor: vote.voteOutcome === 'approved' ? 'rgba(74, 222, 128, 0.1)' :
                                 vote.voteOutcome === 'rejected' ? 'rgba(248, 113, 113, 0.1)' :
                                 'rgba(250, 204, 21, 0.1)'
              }}>
                {vote.voteOutcome.charAt(0).toUpperCase() + vote.voteOutcome.slice(1)}
              </span>
            </div>

            {vote.voteOutcome === 'pending' && (
              <div className="flex items-center space-x-4">
                {vote.userVote ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Your vote:</span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      vote.userVote === 'for' ? 'text-green-400' : 'text-red-400'
                    }`} style={{
                      backgroundColor: vote.userVote === 'for' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'
                    }}>
                      {vote.userVote === 'for' ? 'FOR' : 'AGAINST'}
                    </span>
                  </div>
                ) : votingOn === vote.id ? (
                  <div className="flex space-x-3">
                    <button
                      className="btn-primary bg-green-600"
                      style={{ backgroundColor: 'rgb(22, 163, 74)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(21, 128, 61)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(22, 163, 74)';
                      }}
                      onClick={() => handleVote(vote.id, 'for')}
                    >
                      Vote FOR
                    </button>
                    <button
                      className="btn-primary bg-red-600"
                      style={{ backgroundColor: 'rgb(220, 38, 38)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(185, 28, 28)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(220, 38, 38)';
                      }}
                      onClick={() => handleVote(vote.id, 'against')}
                    >
                      Vote AGAINST
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => setVotingOn(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={() => setVotingOn(vote.id)}
                    disabled={!user || user.stablecoinBalance < 100}
                  >
                    Cast Vote
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DAOVoting;