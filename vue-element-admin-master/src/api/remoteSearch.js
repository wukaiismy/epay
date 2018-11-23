import request from "@/utils/request";

export function userSearch(name) {
  return request({
    url: "/backend/api/v1/search/user",
    method: "get",
    params: { name }
  });
}
