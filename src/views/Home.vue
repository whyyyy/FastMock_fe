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
                    <transition name="el-zoom-in-center">
                      <span @mouseenter="navZoom('project', item)" style="display:block" :class="highlightClass('project' + item.id)" v-show="deletingId!='project'+item.id">
                        <el-row>
                          <el-col :span="20">
                            <el-input v-model="projectEditing.mockProjectName" v-if="projectEditing.id==item.id" autosize type="textarea" :id="'project'+item.id" style="vertical-align: middle;"/>
                            <p class="longtext" v-if="projectEditing.id!=item.id" @click="projectSelect(item)" :id="'project'+item.id">{{item.mockProjectName}}</p>
                          </el-col>
                          <el-col :span="4" align="right" v-if="hoverNav=='project' + item.id">
                            <font-awesome-icon class="action_icon" icon="edit" v-if="projectEditing.id!=item.id" @click="editProject(item)" style="color: DeepSkyBlue"/>
                            <font-awesome-icon class="action_icon" icon="trash-alt" v-if="projectEditing.id!=item.id" style="color: LightCoral" @click="deleteItem('project', item.id)"/>
                            <font-awesome-icon class="action_icon" icon="save" v-if="projectEditing.id==item.id" @click="saveProject(item, index)" style="color: DeepSkyBlue"/>
                            <font-awesome-icon class="action_icon" icon="undo-alt" v-if="projectEditing.id==item.id" style="color: LightCoral" @click="cancelEdit"/>
                          </el-col>
                        </el-row>
                      </span>
                    </transition>
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
                    <transition name="el-zoom-in-center">
                      <span @mouseenter="navZoom('uri', item)" style="display:block" :class="highlightClass('uri' + item.id)" v-show="deletingId!='uri'+item.id">
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
                              :active-value="1" :inactive-value="0" @change="turnUri(item.id, item.isRun)"/>
                          </el-col>
                          <el-col :span="8" v-if="uriEditing.id==item.id">
                            <el-input title="Uri" type="textarea" resize="none" :autosize="{ minRows: 1, maxRows: 1}" v-model="uriEditing.mockUri" style="vertical-align: middle;"/>
                          </el-col>
                          <el-col :span="4" align="right" v-if="hoverNav=='uri' + item.id">
                            <font-awesome-icon class="action_icon" icon="edit" v-if="uriEditing.id!=item.id" @click="editUri(item)" style="color: DeepSkyBlue"/>
                            <font-awesome-icon class="action_icon" icon="trash-alt" v-if="uriEditing.id!=item.id" style="color: LightCoral" @click="deleteItem('uri', item.id)"/>
                            <font-awesome-icon class="action_icon" icon="save" v-if="uriEditing.id==item.id" @click="saveUri(item, index)" style="color: DeepSkyBlue"/>
                            <font-awesome-icon class="action_icon" icon="undo-alt" v-if="uriEditing.id==item.id" style="color: LightCoral" @click="cancelEdit"/>
                          </el-col>
                        </el-row>
                      </span>
                    </transition>
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
                    <transition name="el-zoom-in-center">
                    <div :class="highlightClass('strategy' + props.row.id)" v-show="deletingId!='strategy'+props.row.id">
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
                    </transition>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('message.strategyName')">
                  <template slot-scope="props">
                    <transition name="el-zoom-in-center">
                    <span @mouseenter="navZoom('strategy', props.row)" @mouseleave="hoverNav=''" style="display:block" :class="highlightClass('strategy' + props.row.id)" v-show="deletingId!='strategy'+props.row.id">
                      {{props.row.mockRequestName}}
                      <font-awesome-icon class="action_icon" icon="trash-alt" v-if="hoverNav=='strategy'+props.row.id" style="color: LightCoral" @click="deleteItem('strategy', props.row.id)"/>
                    </span>
                    </transition>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('message.stat')">
                  <template slot-scope="props">
                    <el-switch class="fswi" v-if="strategyEditing.id!=props.row.id" v-model="props.row.isRun" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"  @change="turnStrategy(props.row.id, props.row.isRun)"/>
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
    <div v-if="!testFlag" class="container" style="position: fixed; bottom: 0px; right: 0px; width: 80px; height: 70px; overflow: hidden; visibility: visible; z-index: 2147483639; background: transparent; border: 0px; transition: transform 0.2s ease-in-out 0s; backface-visibility: hidden; opacity: 1; transform: translateY(0%);">
      <img src="../assets/img/test.png" alt="test" @click="testFlag=true"/>
    </div>
    <mock-test :visible.sync="testFlag" />
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
import { confirm, Notification } from '../util/PageAct'
import i18n from '../i18n/I18nString'
import StrategyDetail from '../components/StrategyDetail'
import MockTest from '../components/MockTest'
import { request } from '../util/Request'
import { setTimeout } from 'timers'

export default {
  name: 'home',
  components: {
    StrategyDetail,
    MockTest
  },
  data () {
    return {
      notf: new Notification(this),
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
      testFlag: false,
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
      deletingId: '',
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
        height: this.browser.height - 130 + 'px'
      }
    },
    strategySpan () {
      return 24 - this.navSpan.project - this.navSpan.uri
    }
  },
  mounted () {
    this.refreshProjectList()
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    refreshProjectList () {
      // this.projectList = []
      let opt = {
        url: '/mock/project',
        method: 'get',
        dataType: 'form',
        success (dom, resp) {
          if (resp.code === 0) {
            dom.projectList = resp.data
          } else {
            dom.notf.notifyError(i18n.getMsg('getProjectFail'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      request(this, opt)
    },
    getUriList () {
      let opt = {
        url: '/mock/uri/project/' + this.projectSelected.id,
        method: 'get',
        dataType: 'form',
        success (dom, resp) {
          if (resp.code === 0) {
            dom.uriList = resp.data
          } else {
            dom.notf.notifyError(i18n.getMsg('getUriFail'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      request(this, opt)
    },
    getStrategyList () {
      let opt = {
        url: '/mock/request/uri/' + this.uriSelected.id,
        method: 'get',
        dataType: 'form',
        success (dom, resp) {
          if (resp.code === 0) {
            dom.strategyList = resp.data
          } else {
            dom.notf.notifyError(i18n.getMsg('getStrategyFail'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      request(this, opt)
    },
    addProject () {
      var callback = {
        confirm (dom, ext) {
          dom.cancelEdit()
          dom.projectCreating = {
            mockProjectName: undefined
          }
          dom.projectDialogVis = true
        },
        cancel (dom, ext) {
          dom.focusInput()
          dom.highlightNav(dom.editingInputId)
        }
      }
      if (this.isEditing()) {
        confirm(this, i18n.getMsg('discardOps'), callback)
      } else {
        callback.confirm(this)
      }
    },
    createProject () {
      if (!this.checkProject(this.projectCreating)) {
        this.notf.notifyError(i18n.getMsg('infoIncomplete'))
        return
      }
      let opt = {
        url: '/mock/project',
        method: 'post',
        dataType: 'json',
        params: this.projectCreating,
        success (dom, resp) {
          // console.log(resp)
          if (resp.code === 0) {
            dom.projectDialogVis = false
            dom.refreshProjectList()
            dom.highlightNav('project' + resp.data)
          } else {
            dom.notf.notifyError(i18n.getMsg('createProjectFail'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      request(this, opt)
    },
    projectSelect (item) {
      this.uriNavVis = true
      this.strategyNavVis = false
      this.scriptNavVis = false
      this.projectSelected = item
      this.getUriList()
    },
    addUri () {
      this.uriCreating = {
        mockUriName: undefined,
        mockUri: undefined,
        mockMethod: undefined,
        mockProjectId: this.projectSelected.id,
        isRun: 1
      }
      this.uriDialogVis = true
    },
    createUri () {
      if (!this.checkUri(this.uriCreating)) {
        this.notf.notifyError(i18n.getMsg('infoIncomplete'))
        return
      }
      let opt = {
        url: '/mock/uri',
        method: 'post',
        dataType: 'json',
        params: this.uriCreating,
        success (dom, resp) {
          // console.log(resp)
          if (resp.code === 0) {
            dom.uriDialogVis = false
            dom.getUriList()
            dom.highlightNav('uri' + resp.data)
          } else {
            dom.notf.notifyError(i18n.getMsg('createUriFail'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      request(this, opt)
    },
    uriSelect (item) {
      this.strategyNavVis = true
      this.scriptNavVis = false
      this.uriSelected = item
      this.getStrategyList()
    },
    addStrategy () {
      this.strategyCreating = {
        mockRequestName: undefined,
        requestWait: 0,
        verifyExpect: tool.formatJs('function exec(obj){return \'xxx\';}'),
        responseExpect: tool.formatJs('function exec(obj){var obj=JSON.parse(obj);var resData={status:200,type:\'json\',content:{obj:obj}};return JSON.stringify(resData);}'),
        mockUriId: this.uriSelected.id,
        isRun: 1,
        orderNum: 0
      }
      this.strategyDialogVis = true
    },
    createStrategy () {
      if (!this.checkStrategy(this.strategyCreating)) {
        this.notf.notifyError(i18n.getMsg('infoIncomplete'))
        return
      }
      this.strategyDialogVis = false
      let opt = {
        url: '/mock/request',
        method: 'post',
        dataType: 'json',
        params: this.strategyCreating,
        success (dom, resp) {
          // console.log(resp)
          if (resp.code === 0) {
            dom.strategyDialogVis = false
            dom.getStrategyList()
            dom.highlightNav('strategy' + resp.data)
          } else {
            dom.notf.notifyError(i18n.getMsg('createStrategyFail'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      request(this, opt)
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
      if (!this.checkProject(this.projectEditing)) {
        this.notf.notifyError(i18n.getMsg('infoIncomplete'))
        return
      }
      let opt = {
        url: '/mock/project',
        method: 'put',
        dataType: 'json',
        params: this.projectEditing,
        ext: item,
        success (dom, resp, ext) {
          if (resp.code === 0) {
            dom.refreshProjectList()
            dom.highlightNav('project' + ext.id)
            dom.projectEditing = ''
          } else {
            dom.notf.notifyError(i18n.getMsg('saveDup'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      if (!tool.compareObj(this.projectEditing, item)) {
        request(this, opt)
      } else {
        this.cancelEdit()
      }
    },
    editUri (item) {
      var callback = {
        confirm (dom, ext) {
          dom.cancelEdit()
          dom.editingInputId = 'uri' + ext.id
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
      if (!this.checkUri(this.uriEditing)) {
        this.notf.notifyError(i18n.getMsg('infoIncomplete'))
        return
      }
      let opt = {
        url: '/mock/uri',
        method: 'put',
        dataType: 'json',
        params: this.uriEditing,
        ext: item,
        success (dom, resp, ext) {
          if (resp.code === 0) {
            dom.getUriList()
            dom.highlightNav('uri' + ext.id)
            dom.uriEditing = ''
          } else {
            dom.notf.notifyError(i18n.getMsg('saveDup'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      if (!tool.compareObj(this.uriEditing, item)) {
        request(this, opt)
      } else {
        this.cancelEdit()
      }
    },
    editStrategy (item) {
      // console.log(item)
      var callback = {
        confirm (dom, ext) {
          dom.cancelEdit()
          dom.editingInputId = 'strategy' + ext.id
          dom.strategyEditing = Object.assign({}, {}, item)
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
      if (!this.checkStrategy(this.strategyEditing)) {
        this.notf.notifyError(i18n.getMsg('infoIncomplete'))
        return
      }
      let se = Object.assign({}, this.strategyEditing)
      delete se['row']
      let opt = {
        url: '/mock/request',
        method: 'put',
        dataType: 'json',
        params: se,
        ext: item,
        success (dom, resp, ext) {
          if (resp.code === 0) {
            // setTimeout(()=>{
            dom.getStrategyList()
            dom.strategyEditing = ''
            // }, 1000)
            dom.highlightNav('strategy' + item.id)
          } else {
            dom.notf.notifyError(i18n.getMsg('saveDup'))
          }
        },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      if (!tool.compareObj(opt.params, item)) {
        request(this, opt)
      } else {
        this.cancelEdit()
      }
    },
    deleteItem (name, id) {
      let opt = {
        url: '/mock/',
        method: 'delete',
        dataType: 'json',
        params: { 'id': id },
        error (dom, error) {
          dom.notf.notifyError(error)
        }
      }
      switch (name) {
        case 'project':
          opt.url += 'project'
          opt['success'] = function (dom, resp) {
            if (resp.code === 0) {
              dom.deletingId = 'project' + id
              setTimeout(() => {
                dom.refreshProjectList()
              }, 500)
            } else {
              dom.notf.notifyError(resp.msg)
            }
          }
          break
        case 'uri':
          opt.url += 'uri'
          opt['success'] = function (dom, resp) {
            if (resp.code === 0) {
              dom.deletingId = 'uri' + id
              setTimeout(() => {
                dom.getUriList()
              }, 500)
            } else {
              dom.notf.notifyError(resp.msg)
            }
          }
          break
        case 'strategy':
          opt.url += 'request'
          opt['success'] = function (dom, resp) {
            if (resp.code === 0) {
              dom.deletingId = 'strategy' + id
              setTimeout(() => {
                dom.getStrategyList()
              }, 500)
            } else {
              dom.notf.notifyError(resp.msg)
            }
          }
          break
        default:
          return
      }
      let callback = {
        confirm (dom, ext) {
          request(dom, opt)
        },
        cancel () {}
      }
      confirm(this, i18n.getMsg('confirmDelete'), callback)
    },
    checkProject (item) {
      return item.mockProjectName && true
    },
    checkUri (item) {
      return item.mockProjectId && item.mockUriName && item.mockUri && item.mockMethod
    },
    checkStrategy (item) {
      return item.mockUriId && item.mockRequestName && item.verifyExpect && item.responseExpect
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
    focusInput (id) {
      if (id && document.getElementById(id)) {
        document.getElementById(id).focus()
      } else if (document.getElementById(this.editingInputId)) {
        document.getElementById(this.editingInputId).focus()
      }
    },
    turnUri (id, stat) {
      let opt = {
        url: '/mock/uri',
        method: 'put',
        dataType: 'json',
        params: { id: id, isRun: stat },
        success (dom, resp, ext) {
          if (resp.code !== 0) {
            dom.notf.notifyError(resp.msg)
          }
          dom.getUriList()
        },
        error (dom, error) {
          dom.notf.notifyError(error)
          dom.getUriList()
        }
      }
      request(this, opt)
    },
    turnStrategy (id, stat) {
      let opt = {
        url: '/mock/request',
        method: 'put',
        dataType: 'json',
        params: { id: id, isRun: stat },
        success (dom, resp, ext) {
          if (resp.code !== 0) {
            dom.notf.notifyError(resp.msg)
          }
          dom.getStrategyList()
        },
        error (dom, error) {
          dom.notf.notifyError(error)
          dom.getStrategyList()
        }
      }
      request(this, opt)
    },
    handleResize () {
      this.browser.width = window.innerWidth
      this.browser.height = window.innerHeight
    }
  }
}
</script>
