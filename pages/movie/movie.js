// pages/movie/movie.js
var utils=require('../../utils/utils');
var app=getApp();
var doubanBase=app.globalData.doubanBase;

Page({
  data: {
      "in_theaters":{},
      "coming_soon":{},
      "top250":{},
      "containerShow":true,
      "searchPanelShow":false,
      "searchResult":{}
  },
  onLoad: function (options) {
        var that=this;
        var inTheatersUrl=doubanBase+"/v2/movie/in_theaters?start=0&count=3";
        var ComingSoonUrl=doubanBase+"/v2/movie/coming_soon?start=0&count=3";
        var top250Url=doubanBase+"/v2/movie/top250?start=3&count=3";

        this.getMovieListData(inTheatersUrl,"in_theaters","正在上映");
        this.getMovieListData(ComingSoonUrl,"coming_soon","即将上映");
        this.getMovieListData(top250Url,"top250","top250");
  },
    onMoreTap:function (event) {
      var movieCategory = event.currentTarget.dataset.category;
      var moviesTitle=event.currentTarget.dataset.title;
         wx.navigateTo({
            url: "/pages/movie/movie-more/movie-more?id="+movieCategory+"&title="+moviesTitle
        })
    },


    getMovieListData:function (url,key,title) {
      var that=this;
        utils.http(url,function (data) {
            that.processDoubanData(data,key,title);
        });
    },
    processDoubanData:function (moviesDonban,key,title) {
        var movies=[];
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

        var readyData={};
        readyData[key]={
            "title":title,
            movies:movies,
            "category":key
        };
        this.setData(readyData);
        wx.hideNavigationBarLoading();
    },
    onBindFocus:function () {
        this.setData({
            "containerShow":false,
            "searchPanelShow":true
        })
    },
    onBindSearch:function (event) {
        var text=event.detail.value;
        var searchUrl=doubanBase+"/v2/movie/search?q="+text;
        this.data.searchUrl=searchUrl;
        this.getMovieListData(searchUrl,"searchResult","");
        wx.showNavigationBarLoading();
    },/*,
    onPullDownRefresh:function () {
        var refreshUrl=this.data.searchUrl;
        utils.http(refreshUrl,this.processDoubanData);
        wx.showNavigationBarLoading();
    }*/
    onMovieTap:function (event) {
        var movieid=event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: "/pages/movie/movie-detail/movie-detail?id="+movieid
        })
    },
    onCancelImgTap:function () {
        this.setData({
            "containerShow":true,
            "searchPanelShow":false
        })
    }
})