const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  let { id , msg , status} = event;
  // status 1 通过  status 2 不通过  status 0 待审核
  if(status == 2 && !msg){
      return {
        status:0,
        msg:'拒绝通过原因不能为空',
        data:[],
      }
  }
  //审核
  try {
    await db.collection('process').where({
      _id:id,
    }).update({
      data:{
        type:status,
        msg,
      }
    })
    return {
      status:1,
      msg:'success',
      data:[],
    }
  } catch (error) {
    return {
      status:0,
      msg:'fail',
      data:[],
    }
  }
};