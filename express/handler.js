
var path=require('path');
var fs=require('fs');
var mime=require('mime');
var url=require('url')

module.exports.lunbo=function(req,res) {
    // fs.readFile(path.join(__dirname,'data/data1.json'),function(err,datajson){
    //     var data=JSON.parse(datajson || '[]');

    //     ejs.renderFile(path.join(__dirname,'static/hacker.html'),{data:data},function(err,str) {
    //         if(err) {
    //             throw err;
    //         }
    //         console.log(str)
    //         res.setHeader('Content-Type','text/html');
    //         res.send(str); 
    //     })        
    // });       
    fs.readFile(path.join(__dirname,'data/lunbo.json'),function(err,data) {
        const {query}=url.parse(req.url)
        const callback=query.split('=')[1]
        console.log(data)
        res.end(`${callback}(${data})`)
    })
}
module.exports.images =function(req,res) {
    const {path : filepath} = url.parse(req.url)
    res.setHeader("Content-Type", mime.getType(filepath));
    //格式必须为 binary 否则会出错 返回图片
    var content =  fs.readFileSync(path.join(__dirname,filepath),"binary");   
    res.writeHead(200, "Ok");
    res.write(content,"binary");
    res.end();
}
module.exports.newList= function(req,res) {
    fs.readFile(path.join(__dirname,'data/newList.json'),function(err,data) {
        const {query}=url.parse(req.url)
        const callback=query.split('=')[1]
        res.end(`${callback}(${data})`)
    })
}
module.exports.newsInfo= function(req,res) {
    const {query}=url.parse(req.url)
    const id = query.split('&')[0].split('=')[1];
    const callback=query.split('&')[1].split('=')[1];
    fs.readFile(path.join(__dirname,`data/newsInfo/newInfo${id}.json`),function(err,data) {
        res.end(`${callback}(${data})`)
    })
}
module.exports.comments= function(req,res) {
    const {query}=url.parse(req.url)
    const id = query.split('&')[0].split('=')[1];
    const pageIndex=query.split('&')[1].split('=')[1];
    const callback=query.split('&')[2].split('=')[1];
    fs.readFile(path.join(__dirname,`data/comments/comments_id${id}/comments${pageIndex}.json`),function(err,data) {
        res.end(`${callback}(${data})`)
    })
}
module.exports.posts= function(req,res) {
    const {query}=url.parse(req.url)
    const user =query.split('&')[0].split('=')[1];
    const comment=query.split('&')[1].split('=')[1];
    const id = query.split('&')[2].split('=')[1];
    const pageIndex = query.split('&')[3].split('=')[1];
    const callback = query.split('&')[4].split('=')[1];

    fs.readFile(path.join(__dirname,`data/comments/comments_id${id}/comments${pageIndex}.json`),function(err,data) {
        data = JSON.parse(data)
        data.push({
            user :user,
            comment : comment
        })
        data = JSON.stringify(data)
        fs.writeFile(path.join(__dirname,`data/comments/comments_id${id}/comments${pageIndex}.json`),data,'utf-8',function(err,data) {
            if(err) {
                var status = -1;
                console.log(err.message)    
            } else {
                var status = 0;
            }          
            res.end(`${callback}(${status})`)
        })
    })
}
module.exports.photoList= function(req,res) {
    fs.readFile(path.join(__dirname,'data/photoList.json'),function(err,data) {
        const {query}=url.parse(req.url)
        const callback=query.split('=')[1]
        res.end(`${callback}(${data})`)
    })
}
module.exports.pictureList =function(req,res) {
    const {query} = url.parse(req.url)
    const id = query.split('&')[0].split('=')[1]
    const callback = query.split('&')[1].split('=')[1]
    fs.readFile(path.join(__dirname,`/data/pics/pics-${id}.json`),function(err,data) {
        if(err) {
            console.log(err.message)
            res.end('err!')
        }
        res.end(`${callback}(${data})`)
    })
}
module.exports.reqlunbo = function(req,res) {
    const {query} = url.parse(req.url)
    const id = query.split('&')[0].split('=')[1]
    const callback = query.split('&')[1].split('=')[1]
    fs.readFile(path.join(__dirname,`/data/reqlunbo/lunbo${id}.json`),function(err,data) {
        if(err) res.end(err.message)
        res.end(`${callback}(${data})`)
    })
}
module.exports.goodListInfo = function(req,res) {
    const {query} = url.parse(req.url)
    const id = query.split('&')[0].split('=')[1]
    const callback = query.split('&')[1].split('=')[1]
    fs.readFile(path.join(__dirname,`/data/goodListInfo/Info${id}.json`),function(err,data) {
        if(err) res.end(err.message)
        res.end(`${callback}(${data})`)
    })
}
module.exports.getshoppingcar = function(req,res) {
    const {query,pathname} = url.parse(req.url)
    const callback = query.split('=')[1]
    const paramsId = pathname.split('/').pop()
    const ids = paramsId.split(',')
    var shoppingCarInfo = [], count = 0, reqSum = ids.length
    new Promise(function(resolve, reject) {
        ids.forEach(function(id) {   
            fs.readFile(path.join(__dirname,`/data/goodListInfo/Info${id}.json`),function(err,data) {
                if(err) reject(err);
                console.log(data)
                const shoppingInfo = JSON.parse(data)[0]
                shoppingCarInfo.push({
                    id : shoppingInfo.id,
                    title : shoppingInfo.title,
                    price : shoppingInfo.sell_price,
                    img : shoppingInfo.img
                })
                count++
                if(count == reqSum) {
                    resolve(shoppingCarInfo);
                }
            })        
        })
    }).then(result => {
        res.send(`${callback}(${JSON.stringify(shoppingCarInfo)})`)
    }).then(err => {
        res.send(err)
    })
}