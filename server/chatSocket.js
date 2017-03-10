/**
 * Created by Manlin on 2017/2/11.
 */
var io=require('socket.io');


var onlineUsers=[]
var onlineCount=0;

//判断元素是否在数组内
function contains(arr,obj) {
    var i = arr.length;
    for (var o=0;o<i;o++){
        if (arr[o] == obj) {
            return o;
        }
    }
    return false;
}
//删除指定元素
function deleteElement(arr,obj) {
    var e=contains(arr,obj);
    if(e===false)
    return false;
    else {
        delete arr[e];
        return true;
    }
}

function createSocket(server) {
        var Socket=io(server);
        Socket.on('connection', function (socket) {
            console.log('connected');
            var uname;

            socket.on('message', function(data){
                Socket.sockets.emit("notice", {name:uname,'message':data});
            });
            socket.on('setName',function (name) {
                    if (contains(onlineUsers,name)){
                        socket.emit('setName',{'cod':401,'message':'用户名已经存在'});
                    }else {
                        onlineUsers.push(name);
                        socket.emit('setName',{'cod':200,'message':onlineCount});
                        uname=name;
                        onlineCount=onlineCount+1;
                    };
                })
            //删除用户
            socket.on('disconnect',function(){
                if (deleteElement(onlineUsers,uname)){
                    onlineCount--;
                };
            })
        }
        );
}
exports.chatSocket=createSocket;

