/**
 * Created by Manlin on 2017/2/19.
 */
var cookieUtil={
    get:function (name) {
        var cookieValue=null;
        //取出所有cookie
        var cookies=document.cookie;
        if (cookies.length>0){
            cookieStart=cookies.indexOf(decodeURIComponent(name)+'=');
            if(cookieStart!=-1){
                cookieEnd=cookies.indexOf(';',cookieStart);
                if (cookieEnd==-1){
                    cookieEnd=cookies.length;
                }
            }
            cookieValue=encodeURIComponent(cookies.substring(cookieStart+name.length+1,cookieEnd));
        }
        return cookieValue;
    },
    set:function (name,value,expires,path,domain,secure) {
        var date=new Date();
        var cookieText=decodeURIComponet(name)+'='+decodeRUIComponent(value);
        if(expires instanceof Date){
            cookieText+=';expires='+expires.toGMTString();
        }
        if(path){
            cookieText+=';path='+path;
        }
        if(domain){
            cookieText+=';domain='+dmain;
        }
        if(secure){
            cookieText+=';secure'+secure;
        }
        document.cookie=cookieText;
    },
    delete:function (name,path,domain,secure) {
        this.set(name,'',new Date(0),path,domain,secure)
    }
}