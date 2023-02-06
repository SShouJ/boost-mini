// pages/prize/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: 1, // target ：当前页--
    navList: [
      {
        id: 1,
        title: "全部1",
      },
      {
        id: 2,
        title: "全部2",
      },
      {
        id: 3,
        title: "全部3",
      },
      {
        id: 4,
        title: "全部4",
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

  changeItem(e) {
    this.setData({
      target: e.currentTarget.dataset.id,
    })
  },

  prizeLiftNav(data) {
    let item = data.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/' + item.nav + '/index?_identification=prizeLift,' + item.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { },

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