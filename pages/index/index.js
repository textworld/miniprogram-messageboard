//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    textareaContent: "",
    messageContent: "",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    messages: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getMessageList()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getMessageList: function(e) {
    let that = this
    wx.request({
      url: 'http://c6t3vw.natappfree.cc/message/',
      success (res) {
        console.log(res.data)
        that.setData({
          messages: res.data
        })
      }
    })
  },
  postMessage: function(e){
    let that = this
    wx.request({
      method: 'POST',
      url: 'http://c6t3vw.natappfree.cc/message/',
      dataType: 'json',
      data:{
        text: that.data.messageContent,
        username: that.data.userInfo.nickName,
        avatar: that.data.userInfo.avatarUrl
      },
      success (res) {
        console.log(res.data)
        that.setData({
          textareaContent: ''
        })
        that.getMessageList()
      },
      fail (res) {
        wx.showToast({
          title: '提交留言失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  messageInput: function(e){
    console.log(e.detail.value)
    this.setData({
      messageContent: e.detail.value
    })
  }
})
