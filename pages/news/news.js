// pages/news/news.js
var LnewsData = require('../../data/data-news.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    indicatorDots: true,
    autoplay: true,
    interval: 1000,
    duration: 500,
    circular:true,
    indicatorColor:"#ccc",
    indicatorActiveColor:"#fff",
    
    imgUrls:[
      {
        img_path: 'http://n.sinaimg.cn/default/1_img/uplaod/3933d981/20171017/eBl6-fymvkax7424098.jpg',
        text:'“时空涟漪”壮观绝伦！人类首次“看到”引力波'
      },{
        img_path: 'http://n.sinaimg.cn/zj/crawl/20171008/kIkj-fymrcpw5109343.png',
        text: '国庆假期外卖量上海最高杭州第二 简餐米粉最受欢迎'
      }, {
        img_path: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        text: '世界上最有钱的国家之一 国民却买不起汽车'
      },
      {
        img_path: 'http://n.sinaimg.cn/default/1_img/uplaod/3933d981/20171017/eBl6-fymvkax7424098.jpg',
        text: '“时空涟漪”壮观绝伦！人类首次“看到”引力波'
      }, {
        img_path: 'http://n.sinaimg.cn/zj/crawl/20171008/kIkj-fymrcpw5109343.png',
        text: '国庆假期外卖量上海最高杭州第二 简餐米粉最受欢迎'
      }, {
        img_path: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        text: '世界上最有钱的国家之一 国民却买不起汽车'
      }
    ]

    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      TNewsData: LnewsData.QnewsData,
    })
  },
  onNewsTap:function(event){
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: 'news-detail/news-detail?id='+newsId,
    })
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
  
  }
})