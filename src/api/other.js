/*
 * @Author: Guocc
 * @Date: 2022-09-30 10:37:59
 * @LastEditTime: 2022-10-12 14:07:47
 * @LastEditors: Guocc
 * @Description: 另案处理人员监控
 */
import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/ai/otherCasePeople/page",
    method: "post",
    data,
  });
}

export function getAnalytic(params) {
  return request({
    url: "/ai/otherCasePeople/analytic",
    method: "get",
    params,
  });
}

export function add(data) {
  return request({
    url: "/ai/otherCasePeople/add",
    method: "post",
    data,
  });
}

export function del(params) {
  return request({
    url: "/ai/otherCasePeople/delete/" + params,
    method: "delete",
    // params,
  });
}
