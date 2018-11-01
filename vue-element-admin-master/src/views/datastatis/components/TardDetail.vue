<template>
    <div class="card-panel-description">
        <div>
          <Show1 />
        </div>     
            <!-- 灰色间隔线 -->
            <div class="Gard"></div>
            <!-- 事件查询 -->
            <div class="searchBox">
                   <el-button type="primary" icon="el-icon-search"  class="searchSubmit" @click="searchDate">搜索</el-button>
                   <div class="datas"><span class="userSearch"> 时间：</span>
                     <div class="dateBox"  v-show="dateType">
                     <el-date-picker width='140px' value-format="yyyy-MM-dd" @change='change(1)'  v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                     </div>
                     <div  class="dateBox" v-show="!dateType">
                     <el-date-picker width='140px' value-format="yyyy-MM"  @change='change(2)'  v-model="date1" type="month" ></el-date-picker>                     
                       </div>
                     </div>      
                   <el-button @click="searchChoose(1)" type="primary" plain  class="searchMonth">按月查询</el-button>
                   <el-button @click="searchChoose(2)" type="primary" plain class="searchDay">按日查询</el-button>              
            </div>
            <div class="showMoney">
               <ShowMoney  @handleSetLineChartData="handleSetLineChartData"  :searchMsg='searchMsg'/>
            </div> 
            <!-- 下面是图表部分 -->
            <!-- <div class="units">单位：万元</div>  -->
             <line-chart :chart-data="lineChartData"/>  
             <!-- 灰色间隔线 -->
              <div class="Gard1"></div>
             <!-- 下面是具体的表格展示部分 -->
                  <div>
                      <BiaoGe :datemsg='table_msg' />
                  </div>
                 
    </div>
</template>

<script>
import { searchDay } from "@/api/datastatis";
import CountTo from "vue-count-to";
import Show1 from "./Show1";
import ShowMoney from "./ShowMoney";
import LineChart from "./LineChart";
import BiaoGe from "./BiaoGe";

export default {
  name: "TardDetail",
  data() {
    return {
      date: "",
      date1: "",
      table_msg: "",
      datemsg: "",
      lineChartData: {
        expectedData: [],
        xDatas: [],
        legendData: "交易成功现金总额"
      },
      searchMsg: {
        count_range: 0,
        sum_all_range: "",
        sum_amount_range: "",
        sum_gift_range: ""
      },
      dateType: true,
      lineChartDataList: {},
      types: "sum_amount_range"
    };
  },
  components: {
    CountTo,
    Show1,
    ShowMoney,
    LineChart,
    BiaoGe
  },
  mounted() {},
  created() {
    //  获取初始化数据
    this.getMsgs();
  },
  methods: {
    //获取初始数据
    getMsgs(data) {
      var searchUrl = "/statistics/rangeplat/";
      console.log(data);
      searchDay(searchUrl, data).then(res => {
        console.log("查询结果");
        console.log(res);
        this.searchMsg = res.data.all_order_someone;
        //截取每天的数据列表
        // this.lineChartDataList = res.data.all_order_someone.sum_list;
        var echarList = {};
        var lineChartData = {
          count_range: {},
          sum_all_range: {},
          sum_amount_range: {},
          sum_gift_range: {}
        };
        echarList = res.data.all_order_someone.sum_list;
        console.log(echarList);
        lineChartData.count_range.xDatas = echarList.map(function(item) {
          return item[0];
        });
        lineChartData.sum_all_range.xDatas = echarList.map(function(item) {
          return item[0];
        });
        lineChartData.sum_amount_range.xDatas = echarList.map(function(item) {
          return item[0];
        });
        lineChartData.sum_gift_range.xDatas = echarList.map(function(item) {
          return item[0];
        });
        lineChartData.count_range.expectedData = echarList.map(function(item) {
          return item[1];
        });
        lineChartData.sum_all_range.expectedData = echarList.map(function(
          item
        ) {
          return item[2];
        });
        lineChartData.sum_amount_range.expectedData = echarList.map(function(
          item
        ) {
          return item[3];
        });
        lineChartData.sum_gift_range.expectedData = echarList.map(function(
          item
        ) {
          return item[4];
        });

        this.lineChartDataList = lineChartData;
        // console.log(this.lineChartDataList);
        this.lineChartData = this.lineChartDataList[this.types];
      });
    },
    //按日、月查询
    searchChoose(index) {
      if (index == "1") {
        this.dateType = false;
        this.datemsg = this.date1;
      } else if (index == "2") {
        // searchDay(data.payTardNum).then(res => {
        //   console.log(res);
        // this.searchMsg=res.data
        // });
        this.dateType = true;
        this.datemsg = this.date;
      }
    },
    change(index) {
      console.log(6666);
      if (index == "1") {
        this.datemsg = this.date;
      } else if (index == "2") {
        this.datemsg = this.date1;
      }
    },
    // 搜索按钮提交
    searchDate() {
      console.log(this.datemsg);
      this.table_msg = this.datemsg;
      var data = {};
      var data = { begin_time: this.datemsg[0], end_time: this.datemsg[1] };
      console.log(data);
      // searchDay(this.date).then(res => {
      //   console.log(res);
      // this.searchMsg=res.data
      // });
      this.getMsgs(data);
    },
    handleSetLineChartData(type, title) {
      this.types = type;
      this.lineChartData = this.lineChartDataList[type];
      this.lineChartData.legendData = title;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.Gard {
  width: 100%;
  border: 1px solid #f0f0f0;
  margin-top: 10px;
}
.Gard1 {
  width: 100%;
  border: 1px solid #f0f0f0;
  margin: 30px 0 10px 0;
}

.searchBox {
  width: 100%;
  height: 34px;
  margin: 20px;
  position: relative;
  float: right;
}
.searchMonth,
.datas,
.searchDay,
.searchSubmit {
  float: right;
  margin-right: 20px;
}
.showMoney {
  margin-top: 74px;
  position: relative;
}
.units {
  font-size: 14px;
  color: #1c3672;
  margin-left: 50px;
}
.dateBox {
  display: inline-block;
}
</style>