// pages/mine/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpenNull: true,
    isOpenDialog: false,
  },
  // 添加地址的方法
  addAddress() {
    console.log('点击了添加地址')
    // 打开弹层
    this.isOpen(true);
  },
  // 是否打开弹层 传布尔值 true打开 反之关闭
  isOpen(isok) {
    this.setData({
      isOpenDialog: isok,
    })
  },
  // 弹层 确定 按钮的方法
  determine() {
    console.log('点击了确认按钮');
    this.isOpen(false)
   },
  // 弹层 取消 按钮的方法
  cancel() {
    // 关闭弹层
    this.isOpen(false)
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