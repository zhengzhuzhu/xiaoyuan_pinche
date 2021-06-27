// pages/msg/index.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data:{},
  msg:function(){
    var that = this;
    util.req('msg/getall', { sk: app.globalData.sk }, function (data) {
      var zan = 0;
      var comment = 0;
      var notice = 0;
      if (data.data == null) {
        var data = { zan: zan, comment: comment, notice: notice };
        that.setData({ data: data });
        return false;      
      }
      data.data.forEach(function (item) {
        if (item.type == 'zan') {
          zan = item.count;
        }
        if (item.type == 'comment') {
          comment = item.count;
        }
        if (item.type == 'notice') {
          notice = item.count;
        }
      })
      var data = { zan: zan, comment: comment, notice: notice };
      that.setData({ data: data });
  })
  },
  onShow: function () {
    var that = this;
    that.setData({
      userInfo:app.globalData.userInfo
    });
    util.req('appointment/mycount', { sk: app.globalData.sk }, function (data) {
      that.setData({ appointmentCount: data.data });
    })
    this.msg();
  },
  onPullDownRefresh: function () {
    this.msg();
    wx.stopPullDownRefresh();
  },
})