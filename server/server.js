/**
 * Created by manlin on 2017/1/13.
 */
var http=require("http").Server(serverFun);
var url=require('url');
var router=require('./router');
var requestHandle=require('./requestHandle')
var chatSocket=require('./chatSocket')

function serverFun(request,response) {
    var pathname=url.parse(request.url).pathname;
    router.route(pathname,response,requestHandle.getHandle(),request);
}

chatSocket.chatSocket(http);

http.listen(1994,function () {
    console.log('1994 listen');
})