import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementKoLocale from 'element-ui/lib/locale/lang/ko' // element-ui lang
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import koLocale from './ko'
import enLocale from './en'

Vue.use(VueI18n)

const messages = {
  ko: {
    ...koLocale,
    ...elementKoLocale
  },
  en: {
    ...enLocale,
    ...elementEnLocale
  }
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  // 언어 기본값
  return 'ko'
}
const i18n = new VueI18n({
  // set locale
  // options: ko | en
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
