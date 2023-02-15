// 云函数入口文件
const cloud = require('wx-server-sdk')
const findUser = require('./findUser/index');
const addUser = require('./addUser/index');
const getUserInfo = require('./getUserInfo/index');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'findUser':
      return await findUser.main(event, context);
    case "addUser":
      return await addUser.main(event,context);
    case "getUserInfo":
      return await getUserInfo.main(event,context); 
  }
}