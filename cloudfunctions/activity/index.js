// 云函数入口文件
const cloud = require('wx-server-sdk')
const addActivity = require('./addActivity/index');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let { type } = event;
  switch (type) {
    case 'addActivity':
      return await addActivity.main(event,context);
  }
}