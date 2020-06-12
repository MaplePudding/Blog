var walkdir = require('walkdir');
var parseMD = require('parse-md').default;
var fs = require('fs');
/**
 * 
 * @param {string} path 
 * 
 * get the markdown filepath
 */

async function walk(path){
    var result = await walkdir.async(path,{return_object: true});
    var mdArr = [];
    Object.entries(result).forEach(([filePath, fileStatus]) =>{
        if(!fileStatus.isDirectory() && filePath.match(/\.md$/g)){
            mdArr.push(filePath);
        }
    });
    return mdArr;
}

/**
 * 
 * @param {array} mdArr 
 * 
 * get the metadata of markdown
 */

function getMetaData(mdArr){
    for(let i = 0; i < mdArr.length; ++i){
        var mdStr = fs.readFileSync(mdArr[i], 'utf-8');
        var{metaData, content} = parseMD(mdStr);
        var{title, date} = metaData;
        console.log(title);
    }
}

walk('./articles').then((mdArr) =>{
    for(let i = 0; i < mdArr.length; ++i){
        var mdStr = fs.readFileSync(mdArr[i], 'utf-8');
        var{metaData, content} = parseMD(mdStr);
        console.log(parseMD(mdStr));
    }
});
