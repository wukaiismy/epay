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
            <el-table class="tableBox"  :key="tableKey" :data="gridData" border fit style="width:100%;">                
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
import { merchantDetail } from "@/api/reconciliation";
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
      tableKey: 0,
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
    //父组件调用传值并发起请求
    getMsg(data) {
      console.log(data);
      let channelDetailURL = "/backend/api/v1/incoming/channelid/";
      if (!data) return;
      // merchantDetail(channelDetailURL,data).then(res => {
      //   console.log(res);
      // this.msg=data.msg
      // this.gridData=data.gridData
      // });
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