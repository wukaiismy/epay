<template>
    <div class="bigBox">
      <img @click="backJump" class="backLogo" src="../../../assets/login/shut.png" alt="">
     <div class="zhanghao">系统账户：{{ids}}</div>
     <div>手机号码：{{tel}}</div>
     <div> &nbsp;&nbsp;&nbsp;旧密码：
     <el-input
        placeholder="请输入旧密码"
        v-model="pswd"
        clearable>
        </el-input>
        </div>
        <div> &nbsp;&nbsp;&nbsp;新密码：
            <el-input
                placeholder="请输入新密码"
                v-model="newpswd"
                clearable>
        </el-input>
        </div>
        <div>确认密码：
            <el-input
                placeholder="请再次输入新密码"
                v-model="repswd"
                clearable>
        </el-input>
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
      repswd: ""
    };
  },
  computed: {
    ...mapGetters(["ids", "tel"])
  },
  methods: {
    sumbit() {
      console.log("确认提交");

      // 进行ajax请求、
      // navbarPswdChange(this.pswd, this.newpswd).then(res => {
      //   console.log(res);
      //   if (res.code == 200) {
      //   }
      // });
      //退出登录
      this.$store.dispatch("FedLogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
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
    .el-input {
      width: 200px;
      margin: 0;
      display: inline-block;
      top: 0;
      left: 0px;
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