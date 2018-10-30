<template>
    <div class="bigBox">
     <div class="agreeTitle">协议标题：<el-input v-model="channelName" style="width: 240px;" size="small"  placeholder="请输入协议标题"  clearable></el-input></div>
     <div class="agreeTitle">协议类型：<el-input v-model="channelType" style="width: 240px;" size="small"  clearable placeholder="请输入协议类型"></el-input></div>
     <div class="agreeTitle">协议附件：<span><a class="jumps" href="#">用户认证协议.pdf</a></span></div>
     <div class="agreeTitle"> <div class="titles">协议内容：</div>
         <div class="showcontent" >
           <tinymce :height="800" v-model="content" id='tinymce'/>
         </div>
     </div>
     <!-- <div class="editor-content" v-html="content"/> -->
    </div>
</template>

<script>
import { EditDetail } from "@/api/operation";
import Tinymce from "@/components/Tinymce";
export default {
  name: "EditAgree",
  props: ["dataEdit"],
  data() {
    return {
      channelName: "",
      channelType: "",
      content: `<h1 style="text-align: center;">用户协议编辑</h1>`
    };
  },
  mounted() {},
  methods: {
    getMsg() {}
  },
  components: { Tinymce }
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
  width: 100%;
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
  width: 95%;
}
.titles {
  display: inline-block;
  position: absolute;
  top: 0px;
}
</style>