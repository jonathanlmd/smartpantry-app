import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import { RootStackParamList, RootStackRouteProps } from './interfaces';
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: keyof RootStackParamList, params?: any) {
	navigationRef.current?.navigate(name, params);
}
