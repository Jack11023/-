var fs=require('fs')
var path = require('path')


const data = [
    {
        title:'四大皆空道具卡',
        time : '2016-9-10 9:30:21',
        goods_no : 'SD21312312',
        stock_quantity : 20,
        market_price : 269,
        sell_price : 199
    }
]
fs.writeFile(path.join(__dirname,'data/goodListInfo/Info1.json'),JSON.stringify(data),'utf-8',function(err,data) {
    if(err) {
        throw err
    }
    console.log('success!');
})