// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {};
  },
  //查询用户信息
  getUserInfo() {
    return wx.cloud.callFunction({
      name: 'user',
      data: {
        type: 'getUserInfo',
        avatarUrl: 'cloud://cloud1-7ge7nl2m42cee9e9.636c-cloud1-7ge7nl2m42cee9e9-1316264853/avatar-ikun.png',
      }
    }).then(res => {
      return res
    })
  },
  //添加用户
  addUserInfo() {
    return wx.cloud.callFunction({
      name: 'user',
      data: {
        type: 'addUser',
        avatarUrl: 'cloud://cloud1-7ge7nl2m42cee9e9.636c-cloud1-7ge7nl2m42cee9e9-1316264853/avatar-ikun.png',
      }
    }).then(res => {
      return res
    })
  },
  getUserProfile() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于登录',
        success: res => {
          resolve(res)
        }
      })
    })
  },
  load(flag){
     return true
  }
});