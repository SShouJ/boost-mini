// pages/prizeDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    dataId: '',
    prizeLift: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let dataId = options._id;
    this.setData({
      dataId: dataId
    })
    console.log('dataId: ', dataId);
    // this.pushData(this.data.prizeLift, dataId)
  },
  // 兑换按钮
  exchange() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 600,
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/award/index?id=' + this.data.dataId
      })
    }, 500)
  },
  // 
  pushData(data, id) {
    data.forEach(item => {
      if (item.id == id) {
        this.setData({
          detailData: {
            ...item
          }
        })
      }
    });
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