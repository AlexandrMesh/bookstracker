import i18n from 'i18next';
import general from './locales/ru/general.json';

i18n.init({
  lng: 'ru',
  whitelist: ['ru'],
  resources: {
    ru: {
      general,
    },
  },
});

export const getT = (namespace) => i18n.getFixedT(i18n.language, namespace);

export default i18n;
