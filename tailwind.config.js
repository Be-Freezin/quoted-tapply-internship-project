/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'black-primary-100': '#232020',
				'black-primary-80': '#393535',
				'black-primary-70': '#575050',
				'black-primary-60': '#736A6A',
				'black-primary-50': '#958585',
				'black-primary-trans': 'rgba(35, 32, 32, 0.4)',

				'white-primary-100': '#FFFBFC',
				'white-primary-80': '#EBE8E9',
				'white-primary-70': '#D9D7D7',
				'white-primary-60': '#BBBABA',
				'white-primary-trans': 'rgba(255, 251, 252, 0.4)',

				'red-primary-100': '#FF483D',
				'red-primary-80': '#FE5F55',
				'red-primary-70': '#FF7971',
				'red-primary-60': '#FFA19B',
				'red-primary-trans': 'rgba(255, 72, 61, 0.4)',

				'blue-primary-100': '#37C0E1',
				'blue-primary-80': '#5BC2DB',
				'blue-primary-70': '#6DC5DA',
				'blue-primary-60': '#9AC9D4',

				'yellow-primary-100': '#EECC44',
				'yellow-primary-80': '#E3C341',
				'yellow-primary-70': '#D8B93C',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			keyframes: {
				rainbow: {
					'0%': {
						borderColor: '#f00',
					},
					'16.66%': {
						borderColor: '#ff0',
					},
					'33.33%': {
						borderColor: '#0f0',
					},
					'50%': {
						borderColor: '#0ff',
					},
					'66.66%': {
						borderColor: '#00f',
					},
					'83.33%': {
						borderColor: '#f0f',
					},
					'100%': {
						borderColor: '#f00',
					},
				},
			},
			animation: {
				rainbow: 'rainbow 3s linear infinite',
			},
		},
	},

	plugins: [],
}
