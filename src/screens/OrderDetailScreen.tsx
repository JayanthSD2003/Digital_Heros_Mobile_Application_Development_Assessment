import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Order } from '../types/order';
import { Colors } from '../theme/colors';
import { StatusChip } from '../components/StatusChip';
import { VerticalTimeline } from '../components/VerticalTimeline';
import { CreditFooter } from '../components/CreditFooter';
import { OfflineBanner } from '../components/OfflineBanner';
import {
  ArrowLeft,
  User,
  Calendar,
  ShoppingBag,
  CreditCard,
  PackageCheck,
} from 'lucide-react-native';

export const OrderDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const order: Order = route.params?.order;

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <View style={styles.errorBox}>
          <Text>No order data provided.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formattedDate = new Date(order.placed_at).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const subtotal = order.items?.reduce((sum, i) => sum + i.price * i.qty, 0) || order.amount;

  return (
    <SafeAreaView style={styles.container}>
      <OfflineBanner />

      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #{order.id}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order Status & ID Card */}
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.orderTitle}>Order #{order.id}</Text>
              <Text style={styles.placedDate}>{formattedDate}</Text>
            </View>
            <StatusChip status={order.status} />
          </View>
        </View>

        {/* Customer Information Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <User size={18} color={Colors.secondary} style={styles.cardTitleIcon} />
            <Text style={styles.cardTitle}>Customer Information</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{order.customer}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Date:</Text>
            <Text style={styles.infoValue}>{formattedDate}</Text>
          </View>
        </View>

        {/* Vertical Timeline Progression */}
        <View style={styles.card}>
          <VerticalTimeline status={order.status} placedAt={order.placed_at} />
        </View>

        {/* Itemized Order Breakdown */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <ShoppingBag size={18} color={Colors.secondary} style={styles.cardTitleIcon} />
            <Text style={styles.cardTitle}>Items Ordered</Text>
          </View>

          {order.items?.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <View style={styles.itemQuantityBadge}>
                <Text style={styles.itemQuantityText}>{item.qty}x</Text>
              </View>
              <View style={styles.itemNameWrapper}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemUnitPrice}>
                  ${Number(item.price).toFixed(2)} each
                </Text>
              </View>
              <Text style={styles.itemTotalPrice}>
                ${(item.price * item.qty).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <CreditCard size={18} color={Colors.secondary} style={styles.cardTitleIcon} />
            <Text style={styles.cardTitle}>Payment Summary</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>${Number(order.amount).toFixed(2)}</Text>
          </View>
        </View>

        {/* Live Build Mandatory Credit Footer */}
        <CreditFooter />
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  errorBox: {
    padding: 24,
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  placedDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  cardTitleIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemQuantityBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  itemQuantityText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
  },
  itemNameWrapper: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  itemUnitPrice: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  itemTotalPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    marginTop: 4,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.secondary,
  },
});
