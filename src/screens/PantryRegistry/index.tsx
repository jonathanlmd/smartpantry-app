import React from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Platform, ToastAndroid } from 'react-native';
import {
	TextField,
	View,
	Button,
	Text,
	LoaderScreen,
	Colors,
} from 'react-native-ui-lib';
import Logo from '../../assets/logo';
import { api } from "../../services/api";
import { useUserContext } from "../../context/userContext";
import { navigate } from '../../navigation/RootNavigation';
import { Ionicons } from '@expo/vector-icons';




export default function Login() {
	const { user, setUser } = useUserContext();
	const [name, setName] = React.useState('');
	const [hash, setHash] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const codeInputRef = React.useRef(null);

	const submit = React.useCallback(async () => {
		setLoading(true);

		if (!hash || !name || !user.id) {
			setLoading(false);
			return
		}

		api.post('/pantry', {
			pantryHash: hash,
			name,
			userId: user.id,
		}).then((response) => {
			if (response.data.id) {
				setUser({
					...user,
					pantryId: response.data.id,
					pantryName: name,
				});
			}
		}).catch((error) => {
			ToastAndroid.show(error.response.data.message, 3000);
		}).finally(() => {
			setLoading(false);
		});

	}, [hash, name, user.id]);

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
					<Logo
						style={{
							flex: 2,
						}}
						height="25%"
						width="100%"
					/>
					<View
						width="100%"
					>
						<View
							style={{
								flex: 1
							}}
						>
							<TextField
								key="pantryName"
								name="pantryName"
								placeholder="Nome da Despensa"
								keyboardAppearance="dark"
								autoCapitalize="none"
								returnKeyType="next"
								autoFocus={true}
								titleColor={Colors.textColor}
								editable={true}
								style={{
									width: '100%',
									borderRadius: 5,
									borderColor: Colors.primaryColor,
									paddingHorizontal: 15,
									paddingVertical: 8,
								}}
								hideUnderline
								onChangeText={(value) => {
									setName(value);
								}}
								onSubmitEditing={() => {
									codeInputRef?.current?.focus();
								}}
							/>
							<View
								center
								row
							>
								<Button
									outline
									borderRadius={50}
									style={styles.scannerButton}
									outlineColor={Colors.primaryColor}
									onPress={() => {
										navigate('CameraScreen', {
											origin: 'PantryRegistry',
											callback: (value: string) => {
												setHash(value);
											}
										});
									}}
								>
									<Ionicons name="md-qr-code-outline" size={24} color="black" />
								</Button>
							</View>
							<Text
								text70H
								style={styles.qrLegend}
								color={!!hash ? Colors.primaryColor : Colors.black}
							>
								{!!hash ? "Feito!" : "Ler código da despensa."}
							</Text>
							{!!hash ? <Text
								text70H
								style={styles.inputCode}
								color={Colors.grey40}
							>
								{hash}
							</Text> : null}
							<Button
								backgroundColor={Colors.primaryColor}
								borderRadius={50}
								text60
								style={{
									marginTop: 10,
									width: '100%',
								}}
								onPress={() => {
									submit();
								}}
								label={'Registrar'}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
			{loading ? <LoaderScreen color={Colors.blue30} overlay /> : null}
		</KeyboardAvoidingView>
	);
}



const styles = StyleSheet.create({
	container: {
		paddingLeft: 40,
		paddingRight: 40,
	},
	contentContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: "100%",
	},
	codeView: {
		backgroundColor: "#d41818",
		alignItems: 'center',
		justifyContent: 'center'
	},
	scannerButton: {
		maxWidth: 44,
		height: 44
	},
	inputCode: {
		height: 150,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		borderRadius: 5,
		borderColor: Colors.primaryColor,
		paddingHorizontal: 14,
		paddingVertical: 8,
	},
	qrLegend: {
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		borderRadius: 5,
		borderColor: Colors.primaryColor,
		paddingHorizontal: 14,
		paddingVertical: 8,
	},
	keyboardAvoidingView: {
		flex: 1,
		overflow: 'hidden',
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