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
    <nav className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;