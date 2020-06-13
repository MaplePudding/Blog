var express = require('express');
var router = express.Router();
var walkdir = require('walkdir');
var mdoperation = require('./mdoperation');

/**
 * 
 * @param {string} srcPath markdown file path
 * 
 * Use walkdir to get the markdown array
 */


async function walk(srcPath){
    var result = await walkdir.async(srcPath, {return_object: true});
    var mdArr = [];
    Object.entries(result).forEach(([path, fileStatus]) =>{
        if(!fileStatus.isDirectory() && path.match(/\.md$/ig)){
            mdArr.push(path);
        }
    })
    return mdArr;
}


/**
 * get the initial page
 */



router.get('/', function(request, response){
    response.render('index.html');
});

router.get('/getmdarray', function(request, response){
    mdoperation.walk('./articles').then((arr) =>{
        var res = mdoperation.getMetaData(arr);
        response.send(res);
    });
})

module.exports = router;

