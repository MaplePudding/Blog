var express = require('express');
var router = express.Router();
var walkdir = require('walkdir');
var mdoperation = require('./mdoperation');
var fs = require('fs');
var marked = require('marked');

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

router.get('/article', function(request, response){
    var artName = request.query.name;
    fs.readFile('./articles/'+artName, function(err, data){
        if(err){
            return console.log('err');
        }
        var mdStr = data.toString();
        var index = mdStr.lastIndexOf('---');
        var sub = mdStr.substr(index);
        var res = mdStr.replace(sub, "");
        htmlStr = marked(res);
        response.render('./page.html', {
            content: res
        });
    })
});





module.exports = router;

