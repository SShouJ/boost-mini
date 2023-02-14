// 云函数入口文件
const cloud = require('wx-server-sdk')
const _ = db.command

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    let nowTime = Date.now();
    console.log('-------我执行了----------');
    let res = await db.collection('activity').get();
    console.log(res);
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
    return '我执行了';
}