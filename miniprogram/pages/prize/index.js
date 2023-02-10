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
        title: "推荐",
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
      {
        id: 5,
        title: "全部5",
      },
      {
        id: 6,
        title: "全部6",
      },
      {
        id: 7,
        title: "全部7",
      },
      {
        id: 8,
        title: "全部8",
      },
    ],
    prizeLift: [],
    hobbys: [
      {
        id: 1,
        hobby: '爱好1'
      },
      {
        id: 2,
        hobby: '爱好1'
      }, {
        id: 3,
        hobby: '爱好1'
      }, {
        id: 4,
        hobby: '爱好1'
      }, {
        id: 5,
        hobby: '爱好1'
      }, {
        id: 6,
        hobby: '爱好1'
      }, {
        id: 7,
        hobby: '爱好1'
      }, {
        id: 8,
        hobby: '爱好1'
      }, {
        id: 9,
        hobby: '爱好1'
      }, {
        id: 10,
        hobby: '爱好1'
      }, {
        id: 11,
        hobby: '爱好1'
      },{
        id: 12,
        hobby: '爱好1'
      },{
        id: 13,
        hobby: '爱好1'
      },{
        id: 14,
        hobby: '爱好1'
      },{
        id: 15,
        hobby: '爱好1'
      },{
        id: 16,
        hobby: '爱好1'
      },{
        id: 17,
        hobby: '爱好1'
      },{
        id: 18,
        hobby: '爱好1'
      },{
        id: 18,
        hobby: '爱好1'
      },{
        id: 19,
        hobby: '爱好1'
      },{
        id:20,
        hobby: '爱好1'
      },{
        id: 21,
        hobby: '爱好1'
      },{
        id: 22,
        hobby: '爱好1'
      },{
        id:23,
        hobby: '爱好1'
      },
    ],
    isOpenDialog: false,
  },
  // 是否打开弹层 传布尔值 true打开 反之关闭
  isOpen(isok) {
    this.setData({
      isOpenDialog: isok,
    })
  },
  // 弹层 确定 按钮的方法
  determine() {
    console.log('点击了确认按钮');
    this.isOpen(false)
  },
  // 弹层 取消 按钮的方法
  cancel() {
    // 关闭弹层
    this.isOpen(false)
  },

  // changeItem 是监测tab列表当前选中的是哪个的方法
  changeItem(e) {
    this.setData({
      target: e.currentTarget.dataset.id,
    })
    console.log('当前选中的是第', this.data.target, '个tab列表');
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
  },

  // prizeLiftNav 跳转详情页面 + 传参 的方法
  prizeLiftNav(data) {
    let item = data.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/' + item.nav + '/index?_identification=prizeLift,' + item.id,
    })
  },

  // toRecord 是跳转到兑换记录的方法
  toRecord() {
    wx.navigateTo({
      url: '/pages/record/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 用户用户第一次进入该页面就打开弹层让用户选择爱好
    this.isOpen(true)
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
    console.log('当前选中的是第', this.data.target, '个tab列表');
    this.getPrizeList(this.data.target);
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