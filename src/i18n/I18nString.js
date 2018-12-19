import zh from './StringTableZh'
import en from './StringTableEn'

export default {
  zh,
  en,
  getMsg
}

function getMsg (msg) {
  if (navigator.language.substr(0, 2) === 'zh') {
    return zh.message[msg]
  } else {
    return en.message[msg]
  }
}
