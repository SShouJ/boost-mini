// pages/activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:[],
    navList:[],
    target:2,
  },
  toDetails(e){
    wx.navigateTo({
      url: '/pages/activityDetail/index?id='+e.currentTarget.dataset.id
    })
  },
  changeItem(e){
    this.setData({
      target:e.currentTarget.dataset.id,
    })
    this.getActivityList()
  },
  formatDate (value) {
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
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  //获取活动列表
  getActivityList(){
    wx.cloud.callFunction({
      name: "activity",
     data:{
      type:"getActivityByCategory",
      status:this.data.target
     }
    }).then(res=>{
      console.log(res);
      let list = res.result.data.list
      list.forEach(item =>{
        console.log(item);
        item.end = this.formatDate(item.end)
        item.start = this.formatDate(item.start)
      })
      this.setData({
        activityList : list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getActivityList()
    
    let navList = [
        {
          id:1,
          title:"全部",
        },
        {
          id:2,
          title:"待开奖",
        },
        {
          id:3,
          title:"已结束",
        },
        {
          id:4,
          title:"未开始",
        },
      ]
      
      this.setData({
        navList : navList
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