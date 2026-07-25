import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react-native';
import { Colors } from '../theme/colors';
import { useNetwork } from '../context/NetworkContext';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load orders. Please check your network connection.',
  onRetry,
}) => {
  const { simulatedError, toggleSimulatedError } = useNetwork();

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <AlertCircle size={44} color="#DC2626" />
      </View>

      <Text style={styles.title}>Something Went Wrong</Text>
      <Text style={styles.description}>{message}</Text>

      <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.8}>
        <RefreshCw size={16} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>

      {/* Loom Demo Utility Control */}
      <TouchableOpacity
        style={styles.toggleContainer}
        onPress={toggleSimulatedError}
        activeOpacity={0.7}
      >
        {simulatedError ? (
          <ToggleRight size={22} color="#DC2626" />
        ) : (
          <ToggleLeft size={22} color={Colors.textSecondary} />
        )}
        <Text style={styles.toggleText}>
          {simulatedError ? 'Disable Simulated Error' : 'Simulate API Failure (Demo Mode)'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    width: '100%',
    justifyContent: 'center',
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
});
