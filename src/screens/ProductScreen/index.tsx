import React from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Platform, LayoutAnimation, Alert, ToastAndroid } from 'react-native';
import {
	View,
	Text,
	LoaderScreen,
	Colors,
	Drawer,
	Avatar,
	Button,
} from 'react-native-ui-lib';
import { FlatList, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useUserContext } from "../../context/userContext";
import conversations from './conversation';
import Item from './Item';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/api';
import { Product, usePantryContext } from '../../context/pantryContext';


function ProductScreen() {
	const [loading, setLoading] = React.useState(false);
	const { user } = useUserContext();
	const { pantry, deleteItem: deleteProduct } = usePantryContext();

	React.useEffect(() => {
		console.log(pantry);
	}, [pantry])


	const ITEMS = {
		delete: {
			icon: require('../../assets/logo.png'),
			text: 'Delete',
			background: Colors.red30,
			testID: "right_item_delete",
			customElement: <Ionicons name="trash" color={Colors.white} size={30} ></Ionicons>
		}
	};

	const deleteItem = React.useCallback((barcode: string) => {
		setTimeout(() => {
			LayoutAnimation.configureNext({
				update: {
					type: LayoutAnimation.Types.easeInEaseOut,
					property: LayoutAnimation.Properties.scaleY
				},
				delete: {
					type: LayoutAnimation.Types.easeInEaseOut,
					property: LayoutAnimation.Properties.scaleY,
					duration: 2000
				},
				duration: 120
			});
			// hideItem(barcode);
			api.delete(`pantry/delete-item/${user.pantryId}/${barcode}`).then(() => {
				deleteProduct(barcode)
			}).catch((error) => {
				ToastAndroid.show(error?.response?.data?.message, 3000);
			})
		}, 200);
	}, []);


	const renderItem = (data: Product, index) => {
		return (
			<Item
				index={index}
				item={data}
			>
				{(menuShowing: boolean, closePanels: () => void, openPanels: () => void) => !data.hide && (
					<Drawer key={Date.now()}
						leftItem={{ ...ITEMS.delete, onPress: () => deleteItem(data.barcode) }}
						onWillFullSwipeLeft={deleteItem}
						itemsIconSize={20}
					>
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
										R$ {Number.parseFloat(data.averagePrice.toString()).toFixed(2)}
									</Text>
									<Text text80 marginT-2>
										Quantidade: {data.quantity}
									</Text>
								</View>
								<View style={{ flex: 1, alignItems: 'flex-start', marginRight: 4 }} centerV >
									{!menuShowing &&
										<Button
											iconSource={(iconStyle) => (
												<Ionicons name='md-chevron-back' size={25}
													style={{
														marginLeft: 1
													}}

												/>
											)}
											style={{
												height: 35,
												width: 35,
											}}
											center
											outline
											outlineColor={Colors.transparent}
											onPress={() => { openPanels() }} />}
								</View>
							</View>
						</View>
					</Drawer>
				)}
			</Item>
		)
	}


	return (
		<KeyboardAvoidingView
			style={styles.keyboardAvoidingView}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={10}
			enabled>
			<FlatList
				data={pantry.items}
				keyExtractor={(value) => value.name}
				renderItem={({ item, index }) => renderItem(item, index)}
			/>
			{loading ? <LoaderScreen color={Colors.blue30} overlay /> : null}
		</KeyboardAvoidingView>
	);
}


export default gestureHandlerRootHOC(ProductScreen);

const styles = StyleSheet.create({
	scaffolding: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 50
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