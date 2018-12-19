import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import I18n from './i18n/I18nString'
import 'element-ui/lib/theme-chalk/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faSave, faTrashAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.use(ElementUI)
Vue.use(VueI18n)

const messages = I18n
let lang = navigator.language.substr(0, 2)
if (!messages.hasOwnProperty(lang)) {
  lang = 'en'
}
const i18n = new VueI18n({
  locale: lang,
  messages
})

library.add(faEdit, faSave, faTrashAlt, faUndoAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
