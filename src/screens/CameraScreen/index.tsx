import * as React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Button,
	SafeAreaView
} from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';

import {
	BarCodeScanner
} from 'expo-barcode-scanner';
import { RouteProp, useRoute } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/interfaces';

function Scanner({ navigation }): JSX.Element {
	const [permission, setPermission] = React.useState(false);
	const [scanned, setScanned] = React.useState(false);
	const { params } = useRoute<RouteProp<RootStackParamList, 'CameraScreen'>>();
	const [allowPop, setAllowPop] = React.useState(true);


	React.useEffect(() => {
		Camera.requestCameraPermissionsAsync().then(({
			status,
			granted
		}) => {
			setPermission(status === 'granted' && granted);
		});
	}, []);

	// const handleBarCodeScanned = React.useCallback(({ type, data }) => {
	// 	setScanned(true);
	// 	alert(`Bar code with type ${type} and data ${data} has been scanned!`)
	// }, []);

	const handleSubmitCode = React.useCallback(
		(event) => {
			let callbackParams: any;
			switch (params.origin) {
				case 'PantryRegistry':
					callbackParams = event.data;
					break;
				default:
					break;
			}

			if (allowPop) {
				setAllowPop(false);
				if (params.callback) {
					params.callback(callbackParams);
				}
				navigation.pop(1);
			}
		},
		[allowPop, navigation, params],
	);

	if (!permission) {
		return (<Text > Requesting for camera permission </Text>);
	}

	return (
		<SafeAreaView
			style={{ flex: 1 }}
		>
			<View style={
				{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}
			} >
				<BarCodeScanner onBarCodeScanned={
					scanned ? undefined : handleSubmitCode
				}
					style={
						StyleSheet.absoluteFillObject
					}
				/>
				{
					scanned && (<Button title={
						'Pressione para escanear novamente'
					}
						onPress={
							() => setScanned(false)
						}
					/>)
				}
			</View>
		</SafeAreaView>
	);
}

export default Scanner;