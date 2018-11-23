import request from "@/utils/request";
// 信条账户搜索功能
export function accountSearch(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}

// 商户交易账户基本信息获取
export function merchantMsg(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}
//信条账户详情请求
export function merchantDetail(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//用户预付卡详情列表
export function prepaDetail(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}
//信条账户修改请求
export function merchantChange(id) {
  return request({
    url: "/backend/api/v1/article/list",
    method: "get",
    params: { id }
  });
}
//确认修改请求
export function merchantChangeSubmit(data) {
  return request({
    url: "/backend/api/v1/article/list",
    method: "get",
    params: data
  });
}
//批量上架请求
export function merchantPutaway(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//批量下架请求
export function merchantSoldOut(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//暂停服务请求
export function merchantStop(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//添加请求
export function merchantAdd(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
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
//用户激活请求
export function userActivation(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//用户锁卡请求
export function userLockCard(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//用户解压请求
export function userUnpack(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
