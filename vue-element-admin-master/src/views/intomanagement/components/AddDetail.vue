<template>
    <div>    
       <!-- 渠道信息展示部分 -->       
       <div class="basicMsgTitle">商户信息</div>
       <div class="boxMsg bm">
            <div class="mags">连锁商户编号：{{msg.m1}}</div>
            <div class="mags">连锁商户名称：{{msg.m2}}</div>
            <div class="mags">营业执照编号：{{msg.m3}}</div>
            <div class="mags">营业期限：{{msg.m4}}</div>
            <div class="mags">营业范围：{{msg.m5}}</div>
            <div class="mags">营业执照：
              <img class="logoImg"  v-for="(item, index) in msg.m6" :key="index" :src="item" alt="">
            </div>
            <div class="mags">总店地址：{{msg.m7}}</div>
            <div class="mags">详细地址：{{msg.m8}}</div>
            <div class="mags">法人姓名：{{msg.m9}}</div>
            <div class="mags">身份证号：{{msg.m10}}</div>   
       </div>
       <div class="gard1"><Gard /></div>
       <div class="basicMsgTitle bs">运营信息</div>
       <div class="boxMsg">         
            <div class="mags">联系人：{{msg.m11}}</div>
            <div class="mags">联系电话：{{msg.m12}}</div>
            <div class="mags">电子邮箱：{{msg.m13}}</div>
            <div class="mags">客服电话：{{msg.m14}}</div> 
            <div class="mags">商户logo： <img class="logoImg" :src="msg.m15" alt=""> </div>       
       </div>
       <div class="gard1"><Gard /></div>        
       <div class="basicMsgTitle bs">渠道信息</div>
       <div class="boxMsg">        
            <div class="mags">所属渠道：{{msg.m16}}</div>
            <div class="mags">所属渠道编号：{{msg.m17}}</div>
            <div class="mags">所属渠道商：{{msg.m18}}</div>
            <div class="mags">商户通道费率：{{msg.m19}}</div> 
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