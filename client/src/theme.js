import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#2563EB',
			dark: '#1D4ED8',
			light: '#60A5FA',
			contrastText: '#FFFFFF',
		},
		secondary: {
			main: '#10B981',
		},
		background: {
			default: '#F6F8FB',
			paper: '#FFFFFF',
		},
		text: {
			primary: '#0F172A',
			secondary: '#475569',
		},
		divider: 'rgba(15, 23, 42, 0.10)',
	},
	typography: {
		fontFamily: [
			'Inter',
			'system-ui',
			'-apple-system',
			'Segoe UI',
			'Roboto',
			'Helvetica',
			'Arial',
			'sans-serif',
		].join(','),
		h5: { fontWeight: 700 },
		h6: { fontWeight: 700 },
		button: {
			textTransform: 'none',
			fontWeight: 600,
		},
	},
	shape: {
		borderRadius: 12,
	},
	overrides: {
		MuiPaper: {
			rounded: {
				borderRadius: 16,
			},
			elevation1: {
				boxShadow:
					'0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.08)',
			},
		},
		MuiButton: {
			root: {
				borderRadius: 12,
				height: 44,
				paddingLeft: 16,
				paddingRight: 16,
			},
			containedPrimary: {
				boxShadow: 'none',
			},
		},
		MuiOutlinedInput: {
			root: {
				borderRadius: 12,
				backgroundColor: '#FFFFFF',
			},
		},
	},
})

theme = responsiveFontSizes(theme)

export default theme
