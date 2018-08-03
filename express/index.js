var express=require('express');
var router=require('./router.js');

var app=express();

app.use('/',router);

app.listen(9090,function() {
    console.log('http://localhost:9090');
})