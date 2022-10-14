/*
 * @Author: Guocc
 * @Date: 2022-10-06 11:22:08
 * @LastEditTime: 2022-10-06 14:40:42
 * @LastEditors: Guocc
 * @Description:
 */
import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/ai/casePeople/network2",
    method: "post",
    data,
  });
}

export function getQueryList(params) {
  return request({
    url: "/ai/casePeople/list",
    method: "get",
    params,
  });
}
