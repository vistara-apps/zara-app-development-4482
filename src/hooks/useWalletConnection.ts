import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useCallback, useEffect, useState } from 'react';

interface WalletConnectionState {
  isConnecting: boolean;
  error: string | null;
  retryCount: number;
}

export function useWalletConnection() {
  const { address, isConnected, isConnecting: wagmiConnecting } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [state, setState] = useState<WalletConnectionState>({
    isConnecting: false,
    error: null,
    retryCount: 0,
  });

  const maxRetries = 3;

  const handleConnect = useCallback(async (connectorId?: string) => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      const connector = connectorId 
        ? connectors.find(c => c.id === connectorId)
        : connectors[0];
      
      if (!connector) {
        throw new Error('No wallet connector available');
      }

      await connect({ connector });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage,
        retryCount: prev.retryCount + 1 
      }));
    } finally {
      setState(prev => ({ ...prev, isConnecting: false }));
    }
  }, [connect, connectors]);

  const handleRetry = useCallback(() => {
    if (state.retryCount < maxRetries) {
      handleConnect();
    }
  }, [handleConnect, state.retryCount]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setState({ isConnecting: false, error: null, retryCount: 0 });
  }, [disconnect]);

  // Reset error when connection succeeds
  useEffect(() => {
    if (isConnected && state.error) {
      setState(prev => ({ ...prev, error: null, retryCount: 0 }));
    }
  }, [isConnected, state.error]);

  // Handle wagmi connect errors
  useEffect(() => {
    if (connectError) {
      setState(prev => ({ 
        ...prev, 
        error: connectError.message,
        isConnecting: false 
      }));
    }
  }, [connectError]);

  return {
    address,
    isConnected,
    isConnecting: wagmiConnecting || state.isConnecting,
    error: state.error,
    retryCount: state.retryCount,
    maxRetries,
    canRetry: state.retryCount < maxRetries,
    connect: handleConnect,
    disconnect: handleDisconnect,
    retry: handleRetry,
    connectors,
  };
}
