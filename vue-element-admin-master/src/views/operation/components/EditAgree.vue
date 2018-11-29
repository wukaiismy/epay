<template>
  <div class="bigBox">
    <div class="agreeTitle">协议标题：
      <el-input
        v-model="dataList.title"
        style="width: 240px;"
        size="small"
        placeholder="请输入协议标题"
        clearable
      ></el-input>
    </div>
    <div class="agreeTitle">协议类型：
      <el-input
        v-model="dataList.agreement_type"
        style="width: 240px;"
        size="small"
        clearable
        placeholder="请输入协议类型"
      ></el-input>
    </div>
    <div class="agreeTitle">
      <div class="titless">协议附件：</div>
      <div class="showcontent">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://192.168.1.28:8002/api/v1/protocol/arg-up/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="onChange"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
        </el-upload>
        <span class="shuoMing">只支持pdf.doc.docx文件</span>
      </div>
      <!-- <span><a class="jumps" href="#">用户认证协议.pdf</a></span> -->
    </div>

    <div class="agreeTitle">
      <div class="titles">协议内容：</div>
      <div class="showcontent">
        <tinymce :height="400" v-model="dataList.html" id="tinymce"/>
        <div class="submitBox">
          <el-button @click="submit" type="primary">保存</el-button>
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
      aaa: "",
      file: "",
      fileList: [],
      dataList: {
        title: "",
        agreement_type: "",
        file_path: "",
        html: `<h1 style="text-align: center;">用户协议编辑</h1>`
      }
    };
  },
  mounted() {
    console.log("+++++++");
    console.log(this.dataEdit);
    if (this.dataEdit) {
      this.dataList = this.dataEdit;
    }
  },
  methods: {
    getMsg() {},
    // 提示框函数
    message(msg, status) {
      var types = "";
      if (status == "200") {
        types = "success";
      } else {
        types = "error";
      }
      this.$message({
        message: msg,
        type: types
      });
    },
    submit() {
      console.log("你点击了提交按钮");
      var EditDetailURL = "/backend/api/v1/protocol/arg-up/";
      console.log(this.dataList);
      var param = new FormData();
      param.append("agreement_type", this.dataList.agreement_type); // 通过append向form对象添加数据
      param.append("title", this.dataList.title);
      param.append("html", this.dataList.html);
      param.append("file_path", this.dataList.file_path);
      var a = param.get("file_path");

      EditDetail(EditDetailURL, param).then(res => {
        console.log(res);
        if (res.data.code == "200") {
          this.message(res.data.msg, res.data.code);
          this.$emit("AgreementShow");
        } else {
          this.message("上传失败，请确认上传内容", 400);
        }
        // this.msg=data.msg
        // this.gridData=data.gridData
      });
    },
    cancel() {
      console.log("你点击了取消");
      this.$emit("AgreementShow");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    onChange(file, fileList) {
      console.log("看看是什么鬼");
      console.log(file.raw);
      this.dataList.file_path = file.raw;
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
