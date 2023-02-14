// pages/activity/createActive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      goodImg: '',
      count: '请输入奖品数量',
      goodName: '请输入你的活动奖品',
      goodPrize: "请输入开奖人数",
    },
    index: 1,
    prizeArr: [],
    banner: '../../../images/icon-add.png', //活动图片
    title: '', //活动标题
    start: '', //活动开始时间
    end: '', //活动结束时间
    rule: '', //商品规则
    showTip: true,
    time: {
      startTime: '活动开始时间',
      endTime: '活动结束时间',
    },
    prizeForms: [{
        goodImg: '',
        count: '请输入奖品数量',
        goodName: '请输入你的活动奖品',
        goodPrize: "请输入开奖人数",
      },

    ],
  },
  //获取奖品列表
  // getGoodList(){
  //   wx.cloud.callFunction({
  //     name: "activity",
  //    data:{
  //     type:"getGoodList",
  //    }
  //   }).then(res =>{
  //     console.log(res.result.data.data);
  //     let goodList = res.result.data.data
  //     this.setData({
  //       prizeArr:goodList
  //     })
  //   })
  // },
  addItem() {
    console.log(1);
    this.data.prizeForms.push(this.data.item)
    this.setData({
      index: this.data.index + 1,
      prizeForms: this.data.prizeForms
    })
  },
  //获取inp的value
  getInputValue(e) {
    let value = e.detail.value
    console.log(value);
    let key = e.target.dataset.name
    let index = e.target.dataset.index; //所处的下标
    console.log(key);
    if (key == "title") {
      this.setData({
        title: value
      })
    } else if (key == "rule") {
      this.setData({
        rule: value
      })
    } else {
      this.setData({
        [`prizeForms[${index}].${key}`]: value
      })
    }
    console.log(this.data.title);
  },
  closeTip(e) {
    this.setData({
      showTip: !this.data.showTip
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.target.dataset.name)
    var time = e.target.dataset.name
    this.setData({
      [`time.${time}`]: e.detail.value
    })
    console.log(this.data.time);
  },
  //返回上一级
  navigateBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  //创建活动
  createActive() {
    console.log(this.data);
    wx.cloud.callFunction({
      name: "activity",
      data: {
        type: "addActivity",
        activityName: this.data.title,
        banner: this.data.banner,
        start: this.data.time.startTime,
        end: this.data.time.endTime,
        rule: this.data.rule,
        prizeArr: this.data.prizeForms
      }
    }).then(res => {
      console.log(res);
      if (res.result.status == 1) {
        this.navigateBack()
      }
    })
  },
  // 复现
  // bindPriceChange:function(e){
  //   console.log(e);
  //   let index = e.target.dataset.index;//所处的下标
  //   console.log(index);
  //   this.setData({
  //     [`prizeForms[${index}].goodName`]:this.data.prizeArr[e.detail.value].goodName
  //   }); 
  //   // // console.log(this.data.prizeForms[index].id);
  // },
  chooseImg(e) {
    let name = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.index;
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

          if (id == undefined) {
            _this.setData({
              [`${name}`]: res.fileID,
              banner: res.fileID
            })
          } else {
            _this.setData({
              [`prizeForms[${id}].goodImg`]: res.fileID
            })
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getGoodList()
  },
  //添加奖品

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