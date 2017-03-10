/**
 * Created by manlin on 2017/1/16.
 */
var fs=require('fs'),source=require('./source');


function route(pathname,response,handle,request) {
    var ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名
    if(ext=='.css'||ext=='.js'||ext=='.jpg'||ext=='.png'||ext=='.html')
    source.source(ext,pathname,response);//静态资源支持
    else if (typeof handle[pathname]==='function'){
        handle[pathname](response,request);
    }
    else
         console.log('No request handle for'+pathname);
}



exports.route=route;