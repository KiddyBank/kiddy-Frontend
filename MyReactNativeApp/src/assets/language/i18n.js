import i18n, {getLanguages} from 'react-native-i18n';
import vi from './vi';
import en from './en';

i18n.fallbacks = false;
i18n.locale = 'vi'; // ngôn ngữ mặc định
i18n.translations = {
  vi,
  en,
};
export {i18n, getLanguages}; // muốn sử dụng getLanguages phải link sang native
export const lang = str => i18n.t(str);
export const setLang = langCode => (i18n.locale = langCode);
