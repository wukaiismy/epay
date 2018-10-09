<template>
    <div>
      <div class="clear">
        <div class="btnpub">查看详情</div>     
      </div>    
       <div class="basicMsgTitle">交易对账异常详情</div>
       <div class="boxMsg bm" >
           <div class="mags" >交易时间：<span>{{msg.date}}</span></div>
           <div class="mags">交易编号：<span>{{msg.channelNum}}</span></div>
           <div class="mags">商户名称：<span>{{msg.store}}</span></div>
           <div class="mags">商户编号：<span>{{msg.tardNum}}</span></div>
           <div class="mags">所属渠道商：<span>{{msg.qudao}}</span></div>
           <div class="mags">渠道商编号：<span>{{msg.msgs}}</span></div>
           <div class="mags">异常类型：
             <template>           
                <span :class="msg.statuss=='1'?'shanchu':'noppss'" v-if="msg.statuss=='1'">数据错误</span>
                <span :class="msg.statuss=='1'?'shanchu':'noppss'" v-if="msg.statuss=='2'">短账</span>
                <span :class="msg.statuss=='1'?'shanchu':'noppss'" v-if="msg.statuss=='3'">多账</span>
             </template>
           </div>
           <div class="mags">处理状态：
              <template>           
                <span :class="msg.statu1=='1'?'tiaoz':'noppss'" v-if="msg.statu1=='1'">已处理</span>
                <span :class="msg.statu1=='1'?'tiaoz':'noppss'" v-if="msg.statu1=='2'">待处理</span>
                <span :class="msg.statu1=='1'?'tiaoz':'noppss'" v-if="msg.statu1=='3'">已调账</span>
             </template>
           </div>
           <div class="mags">处理结果：<span>{{msg.handing}}</span></div>         
        </div>
         <div class="gard1"><Gard /></div>
        <!-- 对账的表格展示 -->
        <div class="bigBoxs" >
            <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridData" border fit @row-click="handleSelectionChange" highlight-current-row style="width:100%;">                
                  <el-table-column property="types" label=""  align="center" ></el-table-column>
                  <el-table-column property="aXT" label="信条平台"  align="center" ></el-table-column>
                  <el-table-column property="others" label="第三方"  align="center"></el-table-column>             
            </el-table>
       </div>
    </div>
</template>

<script>
import Gard from "./Gard.vue";
import waves from "@/directive/waves"; // 水波纹指令
import uRLS from "../../../assets/wukai.jpg";
export default {
  name: "Details",
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
        date: "2018-10-10 10:10:10",
        channelNum: "20000000032010001",
        store: "成都易付云金融科技",
        tardNum: "1200000000030",
        qudao: "万达集团",
        msgs: "1200000000030",
        statuss: "1",
        statu1: "1",
        handing: "第三方平台"
      },
      gridData: [
        {
          types: "结算方式",
          aXT: "提现（T+1)",
          others: "提现（T+1)"
        },
        {
          types: "支付笔数",
          aXT: "999",
          others: "999"
        },
        {
          types: "交易总额",
          aXT: "￥9999.99",
          others: "￥67899.99"
        },
        {
          types: "服务费率",
          aXT: "3.2‰",
          others: "3.5‰"
        },
        {
          types: "结算金额",
          aXT: "￥9999.99",
          others: "￥9999.99"
        },
        {
          types: "结算状态",
          aXT: "等待划付",
          others: "等待划付"
        }
      ]
    };
  },
  methods: {
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
  width: 100%;
  height: 50px;
  font-size: 16px;

  display: inline-block;
  color: #1c3672;
  background-image: linear-gradient(-180deg, #eaf1fb 0%, #d0ddf5 100%);
  box-sizing: border-box;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.tow {
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
.xiaz {
  color: #1c3672;
}
.tiaoz {
  color: #88acff;
}
.shanchu {
  color: #d0011b;
}
.noppss {
  color: #f6a623;
}
.bigBoxs {
  width: 92%;
  margin-left: 4%;
  background-color: #fff;
  padding-bottom: 20px;
  display: inline-block;
}
</style>