<template>
    <div>
        <el-row type="flex" align="middle" :gutter="10">
            <el-col :span="4">
                <p>{{$t('message.strategyName')}}: </p>
            </el-col>
            <el-col :span="8">
                <p v-if="!inputmode">{{strategy.mockRequestName}}</p>
                <el-input v-model="strategy.mockRequestName" v-if="inputmode" :id="'strategy'+strategy.id" />
            </el-col>
            <el-col :span="4">
                <p>{{$t('message.respDelay')}}(ms): </p>
            </el-col>
            <el-col :span="8">
                <p v-if="!inputmode">{{strategy.requestWait}}</p>
                <el-input v-model="strategy.requestWait" v-if="inputmode"/>
            </el-col>
        </el-row>
        <p>{{$t('message.strategyScript')}}:</p>
        <pre v-if="!inputmode" v-highlight><code class="javascript" style="line-height:1.5;background:none">{{formatJs(strategy.verifyExpect)}}</code></pre>
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 16}" v-model="strategy.verifyExpect" v-if="inputmode" @blur="strategy.verifyExpect=formatJs(strategy.verifyExpect)"/>
        <p>{{$t('message.respScript')}}:</p>
        <pre v-if="!inputmode" v-highlight><code class="javascript" style="line-height:1.5;background:none">{{formatJs(strategy.responseExpect)}}</code></pre>
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 16}" v-model="strategy.responseExpect" v-if="inputmode" @blur="strategy.responseExpect=formatJs(strategy.responseExpect)"/>
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
    watch: {
        strategy () {
            this.$emit('update:strategy', this.strategy)
        }
    },
    methods: {
        formatJs (code) {
            return Tool.formatJs(code)
        }
    }
}
</script>
