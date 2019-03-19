// i18n-setup.js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from 'lang'; // 语言包的地址，随项目本身设置修改
import axios from 'axios'; // 根据项目中使用api请求模块去设置，不一定是axios

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'zh-cn', // set locale
  fallbackLocale: 'zh-cn',
  messages // set locale messages
});

const loadedLanguages = ['zh-cn']; // our default language that is preloaded

function setI18nLanguage (lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang; // 设置请求头部
  document.querySelector('html').setAttribute('lang', lang); // 根元素增加lang属性
  return lang;
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      });
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}

window.setLang = setI18nLanguage;
