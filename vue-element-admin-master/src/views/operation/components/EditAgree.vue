<template>
    <div class="bigBox">
     <div class="agreeTitle">协议标题：<el-input v-model="channelName" style="width: 240px;" size="small"  placeholder="请输入协议标题"  clearable></el-input></div>
     <div class="agreeTitle">协议类型：<el-input v-model="channelType" style="width: 240px;" size="small"  clearable placeholder="请输入协议类型"></el-input></div>
     <div class="agreeTitle">协议附件：<span><a class="jumps" href="#">用户认证协议.pdf</a></span></div>
     <div class="agreeTitle"> <div class="titles">协议内容：</div><div class="showcontent"  v-html="'<P>11scsdcdcdcvsdvssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdvsdvdfvfvbf111111</P><P>11111111</P><P>11111111</P><P>11111111</P><P>11scsdcdcdcvsdvdvsdvdfvfvbf111111</P><P>11111111</P><P>11111111</P><P>11111111</P>'"></div></div>
    </div>
</template>

<script>
export default {
  name: "EditAgree",
  data() {
    return {
      channelName: "",
      channelType: ""
    };
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