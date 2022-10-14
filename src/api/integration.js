/*
 * @Author: Guocc
 * @Date: 2022-09-30 11:06:00
 * @LastEditTime: 2022-10-07 17:46:58
 * @LastEditors: Guocc
 * @Description: 检察一体化模型
 */
import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/ai/checkIntegration/page",
    method: "post",
    data,
  });
}

export function getDetail(params) {
  return request({
    url: "/ai/checkIntegration/scoreDetail",
    method: "get",
    params,
  });
}

export function editState(data) {
  return request({
    url: "/ai/checkIntegration/edit",
    method: "post",
    data,
  });
}
