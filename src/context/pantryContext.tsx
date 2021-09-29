import React from "react";

export interface Product {
	id?: string,
	barcode: string,
	name: string,
	quantity: number,
	hide: boolean,
	image: string,
	brand: string,
	unity: string,
	averagePrice: number | string,
}

interface Pantry {
	items: Product[];
	cartList: Product[];
}
interface ProviderProps { pantry?: Pantry, children: React.ReactNode }

interface PantryContext {
	updateItems(items: Product[]): void;
	updateQuantity(id: string, quantity: number): void;
	updateCartList(items: Product[]): void;
	deleteItem(id: string): void;
	pantry: Pantry;
}

const PantryContext = React.createContext<PantryContext>({} as PantryContext);

export function PantryProvider({ children, pantry }: ProviderProps): JSX.Element {
	const [cartList, setCartList] = React.useState<Product[]>([] as Product[])
	const [items, setItems] = React.useState<Product[]>([] as Product[])


	const updateItems = React.useCallback((items: Product[]) => {
		setItems(old => [...old, ...items]);
	}, [])

	const hideItem = React.useCallback((barcode: string) => {
		const index = items.findIndex(element => element.barcode === barcode)
		if (index >= 0) {
			items[index].hide = true;
			setItems([...items])
		}
	}, [])


	const updateQuantity = React.useCallback((barcode: string, quantity: number) => {
		const itemIndex = items.findIndex(element => element.barcode === barcode);
		if (itemIndex >= 0) {
			const updateCart = items[itemIndex].quantity === 0 && quantity > 0 ? true : false;
			items[itemIndex].quantity += quantity;
			setItems([...items]);
			if (items[itemIndex].quantity === 0) {
				cartList.push(items[itemIndex])
				setCartList([...cartList]);
			}
			if (updateCart) {
				const index = cartList.findIndex(element => element.barcode === barcode)
				cartList.splice(index, 1);
				setCartList([...cartList]);
			}
		}
	}, [items, cartList])

	const deleteItem = React.useCallback((barcode: string) => {
		setItems(old => old.filter(element => element.barcode !== barcode));
		setCartList(old => old.filter(element => element.barcode !== barcode));
	}, [])

	const updateCartList = React.useCallback((items: Product[]) => {
		setCartList(old => [...old, ...items]);
	}, [])

	return (
		<PantryContext.Provider
			value={{
				pantry: {
					cartList,
					items,
				},
				updateItems,
				hideItem,
				updateQuantity,
				deleteItem,
				updateCartList,
			}}
		>
			{children}
		</PantryContext.Provider>
	)
}


export function usePantryContext(): PantryContext {
	const context = React.useContext(PantryContext)

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}

	return context
}