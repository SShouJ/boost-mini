// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const getUserInfo = require("../../user/getUserInfo/index");
const updateUserInfo = require("../../user/updateUser/index");
const addPointDetail = require("../addPointDetail/index");
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  //增加兑奖记录的接口 
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;//用户的open_id;
  let { prizeId } = event;//奖品id
  let nowTime =  Date.now(); //开始时间
  let endTime = nowTime + 86400000 * 7;
  const result = await db.runTransaction(async transaction => {
    try {
      //首先获取用户是否存在, 再是获取奖品是否存在，然后就是判断积分是否足够，够的话，直接减少积分，并更改倒用户表
      let userRes =await getUserInfo.main(event,context);
      console.log('-------------我是获取用户信息的接口------------')
      console.log(userRes);
      if(!userRes.status){
        return {
          status:0,
          msg:'用户不存在',
          data:[],
        }
      }
      let goodRes = await db.collection('good').doc(prizeId).get();
      if(!Object.keys(goodRes.data).length){
        return {
          status:0,
          msg:'找不到商品',
          data:[],
        }
      }
      console.log('-------------------这个是检查积分是否足够--------------------');
      console.log('------这个是用户积分---');
      console.log(userRes.data.integralNum);
      console.log('-----这个是商品的需要的积分---');
      console.log(goodRes.data.integral);
      console.log('------------------------------------------------------------');
      if(userRes.data.integralNum < goodRes.data.integral){
        return {
          status:0,
          msg:'积分不够',
          data:[],
        }
      }
      //然后这边就要相减并且塞到设置用户信息里面
      let tempIntegralNum = userRes.data.integralNum - goodRes.data.integral;
      await updateUserInfo.main({
        integralNum:tempIntegralNum,
      },context);
      //这个是增加用户信息
      await addPointDetail.main({
        integralNum:-tempIntegralNum
      },context);
      console.log('-------------我是剩余积分-------------------');
      console.log(tempIntegralNum);
      console.log('-----------我是商品返回数据-----------------');
      console.log(goodRes)
      await db.collection('cash_prize').add({
        data: {
          prizeId,
          userId:openid,
          start:nowTime,
          end:endTime,
          address:'乌拉拉工作室'
        }
      });
      return {
        status: 1,
        msg: 'success',
        data: [],
      }
    } catch (e) {
      console.log('事务报错'+e);
      await transaction.rollback({
        status: 0,
        msg: e,
        data: [],
      })
    }
  })
  return result;
}