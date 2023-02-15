const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  console.log('-------------------我是增加用户的接口--------------------');
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;//用户的open_id;
  let nickName = `${openid.substring(openid.length-4,openid.length)}`;
  let {avatarUrl} = event;
    try {
      await db.collection('user').add({
          data:{
              openid:openid,
              nickName:nickName,
              avatarUrl:avatarUrl,
              identify:1,//2普通用户  1 代表管理员  3.商家
              integralNum:1000,
            }
      })
      return {
        status:1,
        msg:'sucess',
        data:[],
      }
    } catch (e) {
      return {
        status:0,
        msg:e,
        data:[],
      }
    }
};

