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


    joinNum:0,
    number:0,
    countdown:'',
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
    // .then(res=>{
    // console.log(res.result.data.list);
    // res.result.data.list[0].end = this.formatDate(res.result.data.list[0].end)
    // res.result.data.list[0].start = this.formatDate(res.result.data.list[0].start)
    // this.setData({
    //   activityDetail : res.result.data.list,
    // })
    // console.log(this.data.activityDetail);
    // })
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
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  //关闭弹窗
  closePopup() {
    this.setData({
      showIndex: null
    })
  },
  toPage(data) {
    console.log(data.currentTarget.dataset.name);
    wx.navigateTo({
      url: '/pages/' + data.currentTarget.dataset.name + '/index',
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
      percent: this.data.joinNum+1
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
    // console.log(this.data.joinFalg);
  },
  //   countdown(){
  //     var minute=Math.floor(this.data.time  / 60 );
  //     var second=this.data.time  % 60
  //     second<10?second='0'+second:'';
  //     this.setData({
  //         countdown:minute+':'+second,
  //         time:this.data.time-1
  //     })
  //     setTimeout(this.countdown, 1000);
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      activityId: options.id
    })
    // this.countdown()

    let res = await this.getAcitvityDetail(options.id)
    res.result.data.list[0].end = this.formatDate(res.result.data.list[0].end)
    res.result.data.list[0].start = this.formatDate(res.result.data.list[0].start)
    res.result.data.list[0].prizeArr = res.result.data.list[0].prizeArr.sort((a,b)=>{
      return a.goodPrize - b.goodPrize
    })
    console.log(res.result.data.list[0].row.length);
    this.setData({
      activityDetail: res.result.data.list,
      nowDate: res.result.data.list[0].end,
      joinNum:res.result.data.list[0].row.length,
      percent: res.result.data.list[0].row.length/res.result.data.list[0].prizeArr[res.result.data.list[0].prizeArr.length - 1].goodPrize*100
    })
    console.log(res.result.data.list[0].prizeArr[res.result.data.list[0].prizeArr.length - 1].goodPrize);


    
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