import { dictionary, init, getLocaleFromNavigator } from 'svelte-i18n';
import en from '../../lang/en';
import de from '../../lang/de';

export const setupTranslations = () => {
	dictionary.set({
		en,
		de,
	});

	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator(),
	});
};
export { _, locale, getLocaleFromNavigator } from 'svelte-i18n';
