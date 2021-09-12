import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
	MainScreen: undefined;
	PantryScreen: undefined;
	PantryRegistry: undefined;
};

export type RootStackRouteProps<T extends keyof RootStackParamList> = RouteProp<
	RootStackParamList,
	T
>;
