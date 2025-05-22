import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';

const resources = {
en: { translation: translationEN },
hi: { translation: translationHI },
};

i18n
.use(initReactI18next)
.init({
resources,
lng: 'en', // default language
fallbackLng: 'en',
interpolation: {
escapeValue: false, // React already escapes
},
});

export default i18n;