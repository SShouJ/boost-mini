// pages/activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    activityList: [],
    navList: [],
    target: 2,
    size:2,
    num:1
  },
  toDetails(e) {
    wx.navigateTo({
      url: '/pages/activityDetail/index?id=' + e.currentTarget.dataset.id
    })
  },
  //切换tab方法
 async changeItem(e) {
    this.setData({
      size: 2,
      num:1,
      target: e.currentTarget.dataset.id,
      activityList:[]
    })
    wx.showLoading({
      title: '加载中',
      mask:"ture",
    })
    let res =await this.getActivityList()
    if (res.result.data.list.length == 0) {
      wx.hideLoading()
      wx.showLoading({
        title: '没有更多了',
        mask:"ture",
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
     
    } else {
      wx.hideLoading()
      wx.showLoading({
        title: '加载成功',
        mask:"ture",
      })
      let list = res.result.data.list
      list.forEach(item => {
        console.log(item);
        item.end = this.formatDate(item.end)
        item.start = this.formatDate(item.start)
  })
  this.setData({
        activityList: list
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
    }
    
      console.log("=========");
      console.log(this.data.activityList);
 },
//时间戳转换日期
  formatDate(value) {
    if (typeof (value) == 'undefined') {
      return ''
    } else {
      let date = new Date(parseInt(value))
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d
    }
  },
  //下拉
  // onPullDownRefresh() {
  //   wx.stopPullDownRefresh({
  //     success: (res) => {
  //       console.log(1);
  //     }
  //   })
  // },
  //获取活动列表
  getActivityList() {
    console.log(this.data.target);
    console.log(this.data.size);
    console.log(this.data.num);

  return  wx.cloud.callFunction({
      name: "activity",
      data: {
        type: "getActivityByCategory",
        status: this.data.target,
        pageSize: this.data.size,
        pageNum: this.data.num,
      }
    })
    // .then(res => {
    //   console.log(res);
    //   let list = res.result.data.list
    //   list.forEach(item => {
    //     console.log(item);
    //     item.end = this.formatDate(item.end)
    //     item.start = this.formatDate(item.start)
    //   })
    //   let concatList = this.data.activityList.concat(list)
    //   this.setData({
    //     activityList: concatList
    //   })
     
    // })
  },
  //上拉加载
 async scrolltolower() {
    console.log("------------------------------------");
    this.setData({
      num: this.data.num + 1,
      size : this.data.size 
    })
    wx.showLoading({
      title: '加载中',
      mask:"ture",
    })
  let actList =await this.getActivityList()
  console.log(actList.result.data);
  if (actList.result.data.list.length == 0) {
    wx.hideLoading()
    wx.showLoading({
      title: '没有更多了',
      mask:"ture",
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
   
  } else {
    wx.hideLoading()
    wx.showLoading({
      title: '加载成功',
      mask:"ture",
    })
    let list = actList.result.data.list
      list.forEach(item => {
        console.log(item);
        item.end = this.formatDate(item.end)
        item.start = this.formatDate(item.start)
      })
      let concatList = this.data.activityList.concat(list)
      this.setData({
        activityList: concatList
      })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
async  onLoad(options) {
  
    let navList = [{
        id: 1,
        title: "全部",
      },
      {
        id: 2,
        title: "待开奖",
      },
      {
        id: 3,
        title: "已结束",
      },
      {
        id: 4,
        title: "未开始",
      },
    ]

    this.setData({
      navList: navList
    })
    wx.showLoading({
      title: '加载中',
      mask:"ture",
    })
    let res = await this.getActivityList()
    if (res.result.status == 1) {
      wx.hideLoading()
      wx.showLoading({
        title: '加载成功',
        mask:"ture",
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
    } else {
      wx.hideLoading()
      wx.showLoading({
        title: '加载失败',
        mask:"ture",
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
    }
    let list = res.result.data.list
    list.forEach(item => {
      console.log(item);
      item.end = this.formatDate(item.end)
      item.start = this.formatDate(item.start)
})
this.setData({
      activityList: list
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})