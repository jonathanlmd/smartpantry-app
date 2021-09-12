import { ThemeManager } from 'react-native-ui-lib';

ThemeManager.setComponentTheme('Card', {
	borderRadius: 8,
});

ThemeManager.setComponentTheme('Button', (props, context) => {
	if (props.square) {
		return {
			borderRadius: 1,
			textColor: true,
		};
	}
});
