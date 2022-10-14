/*
 * @Author: Guocc
 * @Date: 2022-09-29 09:26:56
 * @LastEditTime: 2022-09-30 11:41:25
 * @LastEditors: Guocc
 * @Description:
 */
import defaultSettings from "@/settings";

const title = defaultSettings.title || "AI";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
