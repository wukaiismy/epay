import request from "@/utils/request";

export function fetchList(query) {
  return request({
    url: "/backend/api/v1/transaction/list",
    method: "get",
    params: query
  });
}
