// pages/prize/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: 1, // target ：当前页--
    navList: [],
    prizeLift: [],
    hobbys: [],
    selected: [],
    userInfo: null,
    isOpenDialog: false,
    isDisplay: false
  },
  // 判断是否登录了
  isLogin() {
    /**
     * 若登录 则展示正常布局页面 弹层啥的
     * 若未登录  则在header模块展示一个 未登录 的标题，并关闭让用户选择爱好的弹层 
     */
    wx.cloud.callFunction({
      name: 'user',
      data: {
        type: "getUserInfo",
      }
    }).then(res => {
      if (res.result.status == 1 && res.result.data) {
        console.log('userinfo', res.result.data);
        if (res.result.data.hobbys.length == 0) {
          // 打开爱好弹层
          this.isOpen(true);
        }
        // 设置 用户信息的数据给 userinfo   设置
        this.setData({
          userInfo: res.result.data,
          isDisplay: true
        })
      } else {
        // 先关闭让用户选择爱好的弹层
        // 不管有没有数据 当掉完接口的时候 都要关闭加载中放开页面显示限制 
        this.isOpen(false);
        this.setData({
          isDisplay: true
        })
      }
      if ((this.data.userInfo && this.data.prizeLift.length) || (this.data.hobbys.length && this.data.prizeLift.length)) {
        // 加载中的这个动画  要么用户登录成功 并且所有奖品的数据都拿到了才关闭   要么就  爱好列表的数据和奖品列表的数据全拿到的时候 也关闭
        wx.hideToast()
      }
    })
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
    this.setData({
      target: e.currentTarget.dataset.id,
    })
    let title = ''
    this.data.navList.forEach((item, i) => {
      if ((i + 1) == this.data.target) {
        title = item.name
      }
    })
    console.log('当前选中的是第', this.data.target, '个tab列表; title：', title);
    this.getPrizeList(this.data.target);
  },
  // getPrizeList 是获取奖品列表数据的方法
  getPrizeList(type) {
    // prizeLift1 prizeLift2 prizeLift3 prizeLift4 这几个等接口出来要分别改成一个对应的 掉接口的方法
    let prizeLift1 = [
      {
        id: 0,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '1这是奖品列表的数据',
        integral: 100,
        nav: 'prizeDetail',
      },
      {
        id: 1,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '2这是奖品列表的数据',
        integral: 200,
        nav: 'prizeDetail',
      },
      {
        id: 2,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '3这是奖品列表的数据',
        integral: 300,
        nav: 'prizeDetail',
      },
      {
        id: 3,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '4这是奖品列表的数据',
        integral: 400,
        nav: 'prizeDetail',
      },
      {
        id: 4,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '5这是奖品列表的数据',
        integral: 500,
        nav: 'prizeDetail',
      },
      {
        id: 5,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '6这是奖品列表的数据',
        integral: 600,
        nav: 'prizeDetail',
      },
    ];
    let prizeLift2 = [
      {
        id: 0,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '1这是分类2里的数据',
        integral: 100,
        nav: 'prizeDetail',
      },
      {
        id: 1,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '2这是分类2里的数据',
        integral: 200,
        nav: 'prizeDetail',
      },
      {
        id: 2,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '3这是分类2里的数据',
        integral: 300,
        nav: 'prizeDetail',
      },
      {
        id: 3,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '4这是分类2里的数据',
        integral: 400,
        nav: 'prizeDetail',
      },
    ];
    let prizeLift3 = [
      {
        id: 0,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '1分类三的数据',
        integral: 100,
        nav: 'prizeDetail',
      },
      {
        id: 1,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '2分类三的数据',
        integral: 200,
        nav: 'prizeDetail',
      },
      {
        id: 2,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '3分类三的数据',
        integral: 300,
        nav: 'prizeDetail',
      },
      {
        id: 3,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '4分类三的数据',
        integral: 400,
        nav: 'prizeDetail',
      },
    ];
    let prizeLift4 = [
      {
        id: 0,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '1分类四的数据',
        integral: 100,
        nav: 'prizeDetail',
      },
      {
        id: 1,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '2分类四的数据',
        integral: 200,
        nav: 'prizeDetail',
      },
      {
        id: 2,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '3分类四的数据',
        integral: 300,
        nav: 'prizeDetail',
      },
      {
        id: 3,
        url: 'https://636c-cloud1-7ge7nl2m42cee9e9-1316264853.tcb.qcloud.la/goods1.png?sign=a05f2c0805a974e22e8be43c4f4d5c40&t=1675763308',
        title: '4分类四的数据',
        integral: 400,
        nav: 'prizeDetail',
      },
    ];
    let data = null
    if (type == 1) {
      data = prizeLift1
    } else if (type == 2) {
      data = prizeLift2
    } else if (type == 3) {
      data = prizeLift3
    } else if (type == 4) {
      data = prizeLift4
    }
    this.setData({
      prizeLift: data
    })
    console.log('当前页的数据是', this.data.prizeLift);
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
  getGoodByCategory(id) {
    wx.cloud.callFunction({
      name: 'good',
      data: {
        type: 'getGoodByCategory',
        category: id
      }
    }).then(res => {
      console.log('根据类目获取商品', res)
    })
  },
  // 设置用户爱好
  setUserHobby(hobbys) {
    wx.cloud.callFunction({
      name: 'user',
      data: {
        type: "updateUser",
        hobbys,
      }
    }).then(res => {
      console.log('设置爱好接口返回的：', res)
    })

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
    console.log('当前选中的是第', this.data.target, '个tab列表;title：', '推荐');
    this.getPrizeList(this.data.target);
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