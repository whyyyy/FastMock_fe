<template>
    <div>
        <el-dialog :title="$t('message.test')" :visible.sync="thisVisible">
          <el-row :gutter="10">
            <el-col :span="16"><el-input v-model="testContent.uri" placeholder="Uri"/></el-col>
            <el-col :span="4"><el-input v-model="testContent.method" :placeholder="$t('message.reqMethod')"/></el-col>
            <el-col :span="4">
              <el-select v-model="testContent.dataType" filterable :placeholder="$t('message.dataType')">
                <el-option
                  v-for="item in dataTypeLst"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10">
          <p>{{$t('message.reqParam')}}</p>
          </el-row>
          <el-row :gutter="10">
          <el-input type="textarea" resize="none" :autosize="{ minRows: 1, maxRows: 3}" v-model="testContent.params" />
          </el-row>
          <el-row :gutter="10">
          <p>{{$t('message.result')}}</p>
          </el-row>
          <el-row :gutter="10">
          <el-input type="textarea" resize="none" :autosize="{ minRows: 3, maxRows: 5}" v-model="testResult" />
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" style="vertical-align: right;" @click="startTest" align="right">{{$t('message.test')}}</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
  import { request } from '../util/Request'

  export default {
    name: 'MockTest',
    props: ['visible'],
    data() {
      return {
        thisVisible: false,
        testContent: {
          uri: '',
          method: '',
          dataType: '',
          params: '{header:{}, param:{}}'
        },
        testResult: '',
        dataTypeLst: [{
          value: 'json'
        },{
          value: 'form'
        },{
          value: 'xml'
        }]
      }
    },
    methods: {
      updateVisible (show) {
        this.$emit('update:visible', show)
      },
      startTest () {
        let testParam = eval('('+ this.testContent.params + ')')
        testParam.header["mockuri"] = this.testContent.uri
        let opt = {
          url: '/mock/test',
          method: this.testContent.method,
          dataType: this.testContent.dataType,
          headers: testParam.header,
          params: testParam.param,
          success (dom, resp) {
            if (resp.code === 0) {
              dom.testResult = resp.data
            } else {
              dom.notf.notifyError(resp.msg)
            }
          },
          error (dom, error) {
            dom.notf.notifyError(error)
          }
        }
        request(this, opt)
      }
    },
    watch: {
      visible () {
        this.thisVisible=this.visible
      },
      thisVisible () {
        if (!this.thisVisible) {
          this.$emit('update:visible', false)
        }
      }
    }
  }
</script>
