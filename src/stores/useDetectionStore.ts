'use client';

import { create } from 'zustand';
import type { DetectionResult } from '@/types';

export interface DetectionState {
  result: DetectionResult | null;
  isProcessing: boolean;
  error: string | null;

  setResult: (result: DetectionResult | null) => void;
  setIsProcessing: (processing: boolean) => void;
  resetDetection: () => void;
  detectFile: (file: File) => Promise<void>;
  detectText: (text: string) => Promise<void>;
}

async function apiFetch<T>(url: string, options: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
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
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiFetch<{ code: number; message: string; data: DetectionResult }>(
        '/api/detect/file',
        { method: 'POST', body: formData }
      );
      set({ result: res.data, isProcessing: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Detection failed';
      set({ error: message, isProcessing: false });
    }
  },

  detectText: async (text: string) => {
    set({ isProcessing: true, error: null });
    try {
      const res = await apiFetch<{ code: number; message: string; data: DetectionResult }>(
        '/api/detect/text',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        }
      );
      set({ result: res.data, isProcessing: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Detection failed';
      set({ error: message, isProcessing: false });
    }
  },
}));
