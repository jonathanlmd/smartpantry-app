import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import { TabParamList } from './interfaces';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib';
import { useUserContext } from '../context/userContext';
import { Product, usePantryContext } from '../context/pantryContext';
import { api } from '../services/api';
import { useMqtt } from '../hooks/mqttConector';



const Tab = createBottomTabNavigator<TabParamList>()

function TabNavigator() {

	const { user } = useUserContext();
	const { subscribe, unsubscribe } = useMqtt()
	const { updateCartList, updateItems, updateQuantity, pantry } = usePantryContext()

	const messageCallback = React.useCallback(({ topic, payload, packet, error }) => {
		const bipedItem: Product = JSON.parse(payload);
		const existentItem = pantry.items.find((item) => item.barcode === bipedItem.barcode);
		if (existentItem) {
			console.log("Aqui");
			updateQuantity(bipedItem.barcode, 1)
		} else {
			console.log("Else");
			updateItems([{
				...bipedItem, quantity: 1
			}]);
		}
	}, [])

	React.useEffect(() => {
		console.log(`pantry.added.${user.pantryHash}`)
		subscribe(`pantry.added.${user.pantryHash}`, { nl: true, qos: 0 }, (topic, payload, packet, error) => messageCallback({ topic, payload, packet, error }))

		return () => {
			unsubscribe(`pantry.added${user.pantryHash}`)
		}
	}, [])

	React.useEffect(() => {
		api.get<{ items: Product[] }>(`/pantry/items/${user.id}`).then((response) => {
			updateItems(response.data.items);
			updateCartList(response.data.items.filter(item => item.quantity === 0));
		})
	}, [])

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
					headerTitle: `${user.pantryName}`,
					headerStyle: {
						elevation: 0,
					},
				}}
				component={ProductScreen}
			/>
			<Tab.Screen
				component={CartScreen}
				options={{
					headerTitle: `Carrinho de Compras`,
					headerStyle: {
						elevation: 0,
					},
				}}
				name="CartScreen"
			/>
		</Tab.Navigator>
	);
}


export default TabNavigator;