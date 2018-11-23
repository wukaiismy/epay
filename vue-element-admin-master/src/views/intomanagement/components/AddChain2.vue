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
                  <span><el-input  size="mini"  style="width:63.218%; height:40px;" v-model="msg.name" placeholder="子商户名称"></el-input></span>
               </div>
               <div class="items"><div class="titles">连锁商户名称：</div>
                   <span>
                     <template v-if="roles=='admin'">
                        <el-autocomplete v-model="storeName" size='small' style="width:50%; height:30px;"  :fetch-suggestions="querySearchAsync" placeholder="请输入连锁商户" @select="handleSelect">
                           <template slot-scope="{ item }">
                            <span class="addr">{{ item.value }}</span>
                          </template>

                        </el-autocomplete>
                       <!-- <el-input  size="mini"  style="width:45.785%; height:40px;" v-model="msg.storeName" placeholder="连锁商户名称"></el-input> -->
                     <span class="daoStroe" @click="daoru">导入</span>
                     </template>
                     <template v-else>
                     <div class="storeName">成都易付云</div> 
                     </template>
                     </span>
               </div>
               <div class="items"><div class="titles">公司地址：</div>
                 <span class="adresss">
                    <v-distpicker :placeholders="placeholders" @selected="onSelected"></v-distpicker>
                    
                 </span>
               </div>
               <div class="items"><div class="titles">详细地址：</div>
               <span><el-input  size="mini"  style="width:63.218%; height:40px;" v-model="msg.location" placeholder="请填写详细地址"></el-input></span>
               </div>
               <div class="items"><div class="titles">子商户负责人：</div>
                <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.operator_name" placeholder="请输入子商户负责人"></el-input></span>
               </div>
               <div class="items"><div class="titles">负责人电话：</div>
                <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.operator_mobile" placeholder="子商户负责人电话不能和总商户一样"></el-input></span>
               </div>
               <div class="items"><div class="titles">子商户客服电话：</div>
                <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.service_tel" placeholder="请输入客服电话"></el-input></span>
               </div>
               <div class="items"><div class="titles">营业执照编号：</div>
                  <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.license_no" placeholder="请与营业执照一致"></el-input></span>
               </div>
               <div class="items"><div class="titles">营业执照：</div>
                   <span>
                     <img class="logoImg1" v-show="license_image.length" :src="license_image" alt="">
                     <img class="logoImg1"  src="../../../assets/jinjian/business.png" alt="" @click.stop="uploadHeadImg('.hiddenInput')">
                     <input  type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
                     <br>
                     <span class="shuoM">请上传营业执照或扫描件（图片不得＞1mb,格式为png,jpg,jpge)</span>
                    </span>
               </div>      
               <div class="items"><div class="titles">补充材料：</div>
               <span class="showImg">
                     <img class="logoImg1"  v-for="(p, index) in supplement" :key="index" @click="deleted(index)" v-show="supplement.length" :src="p" alt="">
                    <img class="logoImg1"  src="../../../assets/jinjian/idcard.png" alt="" @click.stop="uploadHeadImg('.hiddenInput4')">
                    <input  type="file" accept="image/*" @change="handleFile" class="hiddenInput4"/>
                     <br>
                     <div class="shuoM">为了尽快通过审核，请尽可能完善补充材料的上传，最多9张</div>
                   </span></div>
                    
                    
                    <!-- 结算类型信息 -->
                  <div class="storeTile jiesuan">连锁子商户结算信息</div>
                      <div class="items"><div class="titles">违约赔付比例：</div>
                        <span><el-input  size="small"  style="width:20.22%; height:40px;" v-model="msg.default_ratio" ></el-input> %</span>
                      </div>
                       <div class="items"><div class="titles">结算方式：</div>
                        <span>
                          <select v-model="msg.settlement_method" class="selectBox"  @click="ss()" >
                   <option v-for="(a,index) in options" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
               </select> 
                        </span>
                      </div>
                      <div class="items"><div class="titles">结算类型：</div><span class="btns">
                        <el-radio @change="changeSettlementType(1)" v-model="settlementType" label="1">连锁商户总部信息</el-radio>
                      <br>
                        <el-radio @change="changeSettlementType(2)" v-model="settlementType" label="2">连锁子商户账户</el-radio>
                      </span></div>
                      <!-- 灰色线 -->
                      <div class="gaeds"></div>
                    <!-- 根据上面的选择显示相应的内容 -->
                    <div v-if="settlementType=='1'">
                      <div class="items"><div class="titles">结算类型：</div>
                      <span>
                          <template>
                            <i class="clear_type" v-if="msg.clear_type=='1'" >企业</i>
                            <i class="clear_type" v-if="msg.clear_type=='2'">个人</i>
                        </template>
                      
                      </span>
                      </div>
                      <div class="items"><div class="titles">结算户名：</div>
                      <span>{{msg.bankcard_name}}</span>
                      </div>
                      <div class="items"><div class="titles">结算银行：</div>
                      <span>{{msg.set_bank_name}}</span>
                      </div>
                      <div class="items"><div class="titles">结算卡号：</div>
                      <span>{{msg.bank_credit}}</span>
                      </div>
                      <!-- 下一步点击按钮 -->                    
                      <div class="xiugai" @click="nextGo">提交</div>
                  </div>
                  <div v-show="settlementType=='2'">
                      <div class="items"><div class="titles">结算类型：</div>
                      <span>                       
                        <el-radio v-model="msg.clear_type" label="1">企业</el-radio>
                        <el-radio v-model="msg.clear_type" label="2">个人</el-radio></span>
                      </div>
                      <div class="items"><div class="titles">结算户名：</div>
                        <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.bankcard_name" placeholder="请输入结算户名"></el-input></span>
                      </div>
                      <div class="items"><div class="titles">结算银行：</div>
                        <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.set_bank_name" placeholder="请输入结算银行"></el-input></span>
                      </div>
                      <div class="items"><div class="titles">结算卡号：</div>
                       <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.bank_credit" placeholder="请输入结算卡号"></el-input></span>
                      </div>
                      <div class="items" v-show="msg.clear_type=='2'"><div class="titles">绑定手机：</div>
                        <span><el-input  size="small"  style="width:63.218%; height:40px;" v-model="msg.set_bank_mobile" placeholder="请输入银行卡绑定手机号"></el-input></span>
                      </div>
                  <!-- 下一步点击按钮 -->                    
                   <div class="xiugai" @click="nextGo">提交</div>
               </div>
           </div>         
           </div>
        </el-col>
              <!-- 下面是商户展示部分 -->    
        <el-col :span="11" v-if="isshow">
            <div class="rightMenu">
                  <AddDetail :detail_msg='detail_msg' />
            </div>
         </el-col>              
       </el-row>          
    </div>
</template>

<script>
import lines1 from "../../../assets/login/line.png";
import lines2 from "../../../assets/login/line2.png";
import lines3 from "../../../assets/login/line3.png";
import AddDetail from "./AddDetail.vue";
import VDistpicker from "v-distpicker";

import { mapGetters } from "vuex";
import { addChannel, storeDetail, channelDetail } from "@/api/intomanagement";
export default {
  name: "AddChain2",
  components: { AddDetail, VDistpicker },
  data() {
    return {
      isshow: false,
      dialogImageUrl: "",
      dialogVisible: false,
      lines: lines1,
      isShow1: true,
      license_image: "",
      supplement: [],
      restaurants: [],
      timeout: null,
      pre: "",
      shi: "",
      qu: "",
      storeName: "",
      settlementType: "2",

      msg: {
        settlement_method: "",
        default_ratio: "",
        bank: "",
        name: "",
        license_no: "",
        date: [],
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
        operator_type: "连锁子商户",
        business_type: "",
        operator_agreement: "",
        merchant_logo: "",
        supplement: [],
        rate: "",
        clear_type: "1",
        bankcard_name: "",
        set_bank_name: "",
        bank_credit: "",
        head_chain_id: "",
        set_bank_mobile: ""
      },
      detail_msg: {},
      store_id: "",
      placeholders: {
        province: "------ 省 ------",
        city: "------ 市 ------",
        area: "------ 区 ------"
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
  computed: {
    ...mapGetters(["roles"])
  },
  mounted() {
    this.loadAll(this.storeName);
  },
  methods: {
    /////////////////////////
    // 导入时加载的数据
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      console.log(queryString);
      this.loadAll(queryString);
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        cb(results);
      }, 2000 * Math.random());
    },
    createStateFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      this.store_id = item.id;
    },
    loadAll(val) {
      var Url = "/backend/api/v1/incoming/allchain/";
      storeDetail(Url, val).then(res => {
        console.log(res);

        var data = [];
        for (let i = 0; i < res.data.length; i++) {
          data.push({ value: res.data[i].name, id: res.data[i].id });
        }
        this.restaurants = data;
        console.log("++++++++++");
        console.log(this.restaurants);
        console.log("++++++++++");
      });
    },
    /////////////////////////
    //省市区选择拼接
    onSelected(data) {
      console.log(data);
      console.log(data.province.value + data.city.value + data.area.value);
      this.msg.city = data.province.value + data.city.value + data.area.value;
    },
    //   提交按钮
    nextGo() {
      //将连锁子商户的上级信息写入到对象里
      this.msg.date.push(this.detail_msg.merchantfile.business_begin);
      this.msg.date.push(this.detail_msg.merchantfile.business_end);
      this.msg.business_scope = this.detail_msg.merchantfile.business_scope;
      // this.msg.license_image = this.detail_msg.merchantfile.license_image;
      this.msg.legal_name = this.detail_msg.merchantfile.legal_name;
      this.msg.legal_id_card = this.detail_msg.merchantfile.legal_id_card;
      this.msg.legal_id_card_front = this.detail_msg.merchantfile.legal_id_card_front;
      this.msg.legal_id_card_backend = this.detail_msg.merchantfile.legal_id_card_backend;
      this.msg.operator_email = this.detail_msg.merchantfile.operator_email;
      this.msg.business_type = this.detail_msg.merchantfile.business_type;
      this.msg.operator_agreement = this.detail_msg.merchantfile.operator_agreement;

      this.msg.merchant_logo = this.detail_msg.merchantfile.merchant_logo;
      this.msg.rate = this.detail_msg.merchantfile.rate;
      this.msg.head_chain_id = this.store_id;
      console.log("你点击了提交提交功能");
      let addURL = "incoming/chainchildup/";
      console.log(this.msg);
      addChannel(addURL, this.msg).then(res => {
        console.log(res);
        // 成功后返回渠道商主页面组件
        this.$emit("addChain", "Table");
      });
    },
    //导入
    daoru() {
      console.log(this.roles);
      console.log("发送请求，导入连锁商户信息，显示导入内容");
      var Url = "incoming/merchantid/";
      console.log(this.store_id);
      channelDetail(Url, this.store_id).then(res => {
        console.log(res);
        this.detail_msg = res.data[0];
        this.isshow = true;
      });
    },
    //  结算类型选择
    changeSettlementType(index) {
      if (index == "1") {
        console.log(index);
        if (!this.detail_msg.merchantfile.clear_type) {
          this.msg.clear_type = "1";
          this.msg.bankcard_name = "";
          this.msg.set_bank_name = "";
          this.msg.bank_credit = "";
        } else {
          this.msg.clear_type = this.detail_msg.merchantfile.clear_type;
          this.msg.bankcard_name = this.detail_msg.merchantfile.bankcard_name;
          this.msg.set_bank_name = this.detail_msg.merchantfile.set_bank_name;
          this.msg.bank_credit = this.detail_msg.merchantfile.bank_credit;
        }
      } else if (index == "2") {
        console.log(index);
        this.msg.clear_type = "1";
        this.msg.bankcard_name = "";
        this.msg.set_bank_name = "";
        this.msg.bank_credit = "";
      }
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
      this.supplement.splice(index, 1);
      this.msg.supplement.splice(index, 1);
    },
    ss() {
      this.options[0].disabled = "disabled";
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
  padding: 0 5px 20px;
}
.leftMenu {
  background-color: #fff;
  padding-top: 20px;
}
.el-col {
  font-size: 18px;
  color: #999999;
  text-align: center;
  // cursor: pointer;
  //   background-color: #fff;
}
.storeTile {
  font-size: 18px;
  color: #1c3672;
  margin: 0px;
  margin-bottom: 20px;
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

.logoImg1 {
  width: 22.99%;
  height: 80px;
  margin-right: 20px;
}
.showImg {
  display: inline-block;
}
.hiddenInput,
.hiddenInput4 {
  display: none;
}
.shuoM {
  font-size: 12px;
  color: #1c3672;
  margin-top: 10px;
  display: inline-block;
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
.storeName {
  display: inline-block;
  font-size: 16px;
  margin-bottom: 10px;
}
.clear_type {
  font-style: normal;
}
.items .adresss {
  display: inline-block;
  margin-top: 0px !important;
  margin-bottom: 10px;
}
.selectBox {
  width: 63.218%;
  height: 35px;
  border: 1px solid #dcdfe6;
  margin: -10px 0 10px 0;
}
</style>
<style >
.distpicker-address-wrapper {
}
.distpicker-address-wrapper select {
  font-size: 0.81rem;
  height: 32px;
  padding: 0rem 0rem;
  width: 120px;
  /* margin-top: 10px; */
}
</style>