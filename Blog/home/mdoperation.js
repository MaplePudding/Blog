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
    var result = [];
    for(let i = 0; i < mdArr.length; ++i){
        var mdStr = fs.readFileSync(mdArr[i], 'utf-8');
        var metaData = parseMD(mdStr).metadata;
        var str = mdArr[i].substr(27);
        metaData.src = str;
        result.push(metaData);
    }
    return result;
}

exports.walk = walk;
exports.getMetaData = getMetaData;