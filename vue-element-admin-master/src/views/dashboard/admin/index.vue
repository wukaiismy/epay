<template>
  <div >
    <!--首页的Ip显示区域 -->
    <template v-if="device!=='mobile'">      
   <el-row :gutter="10" class="panel-groups"  >
     <el-col :xs="6" :sm="6" :md="5" :lg="3" :xl="3" class="card-panel-cols">
         <div class="grid-contents">上次登录IP：117.192.3.101</div>
      </el-col>
     <el-col :xs="6" :sm="6" :md="5" :lg="3" :xl="3" class="card-panel-cols">
        <div class="grid-content ">登录地址：四川省成都市</div>
      </el-col>
    <el-col :xs="6" :sm="6" :md="5" :lg="4" :xl="4" class="card-panel-cols">
      <div class="grid-content">登录时间：2018-12-28 24:10:10</div>
    </el-col>
    <el-col :xs="3" :sm="3" :md="6" :lg="12" :xl="12" class="card-panel-cols">
      <div class="sss"></div>
    </el-col>
    <el-col :xs="3" :sm="3" :md="3" :lg="2" :xl="2" class="card-panel-cols">
      <div class="grid-content lastc " @click="actBlog">
        <svg-icon icon-class="edit" class="icoms" />
       <span>操作日志</span>
      </div>
    </el-col>
  </el-row>
 </template>
      <!--数据显示区  -->
      <panel-group @handleSetLineChartData="handleSetLineChartData"/>
      <!-- 用户总览 -->
   <UserOverview @handleSetLineChartData="handleSetLineChartData"/>
   <!-- eachar图表 -->
   
    <el-row class="echarBox">
      <div class="echarTitle">交易统计</div>
      <div class="showData"> 
        <div class="tardNum">本周交易笔数：<span>999</span></div>
         <div class="tardDetails">本周交易总额：<span>99985.11</span></div>

         <div class="rightMenus">
         <div class="tardChooseed  " :class="isSlectd=='1'?'selected':''" @click="slected(1)">本周</div>
         <div class="choose2" :class="isSlectd=='2'?'selected':''" @click="slected(2)">本月</div>
         <!-- 日期选择 -->
        <div class="block" id="datess">
          <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
      </div>
     </div>
      </div>
      <line-chart :chart-data="lineChartData"/> 
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PanelGroup from "./components/PanelGroup";
import UserOverview from "./components/UserOverview";
import LineChart from "./components/LineChart";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};
export default {
  name: "DashboardAdmin",
  components: { PanelGroup, UserOverview, LineChart },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      value6: "",
      isSlectd: 1
    };
  },
  computed: {
    ...mapGetters(["roles", "device"])
  },
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editorDashboard";
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    // 选择本月或者本周的数据
    slected(index) {
      this.isSlectd = index;
    },
    // 查看操作日志
    actBlog() {
      console.log("查看操作日志");

      this.$store.dispatch("componentsId", "operationblog");
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.panel-groups {
  margin-top: 20px;
  height: 17px;
  .card-panel-cols {
    margin-bottom: 21px;
    height: 17px;
    line-height: 17px;
    font-size: 12px;
    color: #666666;
    overflow: hidden;
  }
  .grid-contents {
    padding-left: 20px;
  }
  .icoms {
    font-size: 14px;
    float: left;
  }
  .lastc {
    span {
      margin-left: 10px;
    }
  }
}
.echarBox {
  height: 444px;
  background: #fff;
  width: 97.5%;
  // padding: 16px 20px 0 20px;
  margin: 32px auto;
  .echarTitle {
    font-size: 16px;
    color: #1c3672;
    margin-top: 10px;
    text-align: center;
  }
  .showData {
    font-size: 16px;
    color: #666666;
    margin-top: 20px;
    div {
      display: inline-block;
    }
    .tardNum {
      margin-left: 1%;
      span {
        color: #1c3672;
      }
    }
    .tardDetails {
      margin-left: 2.1%;
      span {
        color: #1c3672;
      }
    }
    .rightMenus {
      position: absolute;
      right: 0;
      z-index: 200;
      height: 30px;
      overflow: hidden;
    }
    #datess {
      width: 65%;
      margin-left: 2%;
      background-color: #628bdd;
      .el-input__inner {
        width: 100%;
        padding: 0;
        border: none;
        border-radius: 0%;
        line-height: 50%;
        box-sizing: border-box;
        .el-date-editor .el-range-input {
          width: 37%;
        }
      }
    }
    .tardChooseed {
      color: #999999;
    }
    .choose2 {
      margin-left: 1.6%;
      color: #999999;
    }
    .selected {
      color: #1c3672;
    }
  }
}
</style>

