/**
 * Created by manlin on 2017/2/1.
 */
var fs=require('fs');
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
function source(ext,pathname,response) {
    fs.readFile(newDir+'/view'+pathname, 'utf-8',function (err, data) {//读取内容
        if (err) throw err;
        response.writeHead(200, {
            "Content-Type": {
                ".css":"text/css",
                ".js":"application/javascript",
                ".jpg":"image/jpeg",
                ".png":"image/png",
                '.html':"text/html"
            }[ext]
        });
        response.write(data);
        response.end();
    });
}



exports.source=source;