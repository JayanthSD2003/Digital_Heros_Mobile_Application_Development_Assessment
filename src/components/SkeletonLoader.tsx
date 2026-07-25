import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

export const SkeletonCard: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.headerRow}>
        <View style={styles.orderIdSkeleton} />
        <View style={styles.chipSkeleton} />
      </View>
      <View style={styles.customerSkeleton} />
      <View style={styles.itemCountSkeleton} />
      <View style={styles.footerRow}>
        <View style={styles.dateSkeleton} />
        <View style={styles.amountSkeleton} />
      </View>
    </Animated.View>
  );
};

export const SkeletonList: React.FC = () => {
  return (
    <View style={styles.container}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderIdSkeleton: {
    width: 90,
    height: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  chipSkeleton: {
    width: 75,
    height: 22,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
  },
  customerSkeleton: {
    width: '60%',
    height: 18,
    backgroundColor: '#CBD5E1',
    borderRadius: 4,
    marginBottom: 8,
  },
  itemCountSkeleton: {
    width: '40%',
    height: 14,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  dateSkeleton: {
    width: 80,
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  amountSkeleton: {
    width: 70,
    height: 18,
    backgroundColor: '#CBD5E1',
    borderRadius: 4,
  },
});
