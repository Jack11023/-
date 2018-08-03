var express=require('express');
var handler=require('./handler.js')
var router=express.Router();


    router.get('/lunbo',handler.lunbo);

    router.get(/\/images\/.*/,handler.images);

    router.get('/home/newList',handler.newList);

    router.get(/\/home\/newsInfo.*/,handler.newsInfo);

    router.get(/\/comments.*/,handler.comments);

    router.get(/\/posts.*/,handler.posts);

    router.get('/photoList',handler.photoList);

    router.get(/\/pictureList.*/,handler.pictureList);

    router.get(/\/reqlunbo.*/,handler.reqlunbo);

    router.get(/\/goodListInfo.*/,handler.goodListInfo);

    router.get(/\/goods\/shoppingCar\/*/,handler.getshoppingcar)
    
module.exports=router;