import { create } from 'zustand';

export interface UploadState {
  // File upload state
  uploadedFile: File | null;
  pastedText: string;
  uploadProgress: number;
  
  // Methods
  setUploadedFile: (file: File | null) => void;
  setPastedText: (text: string) => void;
  setUploadProgress: (progress: number) => void;
  resetUpload: () => void;
  getContent: () => string | null;
}

export const useUploadStore = create<UploadState>((set, get) => ({
  uploadedFile: null,
  pastedText: '',
  uploadProgress: 0,
  
  setUploadedFile: (file) => set({ uploadedFile: file, pastedText: '' }),
  setPastedText: (text) => set({ pastedText: text, uploadedFile: null }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  
  resetUpload: () => set({
    uploadedFile: null,
    pastedText: '',
    uploadProgress: 0,
  }),
  
  getContent: () => {
    const state = get();
    if (state.uploadedFile) {
      // File content needs to be extracted separately
      return 'file';
    }
    return state.pastedText || null;
  },
}));
