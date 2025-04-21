// Type declarations for sonner toast library
declare module 'sonner' {
  /**
   * Shows a toast notification
   * @param message The message to display
   * @param options Toast options
   */
  export function toast(message: string, options?: ToastOptions): void;
  
  /**
   * Shows a success toast notification
   * @param message The message to display
   * @param options Toast options
   */
  export function success(message: string, options?: ToastOptions): void;
  
  /**
   * Shows an error toast notification
   * @param message The message to display
   * @param options Toast options
   */
  export function error(message: string, options?: ToastOptions): void;
  
  /**
   * Shows a warning toast notification
   * @param message The message to display
   * @param options Toast options
   */
  export function warning(message: string, options?: ToastOptions): void;
  
  /**
   * Shows an info toast notification
   * @param message The message to display
   * @param options Toast options
   */
  export function info(message: string, options?: ToastOptions): void;
  
  /**
   * Shows a loading toast notification
   * @param message The message to display
   * @param options Toast options
   */
  export function loading(message: string, options?: ToastOptions): void;
  
  /**
   * Shows a promise toast notification
   * @param promise The promise to track
   * @param options Toast options
   */
  export function promise<T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string;
      error: string;
    }
  ): Promise<T>;
  
  /**
   * Dismisses all toasts
   */
  export function dismiss(): void;
  
  /**
   * Toast options
   */
  interface ToastOptions {
    duration?: number;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    icon?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  }
} 