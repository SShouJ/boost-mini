// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    //获取商品列表
    //以及根据类目获取商品
    let { goodImage , goodName , integral, status } = event;
    let ruleObj = {
      goodImage:{
        isRequire:true,
        msg:'商品图片不能为空',
      },
      goodName:{
        isRequire:true,
        msg:'商品名称不能为空'
      },
      integral:{
        isRequire:true,
        msg:'商品价格不能为空'
      },
      status:{
        isRequire:true,
        msg:'商品类型不能为空'
      }
    }
    let keys = Object.keys(ruleObj);
    for (let index = 0; index < keys.length; index++) {
      if(!event[key] && ruleObj[key].isRequire){
        return {
          status:0,
          msg:ruleObj[key].msg,
          data:[]
        }
      }
    }
    try {
      await db.collection('good').add({
        data:{
          goodImage,
          goodName,
          integral,
          type:status,
        }
      })
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