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
  let res = await db.collection('user').where({
    'openid':openid,
  }).get();
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
};
