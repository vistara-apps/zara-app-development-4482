import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Bot } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Crypto Autopilot</h1>
            <p className="text-sm text-gray-400">AI-driven crypto investment automation</p>
          </div>
        </div>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;