import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';

import { RootStackParamList } from './interfaces';
import Login from '../screens/Login';
import MainScreen from '../Main';


const Stack = createStackNavigator<RootStackParamList>();


function RootNavigator() {
	console.log("ROOT NAVIGATOR");
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator
				key="DefaultNavigator"
				initialRouteName="MainScreen"
			>
				<Stack.Screen
					name="MainScreen"
					options={{
						headerShown: false,
					}}
					component={MainScreen}
				/>
				{/* <Stack.Screen
					name="MainScreen"
					options={{
						headerShown: false,
					}}
					component={MainScreen}
				/> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}


export default RootNavigator;