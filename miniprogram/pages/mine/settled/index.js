// pages/mine/settled/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessLicense:'',
    otherImage:'',
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
    })
    console.log(e);
  },
  updata(){
    console.log(1);
  },
  chooseImg(e){
    let name = e.currentTarget.dataset.name;
    let _this = this;
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sourceType:['album'],
      success:function(res){
       wx.cloud.uploadFile({
         cloudPath: new Date().getTime()+'.png',
         filePath: res.tempFiles[0].tempFilePath, // 文件路径
       }).then(res => {
         // get resource ID
         console.log(res.fileID)
         _this.setData({
           [`${name}`]:res.fileID
         })
       })
      },
      fail:function(res){
        console.log(res);
      }
    })
  },
  submit(){
    wx.cloud.callFunction({
      name:"shop",
      data:{
        type:"addShop",
      }
    }).then(res=>{
      console.log(res.result);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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