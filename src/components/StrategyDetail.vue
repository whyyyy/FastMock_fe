<template>
    <div>
        <el-row type="flex" align="middle" :gutter="10">
            <el-col :span="4">
                <p>{{$t('message.strategyName')}}: </p>
            </el-col>
            <el-col :span="8">
                <p v-if="!inputmode">{{strategyClone.mockRequestName}}</p>
                <el-input v-model="strategyClone.mockRequestName" v-if="inputmode" :id="'strategy'+strategyClone.id" />
            </el-col>
            <el-col :span="4">
                <p>{{$t('message.respDelay')}}(ms): </p>
            </el-col>
            <el-col :span="8">
                <p v-if="!inputmode">{{strategyClone.requestWait}}</p>
                <el-input v-model="strategyClone.requestWait" v-if="inputmode"/>
            </el-col>
        </el-row>
        <p>{{$t('message.strategyScript')}}:</p>
        <pre v-if="!inputmode" v-highlight><code class="javascript" style="line-height:1.5;background:none">{{formatJs(strategyClone.verifyExpect)}}</code></pre>
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 16}" v-model="strategyClone.verifyExpect" v-if="inputmode" @blur="strategyClone.verifyExpect=formatJs(strategyClone.verifyExpect)"/>
        <p>{{$t('message.respScript')}}:</p>
        <pre v-if="!inputmode" v-highlight><code class="javascript" style="line-height:1.5;background:none">{{formatJs(strategyClone.responseExpect)}}</code></pre>
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 16}" v-model="strategyClone.responseExpect" v-if="inputmode" @blur="strategyClone.responseExpect=formatJs(strategyClone.responseExpect)"/>
    </div>
</template>

<script>
import Tool from '../util/Tool'

export default {
    name: 'StrategyDetail',
    props: ['inputmode', 'strategy'],
    data () {
        return {
            strategyClone: ''
        }
    },
    created () {
        this.strategyClone = this.strategy
    },
    methods: {
        formatJs (code) {
            return Tool.formatJs(code)
        }
    }
}
</script>
