// 云函数入口文件
const cloud = require('wx-server-sdk')
const addActivity = require('./addActivity/index');
const getGoodList = require('./getGoodList/index');
const getActivityByCategory = require('./getActivityByCategory/index');
const getActivityDetail = require('./getActivityDetail/index');
const getMyActivity = require('./getMyActivity/index');
const myJoinActivity = require('./myJoinActivity/index');
const joinActivity  = require('./joinActivity/index');
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
    case 'getActivityDetail':
      return await getActivityDetail.main(event,context);
    case 'getMyActivity':
      return  await getMyActivity.main(event,context);
    case 'myJoinActivity':
      return await myJoinActivity.main(event,context);
    case 'joinActivity':
      return await joinActivity.main(event,context);
  }
}