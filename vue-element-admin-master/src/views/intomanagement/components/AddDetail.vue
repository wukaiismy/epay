<template>
    <div>
      
       <!-- 渠道信息展示部分 -->
       
       <div class="basicMsgTitle">商户信息</div>
       <div class="boxMsg bm">
          <div class="mags" v-for="(r, index) in msg" :key="index" >{{r.used}}：
              <span v-if="r.msgs">{{r.msgs}}</span>
             <img class="logoImg" v-else v-for="(item, index) in r.msgsUrl" :key="index" :src="item" alt="">             
           </div>
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">运营信息</div>
       <div class="boxMsg">
          <div class="mags" v-for="(r, index) in msg1" :key="index" >{{r.used}}：
              <span v-if="r.msgs">{{r.msgs}}</span>
             <img class="logoImg" v-else v-for="(item, index) in r.msgsUrl" :key="index" :src="item" alt="">             
           </div>
        </div>
        <div class="gard1"><Gard /></div>        
        <div class="basicMsgTitle bs">渠道信息</div>
       <div class="boxMsg">
           <div class="mags" v-for="(r, index) in msg3" :key="index" >{{r.used}}：<span v-if="r.msgs">{{r.msgs}}</span>
              <img class="logoImg" v-else :src="r.msgsUrl" alt=""> 
           </div>
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
      msg: [
        { used: "连锁商户编号", msgs: "12545885285" },
        { used: "连锁商户名称", msgs: "成都易付云金融科技" },
        { used: "营业执照编号", msgs: "10000248898" },
        { used: "营业期限", msgs: "2018-10-10~2018-20-10" },
        { used: "营业范围", msgs: "家具。玩具" },
        { used: "营业执照", msgsUrl: [uRLS, uRLS] },
        { used: "总店地址", msgs: "环球中心" },
        { used: "详细地址", msgs: "高西新区" },
        { used: "法人姓名", msgs: "张学友" },
        { used: "身份证号", msgs: "5112012121252" }
      ],
      msg1: [
        { used: "联系人", msgs: "刘德华" },
        { used: "联系电话", msgs: "135400213254" },
        { used: "电子邮箱", msgs: "2345@qq.com" },
        { used: "客服电话", msgs: "028-2201-000" },
        { used: "商户logo", msgsUrl: [uRLS] }
      ],

      msg3: [
        { used: "所属渠道", msgs: "成都易付云" },
        { used: "所属渠道编号", msgs: "5112012121252" },
        { used: "所属渠道商", msgs: "成都易付云" },
        { used: "商户通道费率", msgs: "3‰" }
      ]
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
.xiugai {
  border: 1px solid #1c3672;
  border-radius: 4px;
  width: 48%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #1c3672;
  margin: 30px auto;
}
.doRecorde {
  width: 91.6%;
  height: 222px;
  background: #f9f9f9;
  font-size: 14px;
  color: #999999;
  margin: 30px auto;
  padding: 20px 0 0 0;
}
.doTitle {
  font-size: 16px;
  color: #333333;
  margin-left: 4.3%;
}
.doDetail {
  margin: 10px 4.3%;
}
/* 下面是通道费率样式 */
.retes {
  font-size: 14px;
  color: #999999;
  position: relative;
  top: 20px;
  left: 4%;
}
.retas {
  font-size: 14px;
  color: #1c3672;
  background: none;
}
.changeReta {
  font-size: 14px;
  color: #1c3672;
  margin-left: 20px;
  cursor: pointer;
}
.xieyi {
  margin: 40px 0 0 4%;
  font-size: 14px;
  color: #999999;
}
.xy {
  margin-top: 10px;
}
.s1 {
  color: #333333;
}

.s3 {
  color: #88acff;
  margin-left: 10px;
}
.xieyiImg {
  height: 140px;
  width: 21.8%;
}
.imgshow {
  position: relative;
  margin: 20px 0 0 4%;
}
.imgshow span {
  position: relative;
  top: -130px;
}
.allChose {
  margin-top: 30px;
  text-align: center;
}
</style>