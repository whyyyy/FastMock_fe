import i18n from '../i18n/I18nString'

// export async function confirmAct (dom, msg) {
//   console.log(111)
//   await dom.$confirm(msg, i18n.getMsg('notice'), {
//     confirmButtonText: i18n.getMsg('yes'),
//     cancelButtonText: i18n.getMsg('no'),
//     type: 'warning'
//   }).then(() => {
//     console.log(222)
//     return true
//   }).catch(() => {
//     console.log(333)
//     return false
//   })
// }

export function confirm (dom, msg, callback, ext) {
  dom.$confirm(msg, i18n.getMsg('notice'), {
    confirmButtonText: i18n.getMsg('yes'),
    cancelButtonText: i18n.getMsg('no'),
    type: 'warning'
  }).then(() => {
    callback.confirm(dom, ext)
  }).catch(() => {
    callback.cancel(dom, ext)
  })
}

export class Notification {
  constructor (dom) {
    this.curNotification = ''
    this.notifyError = function (msg, duration = 10000) {
      if (this.curNotification) {
        this.curNotification.close()
      }
      dom.$notify.error({
        title: '错误',
        message: msg,
        duration: duration
      })
    }
    this.notifyLoading = function (msg) {
      this.curNotification = dom.$notify.info({
        title: '消息',
        message: msg,
        duration: 0
      })
    }
    this.notifySuccess = function (msg) {
      if (this.curNotification) {
        this.curNotification.close()
      }
      dom.$notify({
        title: '成功',
        message: msg,
        type: 'success'
      })
    }
  }
}
