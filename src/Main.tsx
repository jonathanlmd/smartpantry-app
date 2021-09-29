import React from 'react';
import { useUserContext } from './context/userContext';
import Login from './screens/Login';
import PantryRegistry from './screens/PantryRegistry';
import PantryScreen from './navigation/TabNavigation';
import { SafeAreaView } from 'react-native';
import { PantryProvider } from './context/pantryContext';


function Main({ navigation }): JSX.Element {
	const { user } = useUserContext();

	if (!user.id) {
		return (
			<SafeAreaView
				style={{ flex: 1 }}
			>
				<Login />
			</SafeAreaView>
		)
	}

	if (!user.pantryId) {
		return (
			<SafeAreaView
				style={{ flex: 1 }}
			>
				<PantryRegistry />
			</SafeAreaView>
		)
	}

	return (
		<PantryProvider>
			<SafeAreaView
				style={{ flex: 1 }}
			>
				<PantryScreen />
			</SafeAreaView>
		</PantryProvider>
	);
}

export default Main;