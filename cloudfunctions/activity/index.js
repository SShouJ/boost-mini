// 云函数入口文件
const cloud = require('wx-server-sdk')
const addActivity = require('./addActivity/index');
const getGoodList = require('./getGoodList/index');
const getActivityByCategory = require('./getActivityByCategory/index');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let { type } = event;
  switch (type) {
    case 'addActivity':
      return await addActivity.main(event,context);
    case 'getGoodList':
      return await getGoodList.main(event,context);
    case 'getActivityByCategory':
      return await getActivityByCategory.main(event,context);
  }
}