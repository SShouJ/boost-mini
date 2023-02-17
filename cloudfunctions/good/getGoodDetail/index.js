// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    //获取商品列表
    //以及根据类目获取商品
    let {  id } = event;
    try {
      let res = await db.collection('good').doc(id).get();
      console.log('----------获取所有good的接口---------');
      return{
        status:1,
        msg:'success',
        data:res.data,
      }
    } catch (error) {
      return {
        status:0,
        msg:error,
        data:[],
      }
    }     
}