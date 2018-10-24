import request from "@/utils/request";

export function loginByUsername(username, password, captcha, timestamp) {
  console.log(666);
  const data = {
    username,
    password,
    captcha,
    timestamp
  };
  console.log(data);
  return request({
    url: "login/",
    // url: "/login/login",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/login/logout",
    method: "post"
  });
}

export function getUserInfo(token) {
  return request({
    url: "admin/userfile/",
    // url: "/user/info",
    method: "get"
    // params: { token }
  });
}
