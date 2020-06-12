var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router.js');
app.engine('html', require('express-art-template'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.use('/front', express.static('./front/public'));
app.listen(3000, function(){
    console.log('listen');
})


