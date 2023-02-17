// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const getUserInfo = require('../../user/getUserInfo/index');
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    let { integralNum } = event;//这个是积分
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;//用户的open_id;
    let userRes = await getUserInfo(event,context);
    if(userRes.status){
      return {
        status:0,
        msg:'查找不到用户',
        data:[]
      }
    }
    //检查用户是否存在
    let date = new Date();
    let year = date.getFullYear();
    let month= date.getMonth()+1;
    try {
      await db.collection('points_Details').add({
        data:{
          year,
          month,
          integralNum,
          openid,
        }
      })
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