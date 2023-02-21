// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    //获取商品详情
    let { id } = event;
      let res = await db.collection('good').aggregate().lookup({
        from:'cash_prize',
        localField:'_id',
        foreignField: 'prizeId',
        as: 'row',
    }).match({
      _id:id,
    }).end().then(res=>{
      return{
        status:1,
        msg:'success',
        data:res.list,
      }
    }).catch(err=>{
      return {
        status:0,
        msg:error,
        data:[],
      }
    })
    return res;
}