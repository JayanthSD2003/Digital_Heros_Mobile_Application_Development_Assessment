import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderStatus } from '../types/order';
import { Colors } from '../theme/colors';
import { Clock, RefreshCw, Truck, CheckCircle2, XCircle } from 'lucide-react-native';

interface StatusChipProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'md' }) => {
  let styleConfig = Colors.statusPlaced;
  let IconComponent = Clock;

  switch (status) {
    case 'Placed':
      styleConfig = Colors.statusPlaced;
      IconComponent = Clock;
      break;
    case 'Processing':
      styleConfig = Colors.statusProcessing;
      IconComponent = RefreshCw;
      break;
    case 'Shipped':
      styleConfig = Colors.statusShipped;
      IconComponent = Truck;
      break;
    case 'Delivered':
      styleConfig = Colors.statusDelivered;
      IconComponent = CheckCircle2;
      break;
    case 'Cancelled':
      styleConfig = Colors.statusCancelled;
      IconComponent = XCircle;
      break;
  }

  const isSmall = size === 'sm';
  const iconSize = isSmall ? 12 : 14;

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: styleConfig.bg,
          borderColor: styleConfig.border,
          paddingVertical: isSmall ? 2 : 4,
          paddingHorizontal: isSmall ? 8 : 10,
        },
      ]}
    >
      <IconComponent size={iconSize} color={styleConfig.text} style={styles.icon} />
      <Text
        style={[
          styles.label,
          {
            color: styleConfig.text,
            fontSize: isSmall ? 11 : 12,
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontWeight: '600',
  },
});
