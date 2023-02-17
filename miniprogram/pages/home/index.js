// pages/prize/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: 0, // target ：当前页--
    navList: [],
    prizeLift: [],
    hobbys: [],
    selected: [],
    userInfo: null,
    isOpenDialog: false,
    isDisplay: false,
    showPrize: true,
  },
  // 判断是否登录了
  async isLogin() {
    /**
     * 若登录 则展示正常布局页面 弹层啥的
     * 若未登录  则在header模块展示一个 未登录 的标题，并关闭让用户选择爱好的弹层 
     */
    let res = await wx.cloud.callFunction({
      name: 'user',
      data: {
        type: "getUserInfo",
      }
    })
    if (res.result.status == 1 && res.result.data) {
      if (res.result.data.hobbys.length == 0) {
        // 打开爱好弹层
        this.isOpen(true);
      } else {
        this.accordingToHobbiesGetCommodity(res.result.data.hobbys);
      }
      // 设置 用户信息的数据给 userinfo   设置
      this.setData({
        userInfo: res.result.data,
        isDisplay: true
      })
    } else {
      // 先关闭让用户选择爱好的弹层
      // 不管有没有数据 当掉完接口的时候 都要关闭加载中放开页面显示限制 
      this.getAllGoodByCategory()
      this.isOpen(false);
      this.setData({
        isDisplay: true
      })
    }

    wx.hideToast()
  },
  // 是否打开弹层 传布尔值 true打开 反之关闭
  isOpen(isok) {
    this.setData({
      isOpenDialog: isok,
    })
  },
  // choice 是来排断爱好选择的方法
  choice(data) {
    // item就是当前用户选中的 爱好
    let item = data.currentTarget.dataset.name;
    this.data.hobbys.forEach((e) => {
      if (e._id == item._id) {
        e.isActive = !e.isActive;
      }
    })
    this.setData({
      hobbys: this.data.hobbys
    })
  },
  // 弹层 确定 按钮的方法
  determine() {
    let data = [];
    this.data.hobbys.forEach((e => {
      if (e.isActive) {
        data.push(e._id);
      }
    }))
    // this.data.selected 就是最终用户选择的爱好
    // 用户选择爱好完成点击确定按钮的时候  在这里调用设置用户爱好的接口
    // 判断用户是否选择了至少一个  选择了就调用接口设置  否则 就不调用 提示用户至少选择一个  或跳过   跳过的话  需要在登录接口返回之后加个排断  用户爱好是否有值  有则继续正常流程  没有就重新打开让用户设置爱好的弹层让用户设置
    this.setUserHobby(data);
  },
  // 弹层 取消 按钮的方法
  cancel() {
    // 关闭弹层.
    wx.showToast({
      title: '默认则展示推荐奖品。',
      icon: 'none',//icon
      duration: 1500 //停留时间
    })
    this.isOpen(false)
  },
  // changeItem 是监测tab列表当前选中的是哪个的方法
  changeItem(e) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    });
    this.setData({
      target: e.currentTarget.dataset.id,
      showPrize: false,
    })
    let title = ''
    this.data.navList.forEach((item, i) => {
      if (i == this.data.target) {
        title = item.name
      }
    })
    let navId = this.data.navList[this.data.target]._id;
    if (this.data.target == 0) {
      if (this.data.userInfo.hobbys) {
        this.accordingToHobbiesGetCommodity(this.data.userInfo.hobbys);
      } else {
        // 若类目的 id 为 0 且没有选择爱好则调用所有商品的接口
        this.getAllGoodByCategory()
      }
    } else {
      this.getGoodByCategory(navId)
    }
  },
  // prizeLiftNav 跳转详情页面 + 传参 的方法
  prizeLiftNav(data) {
    let item = data.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/' + item.nav + '/index?id=' + item.id,
    })
  },
  // toRecord 是跳转到兑换记录的方法
  toRecord() {
    wx.navigateTo({
      url: '/pages/record/index',
    })
  },
  // toLogin
  toLogin() {
    wx.switchTab({
      url: '/pages/mine/index',
    })
  },
  // 获取类目
  getClassList() {
    wx.cloud.callFunction({
      name: 'good',
      data: {
        type: "getCategoryList",
      }
    }).then(res => {
      if (res.result.data.data.length) {
        let resData = JSON.parse(JSON.stringify(res.result.data.data));
        resData.forEach(e => {
          e.isActive = false;
        });
        let navData = [
          {
            _id: '111',
            name: '推荐'
          },
        ]
        res.result.data.data.forEach((e) => {
          navData.push(e);
        })
        this.setData({
          hobbys: resData,
          navList: navData
        })
      }
    })
  },
  // 根据类目获取商品
  async getGoodByCategory(id) {
    let res = await wx.cloud.callFunction({
      name: 'good',
      data: {
        type: 'getGoodByCategory',
        category: id,
        pageSize: 4,
      }
    })
    if (res.result.data.data.length) {
      this.setData({
        prizeLift: res.result.data.data,
        showPrize: true,
      })
      wx.hideToast()
    }
  },
  // 获取所有商品接口  
  async getAllGoodByCategory() {
    let res = await wx.cloud.callFunction({
      name: 'good',
      data: {
        type: 'getGoodByCategory',
        pageSize: 4,
      }
    })
    if (res.result.data.data.length) {
      this.setData({
        prizeLift: res.result.data.data,
        showPrize: true,
      })
      this.hideToast();
    }
  },
  // 设置用户爱好
  async setUserHobby(hobbys) {
    let res = await wx.cloud.callFunction({
      name: 'user',
      data: {
        type: "updateUser",
        hobbys,
      }
    })
    if(res){
      console.log(res)
    }
    this.isLogin();
    if (hobbys) {
      wx.showToast({
        title: '选择成功！',
        icon: 'success',//icon
        duration: 1500 //停留时间
      })
      this.isOpen(false)
    } else {
      wx.showToast({
        title: '至少选择一个！',
        icon: 'error',//icon
        duration: 1500 //停留时间
      })
    }
  },
  // 根据爱好获取商品的接口
  async accordingToHobbiesGetCommodity(data) {
    let res = await wx.cloud.callFunction({
      name: 'good',
      data: {
        type: "getGoodByCategory",
        hobbys: data,
        pageSize: 4
      }
    })
    if (res.result.status == 1) {
      this.setData({
        showPrize:true,
        prizeLift: res.result.data.data
      })
      wx.hideToast()
    }
  },
  // 监测是否满足关闭加载动画
  hideToast() {
    if (this.data.prizeLift.length) {
      wx.hideToast()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 用户用户第一次进入该页面就打开弹层让用户选择爱好
    this.isOpen(false);
    // 调用获取类目的接口  给爱好以及tab切换的title赋值
    this.getClassList()
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
    // this.getPrizeList(this.data.target);
    this.setData({
      isDisplay: false,
    })
    this.isLogin();
    if (!this.data.isDisplay) {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 99999
      });
    }
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
    console.log("下拉刷新....");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("上拉加载....");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})