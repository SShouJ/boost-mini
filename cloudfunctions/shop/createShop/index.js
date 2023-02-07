const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = wx.cloud.database()

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  let { storeName, storeAddress , name, phone, desc, business} = event;
  let keys = Object.keys(event);
  keys.splice(keys.indexOf('type'),1)
  let tipsObj = {
    storeName:{
      isBool:true,
      msg:'店铺名称不能为空',
    },
    storeAddress:{
      isBool:true,
      msg:"店铺地址不能为空",
    },
    name:{
      isBool:true,
      msg:"联系人姓名不能为空",
    },
    phone:{
      isBool:true,
      msg:"电话号码不能为空",
    }, 
    desc:{
      isBool:true,
      msg:"店铺简介不能为空",
    },
    business:{
      isBool:true,
      msg:"营业执照不能为空"
    },
  }
  console.log('------------------------增加店铺的方法-----------------------');
  console.log(keys);
  for(let i = 0; i < keys.length; i++){
    if(!event[keys[i]] && tipsObj[keys[i]].isBool){
      return {
        staus:0,
        msg:tipsObj[keys[i]].msg,
        data:[],
      }
    }
  }
  let bool = validatePhone(phone);
  if(!bool){
    return {
      status:0,
      msg:'手机号格式有误',
      data:[],
    }
  }
  //增加店铺的方法
  try {
    await db.collection('shop').add({
      data:{
        name,
        openid,
        storeName,
        storeAddress,
        phone,
        desc,
        business,
        type:0,
      }
    })
    return {
      status:1,
      msg:"成功",
      data:[],
    }
  } catch (error) {
    return {
      status:0,
      msg:error,
      data:[],
    }
  }
};

function validatePhone(phone){
  let bool = false;
  if(/^((13[0-9])|(14[5|7|9])|(15([0-9])|(17[0-9])|(18[0-9])|(19[8|9]))\\d{8})$/.test(phone)){
    bool = true;
  }
  return bool;
}
