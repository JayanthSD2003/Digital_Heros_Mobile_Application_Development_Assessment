import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from '../types/order';

const API_URL = 'https://6a636b4ab30b52361e1a42f8.mockapi.io/Orders';
const CACHE_KEY = '@order_tracker_cached_orders_v1';

export interface FetchOrdersResult {
  orders: Order[];
  fromCache: boolean;
  error?: string;
}

export const fetchOrders = async (forceError: boolean = false): Promise<FetchOrdersResult> => {
  if (forceError) {
    // Deliberate error state triggered for Task B demo
    throw new Error('Simulated API failure for Loom demo.');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(API_URL, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Order[] = await response.json();

    // Save to AsyncStorage cache
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));

    return {
      orders: data,
      fromCache: false,
    };
  } catch (error: any) {
    console.warn('API Fetch failed, attempting to read from cache...', error.message);

    // Read fallback cache from AsyncStorage
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        const cachedOrders: Order[] = JSON.parse(cached);
        return {
          orders: cachedOrders,
          fromCache: true,
          error: error.message || 'Offline mode: displaying cached data',
        };
      }
    } catch (cacheError) {
      console.error('Failed to read cache:', cacheError);
    }

    throw new Error(error.message || 'Unable to fetch orders and no cached data available.');
  }
};

export const getCachedOrders = async (): Promise<Order[] | null> => {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};
