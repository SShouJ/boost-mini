const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  let { id } = event;
  // status 1 通过  status 2 不通过  status 0 待审核
  //审核
  try {
    let res = await db.collection('process').doc(id).get();
    return {
      status:1,
      msg:'success',
      data:res.data,
    }
  } catch (error) {
    return {
      status:0,
      msg:'faile',
      data:error,
    }
  }
};