Page({
  data: {
    List: [],
    patientId: '',
    // 刷新加载配置
    triggered: false,
    searchLoading:false,
    searchLoadingComplete:false,
    scrollTop:20,
    ok:10
  },
 
  //用户下拉动作
  onScrollRefresh: function () {
    var that=this;
    setTimeout(function(){
      that.setData({
        triggered: false,
      })
    },2000);
  },
 
  //上拉加载
  bindscrolltolowerFn: function(){
    // getStuList为请求服务端数据方法
    var that=this;
 
    that.setData({
        searchLoading: true,
      
    })
 
    console.log("====上拉加载======")
 
    setTimeout(function(){
        that.setData({
            searchLoading: false,
            ok:20
        })
      },2000);
               
   },
})