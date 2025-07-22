import React from 'react';
import { BarChart3, Vote, TrendingUp, Wallet, CreditCard } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'dao', label: 'DAO Voting', icon: Vote },
    { id: 'signals', label: 'AI Signals', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
  ];

  return (
    <nav className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4" role="navigation" aria-label="Main navigation">
      <div className="space-y-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item w-full text-left ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              aria-current={activeTab === item.id ? 'page' : undefined}
              aria-label={`Navigate to ${item.label}`}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className="w-5 h-5" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
