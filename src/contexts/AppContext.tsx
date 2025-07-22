import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  stablecoinBalance: number;
  isSubscribed: boolean;
}

interface DAOVote {
  id: string;
  proposalTitle: string;
  proposalDescription: string;
  voteOutcome: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  userVote?: 'for' | 'against' | null;
}

interface Portfolio {
  id: string;
  userId: string;
  coinXBalance: number;
  coinXAverageBuyPrice: number;
  totalValue: number;
}

interface AISignal {
  id: string;
  type: 'buy' | 'sell' | 'hold';
  confidence: number;
  reason: string;
  timestamp: string;
  targetPrice?: number;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  daoVotes: DAOVote[];
  setDaoVotes: (votes: DAOVote[]) => void;
  portfolio: Portfolio | null;
  setPortfolio: (portfolio: Portfolio | null) => void;
  aiSignals: AISignal[];
  setAISignals: (signals: AISignal[]) => void;
  isSubscribed: boolean;
  setIsSubscribed: (subscribed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'user@example.com',
    stablecoinBalance: 1000,
    isSubscribed: false
  });

  const [daoVotes, setDaoVotes] = useState<DAOVote[]>([
    {
      id: '1',
      proposalTitle: 'Increase Staking Rewards',
      proposalDescription: 'Proposal to increase staking rewards from 8% to 12% APY',
      voteOutcome: 'pending',
      timestamp: '2024-01-15T10:00:00Z',
      userVote: null
    },
    {
      id: '2',
      proposalTitle: 'New Partnership with DeFi Protocol',
      proposalDescription: 'Strategic partnership to expand liquidity pools',
      voteOutcome: 'approved',
      timestamp: '2024-01-10T14:00:00Z',
      userVote: 'for'
    }
  ]);

  const [portfolio, setPortfolio] = useState<Portfolio | null>({
    id: '1',
    userId: '1',
    coinXBalance: 0.5,
    coinXAverageBuyPrice: 45000,
    totalValue: 22500
  });

  const [aiSignals, setAISignals] = useState<AISignal[]>([
    {
      id: '1',
      type: 'buy',
      confidence: 85,
      reason: 'Strong bullish sentiment from recent DAO votes and market indicators',
      timestamp: '2024-01-15T12:00:00Z',
      targetPrice: 48000
    },
    {
      id: '2',
      type: 'hold',
      confidence: 72,
      reason: 'Market consolidation phase detected, wait for clearer signals',
      timestamp: '2024-01-14T16:00:00Z'
    }
  ]);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const value = {
    user,
    setUser,
    daoVotes,
    setDaoVotes,
    portfolio,
    setPortfolio,
    aiSignals,
    setAISignals,
    isSubscribed,
    setIsSubscribed
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};