// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// 云函数入口函数
const db = cloud.database();
const _ = db.command
exports.main = async (event, context) => {
    let nowTime = new Date().getTime();
    await db.collection('activity').where({
      start:_.lt(nowTime)
    }).update({
      data:{
        type:4
      }
    })//未开始
    await db.collection('activity').where({
      start:_.gt(nowTime)
    }).update({
      data:{
        type:2,
      }
    })//进行中
    await db.collection('activity').where({
      end:_.gt(nowTime)
    }).update({
      data:{
        type:3
      }
    })
    return null;
}