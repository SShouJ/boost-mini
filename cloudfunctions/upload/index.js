// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  let { file } = event;
  let name =new Date().getTime() +'.png';
  console.log('--------------------我是上传方法----------------')
  try {
   let res =  await cloud.uploadFile({
      cloudPath:name,
      filePath:file,
    });
    console.log(res);
    return {
      status:1,
      msg:'成功',
      data:res.fileID,
    }
  } catch (error) {
    return {
      status:0,
      msg:'失败',
      data:[],
    }
  }
}