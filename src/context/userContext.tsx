import React from "react";


interface User {
	id: String | null;
	name: String | null;
	pantryId: String | null;
	pantryName: String | null;
	pantryHash: String | null;
}
interface ProviderProps { user?: User, children: React.ReactNode }

interface UserContext {
	setUser(user: User): void;
	user: User;
}

const UserContext = React.createContext<UserContext>({} as UserContext);

export function UserProvider({ children, user }: ProviderProps): JSX.Element {
	const [data, setData] = React.useState<User>(user || {
		id: null,
		name: null,
		pantryId: null,
		pantryName: null,
		pantryHash: null,
	})

	const setUser = React.useCallback((userData: User) => {
		setData(userData);
	}, [])

	return (
		<UserContext.Provider
			value={{
				user: data,
				setUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}


export function useUserContext(): UserContext {
	const context = React.useContext(UserContext)

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}

	return context
}