// pages/mine/audit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:[
      {id:1},
      {id:2},
      {id:3},
      {id:4},
      {id:5},
      {id:6},
    ],
    navList : [
      {
        id:1,
        title:"全部",
      },
      {
        id:2,
        title:"待审核",
      },
      {
        id:3,
        title:"已通过",
      },
      {
        id:4,
        title:"未通过",
      },
    ],
    target:2,
    audit:[
      {
        id:1,
        title:'店铺名称',
      }, {
        id:2,
        title:'店铺地址',
      }, {
        id:3,
        title:'联系人姓名',
      }, {
        id:4,
        title:'联系人手机号',
      },
    ],
    audits:[
      {
        id:1,
        title:'小周炒面',
      }, {
        id:2,
        title:'卫辉城管局家属院',
      }, {
        id:3,
        title:'周将军',
      }, {
        id:4,
        title:123123123,
      }, 
    ]
  },
  changeItem(e){
    this.setData({
      target:e.currentTarget.dataset.id,
    })
  },
  toPage(data){
    console.log(data.currentTarget.dataset.name);
    wx.navigateTo({
      url: '/pages/'+ data.currentTarget.dataset.name+'/index',
    })
  },
  //获取申请入驻列表
  getProcess(){
    wx.cloud.callFunction({
      name: "shop",
     data:{
      type:"getProcess",
      status:''
     }
    }).then(res=>{
      console.log(res.result);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getProcess()
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