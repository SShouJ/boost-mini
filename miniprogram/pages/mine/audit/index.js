// pages/mine/audit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:[
      {
        id:1
      }
    ],
    navList : [
      {
        id:0,
        title:"全部",
      },
      {
        id:1,
        title:"待审核",
      },
      {
        id:2,
        title:"已通过",
      },
      {
        id:3,
        title:"未通过",
      },
    ],
    target:1,
    audit:[
      {
        id:1,
        title:'店铺名称',
      }, {
        id:2,
        title:'店铺地址',
      }, {
        id:3,
        title:'联系人姓名',
      }, {
        id:4,
        title:'联系人手机号',
      },
    ],
    audits:[]
  },
  changeItem(e){
    this.setData({
      target:e.currentTarget.dataset.id,
    })
    this.getProcess()
  },
  toPage(data){
    console.log(data.currentTarget.dataset.name);
    wx.navigateTo({
      url: '/pages/'+ data.currentTarget.dataset.name+'/index',
    })
  },
  //获取申请入驻列表
  getProcess(){
    
    this.setData({
      audits:[]
    })
    wx.showLoading({
      title: '加载中',
    })
    
    wx.cloud.callFunction({
      name: "shop",
     data:{
      type:"getProcess",
      status:this.data.target-1
     }
    }).then(res=>{
      
      console.log(res.result);
      this.setData({
        audits:res.result.data
      })
      wx.hideLoading()
      console.log(this.data.audits);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data);
    this.getProcess()
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