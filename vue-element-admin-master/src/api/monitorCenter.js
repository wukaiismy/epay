import request from "@/utils/request";
//商户风险基本数据
export function MerchantRiskMsg(query) {
  return request({
    url: "/article/list",
    method: "get",
    params: query
  });
}
//商户风险搜索功能
export function MerchantRiskSearch(data) {
  return request({
    url: "/article/update",
    method: "post",
    data
  });
}
