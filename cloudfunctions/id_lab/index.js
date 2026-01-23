// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 特殊身份证号
specialIds = []

// 云函数入口函数
exports.main = async (event, context) => {
  const id_num = event.id_num
  const correct = correctId(id_num)
  if(correct){
    const gender = getGender(id_num)
    return {correct, gender}
  }
  else{
    return {correct}
  }
}

function correctId(idNumber) {
  // 特殊身份证号直接予以通过
  if (specialIds.includes(idNumber)) {
      return true;
  }

  // 1. 基本格式检查
  // 位数须为18
  if (typeof idNumber !== 'string' || idNumber.length !== 18) {
      return false;
  }

  // 前17位须为数字
  if (!/^\d{17}$/.test(idNumber.substring(0, 17))) {
      return false;
  }

  // 最后一位须为数字或X（大小写均可）
  const lastChar = idNumber[17].toUpperCase();
  if (!(/\d/.test(lastChar) || lastChar === 'X')) {
      return false;
  }

  // 2. 校验码验证（国家标准GB11643-1999）
  // 加权因子
  const weightFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  
  // 校验码对应表
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  // 计算校验和
  let sum = 0;
  for (let i = 0; i < 17; i++) {
      sum += parseInt(idNumber[i], 10) * weightFactors[i];
  }
  
  // 计算余数
  const remainder = sum % 11;
  
  // 获取计算的校验码
  const calculatedCheckCode = checkCodes[remainder];
  
  // 比较校验码（不区分大小写）
  if (calculatedCheckCode.toUpperCase() !== lastChar) {
      return false;
  }

  // 3. 日期有效性检查（可选但推荐）
  const dateStr = idNumber.substring(6, 14); // 出生年月日YYYYMMDD
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10);
  const day = parseInt(dateStr.substring(6, 8), 10);
  
  // 基本日期检查
  if (year < 1900 || year > new Date().getFullYear()) {
      return false;
  }
  if (month < 1 || month > 12) {
      return false;
  }
  if (day < 1 || day > 31) {
      return false;
  }
  
  // 更精确的日期检查
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || 
      date.getMonth() + 1 !== month || 
      date.getDate() !== day) {
      return false;
  }

  // 通过所有检查
  return true;
}

function getGender(idNumber){
  // 根据身份证号获取性别
  if (specialIds.includes(idNumber)) {
    return "未知";
  }
  else{
    // 取出身份证号第17位，转数字
    const char_17 = idNumber[16]
    const num_17 = Number(char_17)

    // 除以2取余数
    if(num_17 % 2){
      // 性别为男
      return "男"
    }
    else{
      // 性别为女
      return "女"
    }
  }
}