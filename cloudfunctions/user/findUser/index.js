const cloud = require('wx-server-sdk');
const addUser = require("../addUser/index");
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
  console.log(res);
  if(res.data.length){
    return {
      status:1,
      msg:'success',
      data:res.data[0]
    }
  }
  // else{
  //   await addUser.main(event,context);
  //   return {
  //     status:0,
  //     msg:'查询不到用户',
  //     data:[],
  //   }
  // }
};
