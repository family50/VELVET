/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  isReady: boolean;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  // isReady تعني أن الأنميشن خلص والملفات نزلت
  const isReady = !isLoading;

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, isReady }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error('useGlobalLoading must be used within LoadingProvider');
  return context;
};