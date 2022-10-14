/*
 * @Author: Guocc
 * @Date: 2022-09-30 09:53:24
 * @LastEditTime: 2022-10-12 17:59:43
 * @LastEditors: Guocc
 * @Description:黄赌毒
 */
import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/ai/pdgPeople/page",
    method: "post",
    data,
  });
}

export function getAnalytic(params) {
  return request({
    url: "/ai/pdgPeople/analytic",
    method: "get",
    params,
  });
}

export function getallView(params) {
  return request({
    url: "/ai/pdgPeople/allView",
    method: "get",
    params,
  });
}

export function add(data) {
  return request({
    url: "/ai/pdgPeople/add",
    method: "post",
    data,
  });
}

export function del(params) {
  return request({
    url: "/ai/pdgPeople/delete/" + params,
    method: "delete",
    // params,
  });
}
