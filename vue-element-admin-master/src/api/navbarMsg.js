import request from "@/utils/request";
// 下载按钮ajax请求
export function navbarDownLoads(query) {
  return request({
    url: "/article/list",
    method: "get",
    params: query
  });
}
// 账户密码修改ajax请求
export function navbarPswdChange(password, newpassword) {
  const data = {
    password,
    newpassword
  };
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}
// 请求用户详细信息ajax请求
export function navbarUserInfo() {
  return request({
    url: "/article/list",
    method: "get"
  });
}
