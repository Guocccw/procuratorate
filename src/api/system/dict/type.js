/*
 * @Author: Guocc
 * @Date: 2022-10-19 18:46:19
 * @LastEditTime: 2022-10-19 19:02:45
 * @LastEditors: Guocc
 * @Description:
 */
import request from "@/utils/request";

// 查询字典类型列表
export function listType(query) {
  return request({
    url: "/ai/system/dict/type/list",
    method: "get",
    params: query,
  });
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: "/ai/system/dict/type/" + dictId,
    method: "get",
  });
}

// 新增字典类型
export function addType(data) {
  return request({
    url: "/ai/system/dict/type",
    method: "post",
    data: data,
  });
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: "/ai/system/dict/type",
    method: "put",
    data: data,
  });
}

// 删除字典类型
export function delType(dictId) {
  return request({
    url: "/ai/system/dict/type/" + dictId,
    method: "delete",
  });
}

// 清理参数缓存
export function clearCache() {
  return request({
    url: "/ai/system/dict/type/clearCache",
    method: "delete",
  });
}

// 导出字典类型
export function exportType(query) {
  return request({
    url: "/ai/system/dict/type/export",
    method: "get",
    params: query,
  });
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: "/ai/system/dict/type/optionselect",
    method: "get",
  });
}
