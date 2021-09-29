import React, { Children, useCallback } from 'react'
import { I18nManager, PanResponder, Animated } from 'react-native';
import { Value } from 'react-native-reanimated';
import { Colors, View, TouchableOpacity, Text, Button, ButtonSize, Constants } from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons';
import { updateConstants } from 'react-native-ui-lib/generatedTypes/src/helpers/Constants';
import { usePantryContext } from '../../context/pantryContext';
import { api } from '../../services/api';
import { useUserContext } from '../../context/userContext';

const INITIAL_WIDTH = 40;

const DIRECTIONS = {
	LEFT: 'left',
	RIGHT: 'right'
};


function Item({ item, index, children }) {
	const [direction, setDirection] = React.useState<string | boolean | undefined>();
	const [rightPanel, setRightPanel] = React.useState(false);
	const [leftPanel, setLeftPanel] = React.useState(false);
	const [rightPanelWidth, setRightPanelWidth] = React.useState(INITIAL_WIDTH);
	const { updateQuantity } = usePantryContext();
	const { user } = useUserContext();
	const [animationValue, setAnimationValue] = React.useState<
		Animated.AnimatedValue | Animated.AnimatedValueXY
	>(new Animated.Value(0));

	const handleMoveShouldSetPanResponder = useCallback((e, gestureState) => {
		// return true if user is swiping, return false if it's a single click
		const { dx, dy } = gestureState;
		return dx > 4 || dx < -4 || dy > 4 || dy < -4;
	}, []);

	const handlePanResponderMove = (e, gestureState) => {
		if (gestureState.dx < 0 && direction !== DIRECTIONS.LEFT) {
			setDirection(I18nManager.isRTL ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT)
		} else if (gestureState.dx > 0 && direction !== DIRECTIONS.RIGHT) {
			setDirection(I18nManager.isRTL ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT)
		}
	};

	const handlePanResponderEnd = (e, gestureState) => {
		animate();
		setDirection(undefined);
	};

	const panResponder = PanResponder.create({
		onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
		onPanResponderMove: handlePanResponderMove,
		onPanResponderRelease: handlePanResponderEnd,
		onPanResponderTerminate: handlePanResponderEnd
	});

	const closePanels = useCallback(() => {
		console.log("Close")
		if (rightPanel) {
			animate(DIRECTIONS.RIGHT);
		}
		if (leftPanel) {
			animate(DIRECTIONS.LEFT);
		}
	}, [])
	const openPanels = useCallback(() => {
		console.log("Open")
		if (!rightPanel) {
			animate(DIRECTIONS.LEFT);
		}
	}, [])


	const animate = (panelDirection = null) => {
		let localDirection = direction;
		if (panelDirection) {
			localDirection = panelDirection;
			setDirection(panelDirection)
		}

		console.log("ANIMATING", localDirection, rightPanel, leftPanel);

		if (localDirection === DIRECTIONS.LEFT && !rightPanel) { // open rightPanel
			Animated.spring(animationValue, {
				toValue: 1,
				speed: 2000,
				bounciness: 0,
				useNativeDriver: false,
			}).start();
			setTimeout(() => {
				setRightPanelWidth(Constants.screenWidth - 100);
			}, 100);
			setRightPanel(old => !old);
		} else if (localDirection === DIRECTIONS.RIGHT && rightPanel) { // close rightPanel
			setRightPanelWidth(INITIAL_WIDTH);
			Animated.spring(animationValue, {
				toValue: 0,
				speed: 20,
				bounciness: 0,
				delay: 500,
				useNativeDriver: false,
			}).start();
			setRightPanel(old => !old);
		}
	}

	// const update = React.useCallback((barcode, value) => {
	// 	setLoad
	// },[])

	const renderRightPanel = () => {

		if (rightPanelWidth <= INITIAL_WIDTH) return

		return (
			<Animated.View
				style={{
					position: 'absolute',
					top: 0, left: 0, right: 0, bottom: 0,
					justifyContent: 'center',
					alignItems: 'flex-end',
					marginRight: 12,
					opacity: animationValue,
					transform: [
						{ scale: animationValue }
					]
				}}
			>
				<View
					style={{
						overflow: 'hidden',
						height: INITIAL_WIDTH,
						width: rightPanelWidth,
						backgroundColor: Colors.rgba(Colors.secondaryColor, 0.9),
						borderRadius: 20,
					}}
					centerV
				>
					{rightPanelWidth > INITIAL_WIDTH &&
						<View row spread paddingH-16 centerV >
							<Button
								round
								backgroundColor="transparent"
								onPress={() => {
									// animate(DIRECTIONS.RIGHT);
									updateQuantity(item.barcode, 1)
									api.put(`/pantry/item-quantity`, {
										pantryId: user.pantryId,
										barcode: item.barcode,
										quantity: item.quantity + 1
									})
								}}
								iconSource={() => (
									<Ionicons name='md-add' size={25}
										style={{
											marginLeft: 1,
											color: Colors.white,
										}}
									/>
								)}
							/>
							<View row centerV style={{
								alignItems: 'flex-end'
							}}>
								<Text text80 marginT-2 color={Colors.white}>
									{item.quantity}
								</Text>
							</View>
							<View row centerV style={{
								alignItems: 'flex-end'
							}}>
								<Button
									iconSource={() => (
										<Ionicons name='remove-outline' size={25}
											style={{
												marginLeft: 1,
												marginTop: -2,
												color: Colors.white,
											}}
										/>
									)}
									round
									backgroundColor="transparent"
									onPress={() => {
										if (item.quantity > 0) {
											// animate(DIRECTIONS.RIGHT);
											updateQuantity(item.barcode, -1)
											api.put(`/pantry/item-quantity`, {
												pantryId: user.pantryId,
												barcode: item.barcode,
												quantity: item.quantity - 1
											})
										}
									}}
								/>
								<Button
									round
									backgroundColor="transparent"
									onPress={() => {
										animate(DIRECTIONS.RIGHT);
									}}
									iconSource={() => (
										<Ionicons name='md-close' size={25}
											style={{
												marginLeft: 1,
												color: Colors.white,
											}}
										/>
									)}
								/>
							</View>
						</View>}
				</View>
			</Animated.View>
		);
	}


	return (
		<View
			style={{
				backgroundColor: Colors.white,
				borderBottomColor: Colors.dark70
			}}
			{...panResponder.panHandlers}
		>
			{children(rightPanel, closePanels, openPanels)}
			{renderRightPanel()}
		</View>
	)
}

export default Item;
