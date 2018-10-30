<template>
    <div class="bigBox">
     <div class="agreeTitle">协议标题：<span>{{datalist.title}}</span></div>
     <div class="agreeTitle">协议类型：<span>{{datalist.title}}</span></div>
     <div class="agreeTitle">协议附件：<span><a class="jumps" href="#" @click="downLoad">用户认证协议.pdf</a></span></div>
     <div class="agreeTitle"> <div class="titles">协议内容：</div><div class="showcontent"  v-html="'<P>11scsdcdcdcvsdvssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdvsdvdfvfvbf111111</P><P>11111111</P><P>11111111</P><P>11111111</P><P>11scsdcdcdcvsdvdvsdvdfvfvbf111111</P><P>11111111</P><P>11111111</P><P>11111111</P>'"></div></div>
    </div>
</template>

<script>
import { AgreemenDetail } from "@/api/operation";
export default {
  name: "AgreementShows",
  props: ["datalist"],
  data() {
    return {
      msgList: {}
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    //获取具体协议
    getMsg() {
      console.log("获取具体协议信息");
      console.log(this.datalist);
      AgreemenDetail(1).then(res => {
        console.log(res);
        // this.msgList=res.data
      });
    },
    downLoad() {
      alert("您点击了下载查看");
    }
  }
};
</script>

<style scoped>
.bigBox {
  width: 82.35%;
  min-height: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
}
.agreeTitle {
  font-size: 14px;
  color: #333333;
  margin-bottom: 10px;
  position: relative;
}
.agreeTitle span {
  color: #666666;
}
.jumps {
  color: #4990e2;
}
.showcontent {
  display: inline-block;
  background-color: aquamarine;
  margin-left: 5%;
}
.titles {
  display: inline-block;
  position: absolute;
  top: 0px;
}
</style>