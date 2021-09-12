import React from 'react';
import { useUserContext } from './context/userContext';
import Login from './screens/Login';
import PantryRegistry from './screens/PantryRegistry';
import PantryScreen from './navigation/TabNavigation';
import { SafeAreaView } from 'react-native';


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
		<SafeAreaView
			style={{ flex: 1 }}
		>
			<PantryScreen />
		</SafeAreaView>
	);
}

export default Main;