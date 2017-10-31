// pages/news/news-detail/news-detail.js
var LnewsData = require('../../../data/data-news.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsId = options.id;
    var newData = LnewsData.QnewsData[newsId];
    this.setData({
      "TNewsData": newData,
      "newsId":newsId
    });



    
  var newsCollected = wx.getStorageSync('newsCollected');
    //wx.getStorageSync("newsCollected");
    if (newsCollected){
      var newsItemCollected = newsCollected[newsId];
      this.setData({
        collected: newsItemCollected
      })
    }else{
       var newsCollected ={}; 
       //newsCollected[newsId]=false;
       this.setData({
         collected: newsItemCollected
      }) 
       wx.setStorageSync("newsCollected",newsCollected)
       
    };
    
  },
  onColletionTap: function () {
    this.showToast();
  },


  

  




  setMusicMonitor:function(){
    var that=this;
    wx.onBackgroundAudioPlay(function(){
        var pages=getCurrentPages();
        var currentPage =pages[pages.length-1];
        if (currentPage.data.newsId === that.data.newsId) {
          if (app.globalData.currentMusicNewsId == that.data.newsId) {
            that.setData({
              isPlayingMusic: true
            });
          }
        }
        App.globalData.isPlayingMusic = true;     
    });
    wx.onBackgroundAudioPause(function () {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.newsId === that.data.newsId) {
        if (App.globalData.currentMusicNewsId == that.data.newsId) {
          that.setData({
            isPlayingMusic: false
          });
        }
      }
      app.globalData.isPlayingMusic = false;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.isPlayingMusic = false;
      app.globalData.currentMusicNewsId = null;
    });
  },












  showToast: function () {
    this.setData({
      collected: !this.data.collected
    });
    wx.showToast({
      title: this.data.collected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    });
    var newsCollected = wx.getStorageSync('newsCollected');
    newsCollected[this.data.newsId] = this.data.collected;
    wx.setStorageSync("newsCollected", newsCollected);
    console.log(newsCollected)
  },
  onShareTap: function () {
    var itemList = ['分享到微信好友', '分享到朋友圈', '分享到QQ', "分享到微博"];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        var index = res.tapIndex;
        if (index) {
          wx.showModal({
            title: itemList[index],
            content: '请点击右上角菜单的“转发”按钮进行分享',
          })
        }
      }
    })
  },
  
  onShareAppMessage: function () {
    return {
      title: this.data.newData.title,
      desc: "[喜洋洋的喜悦]",
      path: "/pages/news/news-detail/news-detail?id=" + this.data.newsId
    }
  },

  onMusicTap:function(){
    if (this.data.isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }else{
      var that= this;
      wx.playBackgroundAudio({
        dataUrl: that.data.TNewsData.music.url,
        title:that.data.TNewsData.music.title,
        coverImgUrl: that.data.TNewsData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      })
    }
    app.globalData.currentMusicNewsId = this.data.newsId;
  },
    

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    close();
  }
})