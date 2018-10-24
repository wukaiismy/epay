<template>
    <div>
       <div class="clear">
            <div class="btnpub" :class="isShow?'tow':''" @click="mesHandle1">商户信息</div>
            <div class="btnpub" :class="!isShow?'tow':''" @click="mesHandle2">商户配置</div>
       </div>
       <!-- 渠道信息展示部分 -->
       <div v-show="isShow">
       <div class="basicMsgTitle">基本信息</div>
       <div class="boxMsg bm">
           <div class="mags">渠道编号：{{detailMsg.id}}</div>
           <div class="mags">渠道名称：{{detailMsg.name}}</div>
          
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">运营信息</div>
        <div class="boxMsg">
           <div class="mags">联系人：{{detailMsg.merchantfile.operator_name}}</div>
           <div class="mags">联系电话：{{detailMsg.merchantfile.operator_mobile}}</div>
           <div class="mags">电子邮箱：{{detailMsg.merchantfile.operator_email}}</div>
           <div class="mags">经营类目：{{detailMsg.merchantfile.operator_type}}</div>
           <div class="mags">客服电话：{{detailMsg.merchantfile.service_tel}}</div>
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">商户信息</div>
       <div class="boxMsg">
           <div class="mags">商户名称：{{detailMsg.name}}</div>
           <div class="mags">省份城市：{{detailMsg.merchantfile.city}}</div>
           <div class="mags">详细地址：{{detailMsg.location}}</div>
        </div>
        <div class="gard1"><Gard /></div>
        <div class="basicMsgTitle bs">法人信息</div>
       <div class="boxMsg">
           <div class="mags">法人姓名：{{detailMsg.merchantfile.legal_name}}</div>
           <div class="mags">身份证号：{{detailMsg.merchantfile.legal_id_card}}</div>
           <div class="mags">身份证照片： 
              <img class="logoImg" :src="detailMsg.merchantfile.legal_id_card_backend" alt=""> 
              <img class="logoImg" :src="detailMsg.merchantfile.legal_id_card_front" alt=""></div>               
        </div>
        <div class="gard1"><Gard /></div>
         <div class="basicMsgTitle bs">营业执照信息</div>
       <div class="boxMsg">
           <div class="mags">营业执照编号：{{detailMsg.merchantfile.license_no}}</div>
           <div class="mags">营业期限：{{detailMsg.merchantfile.business_begin}}~{{detailMsg.merchantfile.business_end}}</div>
           <div class="mags">营业范围：{{detailMsg.merchantfile.business_scope}}</div>           
           <div class="mags">营业执照： <img class="logoImg" :src="detailMsg.merchantfile.license_image" alt=""> </div> 
           <div class="mags">运营协议： <img class="logoImg" :src="detailMsg.merchantfile.operator_agreement" alt=""> </div>               
           <div class="mags">补充材料： <img class="logoImg"  v-for="(item, index) in detailMsg.supplement" :key="index" :src="item" alt=""></div>
        </div>
        <div class="gard1"><Gard /></div>
         <div class="basicMsgTitle bs">结算信息</div>
       <div class="boxMsg">
            <div class="mags">结算类型：
                <template>
                  <span v-if="detailMsg.merchantfile.clear_type=='0'">个人</span>
                  <span v-if="detailMsg.merchantfile.clear_type=='1'">企业</span>            
                </template>
            </div>
            <div class="mags">结算户名：{{detailMsg.merchantfile.admin_user}}</div>
            <div class="mags">结算银行：{{detailMsg.merchantfile.bankcard_name}}</div>
            <div class="mags">结算账号：{{detailMsg.merchantfile.bank_credit}}</div>
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
        <!-- 渠道信息结束 -->
        <!-- 渠道配置开始 -->
        <div v-show="!isShow">
            <div class="retes">
                <span>所属渠道商：</span> <el-input
                :disabled='disabled'
               size='small '
                        v-model="detailMsg.name"
                       class="retas" style="width:220px; height:20px;">
                    </el-input><span class="changeReta" @click="changeReta">修改</span>
            </div>
            <div class="xieyi">所属渠道编号：{{detailMsg.id}}</div>
            <div class="xieyi xy">商户所属渠道：平台内部用户</div>
            <div class="xieyi xy">通道费率：{{detailMsg.merchantfile.rate}}‰</div>
            <div class="xieyi xy">渠道协议：<span class="s3">《信条担保交易-运营协议》</span></div>
            
         <div class="gard1"><Gard /></div>
            <!-- 下面的选择按钮 -->
            <div class="allChose">
                <el-button v-waves class="searchs" type="success"  @click="jihuosJump">激活商户</el-button>
                <el-button v-waves class="searchs" type="warning"  @click="guanbiJump">关闭商户</el-button>
               
            </div>                      
        </div>
        <!-- 渠道配置结束 -->
    </div>
</template>

<script>
import Gard from "./Gard.vue";
import waves from "@/directive/waves"; // 水波纹指令
import uRLS from "../../../assets/wukai.jpg";
export default {
  name: "Details3",
  props: ["detailMsg"],
  directives: {
    waves
  },
  components: {
    Gard
  },
  data() {
    return {
      isShow: true,
      disabled: true,
      uRLS: uRLS,
      mataMsg: [
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn",
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn",
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn",
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn",
        "2018-01-20 12:20:10 审核通过 200984llkfj.cn"
      ]
    };
  },
  methods: {
    blur() {
      console.log(11111);
    },
    //点击获取渠道信息
    mesHandle1() {
      console.log("点击了渠道信息");
      this.isShow = true;
    },
    //点击获取渠道配置
    mesHandle2() {
      console.log("点击了渠道配置");

      this.isShow = false;
    },
    // 修改按钮
    xiugai() {
      console.log("修改信息");
    },
    //修改费率
    changeReta() {
      this.disabled = false;
    },
    // 激活
    jihuosJump() {
      alert("确定激活？");
      // alert("确定激活？");
      var channeljhURL = "incoming/merchantact";
      var datas = { ids: this.detailMsg.merchantfile.id };
      channelVolumeActivation(channeljhURL, datas).then(res => {
        console.log(res);
      });
    },
    //关闭
    guanbiJump() {
      alert("确定关闭？");
    }
  }
};
</script>

<style scoped>
.btnpub {
  width: 50%;
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
  margin: 40px 0 0 4%;
  font-size: 14px;
  color: #999999;
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