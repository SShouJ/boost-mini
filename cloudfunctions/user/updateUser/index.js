const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  let keys = ['hobbys','identify','integralNum','nickName','avatarUrl'];
  let ginseng = {};
  for(let i = 0; i < keys.length; i++){
    if(event[keys[i]]){
      ginseng[keys[i]] = event[keys[i]];
    }
  }
  try {
    console.log('-------------我是调用更改用户信息的--------------------');
    console.log(ginseng);
    let res = await db.collection('user').where({
      'openid':openid,
    }).update({
      data:ginseng,
    })
    if(res.data.length){
      return {
        status:1,
        msg:'success',
        data:res.data[0]
      }
    }else{
      return {
        status:0,
        msg:'没有找到该用户',
        data:[],
      }
    }
  } catch (error) {
      return {
        status:0,
        msg:error,
        data:[],
      }
  }
};
