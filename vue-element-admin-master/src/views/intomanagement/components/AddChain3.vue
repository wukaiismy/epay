<template>
    <div class="msgBox">
        <!-- 返回按钮 -->
        <div class="backJump" @click="backJump">
            <Back /> <span>返回上一页</span>
        </div>
       <!-- 信息选择查看部分 -->   
           <el-row>
                <el-col :span="8"><div class="grid-content" @click="chosed(1)" :class="isShow1?'selected':''">基本信息</div></el-col>
                <el-col :span="8"><div class="grid-content " @click="chosed(2)" :class="isShow2?'selected':''">运营信息</div></el-col>
                <el-col :span="8"><div class="grid-content "  @click="chosed(3)" :class="isShow3?'selected':''">结算信息</div></el-col>
            </el-row>
            <img class="lines" :src="lines" alt="">
           <!-- 下面是展示部分 -->
           <div class="showBoxs" v-show="isShow1">
               <!-- <div class="items"><div class="titles">商户所属银行：</div>
                  <span><el-input  size="small"  style="width:19.375%; height:40px;" v-model="msg.bank" placeholder="请输入银行"></el-input></span>
               </div> -->
               <div class="items"><div class="titles">商户名称：</div>
                   <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.name" placeholder="请与营业执照一致，最长100字符"></el-input></span>
               </div>
               <div class="items"><div class="titles">营业执照编号：</div>
                  <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.license_no" placeholder="请与营业执照一致"></el-input></span>
               </div>
               <div class="items"><div class="titles">营业期限：</div>
                  <span> <el-date-picker v-model="msg.date" type="daterange" value-format="yyyy-MM-dd" size='small' style="width:35%; height:33px;" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker></span>
               </div>
               <div class="items"><div class="titles">公司地址：</div>
                 <span class="adresss">
                    <v-distpicker :placeholders="placeholders" @selected="onSelected"></v-distpicker>
                    
                 </span>
               </div>
               <div class="items"><div class="titles">详细地址：</div>
               <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.location" placeholder="请填写详细地址"></el-input></span>
               </div>
               <div class="items"><div class="titles">营业范围：</div>
               <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.business_scope" placeholder="请填写营业范围"></el-input></span>
               </div>
               <div class="items"><div class="titles">营业执照：</div>
                   <span>
                     <img class="logoImg" v-show="license_image.length" :src="license_image" alt="">
                     <img class="logoImg"  src="../../../assets/jinjian/business.png" alt="" @click.stop="uploadHeadImg('.hiddenInput')">
                     <input  type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
                     <br>
                     <span class="shuoM">请上传营业执照或扫描件（图片不得＞1mb,格式为png,jpg,jpge)</span>
                    </span>
               </div>               
               <div class="items"><div class="titles">法人姓名：</div>
               <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.legal_name" placeholder="请输入法人姓名"></el-input></span>
               </div>
               <div class="items"><div class="titles">法人身份证号码：</div>
               <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.legal_id_card" placeholder="请输入法人身份证"></el-input></span>
               </div>
               <div class="items"><div class="titles">法人身份证扫描件：</div>
                <span>
                     <img class="logoImg1" @click="deleted(index)"  v-for="(p, index) in legal_id_card_img" :key="index" v-show="legal_id_card_img.length" :src="p" alt="">
                    <img class="logoImg1"  src="../../../assets/jinjian/idcard.png" alt="" @click.stop="uploadHeadImg('.hiddenInput1')">
                    <input  type="file" accept="image/*" @change="handleFile" class="hiddenInput1"/>
                     <br>
                     <span class="shuoM">请上传法人身份证照片（图片不得＞1mb,格式为png,jpg,jpge)</span>
                   </span></div>
                   <!-- 下一步点击按钮 -->                    
                   <div class="xiugai" @click="nextGo">下一步</div>
           </div>

           <div class="showBoxs" v-show="isShow2">
               <div class="items"><div class="titles">运营者名字：</div>
                 <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.operator_name" placeholder="请输入运营者姓名"></el-input></span>
               </div>
               <div class="items"><div class="titles">联系电话：</div>
                  <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.operator_mobile" placeholder="请输入运营者电话"></el-input></span>
               </div>
               <div class="items"><div class="titles">电子邮箱：</div>
                  <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.operator_email" placeholder="请输入运营者电子邮箱"></el-input></span>
                </div>
               <div class="items"><div class="titles">客服电话：</div>
                 <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.service_tel" placeholder="请输入客服电话"></el-input></span>
               </div>
               <div class="items"><div class="titles">商户类型：</div>
                  <span><el-input  size="small"  style="width:34.375%; height:40px;" disabled v-model="msg.operator_type" placeholder="请输入商户类型 如：企业 连锁店"></el-input></span>
               </div>
               <div class="items"><div class="titles">经营范围：</div>
                  <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.business_type" placeholder="请输入经营范围"></el-input></span>
               </div>
               <div class="items"><div class="titles">运营协议：</div>
                   <span>
                     <img class="logoImg" v-show="operator_agreement.length" :src="operator_agreement" alt="">
                     <img class="logoImg"  src="../../../assets/jinjian/business.png" alt="" @click.stop="uploadHeadImg('.hiddenInput2')">
                     <input  type="file" accept="image/*" @change="handleFile" class="hiddenInput2"/>
                     <br>
                     <span class="shuoM dwons">点击下载《信条平台渠道商营业协议》<i class="iso">打印后签字盖章，拍照上传</i></span>
                    </span>
               </div>    
                <div class="items"><div class="titles">企业logo：</div>
                   <span>
                     <img class="logoImg" v-show="channel_logo.length" :src="channel_logo" alt="">
                     <img class="logoImg"  src="../../../assets/jinjian/business.png" alt="" @click.stop="uploadHeadImg('.hiddenInput3')">
                     <input  type="file" accept="image/*" @change="handleFile" class="hiddenInput3"/>
                     <br>
                     <span class="shuoM">上传渠道商logo，不得＞500kb,尺寸为140x140</span>
                    </span>
               </div>                   
               <div class="items"><div class="titles">补充材料：</div>
               <span class="showImg">
                     <img class="logoImg1 l1"  @click="deleted1(index)"  v-for="(p, index) in supplement" :key="index" v-show="supplement.length" :src="p" alt="">
                    <img class="logoImg1 l1"  src="../../../assets/jinjian/idcard.png" alt="" @click.stop="uploadHeadImg('.hiddenInput4')">
                    <input  type="file" accept="image/*" @change="handleFile" class="hiddenInput4"/>
                     <br>
                     <div class="shuoM">为了尽快通过审核，请尽可能完善补充材料的上传，最多9张</div>
                   </span></div>
                     <!-- 下一步点击按钮 --> 
                     <div class="btnBox">
                    <div class="backs" @click="backGo">上一步</div>                     
                   <div class="xiugai next " @click="nextGo1">下一步</div>
                   </div>
           </div>
            <div class="showBoxs" v-show="isShow3">
               <div class="items"><div class="titles">通道费率：</div>
                  <span><el-input  size="small"  style="width:8.34%; height:40px;" v-model="msg.rate" placeholder=""></el-input><i style="margin-left:10px;">‰</i></span>
               </div> 
               <div class="items"><div class="titles">违约赔付比例：</div>
                  <span><el-input  size="small"  style="width:8.34%; height:35px;" v-model="msg.default_ratio" placeholder=""></el-input><i style="margin-left:10px;">%</i></span>
               </div>
               <div class="items"><div class="titles">结算类型：</div><span  class="ssa">
                    <el-radio v-model="msg.clear_type" label="1">企业</el-radio>
                    <el-radio v-model="msg.clear_type" label="2">个人</el-radio>
                   </span></div>
               <div class="items"><div class="titles">结算方式：</div>
                 <span>
                    <select v-model="msg.settlement_method" class="selectBox"  @click="ss()" >
                   <option v-for="(a,index) in options" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
               </select>  
                 </span>
               </div> 
               <div class="items"><div class="titles">结算户名：</div>
                 <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.bankcard_name" placeholder="请输入结算户名"></el-input></span>
               </div>
               <div class="items"><div class="titles">结算银行：</div>
                  <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.set_bank_name" placeholder="请输入结算银行"></el-input></span>
               </div>
               <div class="items"><div class="titles">结算账户：</div>
                     <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.bank_credit" placeholder="请输入结算账户"></el-input></span>
                </div>
                <div class="items" v-show="msg.clear_type=='2'"><div class="titles">绑定手机：</div>
                 <span><el-input  size="small"  style="width:34.375%; height:40px;" v-model="msg.set_bank_mobile" placeholder="请输入银行卡绑定手机号"></el-input></span>
               </div>
                <!-- 下一步点击按钮 --> 
                     <div class="btnBox">
                    <div class="backs" @click="nextGo">上一步</div>                     
                   <div class="xiugai next submits" @click="submit">提交</div>
                   </div>              
           </div>
           
    </div>
</template>

<script>
import { addChannel } from "@/api/intomanagement";
import lines1 from "../../../assets/login/line.png";
import lines2 from "../../../assets/login/line2.png";
import lines3 from "../../../assets/login/line3.png";
import VDistpicker from "v-distpicker";

import Back from "@/components/Back";
export default {
  name: "AddChain3",
  components: { Back, VDistpicker },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      lines: lines1,
      isShow1: true,
      isShow2: false,
      isShow3: false,
      placeholders: {
        province: "------- 省 --------",
        city: "--- 市 ---",
        area: "--- 区 ---"
      },
      license_image: "",
      legal_id_card_img: [],
      operator_agreement: "",
      channel_logo: "",
      supplement: [],
      msg: {
        settlement_method: "",
        default_ratio: "",
        bank: "",
        name: "",
        license_no: "",
        date: "",
        city: "",
        location: "",
        business_scope: "",
        license_image: "",
        legal_name: "",
        legal_id_card: "",
        legal_id_card_front: "",
        legal_id_card_backend: "",
        operator_name: "",
        operator_mobile: "",
        operator_email: "",
        service_tel: "",
        operator_type: "直营商户",
        business_type: "",
        operator_agreement: "",
        merchant_logo: "",
        supplement: [],
        rate: "",
        clear_type: "1",
        bankcard_name: "",
        set_bank_name: "",
        bank_credit: "",
        set_bank_mobile: ""
      },
      options: [
        {
          value: "",
          label: "选择结算方式",
          disabled: ""
        },
        {
          value: "0",
          label: "手动提现"
        },
        {
          value: "1",
          label: "日结"
        }
      ]
    };
  },
  methods: {
    //返回进件主页面
    backJump() {
      this.$emit("addChain", "Table");
    },
    //省市区选择拼接
    onSelected(data) {
      console.log(data);
      console.log(data.province.value + data.city.value + data.area.value);
      this.msg.city = data.province.value + data.city.value + data.area.value;
    },
    //选择查看的信息
    chosed(index) {
      if (index == 1) {
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow2 = false;
        this.lines = lines1;
      } else if (index == 2) {
        this.isShow1 = false;
        this.isShow2 = true;
        this.isShow3 = false;
        this.lines = lines2;
      } else if (index == 3) {
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = true;
        this.lines = lines3;
      }
    },
    // 上一步
    backGo() {
      this.isShow1 = true;
      this.isShow2 = false;
      this.isShow2 = false;
      this.lines = lines1;
    },
    // 下一步按钮
    nextGo() {
      console.log("下一步");
      this.isShow1 = false;
      this.isShow2 = true;
      this.isShow3 = false;
      this.lines = lines2;
    },
    // 再下一步按钮
    nextGo1() {
      console.log("下一步");
      this.isShow1 = false;
      this.isShow2 = false;
      this.isShow3 = true;
      this.lines = lines3;
    },
    //提交按钮
    submit() {
      console.log(this.msg);
      console.log("直营商户进件添加");
      var addURL = "/backend/api/v1/incoming/merchantup/";
      addChannel(addURL, this.msg).then(res => {
        console.log(res);
        // 成功后返回渠道商主页面组件
        this.$emit("addChain", "Table");
      });
    },
    // 打开图片上传
    uploadHeadImg: function(data) {
      this.$el.querySelector(data).click();
    },
    // 将头像显示
    handleFile: function(e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = data => {
        let res = data.target || data.srcElement;
        if ($target.className == "hiddenInput") {
          this.license_image = res.result;
          this.msg.license_image = res.result.split(",")[1];
        } else if ($target.className == "hiddenInput1") {
          var n = 0;
          if (this.legal_id_card_img.length >= 2) {
            this.legal_id_card_img.splice(0, 1);
            console.log(++n);
          }
          this.legal_id_card_img.push(res.result);
          // 将图片保存在msg数组中
          if (this.legal_id_card_img.length == 1) {
            this.msg.legal_id_card_front = res.result.split(",")[1];
          } else if (this.legal_id_card_img.length == 2) {
            this.msg.legal_id_card_backend = res.result.split(",")[1];
          }
        } else if ($target.className == "hiddenInput2") {
          this.msg.operator_agreement = res.result.split(",")[1];
          this.operator_agreement = res.result;
        } else if ($target.className == "hiddenInput3") {
          this.channel_logo = res.result;
          this.msg.merchant_logo = res.result.split(",")[1];
        } else if ($target.className == "hiddenInput4") {
          var n = 0;
          if (this.supplement.length >= 8) {
            this.supplement.splice(0, 1);
            this.msg.supplement.splice(0, 1);
            console.log(++n);
            // console.log(res.result);
          }
          this.supplement.push(res.result);
          var imgUrl = res.result.split(",")[1];
          this.msg.supplement.push(imgUrl);
        }
      };
      reader.readAsDataURL(file);
    },
    //删除相应的图片
    deleted(index) {
      console.log(index);
      this.legal_id_card_img.splice(index, 1);
    },
    deleted1(index) {
      console.log(index);
      this.msg.supplement.splice(index, 1);
      this.supplement.splice(index, 1);
    },
    ss() {
      this.options[0].disabled = "disabled";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.msgBox {
  width: 56%;
  // height: 857px;
  min-height: 270px;
  background-color: #fff;
  margin: 20px auto 200px;
  position: relative;
  padding: 0 3.12% 20px;
}
.backJump {
  position: absolute;
  right: -20%;
  height: 40px;
  width: 120px;
  text-align: center;
  line-height: 40px;
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
  border-radius: 4px;
  font-size: 16px;
  color: #1c3672;
  cursor: pointer;
}
.el-col {
  font-size: 18px;
  color: #999999;
  margin: 23px auto;
  text-align: center;
  cursor: pointer;
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
  margin: 30px auto;
  font-size: 14px;
  color: #666666;
  padding: 1px;
  .items {
    margin-top: 10px;
    position: relative;
    span {
      color: #333333;
      margin-left: 38%;
      margin-top: 10px;
    }
  }
  .titles {
    display: inline-block;
    position: absolute;
    right: 61.9%;
  }
  // .photos {
  //   height: 140px;
  //   margin-right: 20px;
  // }
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
  width: 16.67%;
  height: 90px;
  margin-right: 10px;
}
.showImg {
  display: inline-block;
  width: 60%;
}
.hiddenInput,
.hiddenInput1,
.hiddenInput2,
.hiddenInput3,
.hiddenInput4 {
  display: none;
}
.l1 {
  width: 30%;
  margin-bottom: 10px;
}
.shuoM {
  font-size: 12px;
  color: #1c3672;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
.xiugai {
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
  border-radius: 4px;
  width: 25%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #1c3672;
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
.ssa {
  display: inline-block;
  height: 20px;
  position: relative;
  top: -10px;
}
.items .adresss {
  display: inline-block;
  margin-top: 0px !important;
  margin-bottom: 10px;
}
.selectBox {
  width: 34.375%;
  height: 35px;
  border: 1px solid #dcdfe6;
  margin: -10px 0 10px 0;
}
</style>
