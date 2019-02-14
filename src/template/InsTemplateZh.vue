<template>
  <div>
    <h3>入参内容：</h3>
    <code>
      obj={"header":{"content-length":"14","postman-token":"b26793c4-cacf-4856-bf9f-44b9424b4e3f","host":"localhost:9966","content-type":"application/x-www-form-urlencoded","connection":"keep-alive","cache-control":"no-cache","accept-encoding":"gzip,
      deflate","user-agent":"PostmanRuntime/7.2.0","accept":"*/*"},"content":{"a":"aaaa","b":"bbbbb"},"contentType":"application/x-www-form-urlencoded","path":"/test","method":"post"}
    </code>
    <h3>策略验证实例：</h3>
    <p>执行默认响应：</p>
    <pre class="hljs typescript">function exec(obj) {
    return "true";
}</pre>
    <p>执行特定响应：</p>
    <pre class="hljs typescript">function exec(obj) {
    if (obj.header.flag == "1") {
        return "success";
    } else if (obj.header.flag == "2") {
        return "noauth";
    }
}</pre>
    <h3>策略响应实例：</h3>
    <p>默认响应：</p>
    <pre class="hljs typescript">function exec(obj) {
    var obj = JSON.parse(obj)			//非必填，将入参转为json对象操作
    var resData = {				//必填，响应结果
        status: 200,				//必填，返回状态码。200,404,500
        type: "json",				//必填，返回数据类型。支持json，form，xml
        content: {    				//非必填，返回数据
            a: obj.a,
            obj: obj
        }
    }
    return JSON.stringify(resData);		//必填，将响应结果转为json字符串
}</pre>
    <p>特定响应：</p>
    <pre class="hljs typescript">function success(obj) {
    内容与默认响应相同
    }
function noauth(obj) {
    ...
}</pre>
    <p>响应中执行特定java函数：</p>
    <pre class="hljs typescript">function exec(obj) {
    var obj = JSON.parse(obj)
    var reqDataJson = {
        ...
    sign: "<var
      style="color:#409EFF"
    >${reqDataSign}</var>",				//必填，函数执行结果替换
    };
    var resData = {
        status: 200,
        type: "xml",
        content: reqDataJson,				//必填，返回数据
        var_: [{
            name: "<var
            style="color:#409EFF"
            >reqDataSign</var>",
            method: "wxSign",				//必填，待执行java函数名
            value: JSON.stringify(reqDataJson)		//必填，将执行参数转为json字符串
        }]
    };
    return JSON.stringify(resData);
}</pre>
    <p>响应中执行特定js函数：</p>
    <pre class="hljs typescript">function exec(obj) {
    var obj = JSON.parse(obj)
    var resData = {
        status: ...,
        type: ...,
        content: {
            ...
            radmstr: <var
              style="color:#67C23A"
            >randomString()</var>				//调用函数
        }
    }
    return JSON.stringify(resData);
}
function <var
  style="color:#67C23A"
>randomString(len)</var> {　　
    len = len || 32;　　
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';　　
    var maxPos = chars.length;　　
    var pwd = '';　　
    for (i = 0; i < len; i++) {　　　　
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));　　
    }　　
    return pwd;
}</pre>
    <p>响应后回调：</p>
    <pre class="hljs typescript">function exec(obj) {
    var obj = JSON.parse(obj)
    var resData = {
        status: ...,
        type: ...,
        content: {...}，
        //单个回调
        callback: <var
          style="color:#67C23A"
        >callbk(obj)</var>			//必填，回调函数
        //多个回调
        //callback: [<var
          style="color:#67C23A"
        >callbk1(obj)</var>,<var style="color:#67C23A">callbk2(obj)</var>]
    }
    return JSON.stringify(resData);
}
function <var style="color:#67C23A">callbk(obj)</var> {			                //必填，回调函数体
    var req = {
        url: "http://localhost:8180/testxmlsign",	//必填，回调接口
        method: "post",					//必填，请求方式
        datatype: "xml",				//必填，请求数据类型
        delay: 5000,					//非必填，回调延迟（ms）
        content: {...}					//非必填，回调数据
    }
    return req;
}
</pre>
    <h3>测试入参实例：</h3>
    <!-- p>Form</p>
    <pre class="hljs typescript">{header:{header1:"value1", header2:"value2"}, param:"a=1&b=2"}</pre -->
    <p>Json/Form</p>
    <pre class="hljs typescript">{header:{header1:"value1", header2:"value2"}, param:{a:1,b:2,c:"abc"}}</pre>
    <p>Xml</p>
    <pre class="hljs typescript">{header:{header1:"value1", header2:"value2"}, param:"&lt;xml&gt;&lt;a&gt;1&lt;/a&gt;&lt;b&gt;asdf&lt;/b&gt;&lt;/xml&gt;"}</pre>
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/highlight'

export default {
  name: "InsTemplateZh",
  mounted () {
      hljs.initHighlightingOnLoad()
   }
};
</script>