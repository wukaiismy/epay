<template>
  <div class="bigBox">
    <img @click="backJump" class="backLogo" src="../../../assets/login/shut.png" alt>
    <div class="zhanghao">系统账户：{{ids}}</div>
    <!-- <div>手机号码：{{tel}}</div> -->
    <div>&nbsp;&nbsp;&nbsp;旧密码：
      <el-input placeholder="请输入旧密码" v-model="pswd" clearable></el-input>
    </div>
    <div>&nbsp;&nbsp;&nbsp;新密码：
      <el-input placeholder="请输入新密码" v-model="newpswd" clearable></el-input>
    </div>
    <div>确认密码：
      <el-input placeholder="请再次输入新密码" v-model="repswd" clearable @blur="onchangePawd"></el-input>
      <br>
      <span v-show="showMsg" class="showMsg">两次输入的密码不一致</span>
    </div>
    <el-button @click="sumbit">确认修改</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navbarPswdChange } from "@/api/navbarMsg";
export default {
  name: "settings",
  data() {
    return {
      pswd: "",
      newpswd: "",
      repswd: "",
      showMsg: false
    };
  },
  computed: {
    ...mapGetters(["ids", "tel"])
  },
  methods: {
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
    onchangePawd(val) {
      if (this.newpswd != this.repswd) {
        this.showMsg = true;
        return;
      } else {
        this.showMsg = false;
      }
    },
    sumbit() {
      console.log("确认提交");
      if (this.newpswd != this.repswd) {
        this.showMsg = true;
        return;
      } else {
        this.showMsg = false;
      }
      var data = { old_password: this.pswd, newpassword: this.newpswd };
      console.log(data);
      // 进行ajax请求、
      navbarPswdChange(data).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.message(res.data.msg, res.data.code);
          // //退出登录
          setTimeout(() => {
            this.$store.dispatch("FedLogOut").then(() => {
              location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
            });
          }, 1500);
        } else {
          this.message(res.data.msg, res.data.code);
        }
      });

      // this.$store.dispatch("componentsId", "adminDashboard");
    },
    //返回按钮
    backJump() {
      this.$store.dispatch("componentsId", "adminDashboard");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bigBox {
  width: 390px;
  height: 354px;
  background-color: #fff;
  margin: 130px auto;
  position: relative;
  padding: 10px 0 1px 0;
  font-size: 14px;
  color: #333333;
  div {
    margin: 20px 61px 0 61px;
    width: 300px;
    display: inline-block;
    position: relative;
    .el-input {
      width: 200px;
      margin: 0;
      display: inline-block;
      top: 0;
      left: 0px;
    }
    .showMsg {
      font-size: 14px;
      color: red;
      position: absolute;
      top: 40px;
      left: 25%;
      // background-color: #4553a4;
    }
  }
}

.el-button--medium {
  background-image: linear-gradient(-137deg, #4553a4 0%, #142855 100%);
  border-radius: 6px;
  font-size: 14px;
  color: #ffffff;
  width: 237px;
  height: 36px;
  position: relative;
  top: 30px;
  left: 20%;
}
.backLogo {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 20px;
}
</style>