// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    //获取商品列表
    //以及根据活动状态获取活动
    let { status } = event;  //1 全部  2.待开奖 3.已结束  4. 未开始
    let idention  =  status&&status!== 1 ? {type:status} : {};
    try {
      let res = await db.collection('activity').where(idention).get();
      console.log('----------获取所有good的接口---------');
      console.log(res);
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