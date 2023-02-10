// pages/activity/createActive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
       id:'',
       count:5,
       goodprize:200,
    },
    prizeArr:[],
    banner:'',//活动图片
    title:'',//活动标题
    start:'',//活动开始时间
    end:'',//活动结束时间
    rule:'',//商品规则
    showTip:true,
    time:{
      startTime:'活动开始时间',
    endTime:'活动结束时间',
    },
    prizeForms:[
      {
        id:'',
        count:5,
        goodprize:200,
     },
     {
      id:'',
      count:5,
      goodprize:200,
   },
  ],
  },
//获取奖品列表
getGoodsList(){
  wx.cloud.callFunction({
    name: "activity",
   data:{
    type:"getGoodsList",
   }
  }).then(res =>{
    console.log(res);
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoodsList()
  },
  
  addItem(){
    this.data.prizeForms.push(this.data.item)
     this.setData({
       prizeForms:this.data.prizeForms
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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.target.dataset.name)
    var time = e.target.dataset.name
    this.setData({
      [`time.${time}`]: e.detail.value
    })
    console.log(this.data.time);
  },
  bindPriceChange:function(e){
    // let index = e.target.dataset.index;//所处的下标
console.log(e);
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