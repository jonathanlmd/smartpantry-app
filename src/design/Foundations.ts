import { Colors, Typography, Spacings, Assets } from 'react-native-ui-lib';

Colors.loadColors({
	primaryColor: '#7FD671',
	secondaryColor: '#BE2F39',
	thirdColor: '#2364AA',
	fourthColor: '#81C3D7',
	textColor: '#221D23',
	errorColor: '#E63B2E',
	successColor: '#ADC76F',
	warnColor: '#FF963C',
	//Project
	// primaryColor: '#E0B457',
	// thirdColor: '#455B97',
});

Typography.loadTypographies({
	heading: { fontSize: 36, fontWeight: '600' },
	subheading: { fontSize: 28, fontWeight: '500' },
	body: { fontSize: 18, fontWeight: '400' },
});

Spacings.loadSpacings({
	page: 20,
	card: 12,
	gridGutter: 16,
});

Assets.loadAssetsGroup('icons', {
	search: 'md-checkmark-circle',
	scanner: 'qr-code-outline',
});
