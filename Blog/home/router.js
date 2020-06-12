var express = require('express');
var router = express.Router();

/**
 * get the initial page
 */

router.get('/', function(request, response){
    response.render('index.html');
});

module.exports = router;

const walkdir = require('walkdir');

async function walk (srcPath){
    let result = await walkdir.async(srcPath,{return_object:true});
    const mdPaths = [];
    Object.entries(result).forEach(([path, fileStatus]) => {
        // walkdir会遍历所有目录和文件，我只将遍历结果中的md文件路径收集起来
        if(!fileStatus.isDirectory() && path.match(/\.md$/ig)){
            mdPaths.push(path);
        }
    });
    return mdPaths;
}


