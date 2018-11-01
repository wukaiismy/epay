<template>
    <div class="bigBox">
     <div class="agreeTitle">协议标题：<el-input v-model="channelName" style="width: 240px;" size="small"  placeholder="请输入协议标题"  clearable></el-input></div>
     <div class="agreeTitle">协议类型：<el-input v-model="channelType" style="width: 240px;" size="small"  clearable placeholder="请输入协议类型"></el-input></div>
     <div class="agreeTitle"><div  class="titless">协议附件：</div>
    <div class="showcontent"> <el-upload
  class="upload-demo"
  ref="upload"

  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
</el-upload>
  <span class="shuoMing">只支持pdf.doc.docx文件</span>
     </div>
    
       <!-- <span><a class="jumps" href="#">用户认证协议.pdf</a></span> -->
       
     </div>
     <div class="agreeTitle"> <div class="titles">协议内容：</div>
         <div class="showcontent" >
           <tinymce :height="400" v-model="content" id='tinymce'/>
           <div class="submitBox">
              <el-button @click="submit"  type="primary">保存</el-button>
              <el-button @click="cancel" type="info">取消</el-button>
           </div>
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
      fileList: [],
      content: `<h1 style="text-align: center;">用户协议编辑</h1>`
    };
  },
  mounted() {},
  methods: {
    getMsg() {},
    submit() {
      console.log(this.content);
      console.log("你点击了提交按钮");
    },
    cancel() {
      console.log("你点击了取消");
      this.$emit("AgreementShow");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
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
  margin-left: 5%;
  width: 95%;
}
.titles {
  display: inline-block;
  position: absolute;
  top: 0px;
}
.titless {
  display: inline-block;
  position: absolute;
  top: 8px;
}
.submitBox {
  margin-top: 20px;
}
.submitBox .el-button {
  width: 120px;
  margin-right: 50px;
}
.shuoMing {
  margin: 10px 0 10px 0px;
  font-size: 12px;
  color: #666666;
  display: inline-block;
}
</style>
<style>
.upload-demo > ul {
  width: 300px;

  display: inline-block;
  position: relative;
  top: 10px;
  left: 20px;
}
</style>
