<template>
  <div class="bigBox">
    <div class="agreeTitle">
      协议标题：
      <span>{{datalist.title}}</span>
    </div>
    <div class="agreeTitle">
      协议类型：
      <span>{{datalist.agreement_type}}</span>
    </div>
    <div class="agreeTitle">
      协议附件：
      <span>
        <a class="jumps" href="#" title="点击下载" @click="downLoad">{{datalist.title}}.pdf</a>
      </span>
    </div>
    <div class="agreeTitle">
      <div class="titles">协议内容：</div>
      <div class="showcontent" v-html="datalist.html"></div>
    </div>
  </div>
</template>

<script>
import { AgreemenDetail, AgreemenDownload } from "@/api/operation";
export default {
  name: "AgreementShows",
  props: ["datalist"],
  data() {
    return {
      msgList: {},
      content: `<h1 style="text-align: center;">用户协议编辑</h1>`
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    //获取具体协议
    getMsg() {
      console.log("获取具体协议基本信息信息");
      console.log(this.datalist);
    },
    downLoad() {
      AgreemenDownload(this.datalist.id).then(res => {
        console.log("下载的协议====");
        console.log(res);
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", this.datalist.title + ".pdf");
        document.body.appendChild(link);
        link.click();
      });
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
  margin-left: 5%;
  width: 95%;
}
.titles {
  display: inline-block;
  position: absolute;
  top: 0px;
}
</style>