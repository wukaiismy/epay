import request from "@/utils/request";
// 信条交易搜索功能
export function clearedSearch(data) {
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
//交易详情请求
export function merchantDetail(id) {
  return request({
    url: "/article/list",
    method: "get",
    params: { id }
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
//异常订单处理提交
export function abOrderSubmit(data) {
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}
