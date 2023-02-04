// pages/prizeDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    // swiperPrize  prizeLift 这两个数据需要换成接口返回的数据
    swiperPrize: [
      {
        id: 1,
        url: '../../images/goods1.png',
        title: '1这是轮播图的标题11111111',
        day: '111',
        date: '23:51:31',
        integral: 100,
        nav: 'prizeDetail',
      },
      {
        id: 2,
        url: '../../images/goods1.png',
        title: '2这是轮播图的标题11111111',
        day: '222',
        date: '23:52:31',
        integral: 200,
        nav: 'prizeDetail',
      },
      {
        id: 3,
        url: '../../images/goods1.png',
        title: '3这是轮播图的标题11111111',
        day: '333',
        date: '23:53:31',
        integral: 300,
        nav: 'prizeDetail',
      },
      {
        id: 4,
        url: '../../images/goods1.png',
        title: '4这是轮播图的标题11111111',
        day: '444',
        date: '23:54:31',
        integral: 400,
        nav: 'prizeDetail',
      },
      {
        id: 5,
        url: '../../images/goods1.png',
        title: '这是轮播图的标题11111111',
        day: '555',
        date: '23:55:31',
        integral: 500,
        nav: 'prizeDetail',
      },
      {
        id: 6,
        url: '../../images/goods1.png',
        title: '6这是轮播图的标题11111111',
        day: '666',
        date: '23:56:31',
        integral: 600,
        nav: 'prizeDetail',
      },
      {
        id: 7,
        url: '../../images/goods1.png',
        title: '7这是轮播图的标题11111111',
        day: '777',
        date: '23:57:31',
        integral: 700,
        nav: 'prizeDetail',
      },
      {
        id: 8,
        url: '../../images/goods1.png',
        title: '8这是轮播图的标题11111111',
        day: '888',
        date: '23:58:31',
        integral: 800,
        nav: 'prizeDetail',
      },
    ],
    prizeLift: [
      {
        id: 0,
        url: '../../images/price.png',
        title: '1这是奖品列表的数据',
        integral: 100,
        nav: 'prizeDetail',
      },
      {
        id: 1,
        url: '../../images/price.png',
        title: '2这是奖品列表的数据',
        integral: 200,
        nav: 'prizeDetail',
      },
      {
        id: 2,
        url: '../../images/price.png',
        title: '3这是奖品列表的数据',
        integral: 300,
        nav: 'prizeDetail',
      },
      {
        id: 3,
        url: '../../images/price.png',
        title: '4这是奖品列表的数据',
        integral: 400,
        nav: 'prizeDetail',
      },
      {
        id: 4,
        url: '../../images/price.png',
        title: '5这是奖品列表的数据',
        integral: 500,
        nav: 'prizeDetail',
      },
      {
        id: 5,
        url: '../../images/price.png',
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
    let dataName = options._identification.split(',')[0];
    let dataId = options._identification.split(',')[1];
    console.log(dataName + ' --- ', dataId);
    if (dataName == 'swiper') {
      this.pushData(this.data.swiperPrize, dataId)
    } else {
      this.pushData(this.data.prizeLift, dataId)
    }
  },
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