// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    //只是获取一个商品
    let { id } = event;
    try {
      let res = await db.collection('good').doc(id).get();
      console.log('----------获取单个商品的接口---------');
      console.log(res);//获取单个商品的接口
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