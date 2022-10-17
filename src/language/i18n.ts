import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import messages from './index'
const language = (
  navigator.language || "ch"
).toLowerCase();

let lang = localStorage.getItem('language') || 'en'

const i18n = createI18n({
  silentTranslationWarn: true,
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  locale: lang,
  messages,
});

export default i18n