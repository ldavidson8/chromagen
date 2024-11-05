// stores/settings.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'System' | 'Light' | 'Dark';

interface Settings {
	theme: Theme;
}

const defaultSettings: Settings = {
	theme: 'System',
};

function createSettingsStore() {
	// Initialize from localStorage if in browser
	const initialSettings = browser
		? (() => {
				try {
					const stored = JSON.parse(localStorage.getItem('settings') || '{}');
					return { ...defaultSettings, ...stored };
				} catch {
					return defaultSettings;
				}
		  })()
		: defaultSettings;

	const { subscribe, set, update } = writable<Settings>(initialSettings);

	return {
		subscribe,
		setTheme: (theme: Theme) =>
			update((settings) => {
				const newSettings = { ...settings, theme };
				if (browser) {
					localStorage.setItem('settings', JSON.stringify(newSettings));

					// Update theme classes and attributes
					const newThemeValue = (() => {
						switch (theme) {
							case 'System':
								return window.matchMedia('(prefers-color-scheme: dark)').matches
									? 'dark'
									: 'light';
							case 'Light':
								return 'light';
							case 'Dark':
								return 'dark';
						}
					})();

					document.documentElement.classList.remove('light', 'dark');
					document.documentElement.classList.add(newThemeValue);
					document.documentElement.setAttribute('data-theme', newThemeValue);
				}
				return newSettings;
			}),
		cycleTheme: () => {
			update((settings) => {
				const themeOrder: Theme[] = ['System', 'Light', 'Dark'];
				const currentIndex = themeOrder.indexOf(settings.theme);
				const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

				const newSettings = { ...settings, theme: nextTheme };
				if (browser) {
					localStorage.setItem('settings', JSON.stringify(newSettings));

					const newThemeValue = (() => {
						switch (nextTheme) {
							case 'System':
								return window.matchMedia('(prefers-color-scheme: dark)').matches
									? 'dark'
									: 'light';
							case 'Light':
								return 'light';
							case 'Dark':
								return 'dark';
						}
					})();

					document.documentElement.classList.remove('light', 'dark');
					document.documentElement.classList.add(newThemeValue);
					document.documentElement.setAttribute('data-theme', newThemeValue);
				}
				return newSettings;
			});
		},
		reset: () => {
			set(defaultSettings);
			if (browser) {
				localStorage.setItem('settings', JSON.stringify(defaultSettings));
			}
		},
	};
}

export const settings = createSettingsStore();
