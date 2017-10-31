// pages/movie/movie-more/movie-more.js
var utils=require('../../../utils/utils');
var app=getApp();
var doubanBase = app.globalData.doubanBase;
Page({
//totalCount表示当前处理了多少条
  data: {
      movies:[],
      totalCount:0
  },

  onLoad: function (options) {
    var cateory=options.id;
    var title=options.title;
    var dataurl=doubanBase+"/v2/movie/"+cateory;
    this.data.requestUrl=dataurl;
    utils.http(dataurl,this.processDoubanData);

    wx.setNavigationBarTitle({
      title: title
    });

    },
    onScrollLower:function () {
        var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
        utils.http(nextUrl,this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    processDoubanData:function (moviesDonban) {
        var movies=this.data.movies;
        for(var index in moviesDonban.subjects){
            var subject = moviesDonban.subjects[index];
            var movieTitle =subject.title;
            if(movieTitle.length>6){
                movieTitle = movieTitle.substring(0,6)+"...";
            }
            var temp={
                stars:utils.convertToStarsArray(subject.rating.stars),
                movieTitle:movieTitle,
                average:subject.rating.average,
                movieId:subject.id,
                coverageUrl:subject.images.large
            };

            movies.push(temp);
        }
        this.data.totalCount +=20;
        this.setData({
          movies:movies
        });
        wx.hideNavigationBarLoading();
    },
    onPullDownRefresh:function () {
        var refresh=this.data.requestUrl+"?start=0%count=20";
        this.data.movies=[];
        this.data.totalCount=0;
        utils.http(refresh,this.processDoubanData);
        wx.showNavigationBarLoading();
    },
    onMovieTap:function (event) {
        var movieid=event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: "/pages/movie/movie-detail/movie-detail?id="+movieid
        })
    }
})