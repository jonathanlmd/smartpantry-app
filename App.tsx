import React from 'react';
import AnimatedSplashScreen from './src/SplashScreen';
import "./src/design";
import AppLoading from 'expo-app-loading';
import Logo from "./src/assets/logo";
import RootNavigator from './src/navigation/RootNavigator';
import { UserProvider } from './src/context/userContext';
import { MqttProps, MqttProvider } from './src/hooks/mqttConector';

const mqttProps: MqttProps = {
	brokerUrl: 'ws://process-mqtt.hopto.org:9001/',
	options: {
		protocol: 'ws',
		host: 'process-mqtt.hopto.org',
		port: 9001,
		path: '/mqtt',
		protocolVersion: 4
	},
}

// const mqttPropsa: MqttProps = {
// 	brokerUrl: process.env.BROKER_URL,
// 	options: {
// 		protocol: process.env.MQTT_PROTOCOL,
// 		host: process.env.BROKER_HOST,
// 		port: process.env.BROKER_PORT,
// 		path: process.env.MQTT_PATH,
// 		protocolVersion: 4
// 	},
// }


export default function App() {
	return (
		<AnimatedAppLoader>
			<UserProvider>
				<MqttProvider mqttProps={mqttProps} >
					<RootNavigator />
				</MqttProvider>
			</UserProvider>
		</AnimatedAppLoader>
	);
}


function AnimatedAppLoader({ children }): JSX.Element {
	const [isSplashReady, setSplashReady] = React.useState(false);

	React.useEffect(() => {
		if (Logo) {
			setSplashReady(true);
		}
		// Assets.fromModule(Logo).downloadAsync().then(() => {
		// 	console.log("Image loaded");
		// 	setSplashReady(true);
		// });
	}, [Logo]);

	if (!isSplashReady) {
		return (
			<AppLoading
				autoHideSplash={false}
			/>
		);
	}

	return <AnimatedSplashScreen logo={Logo}>{children}</AnimatedSplashScreen>;
}