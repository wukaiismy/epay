import request from "@/utils/request";
// 渠道商搜索功能
export function channelSearch(URL, datas) {
  return request({
    url: URL,
    method: "get",
    params: { status: datas.status }
  });
}
// 批量导入渠道商
export function bulkImport(id) {
  return request({
    url: "/article/list",
    method: "get",
    params: { id }
  });
}
//新增渠道商
export function addChannel(URL, data) {
  return request({
    url: URL,
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
// 渠道进件基本信息获取
export function channelMsg(URL) {
  return request({
    url: URL,
    method: "get"
    // params: { id }
  });
}
//渠道单个通过请求
export function channelPass(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//渠道单个驳回请求
export function channelRejected(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//渠道批量激活请求
export function channelVolumeActivation(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//渠道批量通过请求
export function channelVolumePass(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//渠道批量通过和激活请求
export function channelALL(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//渠道批量驳回请求
export function channelVolumeRejected(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//渠道导出请求
export function channelDownload(URL, data) {
  return request({
    url: URL,
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    data
  });
}
//渠道表格点击相应行右边部分显示的信息请求
export function channelDetail(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//新增连锁子商户导入连锁商户请求
export function storeDetail(URL, storeName) {
  return request({
    url: URL,
    method: "GET",
    params: { storeName }
  });
}
// 图片上传测试
//新增连锁子商户导入连锁商户请求
export function imgUp(Url, data) {
  return request({
    url: Url,
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
}
export function imgURL(Url) {
  return request({
    url: Url,
    method: "get"
  });
}
