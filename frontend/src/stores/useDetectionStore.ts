import { create } from 'zustand';
import type { DetectionResult } from '../types/index';
import { detectByFile, detectByText } from '../services/api';

export interface DetectionState {
  // Detection results
  result: DetectionResult | null;
  isProcessing: boolean;
  error: string | null;

  // Methods
  setResult: (result: DetectionResult | null) => void;
  setIsProcessing: (processing: boolean) => void;
  resetDetection: () => void;
  detectFile: (file: File) => Promise<void>;
  detectText: (text: string) => Promise<void>;
}

export const useDetectionStore = create<DetectionState>((set) => ({
  result: null,
  isProcessing: false,
  error: null,

  setResult: (result) => set({ result }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),

  resetDetection: () => set({
    result: null,
    isProcessing: false,
    error: null,
  }),

  detectFile: async (file: File) => {
    set({ isProcessing: true, error: null });
    try {
      const res = await detectByFile(file);
      set({ result: res.data, isProcessing: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Detection failed';
      set({ error: message, isProcessing: false });
    }
  },

  detectText: async (text: string) => {
    set({ isProcessing: true, error: null });
    try {
      const res = await detectByText(text);
      set({ result: res.data, isProcessing: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Detection failed';
      set({ error: message, isProcessing: false });
    }
  },
}));
