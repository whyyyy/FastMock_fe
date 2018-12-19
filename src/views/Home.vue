<template>
  <div>
    <el-container>
      <el-main style="padding: 10px">
        <el-row>
          <el-col :span="navSpan.project">
            <el-button type="text" @click="addProject">{{$t('message.add')}}</el-button>
            <el-scrollbar :style="scrollStyle">
              <el-menu :style="elNavStyle">
                <el-menu-item v-for="(item, index) in projectList" :key="item.id" :index="item.id">
                  <template slot="title">
                    <span @mouseenter="navZoom('project', item)" style="display:block" :class="highlightClass('project' + item.id)">
                      <el-row>
                        <el-col :span="20">
                          <el-input v-model="projectEditing.mockProjectName" v-if="projectEditing.id==item.id" autosize type="textarea" :id="'project'+item.id" style="vertical-align: middle;"/>
                          <p class="longtext" v-if="projectEditing.id!=item.id" @click="projectSelect(item)" :id="'project'+item.id">{{item.mockProjectName}}</p>
                        </el-col>
                        <el-col :span="4" align="right" v-if="hoverNav=='project' + item.id">
                          <font-awesome-icon class="action_icon" icon="edit" v-if="projectEditing.id!=item.id" @click="editProject(item)" style="color: DeepSkyBlue"/>
                          <font-awesome-icon class="action_icon" icon="trash-alt" v-if="projectEditing.id!=item.id" style="color: LightCoral"/>
                          <font-awesome-icon class="action_icon" icon="save" v-if="projectEditing.id==item.id" @click="saveProject(item, index)" style="color: DeepSkyBlue"/>
                          <font-awesome-icon class="action_icon" icon="undo-alt" v-if="projectEditing.id==item.id" style="color: LightCoral" @click="cancelEdit"/>
                        </el-col>
                      </el-row>
                    </span>
                  </template>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </el-col>
          <el-col :span="navSpan.uri" v-if="uriNavVis">
            <el-button type="text" @click="addUri">{{$t('message.add')}}</el-button>
            <el-scrollbar :style="scrollStyle">
              <el-menu :style="elNavStyle">
                <el-menu-item v-for="(item, index) in uriList" :key="item.id" :index="item.id">
                  <template slot="title">
                    <span @mouseenter="navZoom('uri', item)" style="display:block" :class="highlightClass('uri' + item.id)">
                      <el-row style="display:block" :gutter="10">
                        <el-col :span="uriEditing.id!=item.id?13:8">
                          <el-input :title="$t('message.name')" type="textarea" resize="none" :autosize="{ minRows: 1, maxRows: 1}" :id="'uri'+item.id"
                            v-model="uriEditing.mockUriName" v-if="uriEditing.id==item.id" style="vertical-align: middle;" />
                          <el-tooltip :content="'Uri:'+item.mockUri" placement="left" :hide-after="2000" v-if="uriEditing.id!=item.id">
                            <p class="longtext" @click="uriSelect(item)" :id="'uri'+item.id">{{item.mockUriName}}</p>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="3" align="right" style="min-width:40px;">
                          <el-tag size="mini" type="success" v-if="uriEditing.id!=item.id">{{item.mockMethod}}</el-tag>
                          <el-input :title="$t('message.method')" type="textarea" resize="none" :autosize="{ minRows: 1, maxRows: 1}" v-model="uriEditing.mockMethod" v-if="uriEditing.id==item.id" style="vertical-align: middle;"/>
                        </el-col>
                        <el-col :span="4" align="right" v-if="uriEditing.id!=item.id">
                          <el-switch v-model="item.isRun" active-color="#13ce66" inactive-color="#ff4949"
                            active-value="RUN" inactive-value="STOP" @change="turnUri(item.id, item.isRun)"/>
                        </el-col>
                        <el-col :span="8" v-if="uriEditing.id==item.id">
                          <el-input title="Uri" type="textarea" resize="none" :autosize="{ minRows: 1, maxRows: 1}" v-model="uriEditing.mockUri" style="vertical-align: middle;"/>
                        </el-col>
                        <el-col :span="4" align="right" v-if="hoverNav=='uri' + item.id">
                          <font-awesome-icon class="action_icon" icon="edit" v-if="uriEditing.id!=item.id" @click="editUri(item)" style="color: DeepSkyBlue"/>
                          <font-awesome-icon class="action_icon" icon="trash-alt" v-if="uriEditing.id!=item.id" style="color: LightCoral"/>
                          <font-awesome-icon class="action_icon" icon="save" v-if="uriEditing.id==item.id" @click="saveUri(item, index)" style="color: DeepSkyBlue"/>
                          <font-awesome-icon class="action_icon" icon="undo-alt" v-if="uriEditing.id==item.id" style="color: LightCoral" @click="cancelEdit"/>
                        </el-col>
                      </el-row>
                    </span>
                  </template>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </el-col>
          <el-col :span="strategySpan" v-if="strategyNavVis">
            <div @mouseenter="navZoom('strategy')" style="display: block">
              <el-button type="text" @click="addStrategy">{{$t('message.add')}}</el-button>
              <el-table :data="strategyList" :height="browser.height-130" >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <div :class="highlightClass('strategy' + props.row.id)">
                      <el-row>
                        <el-col :span="4" :offset="20" v-if="strategyEditing.id!=props.row.id" >
                          <el-button style="transition: 2s;" type="text" align="right" @click="editStrategy(props.row)">{{$t('message.edit')}}</el-button>
                        </el-col>
                        <el-col :span="4" :offset="10" v-if="strategyEditing.id==props.row.id">
                          <el-button style="transition: 2s;" type="text" @click="cancelEdit">{{$t('message.cancel')}}</el-button>
                          <el-button style="transition: 2s;" type="text" @click="saveStrategy(props.row)">{{$t('message.save')}}</el-button>
                        </el-col>
                      </el-row>
                      <strategy-detail :inputmode="strategyEditing.id==props.row.id" :strategy.sync="strategyEditing.id==props.row.id?strategyEditing:props.row"/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('message.strategyName')">
                  <template slot-scope="props">
                    <span @mouseenter="navZoom('strategy', props.row)" @mouseleave="hoverNav=''" style="display:block">
                      {{props.row.mockRequestName}}
                      <font-awesome-icon class="action_icon" icon="trash-alt" v-if="hoverNav=='strategy'+props.row.id" style="color: LightCoral"/>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('message.stat')">
                  <template slot-scope="props">
                    <el-switch class="fswi" v-if="strategyEditing.id!=props.row.id" v-model="props.row.isRun" active-color="#13ce66" inactive-color="#ff4949" active-value="RUN" inactive-value="STOP"/>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog :title="$t('message.add') + $t('message.project')" :visible.sync="projectDialogVis">
      <el-row :gutter="16">
        <el-col :span="4">
          <p>{{$t('message.project')}}{{$t('message.name')}}:</p>
        </el-col>
        <el-col :span="20">
          <el-input v-model="projectCreating.mockProjectName" />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="projectDialogVis = false">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click="createProject">{{$t('message.save')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('message.add') + 'Uri'" :visible.sync="uriDialogVis">
      <el-row :gutter="16">
        <el-col :span="4">
          <p>Uri{{$t('message.name')}}:</p>
        </el-col>
        <el-col :span="8">
          <el-input v-model="uriCreating.mockUriName" />
        </el-col>
        <el-col :span="4">
          <p>{{$t('message.method')}}:</p>
        </el-col>
        <el-col :span="8">
          <el-input v-model="uriCreating.mockMethod" placeholder="post"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <p>Uri:</p>
        </el-col>
        <el-col :span="20">
          <el-input v-model="uriCreating.mockUri" />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uriDialogVis = false">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click="createUri">{{$t('message.save')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('message.add') + $t('message.strategy')" :visible.sync="strategyDialogVis">
      <strategy-detail :inputmode="true" :strategy.sync="strategyCreating"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="strategyDialogVis = false">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click="createStrategy">{{$t('message.save')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
  .longtext{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding: 0;
    margin: 0;
  }
  .action_nav{
    width: 300px;
    display: block;
  }
  .el-col{
    transition: 0.3s;
  }
  .ops-icon{
    display: none;
  }
  .ops-icon:hover{
    display: inline;
  }
  .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .highlight{
    background: none;
    animation: highlightfade 2s;
  }
  @keyframes highlightfade{
    0% {background:none;}
    30% {background:LemonChiffon;}
    70% {background:LemonChiffon;}
    100% {background:none;}
  }
  .action_icon{
    font-size: 18px;
    margin-left: 8px;
  }
  .action_icon:hover {
    font-size: 20px;
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -o-animation: rotation 3s linear infinite;
    animation: rotation 3s linear infinite;
  }
  .action_icon:active {
    font-size: 16px;filter:alpha(Opacity=80);-moz-opacity:0.8;opacity: 0.8;
  }
  @keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(-360deg);
    }
}
</style>

<script>
import tool from '../util/Tool'
import {confirm, Notification} from '../util/PageAct'
import i18n from '../i18n/I18nString'
import StrategyDetail from '../components/StrategyDetail'

export default {
  name: 'home',
  components: {
    StrategyDetail
  },
  data () {
    return {
      projectList: [],
      uriList: [],
      strategyList: [],
      strategy: '',
      uriNavVis: false,
      strategyNavVis: false,
      scriptNavVis: false,
      projectTxtSpan: 24,
      uriTxtSpan: 20,
      hoverNav: '',
      highlightedNav: '',
      editingInputId: '',
      projectDialogVis: false,
      uriDialogVis: false,
      strategyDialogVis: false,
      navSpan: {
        project: 5,
        uri: 7,
        strategy: 4
      },
      projectSelected: '',
      projectCreating: '',
      projectEditing: '',
      uriSelected: '',
      uriCreating: '',
      uriEditing: '',
      strategyCreating: '',
      strategyEditing: '',
      browser: {
        width: 0,
        height: 0
      },
      formatOptions: {
        'indent_size': '4',
        'indent_char': ' ',
        'max_preserve_newlines': '5',
        'preserve_newlines': true,
        'keep_array_indentation': false,
        'break_chained_methods': false,
        'indent_scripts': 'normal',
        'brace_style': 'collapse',
        'space_before_conditional': true,
        'unescape_strings': false,
        'jslint_happy': false,
        'end_with_newline': false,
        'wrap_line_length': '0',
        'indent_inner_html': false,
        'comma_first': false,
        'e4x': false
      }
    }
  },
  computed: {
    elNavStyle () {
      return {
        // height: this.browser.height - 130 + 'px',
        width: '99%'
      }
    },
    scrollStyle () {
      return {
        height: this.browser.height - 130 + 'px',
      }
    },
    strategySpan () {
      return 24 - this.navSpan.project - this.navSpan.uri
    }
  },
  mounted () {
    this.refreshProjectList()
    this.refreshUriList()
    this.refreshStrategyList()
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },
    guid () {
      return (this.S4() + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + this.S4())
    },
    refreshProjectList () {
      this.projectList = []
      for (let i = 0; i < 20; i++) {
        this.projectList.push({ 'id': this.guid() + i, 'mockProjectName': 'examplexxxxxxxxxxxxxxxxxxxxxxxxx' + i, 'idex': 3, 'createTime': '2018-08-27 18:08:54.0', 'updateTime': '2018-08-29 15:08:47.0' })
      }
    },
    refreshUriList () {
      this.uriList = []
      for (let i = 0; i < 20; i++) {
        this.uriList.push({ 'id': this.guid() + i, 'mockProjectId': 'cf94172d-40d6-4ddf-815e-a232bbb058d2', 'mockUriName': 'xxxxxxxxxxxxxxxxxxxxxxxx/pay/unifiedorder' + i, 'mockUri': '/pay/unifiedorder', 'mockMethod': 'post', 'isRun': 'RUN', 'idex': 5, 'createTime': '2018-08-27 18:16:31.0', 'updateTime': '2018-08-27 18:16:31.0' })
      }
    },
    refreshStrategyList () {
      this.strategyList = []
      for (let i = 0; i < 20; i++) {
        this.strategyList.push({ 'id': this.guid() + i, 'mockUriId': 'f6469f44-538c-4c11-974a-02cf607a7de5', 'mockRequestName': 'test' + i, 'requestWait': 0, 'verifyExpect': 'function exec(obj) {\n    if (obj.header.flag == "1") {\n        return "SUCCESS";\n    } else if (obj.header.flag == "2") {\n        return "NOAUTH";\n    }\n}', 'responseExpect': "function SUCCESS(obj) {\n    obj = JSON.parse(obj);\n    var resbody = {\n        'return_code': 'SUCCESS',\n        'return_msg': 'OK',\n        'appid': obj.content.appid,\n        'mch_id': obj.content.mch_id,\n        'nonce_str': randomString(),\n        'result_code': 'SUCCESS',\n        'prepay_id': obj.content.out_trade_no,\n        'trade_type': 'APP',\n        'sign': \"${wxsign}\"\n    };\n    var resData = {\n        type: \"xml\",\n        status: \"200\",\n        content: resbody,\n        var_: [{\n            name: \"wxsign\",\n            method: \"wxSign\",\n            value: JSON.stringify(resbody)\n        }],\n        callback: callbk(obj)\n    };\n    var data = JSON.stringify(resData);\n    return data;\n}\n\nfunction randomString(len) {　　\n    len = len || 32;　　\n    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';　　\n    var maxPos = chars.length;　　\n    var pwd = '';　　\n    for (i = 0; i < len; i++) {　　　　\n        pwd += chars.charAt(Math.floor(Math.random() * maxPos));　　\n    }　　\n    return pwd;\n}\n\nfunction callbk(obj) {\n    var callbkbody = {\n        'appid': obj.content.appid,\n        'attach': obj.content.attach,\n        'cash_fee': obj.content.total_fee,\n        'device_info': obj.content.device_info,\n        'mch_id': obj.content.mch_id,\n        'out_trade_no': obj.content.out_trade_no,\n        'total_fee': obj.content.total_fee,\n        'trade_type': obj.content.trade_type,\n        'result_code': \"SUCCESS\",\n        'return_code': \"SUCCESS\",\n        'nonce_str': randomString(),\n        'time_end': new Date().getTime().toString(),\n        'bank_type': 'CFT',\n        'transaction_id': obj.content.reference + '0000',\n        'fee_type': 'CNY',\n        'is_subscribe': 'N',\n        'sign': \"${wxsign}\"\n    }\n    var req = {\n        url: \"http://localhost:8180/testxmlsign\",\n        method: \"post\",\n        datatype: \"xml\",\n        delay: 5000,\n        content: callbkbody,\n        var_: [{\n            name: \"wxsign\",\n            method: \"wxSign\",\n            value: JSON.stringify(callbkbody)\n        }]\n    }\n    return req;\n}", 'isRun': 'RUN', 'remark': null, 'orderNum': 0, 'idex': 4, 'createTime': '2018-08-27 18:17:08.0', 'updateTime': '2018-08-27 18:17:08.0' })
      }
    },
    addProject () {
      this.projectCreating = {
        mockProjectName: ''
      }
      this.projectDialogVis = true
    },
    createProject () {
      this.projectDialogVis = false
    },
    projectSelect (item) {
      this.uriNavVis = true
      this.strategyNavVis = false
      this.scriptNavVis = false
      this.projectSelected = item
    },
    addUri () {
      this.uriCreating = {
        mockUriName: '',
        mockUri: '',
        mockMethod: '',
        mockProjectId: this.projectSelected.id
      }
      this.uriDialogVis = true
    },
    createUri () {
      this.uriDialogVis = false
    },
    uriSelect (item) {
      this.strategyNavVis = true
      this.scriptNavVis = false
      this.uriSelected = item
    },
    addStrategy () {
      this.strategyCreating = {
        mockRequestName: '',
        requestWait: 0,
        verifyExpect: tool.formatJs('function exec(obj){return \'xxx\';}'),
        responseExpect: tool.formatJs('function exec(obj){var obj=JSON.parse(obj);var resData={status:200,type:\'json\',content:{obj:obj}};return JSON.stringify(resData);}'),
        mockUriId: this.uriSelected.id
      }
      this.strategyDialogVis = true
    },
    createStrategy () {
      this.strategyDialogVis = false
    },
    strategySelected () {
      this.scriptNavVis = true
    },
    navZoom (item, content) {
      if (content) {
        this.hoverNav = item + content.id
      } else {
        this.hoverNav = ''
      }
      switch (item) {
        case 'project':
          this.navSpan.project = 7
          this.navSpan.uri = 7
          break
        case 'uri':
          this.navSpan.project = 5
          this.navSpan.uri = 12
          break
        default:
          this.navSpan.project = 5
          this.navSpan.uri = 7
          break
      }
    },
    highlightClass (id) {
      let highlight = false
      if (this.highlightedNav === id) {
        highlight = true
      }
      let txtClass = {
        highlight: highlight
      }
      return txtClass
    },
    highlightNav (id) {
      this.highlightedNav = id
      setTimeout(() => { this.highlightedNav = '' }, 2000)
    },
    editProject (item) {
      var callback = {
        confirm (dom, ext) {
          dom.cancelEdit()
          dom.projectEditing = Object.assign({}, item)
          dom.editingInputId = 'project' + item.id
          // dom.focusInput()
        },
        cancel (dom, ext) {
          dom.focusInput()
          dom.highlightNav(dom.editingInputId)
        }
      }
      if (this.isEditing()) {
        confirm(this, i18n.getMsg('discardOps'), callback, item)
      } else {
        callback.confirm(this, item)
      }
    },
    saveProject (item, index) {
      if (tool.compareObj(this.projectEditing, item)) {
        console.log(1111)
      } else {
        this.highlightNav('project' + item.id)
        this.projectList[index] = Object.assign({}, this.projectEditing)
      }
      this.projectEditing = ''
      // this.refreshProjectList()
    },
    editUri (item) {
      var callback = {
        confirm (dom, ext) {
          dom.cancelEdit()
          dom.editingInputId = 'uri'+ext.id
          dom.uriEditing = Object.assign({}, ext)
        },
        cancel (dom, ext) {
          dom.focusInput()
          dom.highlightNav(dom.editingInputId)
        }
      }
      if (this.isEditing()) {
        confirm(this, i18n.getMsg('discardOps'), callback, item)
      } else {
        callback.confirm(this, item)
      }
    },
    saveUri (item, index) {
      if (tool.compareObj(this.uriEditing, item)) {
        console.log(1111)
      } else {
        this.highlightNav('uri' + item.id)
        this.uriList[index] = Object.assign({}, this.uriEditing)
      }
      this.uriEditing = ''
    },
    editStrategy (item) {
      var callback = {
        confirm (dom, ext) {
          dom.cancelEdit()
          dom.editingInputId = 'strategy'+ext.id
          dom.strategyEditing = Object.assign({}, item)
        },
        cancel (dom, ext) {
          dom.focusInput()
          dom.highlightNav(dom.editingInputId)
        }
      }
      if (this.isEditing()) {
        confirm(this, i18n.getMsg('discardOps'), callback, item)
      } else {
        callback.confirm(this, item)
      }
    },
    saveStrategy (item) {
      if (tool.compareObj(this.strategyEditing, item)) {
        console.log(1111)
      } else {
        this.highlightNav('strategy' + item.id)
        item = Object.assign({}, this.strategyEditing)
      }
      this.strategyEditing = ''
    },
    isEditing () {
      if (this.projectEditing['id'] || this.uriEditing['id'] || this.strategyEditing['id']) {
        return true
      }
      return false
    },
    cancelEdit () {
      this.projectEditing = ''
      this.uriEditing = ''
      this.strategyEditing = ''
      this.editingInputId = ''
    },
    focusInput () {
      if (document.getElementById(this.editingInputId)) {
        document.getElementById(this.editingInputId).focus()
      }
    },
    turnUri (id, stat) {
      console.log(id)
      console.log(stat)
    },
    handleResize () {
      this.browser.width = window.innerWidth
      this.browser.height = window.innerHeight
    }
  }
}
</script>
