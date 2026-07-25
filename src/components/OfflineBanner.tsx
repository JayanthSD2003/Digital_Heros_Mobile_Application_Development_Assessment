import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff, Wifi, AlertTriangle } from 'lucide-react-native';
import { useNetwork } from '../context/NetworkContext';

export const OfflineBanner: React.FC = () => {
  const { isOffline, simulatedError } = useNetwork();
  const [wasOffline, setWasOffline] = useState(false);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setWasOffline(true);
    } else if (wasOffline) {
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
        setWasOffline(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOffline, wasOffline]);

  if (simulatedError) {
    return (
      <View style={[styles.banner, styles.simulatedBanner]}>
        <AlertTriangle size={16} color="#991B1B" style={styles.icon} />
        <Text style={styles.simulatedText}>
          Simulated API Failure Mode Active (Task B Demo)
        </Text>
      </View>
    );
  }

  if (isOffline) {
    return (
      <View style={[styles.banner, styles.offlineBanner]}>
        <WifiOff size={16} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.text}>
          You are offline. Showing cached orders.
        </Text>
      </View>
    );
  }

  if (showRestored) {
    return (
      <View style={[styles.banner, styles.restoredBanner]}>
        <Wifi size={16} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.text}>
          Connection restored! Refreshing orders...
        </Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineBanner: {
    backgroundColor: '#EF4444',
  },
  restoredBanner: {
    backgroundColor: '#10B981',
  },
  simulatedBanner: {
    backgroundColor: '#FEE2E2',
    borderBottomWidth: 1,
    borderBottomColor: '#FCA5A5',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  simulatedText: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '600',
  },
});
