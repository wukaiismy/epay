<template>
    <div class="msgBox">
       
       <!-- 信息选择查看部分 -->   
           <el-row>
                <el-col :span="13">
                    <div  class="leftMenu">
                    <div class="storeTile">连锁子商户基本信息</div>
 <!-- 下面是展示部分 -->
           <div class="showBoxs" v-show="isShow1">
               <div class="items"><div class="titles">连锁子商户名称：</div>
                  <span><el-input  size="mini"  style="width:63.218%; height:40px;" v-model="msg.sonStore" placeholder="子商户名称"></el-input></span>
               </div>
               <div class="items"><div class="titles">连锁商户名称：</div>
                   <span><el-input  size="mini"  style="width:45.785%; height:40px;" v-model="msg.storeName" placeholder="连锁商户名称"></el-input><span class="daoStroe" @click="daoru">导入</span></span>
               </div>
               <div class="items"><div class="titles">公司地址：</div>
                 <span>
                     <el-input  size="mini"  style="width:19.158%; height:40px; margin-right: 10px; " v-model="msg.pre" placeholder="省"></el-input>
                     <el-input  size="mini"  style="width:19.158%; height:40px; margin-right: 10px;" v-model="msg.shi" placeholder="市"></el-input>
                     <el-input  size="mini"  style="width:19.158%; height:40px;" v-model="msg.qu" placeholder="区"></el-input>
                 </span>
               </div>
               <div class="items"><div class="titles">详细地址：</div>
               <span><el-input  size="mini"  style="width:63.218%; height:40px;" v-model="msg.address" placeholder="请填写详细地址"></el-input></span>
               </div>
               <div class="items"><div class="titles">子商户负责人：</div>
                <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.sonUsername" placeholder="请输入子商户负责人"></el-input></span>
               </div>
               <div class="items"><div class="titles">负责人电话：</div>
                <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.sonTel" placeholder="请输入负责人电话"></el-input></span>
               </div>
               <div class="items"><div class="titles">子商户客服电话：</div>
                <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.sonPhoto" placeholder="请输入客服电话"></el-input></span>
               </div>
               <div class="items"><div class="titles">营业执照编号：</div>
                  <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.num" placeholder="请与营业执照一致"></el-input></span>
               </div>
               <div class="items"><div class="titles">补充材料：</div>
               <span>
                     <img class="logoImg1"  v-for="(p, index) in msg.addImg" :key="index" v-show="msg.addImg.length" :src="p" alt="">
                    <img class="logoImg1"  src="../../../assets/jinjian/idcard.png" alt="" @click.stop="uploadHeadImg('.hiddenInput4')">
                    <input  type="file" accept="image/*" @change="handleFile" class="hiddenInput4"/>
                     <br>
                     <span class="shuoM">为了尽快通过审核，请尽可能完善补充材料的上传，最多9张</span>
                   </span></div>
                    
                    
                    <!-- 结算类型信息 -->
                  <div class="storeTile jiesuan">连锁子商户结算信息</div>
                   <div class="items"><div class="titles">结算类型：</div><span class="btns">
                    <el-radio v-model="msg.settlementType" label="1">连锁商户总部信息</el-radio>
                   <br>
                    <el-radio v-model="msg.settlementType" label="2">连锁子商户账户</el-radio>
                   </span></div>
                  <!-- 灰色线 -->
                  <div class="gaeds"></div>
                 <!-- 根据上面的选择显示相应的内容 -->
                 <div v-show="msg.settlementType=='1'">
                   <div class="items"><div class="titles">结算类型：</div>
                   <span>企业</span>
                  </div>
                   <div class="items"><div class="titles">结算户名：</div>
                   <span>金桔联盟</span>
                  </div>
                   <div class="items"><div class="titles">结算银行：</div>
                   <span>华夏银行</span>
                  </div>
                   <div class="items"><div class="titles">结算卡号：</div>
                   <span>200 2222 0011 2222 451</span>
                  </div>
                  <!-- 下一步点击按钮 -->                    
                   <div class="xiugai" @click="nextGo">下一步</div>
               </div>
                <div v-show="msg.settlementType=='2'">
                   <div class="items"><div class="titles">结算类型：</div>
                   <span>
                       <el-radio v-model="msg.settlementName" label="1">个人</el-radio>
                  
                    <el-radio v-model="msg.settlementName" label="2">企业</el-radio></span>
                  </div>
                   <div class="items"><div class="titles">结算户名：</div>
                    <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.settlementStore" placeholder="请输入结算户名"></el-input></span>
                  </div>
                   <div class="items"><div class="titles">结算银行：</div>
                   <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.settlemenBank" placeholder="请输入结算银行"></el-input></span>
                  </div>
                   <div class="items"><div class="titles">结算卡号：</div>
                   <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.settlemenAccount" placeholder="请输入结算卡号"></el-input></span>
                  </div>
                  <!-- 下一步点击按钮 -->                    
                   <div class="xiugai" @click="nextGo">下一步</div>
               </div>
           </div>         
           </div>
        </el-col>
              <!-- 下面是商户展示部分 -->
              
                <el-col :span="11" v-show="isshow">
                    <div class="rightMenu">
                        <AddDetail />
                    </div>
                    </el-col>
                
            </el-row>
           
          
           
    </div>
</template>

<script>
import lines1 from "../../../assets/login/line.png";
import lines2 from "../../../assets/login/line2.png";
import lines3 from "../../../assets/login/line3.png";
import photos from "../../../assets/wukai.jpg";
import AddDetail from "./AddDetail.vue";
export default {
  name: "AddChain2",
  components: { AddDetail },
  data() {
    return {
      isshow: false,
      dialogImageUrl: "",
      dialogVisible: false,
      lines: lines1,
      photo: photos,
      isShow1: true,
      isShow2: false,
      isShow3: false,
      msg: {
        sonStore: "",
        storeName: "",
        pre: "",
        shi: "",
        qu: "",
        address: "",
        sonUsername: "",
        sonTel: "",
        sonPhoto: "",
        addImg: [],
        settlementType: "1",
        settlementName: "1",
        settlementStore: "",
        settlemenBank: "",
        settlemenAccount: ""
      }
    };
  },
  methods: {
    //   下一步按钮
    nextGo() {
      alert("你点击了下一步");
    },
    //导入
    daoru() {
      console.log("====================================");
      console.log("发送请求，显示导入内容");
      console.log("====================================");
      this.isshow = true;
    },
    //提交按钮
    submit() {
      console.log("====================================");
      console.log(this.msg);
      console.log("====================================");
    },
    // 打开图片上传
    uploadHeadImg: function(data) {
      this.$el.querySelector(data).click();
    },
    // 将头像显示
    handleFile: function(e) {
      let $target = e.target || e.srcElement;
      console.log("====================================");
      console.log($target.className);
      console.log("====================================");
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = data => {
        let res = data.target || data.srcElement;
        if ($target.className == "hiddenInput") {
          this.msg.zhizhaoImg = res.result;
        } else if ($target.className == "hiddenInput1") {
          var n = 0;
          if (this.msg.img.length >= 2) {
            this.msg.img.splice(0, 1);
            console.log(++n);
            // console.log(res.result);
          }
          this.msg.img.push(res.result);
        } else if ($target.className == "hiddenInput2") {
          this.msg.xieyiImg = res.result;
        } else if ($target.className == "hiddenInput3") {
          this.msg.logos = res.result;
        } else if ($target.className == "hiddenInput4") {
          var n = 0;
          if (this.msg.addImg.length >= 8) {
            this.msg.addImg.splice(0, 1);
            console.log(++n);
            // console.log(res.result);
          }
          this.msg.addImg.push(res.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.msgBox {
  width: 56.705%;
  // height: 857px;
  min-height: 270px;
  margin: 20px auto 200px;
  position: relative;
  padding: 0 3.12% 20px;
}
.leftMenu {
  background-color: #fff;
  padding-top: 20px;
}
.el-col {
  font-size: 18px;
  color: #999999;
  text-align: center;
  cursor: pointer;
  //   background-color: #fff;
}
.storeTile {
  font-size: 18px;
  color: #1c3672;
  margin: 0px;
}
.jiesuan {
  margin: 20px;
}
.selected {
  color: #1c3672;
}
.lines {
  width: 100%;
  height: 16px;
}
.showBoxs {
  width: 100%;

  font-size: 14px;
  color: #666666;
  padding: 1px;
  background-color: #fff;
  .items {
    margin-top: 10px;
    position: relative;
    text-align: left;
    span {
      color: #333333;
      margin-left: 29%;
    }
  }
  .daoStroe {
    display: inline-block;
    background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
    border-radius: 4px;
    font-size: 14px;
    color: #1c3672;
    height: 30px;
    line-height: 30px;
    width: 15.325%;
    text-align: center;
    position: absolute;
    right: 3%;
    top: -5px;
  }
  .titles {
    display: inline-block;
    position: absolute;
    right: 70.88%;
  }
  .photos {
    height: 140px;
    margin-right: 20px;
  }
}
.retas {
  font-size: 14px;
  color: #333333;
}
.el-input {
  margin-top: -10px;
}
.el-input__inner {
  margin-top: -10px;
}
.el-input__icon {
  display: none;
}
/*上传照片样式*/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.logoImg {
  width: 14.58%;
  height: 140px;
}
.logoImg1 {
  width: 22.99%;
  height: 80px;
}
.hiddenInput,
.hiddenInput1,
.hiddenInput2,
.hiddenInput3,
.hiddenInput4 {
  display: none;
}
.shuoM {
  font-size: 12px;
  color: #1c3672;
}
.xiugai {
  background-image: linear-gradient(-137deg, #142855 0%, #4553a4 100%);
  border-radius: 4px;
  width: 45.98%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  margin: 30px auto;
  cursor: pointer;
}
.dwons {
  font-size: 12px;
  color: #1c3672;
}
.iso {
  color: #f6a623;
}
.btnBox {
  text-align: center;
}
.backs,
.next {
  display: inline-block;
  margin-right: 20px;
}
.backs {
  border: 1px solid #1c3672;
  border-radius: 4px;
  width: 25%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #1c3672;
}
.submits {
  background-image: linear-gradient(-137deg, #142855 0%, #4553a4 100%);
  color: #ffffff;
}
/* s商户展示部分*/
.showBoxStore {
  background-color: #fff;
}
.gaeds {
  width: 92.34%;
  border: 1px solid #f0f0f0;
  height: 1px;
  margin: 10px;
}
/*新增的补充样式*/
.btns {
  display: inline-block;
}
.el-radio {
  margin-bottom: 10px;
}
.rightMenu {
  width: 95.5%;
  padding-bottom: 50px;
  background-color: #fff;
  display: inline-block;
  margin-bottom: 40px;
}
</style>