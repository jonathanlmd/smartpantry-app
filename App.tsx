import React from 'react';
import AnimatedSplashScreen from './src/SplashScreen';
import "./src/design";
import AppLoading from 'expo-app-loading';
import Logo from "./src/assets/logo";
import RootNavigator from './src/navigation/RootNavigator';
import { UserProvider } from './src/context/userContext';

export default function App() {
	return (
		<AnimatedAppLoader>
			<UserProvider>
				<RootNavigator />
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