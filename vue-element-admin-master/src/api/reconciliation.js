import request from "@/utils/request";
// 对账管理搜索功能
// export function reconSearch(data) {
//   return request({
//     url: "/article/list",
//     method: "post",
//     data
//   });
// }

// 交易账户基本信息获取
export function merchantMsg(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}
//对账详情请求
export function merchantDetail(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//采纳平台请求
export function adoptPlatform(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}
//采纳第三方请求
export function adoptThird(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: ddata
  });
}
//导出请求
export function merchantDownload(URL, data) {
  return request({
    url: URL,
    method: "post",
    responseType: "blob",
    data
  });
}
//下载对账单提交
export function reconDownload(URL, data) {
  return request({
    url: URL,
    method: "post",
    responseType: "blob",
    data
  });
}
