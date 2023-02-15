Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    background: ['https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00220-1900.jpg', 'https://img0.baidu.com/it/u=2214281108,3755694407&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500', 'https://img0.baidu.com/it/u=2378733853,4098626940&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500','https://img2.baidu.com/it/u=2591611833,3173732768&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    activityList:[{
      title:'小伙伴们周末爬南山啦',
      time:'2017年8月27日至2017年11月30日',
      address:'宁波市海曙区康庄街道34号国家大剧院2号1单元302',
      signUp:'38',
      sponsor:'李先生',
      content:'我的委屈额企鹅企鹅我去拍我而且跑去问我饿驱蚊扣颇尔可我却千万可破我去二片区为而空气迫切去快请我朋克群殴排位亲朋问哦切块迫切武器'
    }]
  },
  onLoad(){
    this.setData({
      autoplay: !this.data.autoplay
    })
  }
})