import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import { TabParamList } from './interfaces';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib';



const Tab = createBottomTabNavigator<TabParamList>()

function TabNavigator() {
	return (
		<Tab.Navigator
			key="TabNavigator"
			initialRouteName="ProductScreen"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === 'ProfileScreen') {
						iconName = 'person-circle-outline';
					} else if (route.name === 'ProductScreen') {
						iconName = 'md-list-outline';
					} else if (route.name === 'CartScreen') {
						iconName = 'md-cart-outline';
					}
					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarItemStyle: {
					borderTopLeftRadius: route.name === "ProductScreen" ? 0 : 8,
					borderTopRightRadius: route.name === "ProfileScreen" ? 0 : 8,
					borderBottomLeftRadius: route.name === "ProductScreen" ? 0 : 8,
					borderBottomRightRadius: route.name === "ProfileScreen" ? 0 : 8,
				},
				tabBarShowLabel: false,
				tabBarActiveBackgroundColor: Colors.primaryColor,
				tabBarActiveTintColor: Colors.white,
			})}
		>
			<Tab.Screen
				name="ProductScreen"
				options={{
					headerShown: false,
				}}
				component={ProductScreen}
			/>
			<Tab.Screen
				component={CartScreen}
				options={{
					headerShown: false,
				}}
				name="CartScreen"
			/>
			<Tab.Screen
				component={ProfileScreen}
				options={{
					headerShown: false,
				}}
				name="ProfileScreen"
			/>
		</Tab.Navigator>
	);
}


export default TabNavigator;