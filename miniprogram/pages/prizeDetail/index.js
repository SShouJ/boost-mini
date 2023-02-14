// pages/prizeDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    dataId: '',
    prizeLift: [
      {
        id: 0,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/iphoue.png?sign=5633dd4c0d1081abef83f06bbfa941d6&t=1675763424',
        title: '1这是奖品列表的数据',
        integral: 100,
        nav: 'prizeDetail',
      },
      {
        id: 1,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/iphoue.png?sign=5633dd4c0d1081abef83f06bbfa941d6&t=1675763424',
        title: '2这是奖品列表的数据',
        integral: 200,
        nav: 'prizeDetail',
      },
      {
        id: 2,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/iphoue.png?sign=5633dd4c0d1081abef83f06bbfa941d6&t=1675763424',
        title: '3这是奖品列表的数据',
        integral: 300,
        nav: 'prizeDetail',
      },
      {
        id: 3,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/iphoue.png?sign=5633dd4c0d1081abef83f06bbfa941d6&t=1675763424',
        title: '4这是奖品列表的数据',
        integral: 400,
        nav: 'prizeDetail',
      },
      {
        id: 4,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/iphoue.png?sign=5633dd4c0d1081abef83f06bbfa941d6&t=1675763424',
        title: '5这是奖品列表的数据',
        integral: 500,
        nav: 'prizeDetail',
      },
      {
        id: 5,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/iphoue.png?sign=5633dd4c0d1081abef83f06bbfa941d6&t=1675763424',
        title: '6这是奖品列表的数据',
        integral: 600,
        nav: 'prizeDetail',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let dataId = options.id;

    this.setData({
      dataId: dataId
    })
    console.log('dataId: ', dataId);
    this.pushData(this.data.prizeLift, dataId)
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
          detailData: { ...item }
        })
      }
    });
    console.log(this.data.detailData)
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