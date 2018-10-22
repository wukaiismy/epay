<template>
    <div class="card-panel-description">
        <div>
          <Show1 />
        </div>     
            <!-- 灰色间隔线 -->
            <div class="Gard"></div>
            <!-- 事件查询 -->
            <div class="searchBox">
                   <el-button type="primary"  @click="searchDate" icon="el-icon-search"  class="searchSubmit">搜索</el-button>
                   <div class="datas"><span class="userSearch"> 时间：</span>
                        <div class="dateBox"  v-show="dateType">
                          <el-date-picker width='140px' value-format="yyyy-MM-dd" @change='change(1)'  v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                       </div>
                       <div  class="dateBox" v-show="!dateType">
                         <el-date-picker width='140px' value-format="yyyy-MM"  @change='change(2)'  v-model="date1" type="month" ></el-date-picker>                     
                       </div>
                     </div>      
                   <el-button  @click="searchDay(1)" type="primary" plain  class="searchMonth">按月查询</el-button>
                   <el-button  @click="searchDay(2)" type="primary" plain class="searchDay">按日查询</el-button>              
            </div>
            <div class="showMoney">
              <ShowMoney  @handleSetLineChartData="handleSetLineChartData" :searchMsg='searchMsg' />
            </div> 
            <!-- 下面是图表部分 -->
            <!-- <div class="units">单位：万元</div>  -->
             <line-chart :chart-data="lineChartData"/>  
             <!-- 灰色间隔线 -->
              <div class="Gard1"></div>
             <!-- 下面是具体的表格展示部分 -->
                  <div>
                      <BiaoGe />
                  </div>
                 
    </div>
</template>

<script>
import { searchDay } from "@/api/datastatis";
import CountTo from "vue-count-to";
import Show1 from "./Show11";
import ShowMoney from "./ShowMoney1";
import LineChart from "./LineChart";
import BiaoGe from "./BiaoGe1";
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
  name: "TardDetail1",
  data() {
    return {
      date: "",
      date1: "",
      dateMsg: "",
      lineChartData: lineChartData.newVisitis,
      searchMsg: null,
      dateType: true
    };
  },
  components: {
    CountTo,
    Show1,
    ShowMoney,
    LineChart,
    BiaoGe
  },
  mounted() {
    //  获取初始化数据
    this.getMsgs();
  },
  methods: {
    //获取初始数据
    getMsgs() {
      // searchDay().then(res => {
      //   console.log(res);
      // this.searchMsg=res.data
      // });
    },
    //按日、月查询
    searchDay(index) {
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

      // searchDay(this.date).then(res => {
      //   console.log(res);
      // this.searchMsg=res.data
      // });
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
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