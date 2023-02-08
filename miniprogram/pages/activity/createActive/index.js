// pages/activity/createActive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeArr:[],
    banner:'',//活动图片
    title:'',//活动标题
    start:'',//活动开始时间
    end:'',//活动结束时间
    rule:'',//商品规则
    showTip:true,
    prizeForms:[
      {
        id:'formId1',
        prizeName:'',
        prizeNumber:0,
      },
      {
        id:'formId2',
        prizeName:'',
        prizeNumber:0,
      },
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      let prizeArr = [
        {
          id:1,
          prizeName:'笔记本',
        },
        {
          id:1,
          prizeName:'笔记本',
        },
        {
          id:1,
          prizeName:'笔记本',
        },
    ];
    this.setData({
      prizeArr:prizeArr,
    })
  },
  getInputValue(e){
    console.log(e.detail);
  },
  closeTip(e){
    this.setData({
      showTip:!this.data.showTip
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