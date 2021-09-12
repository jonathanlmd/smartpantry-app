import React from 'react';
import { useUserContext } from './context/userContext';
import Login from './screens/Login';
import PantryRegistry from './screens/PantryRegistry';
import PantryScreen from './screens/PantryScreen';


function Main(): JSX.Element {
	const { user } = useUserContext();

	if (!user.name) {
		return (
			<Login />
		)
	}

	if (!user.pantryId) {
		return (
			<PantryRegistry />
		)
	}

	return (
		<PantryScreen />
	);
}

export default Main;