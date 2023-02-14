// pages/auditDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   auditDetail:[],
  },
  //获取审核详情
  getOneProcess(id){
    this.setData({
      auditDetail:[]
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "shop",
     data:{
      type:"getOneProcess",
      id:id
     }
    }).then(res=>{
      console.log(res.result.data);
      this.setData({
        auditDetail:res.result.data
      })
      wx.hideLoading()
      console.log(this.data.audits);
    })
  },
 
  //t通过
  audit(e){
    console.log(e.target.dataset.id);
    
      wx.cloud.callFunction({
        name:'shop',
        data:{
          type:'updateProcess',
          id:this.data.auditDetail._id,
          status:Number(e.target.dataset.id),
          msg:'通过',
        }
      }).then(res=>{
        console.log(res);
        wx.navigateTo({
          url: '/pages/auditDetail/index',
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    var _this = this
   
     const eventChannel = this.getOpenerEventChannel()
            eventChannel.on('acceptDataFromOpenerPage', function(id) {
            console.log(id);
          _this.getOneProcess(id.data)
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