import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';

import { RootStackParamList } from './interfaces';
import CameraScreen from '../screens/CameraScreen';
import MainScreen from '../Main';


const Stack = createStackNavigator<RootStackParamList>();


function RootNavigator() {
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator
				key="StackNavigator"
				initialRouteName="MainScreen"
			>
				<Stack.Screen
					name="MainScreen"
					options={{
						headerShown: false,
					}}
					component={MainScreen}
				/>
				<Stack.Screen
					component={CameraScreen}
					options={{
						headerTitleAlign: 'center',
						headerTitle: 'Camera',
						// headerTitleStyle: {
						// color: 'white',
						// fontFamily: 'RobotoSlab-Medium',
						// },
						headerStyle: {
							elevation: 0,
						},
					}}
					name="CameraScreen"
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}


export default RootNavigator;