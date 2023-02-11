// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    //获取openId
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;//用户的open_id;
    //增加活动的接口
    //全部都是必填项目,不填就返回什么不能为空
    let ruleObj = {
      activityName:{
        isRequire:true,
        msg:'活动名称不能为空',
      },
      start:{
        isRequire:true,
        msg:'活动开始时间不能为空',
      },
      end:{
        isRequire:true,
        msg:'活动结束时间不能为空',
        
      },
      rule:{
        isRequire:true,
        msg:'活动规则不能为空',
      }
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
    let { activityName, start,end,rule,prizeArr} = event;
    if(!prizeArr.length){
      return {
        status:0,
        msg:'活动奖品不能为空',
        data:[],
      }
    }
    try {
      //增加活动完成,需要再增加奖品
      //活动id，
      await db.collection('activity').doc().update({
          data:{
            createPeople: openid,//创建人id
            activityName,//活动名称
            start,//开始时间
            end,//结束时间  开奖时间
            rule,//商品规则
            prizeArr,//奖品的数组
          }
        })
      //增加奖品
      return {
        status:1,
        msg:'sucess',
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