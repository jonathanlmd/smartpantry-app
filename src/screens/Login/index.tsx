import React from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import {
	Checkbox,
	TextField,
	View,
	Text,
	Button,
	LoaderScreen,
	Colors,
} from 'react-native-ui-lib';
import Logo from '../../assets/logo';
import { api } from "../../services/api";
import { useUserContext } from "../../context/userContext";




export default function Login() {
	const [username, setUsername] = React.useState('');
	const { setUser } = useUserContext();
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
	const [newUser, setNewUser] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const passwordRef = React.useRef(null);
	const confirmPasswordRef = React.useRef(null);

	const submit = React.useCallback(async () => {
		console.log('SUBMIT');
		if (newUser && confirmPassword !== password) {
			setConfirmPasswordError('Senhas não coincidem.')
		}

		const user = await api.post(newUser ? '/new-user' : '/login');
		setUser(user.data);

		// if (!user.data.pantryId) {
		// 	navigate("PantryRegistry");
		// } else {
		// 	navigate("PantryScreen");
		// }

	}, []);

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
							row
							right
							width="100%"
							style={{
								paddingBottom: 20,
								marginTop: 0,
								paddingTop: 0,
								flex: 1
							}}
						>
							<Text
								text70L
								center
								style={{
									paddingRight: 10,
								}}
							>
								Sou um novo usuário:
							</Text>
							<Checkbox
								color={Colors.primaryColor}
								value={newUser}
								onValueChange={() => {
									setNewUser((old) => !old);
								}}
							/>
						</View>
						<View
							style={{
								flex: 9
							}}
						>
							<TextField
								key="username"
								name="username"
								placeholder="Nome de usuário"
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
									setUsername(value);
								}}
								onSubmitEditing={() => {
									passwordRef.current.focus();
								}}
							/>
							<TextField
								key="password"
								name="password"
								ref={passwordRef}
								titleColor={Colors.textColor}
								autoCapitalize="none"
								placeholder="Digite seu senha."
								secureTextEntry={true}
								returnKeyType={newUser ? 'next' : 'send'}
								editable={true}
								style={{
									width: '100%',
									borderRadius: 5,
									borderColor: Colors.primaryColor,
									paddingHorizontal: 15,
									paddingVertical: 8,
								}}
								onChangeText={(value) => {
									setPassword(value);
								}}
								hideUnderline
								onSubmitEditing={() => {
									if (newUser) {
										confirmPasswordRef.current.focus();
									} else {
										submit();
									}
								}}
							/>
							{newUser ? (
								<TextField
									key="confirm-password"
									placeholder="Confirme sua senha"
									ref={confirmPasswordRef}
									secureTextEntry={true}
									titleColor={Colors.textColor}
									autoCapitalize="none"
									helperText="Digite seu Confirmação de Senha."
									editable={true}
									returnKeyType="send"
									validate={['required', (value) => value === password]}
									errorMessage={['Confirmação é obrigatória', 'erradas']}
									onChangeText={(value) => {
										setConfirmPassword(value);
									}}
									style={{
										width: '100%',
										borderRadius: 5,
										borderColor: Colors.primaryColor,
										paddingHorizontal: 15,
										paddingVertical: 8,
									}}
									hideUnderline
								/>
							) : null}
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
								label={newUser ? 'Cadastrar' : 'Entrar'}
							></Button>
						</View>
					</View>
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