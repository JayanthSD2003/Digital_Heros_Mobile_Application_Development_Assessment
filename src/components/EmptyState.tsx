import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PackageOpen, RefreshCw } from 'lucide-react-native';
import { Colors } from '../theme/colors';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onRefresh?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Orders Found',
  description = 'There are no orders matching your current filter selection.',
  onRefresh,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <PackageOpen size={40} color={Colors.textSecondary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {onRefresh && (
        <TouchableOpacity style={styles.button} onPress={onRefresh} activeOpacity={0.8}>
          <RefreshCw size={16} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Refresh Orders</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
