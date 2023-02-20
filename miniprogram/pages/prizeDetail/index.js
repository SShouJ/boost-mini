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
    this.getPrizeDetail(dataId);
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 99999,
    });
    if (this.data.detailData) {
      wx.hideToast();
    }
  },
  // 兑换按钮
  exchange() {
    this.setData({
      isOpenDialog: true,
    })
  },
  // 确认兑换
  determine() {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    });
    // 先掉接口兑换  同时显示 兑换中 的一个遮罩层来优化
    this.getPrize(this.data.dataId);
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
    if (res.result.status == 1) {
      wx.hideToast()
      console.log('兑换成功,您兑换的奖品为：', this.data.detailData.goodName)
      // 兑换结果返回之后 显示兑换成功 并跳转页面到 看兑换码的页面
      wx.showToast({
        title: '兑换成功！',
        icon: 'success',
        duration: 1500,
      })
      // 兑换成功之后需要把返回值传给兑奖嘛页面
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/award/index?id=' + this.data.dataId
        })
        this.setData({
          isOpenDialog: false,
        })
      }, 500)
    } else if (res.result.status == 0) {
      wx.showToast({
        title: '积分不足!',
        icon: 'error',
        duration: 1500,
      })
      console.log(res.result)
      console.log('兑换失败', res.result.msg)
    }
  },
  // 获取商品详情
  async getPrizeDetail(id) {
    let res = await wx.cloud.callFunction({
      name: 'good',
      data: {
        type: 'getGoodDetail',
        id: id
      }
    })
    if (res.result.data) {
      this.setData({
        detailData: res.result.data,
      })
      console.log('获取商品详情', this.data.detailData);
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