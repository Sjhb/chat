/**
 * Created by Manlin on 2017/2/7.
 */
(function () {
    var w = window;
    var user = {
        name: '',
        message: ''
    }
    var socket = io.connect('http://60.205.219.161:1994');

    w.onload = function () {
        var es = [getDomById('chat_area'), getDomById('chat_content')];
        es.forEach(function (e) {
            setStyleHeight(e, w.innerHeight - 320 + 'px');
        });

        setStyleHeight(getDomById('shade'), w.innerHeight + 'px');
        getDomById('shade').style.width = w.innerHeight + 'px';
    }
    //基本函数
    function existy(x) {
        return x != null;
    }

    function truthy(x) {
        return (x !== false && existy(x));
    }

    function doWhen(cond, action) {
        if (truthy(cond))
            return action();
        else
            return undefined;
    }

//获取dom
    function getDomById(dom) {
        return document.getElementById(dom);
    };
//获取value
    function getValue(id) {
        return getDomById(id).value;
    }

//新建dom
    function createDom(dom) {
        return document.createElement(dom);
    }

//为Dom设定Class
    function setClass(dom, className) {
        dom.className = className;
    }

//为Dom设定属性Attribute
    function setAttribute(dom, attributeName, attributeValue) {
        dom.setAttribute(attributeName, attributeValue);
    }

//为Dom设定innerHtml
    function setHtml(dom, value) {
        dom.innerHTML = value;
    }

//为Dom设定高度
    function setStyleHeight(dom, height) {
        dom.style.height = height;
    }

//为Dom设定颜色
    function setStyleColor(dom, color) {
        dom.style.color = color;
    }

//为Dom设定justify-content
    function setJustifycontent(dom, justifycontnet) {
        dom.style.justifyContent = justifycontnet;
    }

// 清空dom内html
    function clearDom(domid) {
        getDomById(domid).value = '';
    }

//隐藏指定dom
    function hideDom(domid) {
        getDomById(domid).style.display = 'none';
    }

//依据传入的含有DOM元素数组，以此append到target中
    function addChild(target, elements) {
        elements.forEach(
            function (e) {
                doWhen(typeof e === 'object', function () {
                    target.appendChild(e);
                    return true;
                })
            }
        );
    }

    //消息创建  被注释掉的：头像
    function createChat(position, person) {
        var chat_content = getDomById('chat_content');

        var chat = createDom('div');
        // var ico = createDom('img');
        var ico = createDom('div');
        var triangle = createDom('i');
        var words = createDom('div');
        var p = createDom('p');


        setClass(chat, 'chat');
        // setAttribute(ico, 'src', '../image/' + person.icon)
        setHtml(ico, person.name);
        // setClass(ico, 'icon icon-img');
        setClass(ico, 'icon icon-name')
        setClass(words, 'words');
        setHtml(p, person.message);
        addChild(words, [p]);

        doWhen(position === 'left', function () {
            setClass(triangle, 'triangle triangle-left');
            addChild(chat, [ico, triangle, words]);
        });
        doWhen(position === 'right', function () {
            setClass(triangle, 'triangle triangle-right');
            setJustifycontent(chat, 'flex-end');
            addChild(chat, [words, triangle, ico])
        });

        addChild(chat_content, [chat]);
        chat_content.scrollTop = chat_content.scrollHeight;
    }

    //创建提示信息
    function showNotice(data) {
        var chat = createDom('div');
        setClass(chat, 'chat');
        setJustifycontent(chat, 'center');
        setHtml(chat, data);
        setStyleColor(chat, '#6f7776');
        addChild(chat_content, [chat]);
    }

    //显示人数
    function shouOnlineCounts(data) {
        var chat = createDom('div');
        setClass(chat, 'chat');
        setJustifycontent(chat, 'center');
        setHtml(chat, '当前在线人数：' + (data + 1));
        setStyleColor(chat, '#6f7776');
        addChild(chat_content, [chat]);
    }

    //别人的消息对话框
    function createLeftChat(person) {
        createChat('left', person);
    }

    //自己的消息对话框
    function createRightChat(person) {
        createChat('right', person);
    }

    //发送信息
    function sendMesssage(socket, mName, value) {
        socket.emit(mName, value);
    }

    //监听 简单信息
    function listen(socket, header, action) {
        if(listen.arguments.length>3){
            var message=arguments[3];
            socket.on(header, function (data) {
                action(data+message);
            });
        }else {
            socket.on(header, function (data) {
                action(data);
            });
        }
    }
    //判断非己信息
    function judgeMe(data) {
        if (user.name == data.name) {
            createRightChat(data);
        } else
            createLeftChat(data);
    }


// 动作函数
    //提交信息
    function submitMessage(id) {
        var message = getValue(id);
        sendMesssage(socket, 'message', message);
        clearDom(id);
    }
    //设定名字
    function setName(name) {
        sendMesssage(socket, 'setName', name);
        user.name = name;
    }

    //用户提交用户名
    function submitUname(domid) {
        var uname = getValue(domid);
        socket.emit('setName', uname);
    }

//     --动作函数

// 监听器
    //接受聊天信息
    function getMessage() {
        listen(socket, 'notice', judgeMe);
    }

    //接收用户进入消息
    function getJoinMessage() {
        listen(socket,'join',showNotice,' joined the room');
    }

    //判断返回setName信息
    function getSetName() {
        listen(socket, 'setName', function (data) {
            if (data.cod == 200) {
                hideDom('shade');
                shouOnlineCounts(data.message)
            } else if (data.cod == 401) {
                alert(data.message);
            }
        });
    };
//--监听器

    //初始化，把监听器运行起来
    function init() {
        getMessage();
        getSetName();
        getJoinMessage();
    }

    init();

    w.CHAT = {
        submitMessage: function (id) {
            submitMessage(id);
        },
        submitUname: function (domid) {
            setName(getValue(domid));
        }
    }
})();
