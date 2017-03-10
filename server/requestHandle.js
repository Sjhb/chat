/**
 * Created by manlin on 2017/1/16.
 */
var queryString=require('querystring');
var fs=require('fs');
var formidable=require('formidable');
var newDir = getHigher(__dirname);

//取得上层路径
function  getHigher(dir) {
    var dirs=dir.split('/');
    var newdir='';
    for (var i = 0; i < dirs.length-2; i++) {
        newdir += dirs[i] + '/';
    }
    newdir+=dirs[dirs.length-2];
    return newdir;
}

//response操作
function sendResponse(response,cod,content_type,file) {
    response.writeHead(cod,{"Content-Type":content_type});
    response.write(file);
    response.end();
}
//错误
function sendErr(response,err) {
    sendResponse(response,500,'text/plain',err);
}
//成功
function sendSuccess(response,content_type,file) {
    sendResponse(response,200,content_type,file);
}
//io操作
function getfile(index,encrypt,response) {
    fs.readFile(index,encrypt,function (err,data) {
        if (err) console.log(err );
        else sendSuccess(response,'text/html',data);//这里得重写
    });

}

//主页
function getChatHome(response) {
    getfile(newDir+'/view/views/chat.html','utf-8',response);
};
//得到发送的消息
function getSentMessage(request) {

}
function show(response) {
    fs.readFile(newDir+"/view/image/1.jpg", "binary",function (err,file) {
       if(err){
           response.writeHead(500,{'Content-Type':'text/plain'});
           response.write(err);
           response.end();
       }else{
           response.writeHead(200,{'Content-Type':'image/jpg'});
           response.write(file,'binary');
           response.end();
        }
    });
}
function getPicture(request,response) {
        var  form=formidable.IncomingForm();
        form.parse(request,function (err,fields,files) {
            console.log(files);
            fs.readFile(files.picture.path,function (err,file) {
                fs.writeFile("../image/1.jpg",file, function() {
                    console.log('ok,');
                });
            })
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("received image:<br/>");
            response.write("<img src='/show' />");
            response.end();
        });
}
function getHandle() {
    return {
        '/':function (response) {
            getChatHome(response);
        },
        '/start':function(response,request){
        getExec(response);},
        '/upload':function (response,request) {
            getPicture(request,response)
        },
        '/show':function(response) {
            show(response);
        }
    }
}

exports.getHandle=getHandle;


