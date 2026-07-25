import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkContextType {
  isConnected: boolean | null;
  isOffline: boolean;
  simulatedError: boolean;
  setSimulatedError: (val: boolean) => void;
  toggleSimulatedError: () => void;
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
  isOffline: false,
  simulatedError: false,
  setSimulatedError: () => {},
  toggleSimulatedError: () => {},
});

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [simulatedError, setSimulatedError] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const isOffline = isConnected === false;

  const toggleSimulatedError = () => {
    setSimulatedError((prev) => !prev);
  };

  return (
    <NetworkContext.Provider
      value={{
        isConnected,
        isOffline,
        simulatedError,
        setSimulatedError,
        toggleSimulatedError,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
