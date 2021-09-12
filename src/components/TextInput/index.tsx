import React from "react";
import { Colors, TextField, TextProps } from "react-native-ui-lib";

function Input({
	placeholder,
	key,
	titleColor,
	editable,
	hideUnderline,
	style = undefined,
	...rest
}): JSX.Element {
	return (
		<TextField
			placeholder={placeholder}
			titleColor={titleColor}
			editable={editable}
			style={{
				width: '100%',
				borderRadius: 5,
				borderColor: Colors.black,
				paddingHorizontal: 15,
				paddingVertical: 8,
				...style,
			}}
			hideUnderline
			{...rest}
		/>
	)
}

export default Input;