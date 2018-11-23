<template>
    <div>    
       <!-- 渠道信息展示部分 -->       
       <div class="basicMsgTitle">商户信息</div>
       <div class="boxMsg bm">
            <div class="mags">连锁商户编号：{{detail_msg.merchantfile.id}}</div>
            <div class="mags">连锁商户名称：{{detail_msg.merchantfile.name}}</div>
            <div class="mags">营业执照编号：{{detail_msg.merchantfile.license_no}}</div>
            <div class="mags">营业期限：{{detail_msg.merchantfile.business_begin}}~{{detail_msg.merchantfile.business_end}}</div>
            <div class="mags">营业范围：{{detail_msg.merchantfile.business_scope}}</div>
            <div class="mags">营业执照：
               <img class="logoImg" :src="'/backend/media/'+detail_msg.merchantfile.license_image" alt="营业执照">
            </div>
            <div class="mags">总店地址：{{detail_msg.merchantfile.city}}</div>
            <div class="mags">详细地址：{{detail_msg.location}}</div>
            <div class="mags">法人姓名：{{detail_msg.merchantfile.legal_name}}</div>
            <div class="mags">身份证号：{{detail_msg.merchantfile.legal_id_card}}</div>   
       </div>
       <div class="gard1"><Gard /></div>
       <div class="basicMsgTitle bs">运营信息</div>
       <div class="boxMsg">         
            <div class="mags">联系人：{{detail_msg.merchantfile.operator_name}}</div>
            <div class="mags">联系电话：{{detail_msg.merchantfile.operator_mobile}}</div>
            <div class="mags">电子邮箱：{{detail_msg.merchantfile.operator_email}}</div>
            <div class="mags">客服电话：：{{detail_msg.merchantfile.service_tel}}</div> 
            <div class="mags">商户logo： <img class="logoImg" :src="'/backend/media/'+detail_msg.merchantfile.merchant_logo" alt=""> </div>       
       </div>
       <div class="gard1"><Gard /></div>        
       <div class="basicMsgTitle bs">渠道信息</div>
       <div class="boxMsg">        
            <div class="mags">所属渠道：{{detail_msg.channel}}</div>
            <div class="mags">所属渠道编号：{{detail_msg.head_chain_id}}</div>
            <!-- <div class="mags">所属渠道商：{{detail_msg.channel}}</div> -->
            <div class="mags">商户通道费率：{{detail_msg.merchantfile.rate}}‰</div> 
       </div>      
      <!-- 渠道信息结束 -->      
    </div>
</template>

<script>
import Gard from "./Gard.vue";
import waves from "@/directive/waves"; // 水波纹指令
import uRLS from "../../../assets/wukai.jpg";
export default {
  name: "AddDetail",
  props: ["detail_msg"],
  directives: {
    waves
  },
  components: {
    Gard
  },
  data() {
    return {
      isShow: true,
      disabled: true,
      uRLS: uRLS,
      qudaoStore: "金桔联盟",
      msg: {
        m1: "12545885285",
        m2: "成都易付云金融科技",
        m3: "10000248898",
        m4: "2018-10-10~2018-20-10",
        m5: "家具。玩具",
        m6: [uRLS, uRLS],
        m7: "环球中心",
        m8: "高西新区",
        m9: "张学友",
        m10: "5111135400213254",
        m11: "刘德华",
        m12: "135400213254",
        m13: "2345@qq.com",
        m14: "028-2201-000",
        m15: uRLS,
        m16: "成都易付云",
        m17: "5112012121252",
        m18: "成都易付云",
        m19: "3‰"
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.basicMsgTitle {
  font-size: 16px;
  color: #333333;
  position: relative;
  text-align: left;
  /* background-color: aqua; */
  top: 20px;
  left: 4%;
}
.bs {
  top: 0px;
}
.boxMsg {
  margin: 20px 0 0 4%;
  /* background-color: aqua; */
  text-align: left;
}
.bm {
  margin-top: 40px;
}
.mags {
  font-size: 14px;
  color: #999999;
  margin-top: 10px;
}
.gard1 {
  width: 92%;
  margin: 20px 4%;
}
.logoImg {
  width: 32%;
  height: 100px;
  margin-right: 10px;
}
</style>