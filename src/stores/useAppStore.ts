'use client';

import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
  error: string | null;
  message: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setMessage: (message: string | null) => void;
  clearNotification: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  error: null,
  message: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setMessage: (message) => set({ message }),
  clearNotification: () => set({ error: null, message: null }),
}));
