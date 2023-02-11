// 云函数入口文件
const cloud = require('wx-server-sdk')
const getOneActivity = require("../getOneActivity/index");//获取一个活动
const getOneGood = require("../getOneGood/index");//获取一个商品
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    //给活动添加奖品的接口
    let { prizeLevel, activityId,goodId,goodPrize ,count} = event;
    let ruleObj = {
      prizeLevel:{
        isRequire:true,
        msg:'奖品等级不能为空',
      },
      activityId:{
        isRequire:true,
        msg:'活动id不能为空',
      },
      goodId:{
        isRequire:true,
        msg:'商品id不能为空',
      },
      goodPrize:{
        isRequire:true,
        msg:"满足人数不能为空"
      },
      count:{
        isRequire:true,
        msg:"奖品数量不能为空"
      },
    }
    let ruleKeys = Object.keys(ruleObj);
    for (let i = 0; i < ruleKeys.length ; i++) {
      if(!event[ruleKeys[i]] && ruleObj[ruleKeys[i]].isRequire){
        return {
          status:0,
          msg:ruleObj[ruleKeys[i]].msg,
          data:[],
        }
        break;
      }
  }
    //之前需要判断活动和奖品是否存在
    let activityRes = await getOneActivity.main({id:activityId},context);
    if(!Object.keys(activityRes.data).length){
      return {
        status:0,
        msg:'活动不存在',
        data:[],
      }
    }
    let goodRes     = await getOneGood.main({id:goodId},context);
    if(!Object.keys(goodRes.data).length){
      return {
        status:0,
        msg:'奖品不存在',
        data:[],
      }
    }
    try {
      await db.collection('activity_relation_good').add({
        data:{
          prizeLevel,
          activityId,
          goodId,
          goodPrize,
          count,
        }
      })
      return {
        status:1,
        msg:'sucess',
        data:[],
      }
    } catch (error) {
      return {
        status:0,
        msg:'增加奖品失败',
        data:[],
      }
    }
}