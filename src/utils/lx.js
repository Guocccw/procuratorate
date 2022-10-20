/*
 * @Author: Guocc
 * @Date: 2022-04-15 12:52:15
 * @LastEditTime: 2022-07-27 14:04:31
 * @LastEditors: Guocc
 * @Description:
 */
/**
 * 通用js方法封装处理
 */

const baseURL = process.env.VUE_APP_BASE_API;

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange) {
  var search = params;
  search.beginTime = '';
  search.endTime = '';
  if (null != dateRange && '' != dateRange) {
    search.beginTime = dateRange[0];
    search.endTime = dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).some(key => {
    if (datas[key].dictValue == '' + value) {
      actions.push(datas[key].dictLabel);
      return true;
    }
  });
  return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  var actions = [];
  var currentSeparator = undefined === separator ? ',' : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some(val => {
    Object.keys(datas).some(key => {
      if (datas[key].dictValue == '' + temp[val]) {
        actions.push(datas[key].dictLabel + currentSeparator);
      }
    });
  });
  return actions.join('').substring(0, actions.join('').length - 1);
}

// 通用下载方法
export function download(fileName) {
  window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true;
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return '';
  }
  return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
  id = id || 'id';
  parentId = parentId || 'parentId';
  children = children || 'children';
  rootId =
    rootId ||
    Math.min.apply(
      Math,
      data.map(item => {
        return item[parentId];
      })
    ) ||
    0;
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data));
  //循环所有项
  const treeData = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father[id] === child[parentId];
    });
    branchArr.length > 0 ? (father.children = branchArr) : '';
    //返回第一层
    return father[parentId] === rootId;
  });
  return treeData != '' ? treeData : data;
}

// 获取当前年月
export function getYearMonth() {
  // 获取当前年份月份
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let monthStr = month < 10 ? '0' + month : month;
  let currentMonth = year + '-' + monthStr;
  return currentMonth;
}

// 根据city获取adcode
export function getAdcodeByCity(city) {
  switch (city) {
    case '苏州市':
      return '320500';
    case '工业园区':
      return '320571';
    case '虎丘区':
      return '320505';
    case '吴中区':
      return '320506';
    case '相城区':
      return '320507';
    case '姑苏区':
      return '320508';
    case '吴江区':
      return '320509';
    case '常熟市':
      return '320581';
    case '张家港市':
      return '320582';
    case '昆山市':
      return '320583';
    case '太仓市':
      return '320585';
  }
}

// 根据adcode获取city
export function getCityByAdcode(adcode) {
  switch (adcode) {
    case '320500':
      return '苏州市';
    case '320571':
      return '工业园区';
    case '320505':
      return '虎丘区';
    case '320506':
      return '吴中区';
    case '320507':
      return '相城区';
    case '320508':
      return '姑苏区';
    case '320509':
      return '吴江区';
    case '320581':
      return '常熟市';
    case '320582':
      return '张家港市';
    case '320583':
      return '昆山市';
    case '320585':
      return '太仓市';
  }
}
