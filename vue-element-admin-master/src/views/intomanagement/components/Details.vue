<template>
    <div>
      <div class="clear">
        <div class="btnpub" :class="isShow?'tow':''" @click="mesHandle1">渠道信息</div>
        <div class="btnpub" :class="!isShow?'tow':''" @click="mesHandle2">渠道配置</div>
      </div>
       <!-- 渠道信息展示部分 -->
       <div v-show="isShow">
       <div class="basicMsgTitle">基本信息</div>
       <div class="boxMsg bm">       
           <div class="mags">渠道编号：{{msg.m1}}</div>
           <div class="mags">渠道名称：{{msg.m2}}</div>
           <div class="mags">所属银行：{{msg.m3}}</div>
           <div class="mags">渠道类型：{{msg.m4}}</div>
       </div>
       <div class="gard1"><Gard /></div>
       <div class="basicMsgTitle bs">运营信息</div>
       <div class="boxMsg">         
           <div class="mags">联系人：{{msg.m5}}</div>
           <div class="mags">联系电话：{{msg.m6}}</div>
           <div class="mags">电子邮箱：{{msg.m7}}</div>
           <div class="mags">经营类目：{{msg.m8}}</div>
           <div class="mags">经营范围：{{msg.m9}}</div>
           <div class="mags">客服电话：{{msg.m10}}</div>
           <div class="mags">渠道协议：{{msg.m11}}</div>
       </div>
       <div class="gard1"><Gard /></div>
       <div class="basicMsgTitle bs">企业信息</div>
       <div class="boxMsg">         
           <div class="mags">企业名称：{{msg.m12}}</div>
           <div class="mags">省份城市：{{msg.m13}}</div>
           <div class="mags">详细地址：{{msg.m14}}</div>
           <div class="mags">渠道类型：{{msg.m15}}</div>
       </div>
       <div class="gard1"><Gard /></div>
       <div class="basicMsgTitle bs">法人信息</div>
       <div class="boxMsg">        
           <div class="mags">法人姓名：{{msg.m16}}</div>
           <div class="mags">身份证号：{{msg.m17}}</div>
           <div class="mags">身份证照片： <img class="logoImg" :src="msg.m18" alt=""> </div>           
       </div>
       <div class="gard1"><Gard /></div>
       <div class="basicMsgTitle bs">营业执照信息</div>
       <div class="boxMsg">       
           <div class="mags">营业执照编号：{{msg.m19}}</div>
           <div class="mags">营业期限：{{msg.m20}}</div>
           <div class="mags">营业范围：{{msg.m21}}</div>
           <div class="mags">渠道类型：{{msg.m22}}</div>
           <div class="mags">营业执照： <img class="logoImg" :src="msg.m23" alt=""> </div> 
       </div>
       <div class="gard1"><Gard /></div>
       <div class="basicMsgTitle bs">结算信息</div>
       <div class="boxMsg">          
           <div class="mags">结算类型：{{msg.m24}}</div>
           <div class="mags">结算户名：{{msg.m25}}</div>
           <div class="mags">结算银行：{{msg.m26}}</div>
           <div class="mags">结算账号：{{msg.m27}}</div>
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
                <span>通道费率：</span> <el-input
                :disabled='disabled'
                        v-model="retes"
                       class="retas" style="width:40px; height:20px;">
                    </el-input> <span>&nbsp; ‰</span> <span class="changeReta" @click="changeReta">修改</span>
            </div>
            <div class="xieyi">渠道协议：<span class="s1">《信条担保交易-运营协议》</span><span class="s2">下载</span><span class="s3">在线观看</span></div>
            <div class="xieyi imgshow"><span>运营协议：</span><img class="xieyiImg" :src="uRLS" alt="" srcset=""></div>
         <div class="gard1"><Gard /></div>
            <!-- 下面的选择按钮 -->
            <div class="allChose">
                <el-button v-waves class="searchs" type="success"  @click="jihuosJump">激活渠道商</el-button>
                <el-button v-waves class="searchs" type="warning"  @click="guanbiJump">关闭渠道商</el-button>
               
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
  name: "Details",
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
      retes: "3",
      msg: {
        m1: "12545885285",
        m2: "成都易付云金融科技",
        m3: "华夏银行",
        m4: "普通渠道商",
        m5: "张学友",
        m6: "135400213254",
        m7: "2345@qq.com",
        m8: "企业、十点多",
        m9: "家具。玩具",
        m10: "028-2201-000",
        m11: "很吊的协议",
        m12: "成都易付云金融科技",
        m13: "四川成都",
        m14: "高西新区",
        m15: "普通渠道商",
        m16: "张学友",
        m17: "5112012121252",
        m18: uRLS,
        m19: "12588dvfgththb45",
        m20: "2018-10-10~2018-20-10",
        m21: "家具。玩具",
        m22: "家具、玩具",
        m23: uRLS,
        m24: "企业",
        m25: "金桔联盟",
        m26: "华夏银行",
        m27: "125 2252 222 2222"
      },

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
.s1 {
  color: #333333;
}
.s2 {
  color: #1c3672;
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