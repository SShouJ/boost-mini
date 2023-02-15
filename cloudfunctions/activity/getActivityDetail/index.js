// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    //获取商品列表
    //以及根据活动状态获取活动
    let { id } = event;  //1 全部  2.待开奖 3.已结束  4. 未开始
    try {
     let res =  await db.collection('activity').aggregate()
      .lookup({
        from: 'user_relation_activity',
        localField: '_id',
        foreignField: 'activityId',
        as: 'row',
      }).match({
        _id:id
      })
      .end()
      .then(res=>{
        return {
          status:1,
          msg:'success',
          data:res,
        }
      })
      .catch(err=>{
        return {
          status:0,
          msg:err,
          data:[],
        }
      })
      console.log('-----------------我是根据类目获取活动-----------------------');
      return res;
    } catch (error) {
      return {
        status:0,
        msg:error,
        data:[],
      }
    }     
}