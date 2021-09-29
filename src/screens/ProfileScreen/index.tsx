import React from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import {
	View,
	Text,
	LoaderScreen,
	Colors,
	Avatar,
} from 'react-native-ui-lib';
import { navigate } from '../../navigation/RootNavigation';
import { api } from "../../services/api";
import { useUserContext } from "../../context/userContext";
import { FlatList } from 'react-native-gesture-handler';
import { Product, usePantryContext } from '../../context/pantryContext';




export default function Login() {
	const { user } = useUserContext();
	const [loading, setLoading] = React.useState(false);
	const { pantry } = usePantryContext();

	const renderItem = (data: Product, index) => {
		return (
			<View
				bg-grey80
				paddingH-20
				paddingV-10
				row
				flex
				centerV
				style={{ borderBottomWidth: 1, borderColor: Colors.grey60 }}
			>
				{/* <Badge testID="drawer_item_badge" size={'pimpleSmall'} backgroundColor={Colors.red30} containerStyle={{ marginRight: 8 }} /> */}
				<Avatar
					source={{ uri: data.image }} />
				<View
					row flex style={{ paddingLeft: 12 }} flexG>
					<View flex flexG style={{ flex: 9 }} >
						<Text text70BO>{data.name}</Text>
						<Text text80 marginT-2>
							{data.averagePrice}
						</Text>
						<Text text80 marginT-2>
							Quantidade: {data.quantity}
						</Text>
					</View>
				</View>
			</View>
		)
	}


	return (
		<KeyboardAvoidingView
			style={styles.keyboardAvoidingView}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={10}
			enabled>
			<FlatList
				data={pantry.cartList}
				keyExtractor={(value) => value.barcode}
				renderItem={({ item, index }) => renderItem(item, index)}
			/>
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