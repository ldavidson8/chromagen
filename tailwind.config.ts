import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', "[data-theme='dark']"],
	theme: {
		colors: {
			transparent: 'transparent',
			gray: {
				1: 'var(--gray-1)',
				2: 'var(--gray-2)',
				3: 'var(--gray-3)',
				4: 'var(--gray-4)',
				5: 'var(--gray-5)',
				6: 'var(--gray-6)',
				7: 'var(--gray-7)',
				8: 'var(--gray-8)',
				9: 'var(--gray-9)',
				10: 'var(--gray-10)',
				11: 'var(--gray-11)',
				12: 'var(--gray-12)',
			},
		},
		extend: {
			fontSize: {
				xs: '0.8125rem',
			},
			fontFamily: {
				sans: ['Inter Variable', ...fontFamily.sans],
				manrope: ['Manrope Variable', ...fontFamily.sans],
			},
			boxShadow: {
				border: '0 0 0 1px hsla(0, 0%, 100%, 0.14)',
				card: '0px 0px 0px 1px #0E3F7E08, 0px 1px 1px -0.5px #2A334508,0px 3px 3px -1.5px #2A334608,0px 6px 6px -3px #2A334608,0px 12px 12px -6px #0E3F7E08,0px 24px 24px -12px #0E3F7E10',
			},
			transitionTimingFunction: {
				ease: 'ease',
			},
			backgroundImage: {
				'gradient-radial':
					'radial-gradient(circle_at_center,_var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
				rainbow:
					'conic-gradient(from 90deg, rgb(255, 0, 0), rgb(255, 128, 0), rgb(255, 255, 0), rgb(128, 255, 0), rgb(0, 255, 0), rgb(0, 255, 128), rgb(0, 255, 255), rgb(0, 128, 255), rgb(0, 0, 255), rgb(128, 0, 255), rgb(255, 0, 255), rgb(255, 0, 128), rgb(255, 0, 0))',
			},
			zIndex: {
				999: '999',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};

export default config;
