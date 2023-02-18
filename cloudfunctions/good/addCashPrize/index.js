// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
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
      //查询用户
      let userRes = transaction.collection('user').where({
        openid:openid,
      }).get();
      let userInfo = userRes.data[0];
      //用户信息有了
      if(!Object.keys(userInfo).length){
        await transaction.rollback({
          status:0,
          msg:'没有查询到用户信息',
          data:[],
        })
      }
      let goodRes = transaction.collection('good').doc(prizeId).get();
      let goodInfo = goodRes.data;
      if(!Object.keys(goodInfo).length){
        await transaction.rollback({
          status:0,
          msg:'没有查询到商品',
          data:[],
        })
      }
      if(userInfo.integralNum < goodInfo.integral){
        await transaction.rollback({
          status:0,
          msg:'没有足够的积分',
          data:[],
        })
      }
      let tempIntegralNum = userInfo.integralNum - goodInfo.integral;
      //走一个更改用户信息的接口
      await transaction.collection('user').where({
        openid
      }).update({
        data:{
          integralNum:tempIntegralNum
        }
      })
      await transaction.collection('cash_prize').add({
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
      await transaction.rollback({
        status: 0,
        msg: e,
        data: [],
      })
    }
  })
  return result;
}