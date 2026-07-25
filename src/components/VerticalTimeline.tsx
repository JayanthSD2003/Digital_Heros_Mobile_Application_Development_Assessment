import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { OrderStatus, TimelineStep } from '../types/order';
import { Colors } from '../theme/colors';
import { Check, Clock, PackageCheck, Truck, XCircle } from 'lucide-react-native';

interface VerticalTimelineProps {
  status: OrderStatus;
  placedAt: string;
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ status, placedAt }) => {
  const formattedDate = new Date(placedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getTimelineSteps = (): TimelineStep[] => {
    if (status === 'Cancelled') {
      return [
        { title: 'Order Placed', description: 'Order submitted by customer', status: 'completed', timestamp: formattedDate },
        { title: 'Order Cancelled', description: 'Order was cancelled and refunded', status: 'cancelled', timestamp: 'Cancelled' },
      ];
    }

    const orderStages: OrderStatus[] = ['Placed', 'Processing', 'Shipped', 'Delivered'];
    const currentIndex = orderStages.indexOf(status);

    return [
      {
        title: 'Order Placed',
        description: 'Order successfully logged and confirmed',
        status: currentIndex >= 0 ? (currentIndex === 0 ? 'current' : 'completed') : 'completed',
        timestamp: formattedDate,
      },
      {
        title: 'Processing',
        description: 'Items gathered and packaged at warehouse',
        status: currentIndex > 1 ? 'completed' : currentIndex === 1 ? 'current' : 'upcoming',
        timestamp: currentIndex >= 1 ? 'In Progress' : undefined,
      },
      {
        title: 'Shipped',
        description: 'Package handed to courier for transit',
        status: currentIndex > 2 ? 'completed' : currentIndex === 2 ? 'current' : 'upcoming',
        timestamp: currentIndex >= 2 ? 'In Transit' : undefined,
      },
      {
        title: 'Delivered',
        description: 'Package delivered to recipient address',
        status: currentIndex === 3 ? 'completed' : 'upcoming',
        timestamp: currentIndex === 3 ? 'Delivered' : undefined,
      },
    ];
  };

  const steps = getTimelineSteps();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Order Progression</Text>
      {steps.map((step, index) => (
        <TimelineStepRow
          key={step.title}
          step={step}
          isLast={index === steps.length - 1}
          index={index}
        />
      ))}
    </View>
  );
};

interface StepRowProps {
  step: TimelineStep;
  isLast: boolean;
  index: number;
}

const TimelineStepRow: React.FC<StepRowProps> = ({ step, isLast, index }) => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(index * 150, withSpring(1, { damping: 12 }));
    opacity.value = withDelay(index * 150, withTiming(1, { duration: 300 }));
  }, [index, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const isCompleted = step.status === 'completed';
  const isCurrent = step.status === 'current';
  const isCancelled = step.status === 'cancelled';

  let circleBg = '#E2E8F0';
  let iconColor = '#94A3B8';

  if (isCompleted) {
    circleBg = Colors.statusDelivered.dot;
    iconColor = '#FFFFFF';
  } else if (isCurrent) {
    circleBg = Colors.secondary;
    iconColor = '#FFFFFF';
  } else if (isCancelled) {
    circleBg = Colors.statusCancelled.dot;
    iconColor = '#FFFFFF';
  }

  return (
    <View style={styles.stepRow}>
      {/* Node + Connecting Vertical Line */}
      <View style={styles.leftColumn}>
        <Animated.View style={[styles.circle, { backgroundColor: circleBg }, animatedStyle]}>
          {isCompleted && <Check size={14} color={iconColor} strokeWidth={3} />}
          {isCurrent && <Clock size={14} color={iconColor} strokeWidth={3} />}
          {isCancelled && <XCircle size={14} color={iconColor} strokeWidth={3} />}
          {!isCompleted && !isCurrent && !isCancelled && (
            <View style={styles.dotInner} />
          )}
        </Animated.View>
        {!isLast && (
          <View
            style={[
              styles.verticalLine,
              { backgroundColor: isCompleted ? Colors.statusDelivered.dot : '#CBD5E1' },
            ]}
          />
        )}
      </View>

      {/* Step Content */}
      <View style={styles.rightColumn}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.stepTitle,
              isCurrent && styles.currentTitle,
              isCancelled && styles.cancelledTitle,
            ]}
          >
            {step.title}
          </Text>
          {step.timestamp && (
            <Text style={styles.timestampText}>{step.timestamp}</Text>
          )}
        </View>
        <Text style={styles.stepDescription}>{step.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    minHeight: 64,
  },
  leftColumn: {
    alignItems: 'center',
    width: 32,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#94A3B8',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    marginVertical: -2,
    zIndex: 1,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  currentTitle: {
    color: Colors.secondary,
    fontWeight: '700',
  },
  cancelledTitle: {
    color: Colors.statusCancelled.text,
    fontWeight: '700',
  },
  timestampText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  stepDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
