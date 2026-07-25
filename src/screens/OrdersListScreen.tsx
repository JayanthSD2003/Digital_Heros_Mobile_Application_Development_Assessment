import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Animated, {
  FadeInDown,
  Layout,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Order, OrderStatus } from '../types/order';
import { fetchOrders } from '../services/apiService';
import { Colors } from '../theme/colors';
import { StatusChip } from '../components/StatusChip';
import { CreditFooter } from '../components/CreditFooter';
import { OfflineBanner } from '../components/OfflineBanner';
import { SkeletonList } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { useNetwork } from '../context/NetworkContext';
import {
  Search,
  ChevronRight,
  RefreshCw,
  AlertOctagon,
  Package,
  ShoppingBag,
} from 'lucide-react-native';

const STATUS_FILTERS: Array<'All' | OrderStatus> = [
  'All',
  'Placed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export const OrdersListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { simulatedError, toggleSimulatedError, isOffline } = useNetwork();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | OrderStatus>('All');
  const [isFromCache, setIsFromCache] = useState<boolean>(false);

  const loadData = useCallback(
    async (isPullToRefresh = false) => {
      if (isPullToRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const result = await fetchOrders(simulatedError);
        setOrders(result.orders);
        setIsFromCache(result.fromCache);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [simulatedError]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOrderPress = (order: Order) => {
    navigation.navigate('OrderDetail', { order });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'All' || order.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const renderOrderItem = ({ item, index }: { item: Order; index: number }) => {
    const formattedDate = new Date(item.placed_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    const itemCount = item.items?.reduce((sum, i) => sum + i.qty, 0) || 0;

    return (
      <Animated.View
        entering={FadeInDown.delay(index * 60).springify().damping(14)}
        layout={Layout.springify()}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleOrderPress(item)}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <View style={styles.orderIdBadge}>
              <Package size={14} color={Colors.secondary} style={styles.orderIcon} />
              <Text style={styles.orderIdText}>Order #{item.id}</Text>
            </View>
            <StatusChip status={item.status} size="sm" />
          </View>

          <Text style={styles.customerName}>{item.customer}</Text>

          <View style={styles.itemsSummaryRow}>
            <ShoppingBag size={13} color={Colors.textSecondary} style={{ marginRight: 4 }} />
            <Text style={styles.itemsText}>
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}: {item.items?.map((i) => i.name).join(', ')}
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.dateText}>Placed {formattedDate}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>${Number(item.amount).toFixed(2)}</Text>
              <ChevronRight size={16} color={Colors.textSecondary} />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Offline / Network Banner */}
      <OfflineBanner />

      {/* Header Bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Order Tracker</Text>
          <Text style={styles.headerSubtitle}>
            {isFromCache ? 'Viewing Offline Cached Data' : 'Digital Heroes Training Task'}
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[
              styles.iconBtn,
              simulatedError && styles.activeErrorBtn,
            ]}
            onPress={toggleSimulatedError}
            accessibilityLabel="Simulate Error"
          >
            <AlertOctagon
              size={18}
              color={simulatedError ? '#DC2626' : Colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => loadData(false)}
            accessibilityLabel="Refresh Orders"
          >
            <RefreshCw size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Search size={18} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Order ID or Customer..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Status Filter Horizontal Tabs */}
      <View style={styles.filtersWrapper}>
        <FlatList
          horizontal
          data={STATUS_FILTERS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterListContainer}
          renderItem={({ item }) => {
            const isSelected = selectedFilter === item;
            return (
              <TouchableOpacity
                style={[styles.filterChip, isSelected && styles.activeFilterChip]}
                onPress={() => setSelectedFilter(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.activeFilterChipText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Body Content: Skeleton, Error, Empty, or List */}
      <View style={styles.listFlex}>
        {loading && !refreshing ? (
          <SkeletonList />
        ) : error ? (
          <ErrorState message={error} onRetry={() => loadData(false)} />
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.listContentContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => loadData(true)}
                tintColor={Colors.secondary}
                colors={[Colors.secondary]}
              />
            }
            ListEmptyComponent={
              <EmptyState onRefresh={() => loadData(false)} />
            }
            ListFooterComponent={<CreditFooter />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeErrorBtn: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  filtersWrapper: {
    maxHeight: 44,
    marginBottom: 4,
  },
  filterListContainer: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  listFlex: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderIdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIcon: {
    marginRight: 4,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  itemsSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemsText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginRight: 4,
  },
});
