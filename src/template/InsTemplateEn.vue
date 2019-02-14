<template>
  <div>
    <h3>Parameter example:</h3>
    <code>
      obj={"header":{"content-length":"14","postman-token":"b26793c4-cacf-4856-bf9f-44b9424b4e3f","host":"localhost:9966","content-type":"application/x-www-form-urlencoded","connection":"keep-alive","cache-control":"no-cache","accept-encoding":"gzip,
      deflate","user-agent":"PostmanRuntime/7.2.0","accept":"*/*"},"content":{"a":"aaaa","b":"bbbbb"},"contentType":"application/x-www-form-urlencoded","path":"/test","method":"post"}
    </code>
    <h3>Strategy example:</h3>
    <p>Default response func:</p>
    <pre class="hljs typescript">function exec(obj) {
    return "true";
}</pre>
    <p>Response specified func:</p>
    <pre class="hljs typescript">function exec(obj) {
    if (obj.header.flag == "1") {
        return "success";
    } else if (obj.header.flag == "2") {
        return "noauth";
    }
}</pre>
    <h3>Strategy response example:</h3>
    <p>Default response:</p>
    <pre class="hljs typescript">function exec(obj) {
    var obj = JSON.parse(obj)			//Optional, parse obj to json
    var resData = {				//Mandatory, response data
        status: 200,				//Mandatory, response status code. e.x. 200,404
        type: "json",				//Mandatory, response data type. Json, form, xml is supported
        content: {    				//Optional, response data
            a: obj.a,
            obj: obj
        }
    }
    return JSON.stringify(resData);		//Mandatory, parse response data to json string
}</pre>
    <p>Specified func response:</p>
    <pre class="hljs typescript">function success(obj) {
    Same as the default response
    }
function noauth(obj) {
    ...
}</pre>
    <p>Execute specified functions in java:</p>
    <pre class="hljs typescript">function exec(obj) {
    var obj = JSON.parse(obj)
    var reqDataJson = {
        ...
    sign: "<var
      style="color:#409EFF"
    >${reqDataSign}</var>",				//Mandatory, result of the java function will be replaced here
    };
    var resData = {
        status: 200,
        type: "xml",
        content: reqDataJson,				//Mandatory, response data
        var_: [{
            name: "<var
            style="color:#409EFF"
            >reqDataSign</var>",
            method: "wxSign",				//Mandatory, name of java function
            value: JSON.stringify(reqDataJson)		//Mandatory, parse data to json string for java function
        }]
    };
    return JSON.stringify(resData);
}</pre>
    <p>Execute js functions in response:</p>
    <pre class="hljs typescript">function exec(obj) {
    var obj = JSON.parse(obj)
    var resData = {
        status: ...,
        type: ...,
        content: {
            ...
            radmstr: <var
              style="color:#67C23A"
            >randomString()</var>				//call function
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
    <p>Call back after response:</p>
    <pre class="hljs typescript">function exec(obj) {
    var obj = JSON.parse(obj)
    var resData = {
        status: ...,
        type: ...,
        content: {...}，
        //Single call back
        callback: <var
          style="color:#67C23A"
        >callbk(obj)</var>			        //Mandatory, call back function name
        //Multiple call back
        //callback: [<var
          style="color:#67C23A"
        >callbk1(obj)</var>,<var style="color:#67C23A">callbk2(obj)</var>]
    }
    return JSON.stringify(resData);
}
function <var style="color:#67C23A">callbk(obj)</var> {			                //Mandatory, call back function
    var req = {
        url: "http://localhost:8180/testxmlsign",	//Mandatory, request url
        method: "post",					//Mandatory, request method
        datatype: "xml",				//Mandatory, request datatype
        delay: 5000,					//Optional, delay xxx ms after response
        content: {...}					//Optional, request data
    }
    return req;
}
</pre>
    <h3>Test parameter example:</h3>
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
  name: "InsTemplateEn",
  mounted () {
      hljs.initHighlightingOnLoad()
   }
};
</script>