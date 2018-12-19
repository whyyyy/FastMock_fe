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
export default {
  name: 'app',
  components: {
    home
  },
  data () {
    return {
      mockStat: 1
    }
  },
  methods: {
    turnMock () {
      console.log(this.mockStat)
    }
  }
}
</script>
