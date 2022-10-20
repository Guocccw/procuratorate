/*
 * @Author: Guocc
 * @Date: 2022-10-19 12:54:52
 * @LastEditTime: 2022-10-19 17:06:41
 * @LastEditors: Guocc
 * @Description:
 */

import request from "@/utils/request";

export function listData(data) {
  return request({
    url: "/ai/sysDict/detail?code=" + data,
    method: "get",
    data,
  });
}

export function addType(data) {
  return request({
    url: "/ai/sysDict/addDetail",
    method: "post",
    data,
  });
}
