<template>
  <div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h4 class="title">企业后台管理系统</h4>
      
      </div>
      <!-- 登录部分 -->
      <div class="boxLogin">  
      <img class="LoginImg" src="../../assets/login/denglulogo.png" alt="">  
      <el-form-item prop="username" >
        <span class="svg-container">
          <svg-icon icon-class="user" />
          用户名：
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
          密 码：
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item >
      <!-- 验证码 -->
       <el-form-item prop="username" class="yzm" >
        <span class="svg-container">
          <svg-icon icon-class="aa" />
          验证码：
        </span>
        <el-input
          v-model="loginForm.yzm"
          placeholder="请输入验证码"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
       <!-- 验证码图片 -->
         <img class="yzmImg" src="../../assets/login/bg.png" alt="">

      <el-button :loading="loading" type="primary" style="width:400px;height:48px;margin-left:40px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="loginExplain" @click="showDialog=true">登录名变更说明 >></div>
    </div>
    </el-form>
     <!-- 模态框弹出 -->
     
    <el-dialog title="登录名变更说明" :visible.sync="showDialog" class='motalaBox'  width="630px" append-to-body center>
              <div class="explians"> 系统已升级，登录名变更如下表</div>
              <div class="showExp">
               <div class="hearders">
                <div class="it1">用户类型</div>
                <div class="it2">登录名规则</div>
                <div class="it3">登录名示例</div>
                </div>
                <div class="items" v-for="(r, index) in exList" :key="index">
                <div class="it1">{{r.names}}</div>
                <div class="it2">{{r.nums}}</div>
                <div class="it3">{{r.exp}}</div>
                </div>
              </div>
              <div class="kefu">登录密码维持不变，如有疑问，请咨询客服人员</div>
    </el-dialog>
 
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";

export default {
  name: "Login",
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "1111111",
        yzm: ""
      },
      exList: [
        { names: "渠道商", nums: "渠道编号.dt", exp: "10000000036565.dt" },
        { names: "普通商户", nums: "商户编号.mch", exp: "10000000036565.mch" },
        { names: "连锁商户", nums: "商户编号.mr", exp: "10000000036565.mr" }
      ],
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $cursor;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 58%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 0;
      color: $cursor;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    width: 400px;
    border: 1px solid #1c3672;
    background: #fff;
    color: #454545;
    margin: 0 0 30px 40px;
  }
  .yzm {
    width: 270px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #999999;
$light_gray: #eee;

.boxLogin {
  width: 480px;
  height: 494px;
  background-color: #fff;
  position: relative;
}
.LoginImg {
  width: 140px;
  margin: 40px 0 30px 170px;
}
.yzmImg {
  width: 120px;
  height: 48px;
  position: absolute;
  right: 40px;
  top: 300px;
}
.loginExplain {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #1c3672;
  text-align: center;
  margin-top: 20px;
}

.motalBox {
  width: 500px;
  height: 403px;
  border-radius: 30px;
  background-color: #ff8080;
}

.el-button {
  background-image: linear-gradient(-137deg, #142855 0%, #4553a4 100%);
  font-size: 18px;
  color: #ffffff;
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  background: url("~@/assets/login/bg.png") no-repeat;
  background-size: cover;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 108px;
    display: inline-block;
    // background-color: #ccc;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 36px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      // font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.explians {
  font-size: 14px;
  color: #666666;
  text-align: center;
}
.showExp {
  margin-top: 20px;
  width: 550px;
  height: 200px;
}
// 模态框样式
.hearders {
  width: 100%;
  height: 20px;
  background-color: #fff;
  position: relative;
  margin-bottom: 34px;
}
.hearders div {
  position: absolute;
  display: inline-block;
  font-size: 18px;
  color: #1c3672;
}
.it1 {
  left: 30px;
}
.it2 {
  left: 198px;
}
.it3 {
  left: 372px;
}
.items {
  width: 100%;
  height: 20px;
  background-color: #fff;
  position: relative;
  margin-top: 25px;
}
.items div {
  display: inline-block;
  font-size: 14px;
  color: #333333;
  position: absolute;
}
.kefu {
  font-size: 12px;
  color: #999999;
  text-align: center;
}
.motalaBox >>> .el-dialog {
  width: 630px !important;
}
</style>
