import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.withCredentials = false
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'Accept': 'application/json'
}

axios.defaults.baseURL = '/localdebug'
let lang = navigator.language.substr(0, 2)

export function request (dom, opt) {
  if (!opt['method']) {
    opt['method'] = 'get'
  }
  if (opt['method'] === 'get' || !opt['dataType']) {
    opt['dataType'] = 'form'
  }
  if (!opt['headers']) {
    opt['headers'] = {}
  }
  let qs = require('qs')
  switch (opt['dataType']) {
    case 'json':
      opt['headers']['Content-Type'] = 'application/json;charset=UTF-8'
      break
    case 'xml':
      opt['headers']['Content-Type'] = 'application/xml;charset=UTF-8'
      break
    default:
      opt['headers']['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      if (opt['method'] !== 'get') {
        opt['params'] = qs.stringify(opt['params'])
      }
      break
  }
  baseRequest(dom, opt)
}

function baseRequest (dom, opt) {
  let config = {
    'url': opt['url'],
    'method': opt['method'],
    'headers': opt['headers']
  }
  config.headers['lang'] = lang
  if (opt['method'] === 'get') {
    config['params'] = opt['params']
  } else {
    config['data'] = opt['params']
  }
  axios.request(config).then(function (resp) {
    if (opt['success']) {
      opt.success(dom, resp.data, opt.ext)
    }
  }).catch(function (error) {
    console.log(error)
    if (opt['error']) {
      opt.error(dom, error, opt.ext)
    }
  })
}
