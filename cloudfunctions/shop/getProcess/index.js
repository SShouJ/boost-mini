const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  let { status } = event;
  // status 1 通过  status 2 不通过  status 0 待审核
  //审核
  if(!status && status !==0){
    // 获取所有的
    try {
      let res = await db.collection('process').get();
      console.log('------------------我是获取审核列表的接口-----------------');
      console.log(res);
      return {
        status:1,
        msg:'success',
        data:res.data,
      }
    } catch (error) {
      return {
        status:0,
        msg:"fail",
        data:error,
      }   
    }
  }else{
      try {
        let res = await db.collection('process').where({
          type:status,
        }).get();
        console.log('------------------我是获取审核列表的接口-----------------');
        console.log(res);
        return {
          status:1,
          msg:'success',
          data:res.data,
        }
      } catch (error) {
        return {
          status:0,
          msg:"fail",
          data:error,
        }
      }
  }
};