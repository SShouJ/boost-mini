// pages/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordData: [],
    date: [
      {
        id: 1,
        date: '2023年09月'
      },
      {
        id: 2,
        date: '2023年08月'
      },
      {
        id: 3,
        date: '2023年07月'
      },
      {
        id: 4,
        date: '2023年06月'
      },
    ],
    dateInfo: 'ces',
    content: {
      isShow: true,
    },
  },

  scroll: function (e) {
    if (e.detail.scrollTop >= 216) {
      if (!this.data.content.isShow) {
        this.setData({
          'content.isShow': true
        })
      }
    } else {
      if (this.data.content.isShow) {
        this.setData({
          'content.isShow': false
        })
      }
    }
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
    this.setData({
      recordData: [
        {
          id: 1,
          date: '02月02日',
          time: '19:54',
          title: '记录第1条',
          describe: '兑换成功',
        },
        {
          id: 2,
          date: '02月03日',
          time: '19:54',
          title: '记录第2条',
          describe: '兑换成功',
        },
        {
          id: 3,
          date: '02月04日',
          time: '19:54',
          title: '记录第3条',
          describe: '兑换成功',
        },
        {
          id: 4,
          date: '02月05日',
          time: '19:54',
          title: '记录第4条',
          describe: '兑换成功',
        },
        {
          id: 6,
          date: '02月06日',
          time: '19:54',
          title: '记录第5条',
          describe: '兑换成功',
        },
        {
          id: 7,
          date: '02月07日',
          title: '记录第6条',
          describe: '兑换成功',
          time: '19:54',
        },
        {
          id: 8,
          date: '02月08日',
          title: '记录第7条',
          describe: '兑换成功',
          time: '19:54',
        },
        {
          id: 9,
          date: '02月09日',
          time: '19:54',
          title: '记录第8条',
          describe: '兑换成功',
        },
        {
          id: 10,
          date: '02月10日',
          time: '19:54',
          title: '记录第9条',
          describe: '兑换成功',
        },
        {
          id: 11,
          date: '02月10日',
          time: '19:54',
          title: '记录第10条',
          describe: '兑换成功',
        },
        {
          id: 12,
          date: '02月10日',
          time: '19:54',
          title: '记录第11条',
          describe: '兑换成功',
        },
      ]
    });
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