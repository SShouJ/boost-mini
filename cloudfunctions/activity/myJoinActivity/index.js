// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    //获取商品列表
    //以及根据活动状态获取活动
    console.log('-------------获取我参与的活动----------------');
    let { status , pageSize = 2, pageNum = 1} = event;  //1 全部  2.待开奖 3.已结束  4. 未开始
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;//用户的open_id;
    let idention  =  status&&status!== 1 ? {type:status,userId:openid} : {userId:openid};
    console.log(idention);
    try {
     let res =  await db.collection('activity').aggregate()
      .lookup({
        from:"user_relation_activity",
        localField:"_id",
        foreignField:"activityId",
        as:"row",
      }).skip(pageSize*(pageNum - 1)).limit(pageSize)
      .end()
      .then(res=>{
        return {
          status:1,
          msg:'success',
          data:res,
        }
      })
      .catch(err=>{
        console.log('----------我是获取类目的接口-------------');
        console.log(err);
        return {
          status:0,
          msg:err,
          data:[],
        }
      })
      console.log('-----------------我是根据类目获取活动-----------------------');
      console.log(res);
      return res;
    } catch (error) {
      console.log('------------我是报错信息------------------');
      console.log(error);
      return {
        status:0,
        msg:error,
        data:[],
      }
    }     
}