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
    url: "/backend/api/v1/login1/",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/backend/api/v1/login/logout",
    method: "post"
  });
}

export function getUserInfo(token) {
  return request({
    url: "/backend/api/v1/admin/userfile/",
    method: "get"
    // params: { token }
  });
}
// 验证码
export function getUserCaptcha() {
  return request({
    url: "/backend/api/v1/admin/captcha/",
    method: "get"
    // params: { token }
  });
}
