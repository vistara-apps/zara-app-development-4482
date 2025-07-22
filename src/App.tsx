import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import DAOVoting from './components/DAOVoting';
import AISignals from './components/AISignals';
import Portfolio from './components/Portfolio';
import Subscription from './components/Subscription';
import { AppProvider } from './contexts/AppContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'dao':
        return <DAOVoting />;
      case 'signals':
        return <AISignals />;
      case 'portfolio':
        return <Portfolio />;
      case 'subscription':
        return <Subscription />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;