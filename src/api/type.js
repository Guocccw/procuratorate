/*
 * @Author: Guocc
 * @Date: 2022-10-19 12:54:09
 * @LastEditTime: 2022-10-19 14:38:49
 * @LastEditors: Guocc
 * @Description:
 */

import request from "@/utils/request";

export function listType(data) {
  return request({
    url: "/ai/sysDict/page",
    method: "post",
    data,
  });
}

export function addType(data) {
  return request({
    url: "/ai/sysDict/add",
    method: "post",
    data,
  });
}

export function delType(data) {
  return request({
    url: "/ai/sysDict/delete/" + data,
    method: "delete",
    data,
  });
}
