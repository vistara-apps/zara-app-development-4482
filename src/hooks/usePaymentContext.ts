import { useWalletClient } from "wagmi";
import { useCallback, useState } from "react";
import axios from "axios";
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";

interface PaymentState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function usePaymentContext(): {
  createSession: () => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
} {
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const [state, setState] = useState<PaymentState>({
    loading: false,
    error: null,
    success: false,
  });

  const createSession = useCallback(async () => {
    setState({ loading: true, error: null, success: false });
    
    try {
      if (!walletClient || !walletClient.account) {
        throw new Error("Please connect your wallet first");
      }
      
      if (isError) {
        throw new Error("Wallet connection error. Please try reconnecting.");
      }
      
      if (isLoading) {
        throw new Error("Wallet is still loading. Please wait a moment.");
      }
      
      const baseURL = import.meta.env.VITE_API_BASE_URL || "https://payments.vistara.dev";
      const baseClient = axios.create({
        baseURL,
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      });
      
      const apiClient = withPaymentInterceptor(baseClient, walletClient);
      const response = await apiClient.post("/api/payment", { amount: "$9.99" });
      const paymentResponse = response.config.headers["X-PAYMENT"];
      
      if (!paymentResponse) {
        throw new Error("Payment response is missing. Please try again.");
      }
      
      const decoded = decodeXPaymentResponse(paymentResponse);
      console.log(`Payment successful: ${JSON.stringify(decoded)}`);
      
      setState({ loading: false, error: null, success: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      console.error('Payment error:', error);
      setState({ loading: false, error: errorMessage, success: false });
      throw error; // Re-throw for component handling
    }
  }, [walletClient, isError, isLoading]);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false });
  }, []);

  return { 
    createSession, 
    loading: state.loading,
    error: state.error,
    success: state.success,
    reset
  };
}
