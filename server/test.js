/**
 * Created by Manlin on 2017/2/19.
 */
var fs=require('fs')
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
console.log(newDir);