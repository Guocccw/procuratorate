/*
 * @Author: Guocc
 * @Date: 2022-09-29 15:47:03
 * @LastEditTime: 2022-10-14 10:07:26
 * @LastEditors: Guocc
 * @Description:
 */
import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/ai/casePeople/page",
    method: "post",
    data,
  });
}

export function add(data) {
  return request({
    url: "/ai/casePeople/add",
    method: "post",
    data,
  });
}

export function del(params) {
  return request({
    url: "/ai/casePeople/delete/" + params.casePepId + "/" + params.id,
    method: "delete",
    // params,
  });
}
