import { lazy } from 'react';

// Lazy load components for better performance
export const Dashboard = lazy(() => import('./Dashboard'));
export const DAOVoting = lazy(() => import('./DAOVoting'));
export const AISignals = lazy(() => import('./AISignals'));
export const Portfolio = lazy(() => import('./Portfolio'));
export const Subscription = lazy(() => import('./Subscription'));
