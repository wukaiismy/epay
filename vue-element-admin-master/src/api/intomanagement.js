import request from "@/utils/request";
// 渠道商搜索功能
export function channelSearch(URL, datas) {
  return request({
    url: URL,
    method: "get",
    params: datas
  });
}
// 批量导入渠道商
export function bulkImport(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//新增渠道商
export function addChannel(URL, data) {
  return request({
    url: URL,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  });
}
// 渠道进件基本信息获取
export function channelMsg(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}
//渠道单个通过请求
export function channelPass(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//渠道单个驳回请求
export function channelRejected(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
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
    method: "post",
    responseType: "blob",
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
export function storeDetail(URL, name) {
  return request({
    url: URL,
    method: "GET",
    params: { name }
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
// 获取操作记录
export function showReview(Url) {
  return request({
    url: Url,
    method: "get"
  });
}
