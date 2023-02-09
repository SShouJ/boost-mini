const cloud = require('wx-server-sdk');
const getOneProcess = require('../getOneProcess/index');
const createShop = require('../createShop/index');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  let { id , msg , status} = event;
  console.log(event);
  let condition = {};
  // status 1 通过  status 2 不通过  status 0 待审核
  switch (status) {
    case 1 :
      condition = { type : status};
      break;
    case 2 :
      if(!msg){
        return {
          status:0,
          msg:'拒绝原因不能为空',
          data:[],
        }
      }else{
        condition = {
          type:status,
          msg:msg,
        }
      }
      break;
  }
  //审核
  try {
    await db.collection('process').where({
      _id:id,
    }).update({
      data:condition
    })
    if(status == 1){
      let res = await getOneProcess.main(event,context);
      if(res.data){
       return await createShop.main(res.data,context);
      }else{
        return {
          status:0,
          msg:'fail',
          data:[],
        }
      }
    }
    return {
      status:1,
      msg:'success',
      data:[],
    }
  } catch (error) {
    return {
      status:0,
      msg:'fail',
      data:error,
    }
  }
};