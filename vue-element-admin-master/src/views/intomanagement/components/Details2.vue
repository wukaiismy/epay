<template>
    <div>
       <div class="clear">
            <div class="btnpub" :class="isShow=='1'?'tow':''" @click="mesHandle(1)">子商户信息</div>
            <div class="btnpub" :class="isShow=='2'?'tow':''" @click="mesHandle(2)">连锁商户信息</div>
            <div class="btnpub" :class="isShow=='3'?'tow':''" @click="mesHandle(3)">商户配置</div>
       </div>

        <!-- 子商户信息展示部分 -->
       <div v-show="isShow=='1'">
       <div class="basicMsgTitle">基本信息</div>
       <div class="boxMsg bm">
           <div class="mags">子商户编号：{{detailMsg[0].id}}</div>
           <div class="mags">子商户名称：{{detailMsg[0].name}}</div>         
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">运营信息</div>
       <div class="boxMsg">
           <div class="mags">联系人：{{detailMsg[0].merchantfile.operator_name}}</div>
           <div class="mags">联系电话：{{detailMsg[0].merchantfile.operator_mobile}}</div>
           <div class="mags">客服电话：{{detailMsg[0].merchantfile.service_tel}}</div>
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">商户信息</div>
       <div class="boxMsg">
           <div class="mags">省份城市：{{detailMsg[0].merchantfile.city}}</div>
           <div class="mags">详细地址：{{detailMsg[0].location}}</div>         
           <div class="mags">补充材料： <img class="logoImg"  v-for="(item, index) in detailMsg[0].merchantfile.supplement.split(',')" :key="index" :src="'http://192.168.1.28:8001/media/'+item" alt=""></div>
        </div>
        <div class="gard1"><Gard /></div>
         <div class="basicMsgTitle bs">结算信息</div>
       <div class="boxMsg">
            <div class="mags">结算单位：{{detailMsg[0].name}}</div>
            <div class="mags">结算类型：
                <template>
                  <span v-if="detailMsg[0].merchantfile.clear_type=='1'">个人</span>
                  <span v-if="detailMsg[0].merchantfile.clear_type=='2'">企业</span>            
                </template>
            </div>
            <div class="mags">结算户名：{{detailMsg[0].merchantfile.bankcard_name}}</div>
            <div class="mags">结算银行：{{detailMsg[0].merchantfile.set_bank_name}}</div>
            <div class="mags">结算账号：{{detailMsg[0].merchantfile.bank_credit}}</div>
        </div>
        <div class="gard1"><Gard /></div>

        <!-- 修改按钮 -->
        <div class="xiugai" @click="xiugai">修改</div>
        <!-- 操作记录 -->
        <div class="doRecorde">
           <div class="doTitle">操作记录</div>
           <div class="doDetail" v-for="(m, index) in mataMsg" :key="index">{{m}}</div>
        </div>
        </div>
        <!-- 子商户信息结束 -->


       <!-- 商户信息展示部分 -->
       <div v-show="isShow=='2'">
       <div class="basicMsgTitle">基本信息</div>
       <div class="boxMsg bm">
           <div class="mags">连锁商户编号：{{detailMsg[1].id}}</div>
           <div class="mags">连锁商户名称：{{detailMsg[1].name}}</div>
           <div class="mags">所属渠道商编号：<span v-if="detailMsg[1].channel" >{{detailMsg[1].channel.id}}</span></div>
           <div class="mags">所属渠道商名称：<span v-if="detailMsg[1].channel" >{{detailMsg[1].channel.name}}</span></div>
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">运营信息</div>
       <div class="boxMsg">
           <div class="mags">联系人：{{detailMsg[1].merchantfile.operator_name}}</div>
           <div class="mags">联系电话：{{detailMsg[1].merchantfile.operator_mobile}}</div>
           <div class="mags">电子邮箱：{{detailMsg[1].merchantfile.operator_email}}</div>
           <div class="mags">经营类目：{{detailMsg[1].merchantfile.operator_type}}</div>
           <div class="mags">客服电话：{{detailMsg[1].merchantfile.service_tel}}</div>
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">商户信息</div>
       <div class="boxMsg">
           <div class="mags">商户名称：{{detailMsg[1].name}}</div>
           <div class="mags">省份城市：{{detailMsg[1].merchantfile.city}}</div>
           <div class="mags">详细地址：{{detailMsg[1].location}}</div>
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">法人信息</div>
       <div class="boxMsg">
          <div class="mags">法人姓名：{{detailMsg[1].merchantfile.legal_name}}</div>
           <div class="mags">身份证号：{{detailMsg[1].merchantfile.legal_id_card}}</div>
           <div class="mags">身份证照片： 
             <img class="logoImg" :src="'/backend/media/'+detailMsg[1].merchantfile.legal_id_card_backend" alt=""> 
              <img class="logoImg" :src="'/backend/media/'+detailMsg[1].merchantfile.legal_id_card_front" alt=""></div>  
              
        </div>
        <div class="gard1"><Gard /></div>
         <div class="basicMsgTitle bs">营业执照信息</div>
       <div class="boxMsg">
          <div class="mags">营业执照编号：{{detailMsg[1].merchantfile.license_no}}</div>
           <div class="mags">营业期限：{{detailMsg[1].merchantfile.business_begin}}~{{detailMsg[1].merchantfile.business_end}}</div>
           <div class="mags">营业范围：{{detailMsg[1].merchantfile.business_scope}}</div>           
           <div class="mags">营业执照：<img class="logoImg" :src="'/backend/media/'+detailMsg[1].merchantfile.license_image"  alt=""> </div> 
           <div class="mags">商户Logo：<img class="logoImg" :src="'/backend/media/'+detailMsg[1].merchant_logo" > </div>               
        </div>
        <div class="gard1"><Gard /></div>
         <div class="basicMsgTitle bs">结算信息</div>
       <div class="boxMsg">
           <div class="mags">结算类型：
                <template>
                  <span v-if="detailMsg[1].merchantfile.clear_type=='1'">企业</span>
                  <span v-if="detailMsg[1].merchantfile.clear_type=='2'">个人</span>            
                </template>
                </div>
            <div class="mags">结算户名：{{detailMsg[1].merchantfile.bankcard_name}}</div>
            <div class="mags">结算银行：{{detailMsg[1].merchantfile.set_bank_name}}</div>
            <div class="mags">结算账号：{{detailMsg[1].merchantfile.bank_credit}}</div>
        </div>
        
        </div>
        <!-- 商户信息结束 -->
        <!-- 子商户配置开始 -->
        <div v-show="isShow=='3'">
            <div class="retes">
                <span>商户渠道类型：</span> <el-input
                :disabled='disabled'
               size='small '
                        v-model="detailMsg[0].mechant_type"
                       class="retas" style="width:220px; height:20px;">
                    </el-input><span class="changeReta" @click="changeReta">修改</span>
            </div>
            <div class="tishi" >提示：渠道商商户不可修改</div>
            <!-- <div class="xieyi">所属渠道编号：125465855685</div> -->
            <!-- <div class="xieyi xy">商户所属渠道：平台内部用户</div> -->
            <div class="xieyi xy">通道费率：{{detailMsg[0].rate}} ‰</div>
            <div class="xieyi xy">运营协议：<img class="xieyiImg" :src="'/backend/media/'+detailMsg[1].merchantfile.operator_agreement"  alt="" srcset=""><span class="s3">《信条担保交易-运营协议》电子协议</span></div>
            
         <div class="gard1"><Gard /></div>
            <!-- 下面的选择按钮 -->
            <div class="allChose">
                <el-button v-waves class="searchs" type="success"  @click="jihuosJump">激活商户</el-button>
                <el-button v-waves class="searchs" type="warning"  @click="guanbiJump">关闭商户</el-button>
               
            </div>         
        </div>
        <!-- 子商户配置结束 -->
    </div>
</template>

<script>
import Gard from "./Gard.vue";
import waves from "@/directive/waves"; // 水波纹指令
import uRLS from "../../../assets/wukai.jpg";
import { showReview, channelVolumeActivation } from "@/api/intomanagement";

export default {
  name: "Details2",
  props: ["detailMsg"],
  directives: {
    waves
  },
  components: {
    Gard
  },
  data() {
    return {
      isShow: 1,
      disabled: true,
      uRLS: uRLS,
      qudaoStore: "金桔联盟",
      qudaoType: "平台直营商户",
      msg: {},
      mataMsg: [
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn",
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn",
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn",
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn",
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn"
      ]
    };
  },
  watch: {
    detailMsg: {
      deep: true,
      handler(val) {
        this.showView(val);
      }
    }
  },
  mounted() {
    this.showView();
  },
  methods: {
    // 获取操作记录
    showView(val) {
      console.log("获取操作记录");
      var imgURLs = "/backend/api/v1/incoming/showreview/";
      // var datas = { ids: this.detailMsg.id + ",0" };
      showReview(imgURLs).then(res => {
        console.log(res);
        // this.message(res.data.msg, res.data.code);
      });
    },
    blur() {
      console.log(11111);
    },
    //点击获取渠道信息
    mesHandle(index) {
      if (index == 1) {
        console.log("点击了子商户信息");
        this.isShow = 1;
      } else if (index == 2) {
        console.log("点击了商户信息");

        this.isShow = 2;
      } else if (index == 3) {
        console.log("点击了子商户配置");

        this.isShow = 3;
      }
    },
    // 修改按钮
    xiugai() {
      console.log("修改信息");
    },
    //修改费率
    changeReta() {
      this.disabled = false;
    },
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
    // 激活
    jihuosJump() {
      console.log("确定激活？");
      var channeljhURL = "/backend/api/v1/incoming/merchantact/";
      var datas = { ids: this.detailMsg.merchantfile.id + ",0" };
      channelVolumeActivation(channeljhURL, datas).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
      });
    },
    //关闭
    guanbiJump() {
      alert("您没有权限关闭");
    }
  }
};
</script>

<style scoped>
.btnpub {
  width: 33.333333333233%;
  height: 50px;
  font-size: 16px;
  background: #f0f0f0;
  display: inline-block;
  color: #666666;
  box-sizing: border-box;
  float: left;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
.clear {
  zoom: 1;
}
.clear:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.tow {
  color: #1c3672;
  background-image: linear-gradient(-180deg, #eaf1fb 0%, #d0ddf5 100%);
}
.basicMsgTitle {
  font-size: 16px;
  color: #333333;
  position: relative;
  top: 20px;
  left: 4%;
}
.bs {
  top: 0px;
}
.boxMsg {
  margin: 20px 0 0 4%;
}
.bm {
  margin-top: 40px;
}
.mags {
  font-size: 14px;
  color: #999999;
  margin-top: 10px;
}
.gard1 {
  width: 92%;
  margin: 20px 4%;
}
.logoImg {
  width: 32%;
  height: 100px;
  margin-right: 10px;
}
.xiugai {
  border: 1px solid #1c3672;
  border-radius: 4px;
  width: 48%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #1c3672;
  margin: 30px auto;
}
.doRecorde {
  width: 91.6%;
  height: 222px;
  background: #f9f9f9;
  font-size: 14px;
  color: #999999;
  margin: 30px auto;
  padding: 20px 0 0 0;
}
.doTitle {
  font-size: 16px;
  color: #333333;
  margin-left: 4.3%;
}
.doDetail {
  margin: 10px 4.3%;
}
/* 下面是通道费率样式 */
.retes {
  font-size: 14px;
  color: #999999;
  position: relative;
  top: 20px;
  left: 4%;
}
.retas {
  font-size: 14px;
  color: #1c3672;
  background: none;
}
.changeReta {
  font-size: 14px;
  color: #1c3672;
  margin-left: 20px;
  cursor: pointer;
}
.xieyi {
  margin: 10px 0 0 4%;
  font-size: 14px;
  color: #999999;
}
.tishi {
  margin: 40px 0 0 4%;
  font-size: 12px;
  color: #f6a623;
}
.xy {
  margin-top: 10px;
}
.s1 {
  color: #333333;
}

.s3 {
  color: #88acff;
  margin-left: 10px;
}
.xieyiImg {
  height: 140px;
  width: 21.8%;
}
.imgshow {
  position: relative;
  margin: 20px 0 0 4%;
}
.imgshow span {
  position: relative;
  top: -130px;
}
.allChose {
  margin-top: 30px;
  text-align: center;
}
</style>