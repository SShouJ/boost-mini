// 云函数入口文件
const cloud = require('wx-server-sdk')
const addShop = require("./createShop/index");
const addProcess = require("./addProcess/index");
const getProcess = require('./getProcess/index');
const updateProcess = require('./updateProcess/index');
const getOneProcess = require('./getOneProcess/index');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addShop':
      return await addShop.main(event, context);
    case 'addProcess':
      return await addProcess.main(event,context);
    case 'getProcess':
      return await  getProcess.main(event,context); 
    case 'updateProcess':
      return await updateProcess.main(event,context);
    case 'getOneProcess':
      return await getOneProcess.main(event,context);
  }
}