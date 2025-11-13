import { create } from 'zustand';
import { ToastType } from '@components/Toast/Toast';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  
  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  success: (message) => {
    set((state) => {
      const id = Math.random().toString(36).substring(2, 9);
      return {
        toasts: [...state.toasts, { id, message, type: 'success' }],
      };
    });
  },

  error: (message) => {
    set((state) => {
      const id = Math.random().toString(36).substring(2, 9);
      return {
        toasts: [...state.toasts, { id, message, type: 'error' }],
      };
    });
  },

  warning: (message) => {
    set((state) => {
      const id = Math.random().toString(36).substring(2, 9);
      return {
        toasts: [...state.toasts, { id, message, type: 'warning' }],
      };
    });
  },

  info: (message) => {
    set((state) => {
      const id = Math.random().toString(36).substring(2, 9);
      return {
        toasts: [...state.toasts, { id, message, type: 'info' }],
      };
    });
  },
}));
