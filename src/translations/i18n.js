import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

import translationAR from './ar/translation.json';
import translationEN from './en/translation.json';
const resources = {
  ar: {
    translation: translationAR,
  },
  en: {
    translation: translationEN,
  },
};
i18n
  // .use(new Backend(null, {
  //   loadPath: './{{lng}}/{{ns}}.json'
  // }))
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    resources,
    debug: true,
    react: { useSuspense: false },
  });

  export default i18n;