// pages/mine/myActive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    activityList:[],
    target:2,
    pageSize:2,
    pageNum:1,
  },
  async changeItem(e){
    this.setData({
      target:e.currentTarget.dataset.id,
    })
    let res = await this.getMyJoinAcitivity(this.data.target,this.data.pageSize,this.data.pageNum);
    console.log(res);
  },
  toDetail(e){
    wx.navigateTo({
      url: "/pages/activityDetail/index?id="+e.currentTarget.dataset.id,
    })
  },
  toActive(){
    wx.navigateTo({
      url: "/pages/activity/createActive/index",
    })
  },
  getMyJoinAcitivity(status,pageSize,pageNum){
    return new Promise((resolve,reject)=>{
      wx.cloud.callFunction({
        name:'activity',
        data:{
          type:'myJoinActivity',
          status:status,
          pageSize:pageSize,
          pageNum:pageNum,
        },
        success(res){
          resolve(res);
        },
        fail(err){
          reject(err);
        }
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let activityList = [
      {
        id:1,
        activityTitle:"妙克管家：一元搬家嗨FUN天",
        begin:"2022年2月3日",
        end:"2022年2月26日",
        position:"上海市杨浦区宁国路百联滨江购物中心",
        count:200,
        banner:"../../images/bg1.png",
        type:1,
        pressList:[
          {
            id:10001,
            name:'笔记本电脑',
          },
          {
            id:10001,
            name:'笔筒',
          },
        ]
      },
      {
        id:2,
        activityTitle:"妙克管家：一元搬家嗨FUN天1",
        begin:"2022年2月3日",
        end:"2022年2月26日",
        banner:"../../images/bg2.png",
        position:"乌拉拉小斑马",
        count:300,
        type:2,
        pressList:[
          {
            id:10001,
            name:'笔筒',
          },
          {
            id:10001,
            name:'笔记本电脑',
          },
        ]
      },
      {
        id:3,
        activityTitle:"妙克管家：一元搬家嗨FUN天1",
        begin:"2022年2月3日",
        end:"2022年2月26日",
        banner:"../../images/bg3.png",
        position:"乌拉拉小斑马",
        count:300,
        type:2,
        pressList:[
          {
            id:10001,
            name:'笔筒',
          },
          {
            id:10001,
            name:'笔记本电脑',
          },
        ]
      },
      {
        id:4,
        activityTitle:"妙克管家：一元搬家嗨FUN天1",
        begin:"2022年2月3日",
        end:"2022年2月26日",
        banner:"../../images/bg4.png",
        position:"乌拉拉小斑马",
        count:300,
        type:2,
        pressList:[
          {
            id:10001,
            name:'笔筒',
          },
          {
            id:10001,
            name:'笔记本电脑',
          },
        ]
      },
    ];
    let navList = [
      {
        id:1,
        title:"全部",
      },
      {
        id:2,
        title:"待开奖",
      },
      {
        id:3,
        title:"已结束",
      },
      {
        id:4,
        title:"未开始",
      },
    ]
    this.setData({
      activityList,
      navList
    })
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
    console.log(1)
    return {
      title: '自定义标题',
      imageUrl: 'http://demo.png',
      query: 'name=xxx&age=xxx',
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})