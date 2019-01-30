<template>
  <div>
    <el-container>
      <el-header class="fmindex">
        <el-row>
          <el-col :span="4">
            <p class="h1">FastMock</p>
          </el-col>
          <el-col :span="2" :offset="18" style="text-align: right">
            <el-switch class="fswi" v-model="mockStat" active-color="#13ce66" inactive-color="#ff4949" style="margin-top: 16px;"
            :active-value="1" :inactive-value="0" :active-text="$t('message.on')" :inactive-text="$t('message.off')" @change="turnMock"/>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 0px">
        <home class="home"/>
      </el-main>
    </el-container>
  </div>
</template>

<style>
  .fmindex{
    background-color: #545c64;
    color: #fff;
    height: 54px;
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    margin: 0px;
  }
  .home{
    margin-top: 54px;
  }
  .fswi .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  .fswi .el-switch__label--left {
    z-index: 9;
    left: 20px;
  }
  .fswi .el-switch__label--right {
    z-index: 9;
    left: -5px;
  }
  .fswi .el-switch__label.is-active {
    display: block;
    color: #fff;
  }
</style>

<script>
import home from './views/Home'
import { request } from './util/Request'
import { Notification } from './util/PageAct'
import i18n from './i18n/I18nString'

export default {
  name: 'app',
  components: {
    home
  },
  mounted () {
    this.initMock()
  },
  data () {
    return {
      mockStat: 1,
      notf: new Notification(this)
    }
  },
  methods: {
    initMock () {
      let opt = {
        url: '/mock/conf',
        method: 'post',
        dataType: 'form',
        params: { method: 'getMockStatus' },
        success (dom, resp) {
          if (resp.code === 0) {
            dom.mockStat = resp.data.value
          } else {
            dom.notf.notifyError(i18n.getMsg('mockStatFail'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      request(this, opt)
    },
    turnMock () {
      let opt = {
        url: '/mock/conf',
        method: 'get',
        dataType: 'form',
        params: { method: 'updateMockStatus', value: this.mockStat },
        success (dom, resp) {
          if (resp.code !== 0) {
            dom.notf.notifyError(i18n.getMsg('updateMockStatFail'))
            dom.mockStat = dom.mockStat === 1 ? 0 : 1
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
          dom.mockStat = dom.mockStat === 1 ? 0 : 1
        }
      }
      request(this, opt)
    }
  }
}
</script>
