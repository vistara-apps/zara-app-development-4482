import React, { useState, Suspense } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider } from './contexts/AppContext';
import * as LazyComponents from './components/LazyComponents';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    const ComponentMap = {
      dashboard: LazyComponents.Dashboard,
      dao: LazyComponents.DAOVoting,
      signals: LazyComponents.AISignals,
      portfolio: LazyComponents.Portfolio,
      subscription: LazyComponents.Subscription,
    };

    const Component = ComponentMap[activeTab as keyof typeof ComponentMap] || LazyComponents.Dashboard;
    
    return (
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading..." className="py-12" />}>
        <Component />
      </Suspense>
    );
  };

  return (
    <AppProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-black">
          <Header />
          <div className="flex">
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 p-6" role="main">
              {renderContent()}
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;
