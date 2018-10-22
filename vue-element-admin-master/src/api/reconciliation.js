import request from "@/utils/request";
// 对账管理搜索功能
export function reconSearch(data) {
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}

// 交易账户基本信息获取
export function merchantMsg(id) {
  return request({
    url: "/article/list",
    method: "get",
    params: { id }
  });
}
//对账详情请求
export function merchantDetail(id) {
  return request({
    url: "/article/list",
    method: "get",
    params: { id }
  });
}
//采纳平台请求
export function adoptPlatform(data) {
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}
//采纳第三方请求
export function adoptThird(data) {
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}
//导出请求
export function merchantDownload(data) {
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}
//下载对账单提交
export function reconDownload(data) {
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}
