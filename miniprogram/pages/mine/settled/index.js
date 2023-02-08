// pages/mine/settled/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessLicense: '',
    otherImage: '',
    timer: null,
    fnArr: [],
    storeinfo: {
      storeName: '',
      storeAddress: '',
      name: '',
      phone: '',
      desc: '',
    },
    business: '',
  },
  // 获取inp值
  debounce(e) {
    console.log(e.currentTarget.dataset.name);
    let name = e.currentTarget.dataset.name;

    this.setData({
      [`storeinfo.${name}`]: e.detail.value
    })
    console.log(this.data.storeinfo);

  },
  updata() {
    console.log(1);
  },
  chooseImg(e) {
    let name = e.currentTarget.dataset.name;
    let _this = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: function (res) {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',
          filePath: res.tempFiles[0].tempFilePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          _this.setData({
            [`${name}`]: res.fileID,
            business: res.fileID
          })
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  submit() {
    console.log('-------------我是提交----------')
    console.log(this.data.business);
    wx.cloud.callFunction({
      name: "shop",
      data: {
        type: "addProcess",
        storeName: this.data.storeinfo.storeName,
        storeAddress: this.data.storeinfo.storeAddress,
        name: this.data.storeinfo.name,
        phone: this.data.storeinfo.phone,
        desc: this.data.storeinfo.desc,
        business: this.data.business,
      }
    }).then(res => {
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