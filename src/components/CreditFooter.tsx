import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { Colors } from '../theme/colors';

export const CreditFooter: React.FC = () => {
  const handlePress = () => {
    Linking.openURL('https://digitalheroesco.com');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        activeOpacity={0.7}
        accessibilityRole="link"
        accessibilityLabel="Built for Digital Heroes Training Task"
      >
        <Text style={styles.text}>
          Built for <Text style={styles.linkText}>Digital Heroes Training Task</Text>
        </Text>
        <ExternalLink size={14} color={Colors.secondary} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.cardBg,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  linkText: {
    color: Colors.secondary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  icon: {
    marginLeft: 6,
  },
});
