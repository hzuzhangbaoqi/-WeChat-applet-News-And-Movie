function http(url,callback){
    wx.request({
        url: url,
        header: {
            'Content-Type': 'json' // 默认值
        },
        method:'GET',
        success: function(res) {
           callback(res.data);
        }
    })
}
function convertToStarsArray(stars) {
    var num=stars.toString().substring(0,1);
    var array=[];
    for(var i=1;i<=5;i++){
        if(i<=num){
            array.push(1);
        }else{                     
            array.push(0);
        }
    }
    return array;
}
function convertToCastString(arr) {
    var castsString=[];
    for(var index in arr){
        castsString+=arr[index].name+'/'
    }
    return castsString.substring(0,castsString.length-1);
}
function convertToCastInfos(arr) {
    var castsArray=[];
    for(var index in arr){
        var cast={
            img:arr[index].avatars?arr[index].avatars.large:"",
            name:arr[index].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}
module.exports={
    "http":http,
    "convertToStarsArray":convertToStarsArray,
    "convertToCastString":convertToCastString,
    "convertToCastInfos":convertToCastInfos
}

