import request from "@/utils/request";
//  操作日志的api
export function fetchList(query) {
  return request({
    url: "/article/list",
    method: "get",
    params: query
  });
}
export function searchList(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
export function deletedList(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
export function DownloadList(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
// 主页面的api
// 获取主页面基本信息
export function allMsgList() {
  return request({
    url: "/backend/api/v1/inhome/index/",
    method: "get"
  });
}
// 按时间查询相关数据
export function dateSearch(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
