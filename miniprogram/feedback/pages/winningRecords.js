Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    background: ['https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000367/11677993862/FocusFullshop/CkJqZnMvdDEvODAzOTMvMjcvMjI5ODMvNDk0NzEvNjNlMDAzY2ZGZDQ5NjU5ZjcvYzA5NjZjZTMyOGE2MjY5Mi5wbmcSCTQtdHlfMF81NTACOO-LekITCg_nvo7oj7Hppa7msLTmnLoQAUIQCgznp5LmnYDku7cxMjgQAkIQCgznq4vljbPmiqLotK0QBkIHCgPmiqIQB1iGl8DAKw/cr/s/q.jpg', 'https://imgcps.jd.com/ling4/100032149194/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd8253082acdd181d02fa06/762a309a/cr/s/q.jpg', 'https://img10.360buyimg.com/pop/s1180x940_jfs/t1/196131/35/14559/51636/60fa7c07E255a9704/a1afa2ce64332286.jpg.avif'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    navList : [
      {
        id:0,
        title:"普通抽奖",
      },
      {
        id:1,
        title:"即抽即开",
      },
    ],
    target:0,
  },
  changeItem(e){
    this.setData({
      target:e.currentTarget.dataset.id,
    })
  },
  onLoad(){
    this.setData({
      autoplay: !this.data.autoplay
    })
  }
})