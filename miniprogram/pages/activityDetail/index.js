// pages/activityDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    nowDate: '', //结束时间
    countdown: '', //倒计时
    days: '00', //天
    hours: '00', //时
    minutes: '00', //分
    seconds: '00', //秒

    isShow: '',
    joinNum: 0,
    number: 0,
    countdown: '',
    text: '还差10人可抽取下一级奖品，立即参与',
    showIndex: null, //打开弹窗的对应下标
    height: '', //屏幕高度
    joinFlag: false,
    showFlag: false,
    percent: 0,
    timeDate: '',
    activityDetail: [],
    activityId: '',
    countDown: ''
  },

  openPopup(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  },
  //  获取活动详情
  getAcitvityDetail(id) {
    return wx.cloud.callFunction({
      name: "activity",
      data: {
        type: "getActivityDetail",
        id: id
      }
    })
  },
  countTime() {
    let days, hours, minutes, seconds;
    let nowDate = this.data.nowDate;
    // console.log(nowDate)
    let that = this;
    let now = new Date().getTime();
    let end = new Date(nowDate).getTime(); //设置截止时间
    // console.log("开始时间：" + now, "截止时间:" + end);
    let leftTime = end - now; //时间差                         
    if (leftTime >= 0) {
      days = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      hours = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      minutes = Math.floor(leftTime / 1000 / 60 % 60);
      seconds = Math.floor(leftTime / 1000 % 60);
      seconds = seconds < 10 ? "0" + seconds : seconds
      minutes = minutes < 10 ? "0" + minutes : minutes
      hours = hours < 10 ? "0" + hours : hours
      days = days < 100 ? "0" + days : days
      that.setData({
        countdown: days + ":" + hours + "：" + minutes + "：" + seconds,
        days,
        hours,
        minutes,
        seconds
      })
      // console.log(that.data.countdown)
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(that.countTime, 1000);
    } else {
      that.setData({
        countdown: '已截止'
      })
    }
  },

  //时间戳转换日期
  formatDate(value) {
    if (typeof (value) == 'undefined') {
      return ''
    } else {
      let date = new Date(parseInt(value))
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + ' ' + MM + '-' + d + ' ' + h + ':' + m
    }
  },
  //关闭规则弹窗
  closePopup() {
    this.setData({
      showIndex: null
    })
  },
  toPage() {
    wx.switchTab({
      url: '/pages/home/index',
    })
  },
  //参加活动接口
  joinActivity() {
    wx.cloud.callFunction({
      name: "activity",
      data: {
        type: "joinActivity",
        activityId: this.data.activityId
      }
    }).then(res => {
      console.log(res);
    })
  },
  join(data) {
    console.log(data.currentTarget.dataset);
    var _this = this

    // console.log(data);
    this.setData({
      joinFlag: true,
      showFlag: data.currentTarget.dataset.flag,
      text: '还差10人可抽取下一级奖品，点击分享',
      percent: this.data.joinNum + 1
    })
    console.log(this.data.percent);
    console.log(this.data.showFlag);
    if (this.data.showFlag == "true") {
      _this.joinActivity()
      wx.showModal({
        title: '活动提示',
        content: '参与成功，分享好友的积分换豪礼',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            _this.setData({
              showFlag: false
            })
            console.log(_this.data.showFlag)
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      activityId: options.id
    })

    let acitvityDetail = await this.getAcitvityDetail(options.id)
    console.log(acitvityDetail.result.data);
    if (acitvityDetail.result.status == 1) {
      this.setData({
        isShow: "none"
      })
      if (acitvityDetail.result.data.list[0].type == 4) {
        wx.showLoading({
          title: '活动未开始',
          mask: "ture",
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        acitvityDetail.result.data.list[0].end = this.formatDate(acitvityDetail.result.data.list[0].end)
        acitvityDetail.result.data.list[0].start = this.formatDate(acitvityDetail.result.data.list[0].start)
        acitvityDetail.result.data.list[0].prizeArr = acitvityDetail.result.data.list[0].prizeArr.sort((a, b) => {
          return a.goodPrize - b.goodPrize
        })
        this.setData({
          activityDetail: acitvityDetail.result.data.list,
          nowDate: acitvityDetail.result.data.list[0].end,
          joinNum: acitvityDetail.result.data.list[0].row.length,
          percent: acitvityDetail.result.data.list[0].row.length / acitvityDetail.result.data.list[0].prizeArr[acitvityDetail.result.data.list[0].prizeArr.length - 1].goodPrize * 100,
          isShow: 'none',
          
        })
      } else if (acitvityDetail.result.data.list[0].type == 3) {
        wx.showLoading({
          title: '活动已结束',
          mask: "ture",
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        acitvityDetail.result.data.list[0].end = this.formatDate(acitvityDetail.result.data.list[0].end)
        acitvityDetail.result.data.list[0].start = this.formatDate(acitvityDetail.result.data.list[0].start)
        acitvityDetail.result.data.list[0].prizeArr = acitvityDetail.result.data.list[0].prizeArr.sort((a, b) => {
          return a.goodPrize - b.goodPrize
        })
        this.setData({
          activityDetail: acitvityDetail.result.data.list,
          nowDate: acitvityDetail.result.data.list[0].end,
          joinNum: acitvityDetail.result.data.list[0].row.length,
          percent: acitvityDetail.result.data.list[0].row.length / acitvityDetail.result.data.list[0].prizeArr[acitvityDetail.result.data.list[0].prizeArr.length - 1].goodPrize * 100,
          isShow: 'none',
          
        })
      } else {
        acitvityDetail.result.data.list[0].row.forEach(item => {
          //已参与
          if (item.userId == options.openid) {
            this.setData({
              joinFlag: true,
              showFlag: true,
              text: '还差10人可抽取下一级奖品，点击分享',
              
            })
          }
        })
        acitvityDetail.result.data.list[0].end = this.formatDate(acitvityDetail.result.data.list[0].end)
        acitvityDetail.result.data.list[0].start = this.formatDate(acitvityDetail.result.data.list[0].start)
        acitvityDetail.result.data.list[0].prizeArr = acitvityDetail.result.data.list[0].prizeArr.sort((a, b) => {
          return a.goodPrize - b.goodPrize
        })
        this.setData({
          activityDetail: acitvityDetail.result.data.list,
          nowDate: acitvityDetail.result.data.list[0].end,
          joinNum: acitvityDetail.result.data.list[0].row.length,
          percent: acitvityDetail.result.data.list[0].row.length / acitvityDetail.result.data.list[0].prizeArr[acitvityDetail.result.data.list[0].prizeArr.length - 1].goodPrize * 100,
          isShow: 'none'
        })
      }

    }
    //倒计时
    this.countTime();
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this;
    // 动态获取屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.windowHeight
        });
      },
    })
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