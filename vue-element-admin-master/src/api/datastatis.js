import request from "@/utils/request";
// 数据统计中交易概况基本数据
export function dataMsg() {
  return request({
    url: "/backend/api/v1/statistics/showdatasum/",
    method: "get"
  });
}
//按日查询搜索
export function searchDay(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}
// 表格的基本信息获取
export function tebleMsg(data) {
  return request({
    url: "/backend/api/v1/statistics/somedaylist/",
    method: "get",
    params: data
  });
}
// // 渠道搜索请求
// export function searchDataMsg(data) {
//   return request({
//     url: "/article/update",
//     method: "post",
//     data
//   });
// }

// 渠道交易统计请求
export function channelMsgList(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}
// 渠道担保交易导出
export function channelDownload(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
