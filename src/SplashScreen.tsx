import React from "react";
import {
	Animated,
	StyleSheet,
	View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import Logo from "./assets/logo";

function AnimatedSplashScreen({ children, logo }): JSX.Element {
	const animation = React.useMemo(() => new Animated.Value(1), []);
	const [isAppReady, setAppReady] = React.useState(false);
	const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
		false
	);

	React.useEffect(() => {
		console.log(isAppReady);
		if (isAppReady) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start(() => setAnimationComplete(true));
		}
	}, [isAppReady]);

	React.useEffect(() => {
		SplashScreen.hideAsync().then(() => {
			// Load stuff
		}).finally(() => {
			setTimeout(() => {
				setAppReady(true);
			}, 200);
		});
	}, []);


	return (
		<View style={{ flex: 1 }}>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents="none"
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Constants.manifest.splash.backgroundColor,
							opacity: animation,
							alignItems: 'center',
							justifyContent: 'center',
						},
					]}
				>
					<Logo width='70%' />
				</Animated.View>
			)}
		</View>
	);
}

export default AnimatedSplashScreen;