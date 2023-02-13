// 云函数入口文件
const cloud = require('wx-server-sdk')
const getOneActivity = require('../getOneActivity/index');
const getOneUser = require('../getOneUser/index');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    //只是获取一个商品
    let { activityId } = event;
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;//用户的open_id;
    console.log('------------------参加活动的接口-----------------------');
    try {
      let activityRes =  await getOneActivity.main({id:activityId},context);
      console.log('--------------------------我是获取一个活动的接口----------')
      console.log(activityRes)
      if(!Object.keys(activityRes.data).length){
        return {
          status:0,
          msg:'活动不存在',
          data:[],
        }
      }else if(activityRes.end < Date.now()){
        return{
          status:0,
          msg:'活动已结束',
          data:[]
        }
      }
      console.log('----------------开始执行获取一个用户的接口-------------');
      let userRes     =  await getOneUser.main({id:openid},context);
      console.log(userRes);
      if(!Object.keys(userRes.data).length){
        return {
          status:0,
          msg:'用户不存在',
          data:[],
        }
      }
     await db.collection('user_relation_activity').add({
        data:{
          activityId,
          userId:openid,
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
        msg:error,
        data:[],
      }
    }     
}