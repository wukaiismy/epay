import request from "@/utils/request";
// 角色权限搜索功能
export function RoleSearch(data) {
  return request({
    url: "incoming/channellist/",
    method: "post",
    data
  });
}
//角色权限基本数据
export function RoleAuthorizationMsg(query) {
  return request({
    url: "/article/list",
    method: "get",
    params: query
  });
}
//角色权限删除
export function RoleAuthorDelete(query) {
  return request({
    url: "/article/list",
    method: "get",
    params: query
  });
}
//角色新增修改
export function RoleAuthorAdd(URL, data) {
  return request({
    url: URL,
    method: "post",
    data
  });
}
//账户权限基本数据
export function userMsg(URL, data) {
  return request({
    url: URL,
    method: "get",
    params: data
  });
}
//账户权限详情
export function userDetialMsg(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//账户权限删除
export function userDelete(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//账户权限新增
export function userAdd(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
//账户权限导出
export function userDownload(URL, id) {
  return request({
    url: URL,
    method: "get",
    params: { id }
  });
}
