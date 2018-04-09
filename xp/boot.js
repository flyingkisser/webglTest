/**
 * Created by joe on 2018/4/9.
 */
xp={};
xp.loader={
    _timeout:3,

    //options
    //"timeout":3
    //"binary":1
    _getXHR:function (cb,options) {
        var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
        if(!options)
            options={};
        var timeout=options.timeout;
        if(!options.timeout)
            timeout=this._timeout;
        if(options.binary)
            xhr.responseType="arraybuffer";

        xhr._timeoutId = setTimeout(function () {
            console.log("load timeout status:"+xhr.status);
            cb?cb():null;
        }, timeout);

        xhr.onerror = function () {
            console.log("load error status:"+xhr.status);
            cb?cb():null;
        };

        var check=function () {
            if (xhr._timeoutId)
                clearTimeout(xhr._timeoutId);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 && cb) {
                    if(options.binary)
                        cb(xhr.response);
                    else
                        cb(xhr.responseText);
                } else {
                    console.log("load faild status:" + xhr.status);
                    cb();
                }
            }
        }.bind(this);
        xhr.onload = check;
        xhr.onreadystatechange = check;

        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            // IE-specific logic here
            xhr.setRequestHeader("Accept-Charset", "utf-8");
        } else if (xhr.overrideMimeType){
            xhr.overrideMimeType("text\/plain; charset=utf-8");
        }
        return xhr;
    },



    _get:function (url,param,cb) {
        var xhr = this._getXHR(cb);
        xhr.open("GET", url, true);
        xhr.send(param);
    },
    _post:function (url,param,cb) {
        var xhr = this._getXHR(cb);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.open("POST", url, true);
        xhr.send(param);
    },

    _getBinary:function () {

    },
    _postBinary:function () {

    },

    loadTxt:function (url,cb) {
       this._get(url,null,cb);
    }
};