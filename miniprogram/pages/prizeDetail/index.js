// pages/prizeDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    dataId: '',
    isOpenDialog: false,
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
    this.setData({
      isOpenDialog: true,
    })
  },
  // 确认兑换
  determine() {
    // 先掉接口兑换  同时显示 兑换中 的一个遮罩层来优化
    // 兑换结果返回之后 显示兑换成功 并跳转页面到 看兑换码的页面
    this.getPrize(this.data.dataId);
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 600,
    // })
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: '/pages/award/index?id=' + this.data.dataId
    //   })
    //   this.setData({
    //     isOpenDialog: false,
    //   })
    // }, 500)
  },
  // 取消兑换的按钮
  cancel() {
    this.setData({
      isOpenDialog: false,
    })
  },
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
  // 兑换奖品的接口
  async getPrize(prizeId) {
    let res = await wx.cloud.callFunction({
      name: 'good',
      data: {
        type: "addCashPrize",
        prizeId: prizeId
      }
    })
    if (res) {
      console.log('res', res)
    }
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