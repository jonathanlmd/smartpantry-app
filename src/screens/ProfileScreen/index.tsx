import React from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import {
	View,
	Text,
	LoaderScreen,
	Colors,
} from 'react-native-ui-lib';
import { navigate } from '../../navigation/RootNavigation';
import { api } from "../../services/api";
import { useUserContext } from "../../context/userContext";




export default function Login() {
	const { user } = useUserContext();
	const [loading, setLoading] = React.useState(false);


	return (
		<KeyboardAvoidingView
			style={styles.keyboardAvoidingView}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={10}
			enabled>
			<ScrollView
				contentContainerStyle={styles.contentContainerStyle}
				style={styles.container}
			>
				<View
					style={styles.innerContainer}
					width="100%"
					height="100%"
				>
					<Text>Tela de perfil</Text>
				</View>
			</ScrollView>
			{loading ? <LoaderScreen color={Colors.blue30} overlay /> : null}
		</KeyboardAvoidingView>
	);
}



const styles = StyleSheet.create({
	scaffolding: {
		flex: 1,
	},
	container: {
		paddingLeft: 40,
		paddingRight: 40,
	},
	contentContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: "100%",
	},
	keyboardAvoidingView: {
		flex: 1,
		overflow: 'hidden',
	},
	alignText: {
		textAlign: 'center',
	},
	innerContainer: {
		flex: 1,
		height: "100%",
		width: "100%",
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 8,
	}
});