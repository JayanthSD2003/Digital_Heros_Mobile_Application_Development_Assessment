import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NetworkProvider } from './src/context/NetworkContext';
import { OrdersListScreen } from './src/screens/OrdersListScreen';
import { OrderDetailScreen } from './src/screens/OrderDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NetworkProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OrdersList"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="OrdersList" component={OrdersListScreen} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NetworkProvider>
  );
}
