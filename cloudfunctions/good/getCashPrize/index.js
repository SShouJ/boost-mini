// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    let { pageSize = 2 , pageNum = 1} = event;
    let idention  = {};
    try {
      let res = await db.collection('cash_prize').where(idention).skip(pageSize*(pageNum - 1)).limit(pageSize).get();
      console.log('----------获取兑奖记录的接口---------');
      return{
        status:1,
        msg:'success',
        data:res,
      }
    } catch (error) {
      return {
        status:0,
        msg:error,
        data:[],
      }
    }     
}