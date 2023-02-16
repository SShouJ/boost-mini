// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const getCategoryList = require('./getCategoryList/index');
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getCategoryList':
      return await getCategoryList.main(event, context);
  }
}