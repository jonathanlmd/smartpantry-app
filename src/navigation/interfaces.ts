import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
	MainScreen: undefined;
	PantryScreen: undefined;
	PantryRegistry: undefined;
	CameraScreen: {
		origin: Omit<keyof RootStackParamList, 'CameraScreen'>;
		callback: (value: String) => void;
	};
};

export type TabParamList = {
	ProductScreen: undefined;
	ProfileScreen: undefined;
	CartScreen: undefined;
};

export type RootStackRouteProps<T extends keyof RootStackParamList> = RouteProp<
	RootStackParamList,
	T
>;

export type TabRouteProps<T extends keyof TabParamList> = RouteProp<
	TabParamList,
	T
>;
