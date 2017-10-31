Page({
    data:{

    },
    onLoad:function(){
      var that= this;
      wx.getUserInfo({
        success:function(res){
          var nickName = res.userInfo.nickName;
          var avatarUrl =res.userInfo.avatarUrl;
          var province =res.userInfo.province;
          var city = res.userInfo.city;
          that.setData({
            "nickName":nickName,
            "avatarUrl": avatarUrl,
            "province": province,
            "city":city
          })
        }
      })
    },
    onTap:function(){
      console.log(1);
      wx.switchTab({
        url: "/pages/news/news",
      })
    }
})