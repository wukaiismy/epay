import request from "@/utils/request";
//的短信模块基本数据
export function smsMsg(query) {
  return request({
    url: "/article/list",
    method: "get",
    params: query
  });
}
//修改短信提交功能
export function smsSubmit(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
//删除短信提交功能
export function deleted(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
// 协议获取基本信息
export function AgreemenMsg(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}

// 具体协议信息
export function AgreemenDetail(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
// 编辑协议信息
export function EditDetail(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
