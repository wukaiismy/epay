<template>
    <div>
       <!-- 我是表格组件 -->
      <div class="bigBoxs">
          <el-table class="tableBox"  v-loading="listLoading"  :key="tableKey"  :data="gridDatas" border fit highlight-current-row style="width:100%;">
           
            <el-table-column property="day" label="日期"  align="center" ></el-table-column>
            <el-table-column property="oneday_count" label="交易总笔数"  align="center"></el-table-column>
            <el-table-column property="oneday_count"   label="交易成功笔数"  align="center"></el-table-column>
            <el-table-column label="交易成功总额"  align="center">
                 <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.all_oneday_sum*1 | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column  label="交易成功现金额"  align="center">
                <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.day_oper*1 | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="退款笔数"  align="center">
                 <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.sotreQudao | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="退款现金额"  align="center"  width="95%">
              <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.rechargeMoney | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="退款总金额"  align="center"  >
               <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.giveMoney | toThousandFilter}}</span>
              </template>
            </el-table-column> -->
            <el-table-column  label="渠道分润"  align="center" >
               <template slot-scope="scope">
                 <span type="text" size="small" class="moneyStyles">{{scope.row.day_gift*1 | toThousandFilter}}</span>
               </template>
            </el-table-column>              
            <el-table-column  label="操作"   align="center">
              <template slot-scope="scope" >
                <el-button @click="passsubmit(scope.row)" type="text" size="small" class="xiaz" >支付详情</el-button>
                <el-button type="text" size="small" class="stopServer" @click="returnsubmit(scope.row)">退款详情</el-button>
              </template>
            </el-table-column>       
    </el-table>
    </div>
     <!-- 分页功能 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import { tebleMsg } from "@/api/datastatis";
export default {
  name: "BiaoGe",
  props: ["datemsg"],
  directives: {
    waves
  },
  data() {
    return {
      pages: {
        currentPage: 1,
        page: 1,
        size: 10
      },
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      detailMsg: null,
      gridDatas: [],
      filename: "",
      autoWidth: true,
      gridDatas: [],
      times: []
    };
  },
  mounted() {
    this.getListbase();
  },
  watch: {
    datemsg: {
      deep: true,
      handler(val) {
        this.getList(val);
      }
    }
  },
  methods: {
    // 获取基本列表信息
    getListbase() {
      var val = [];
      val.push(this.getMonthStartDate());
      val.push(this.getNowFormatDate());
      this.times = val;
      this.getList(val);
    },

    getList(val) {
      if (!val) {
        val = this.times;
      }
      this.listLoading = true;
      console.log(val);
      var data = {
        pg: this.pages.page,
        size: this.pages.size,
        begin_time: val[0],
        end_time: val[1]
      };
      tebleMsg(data).then(res => {
        console.log("表格基本信息");
        // console.log(res);
        this.gridDatas = res.data.data.ret;
        this.total = res.data.data.count;
        // console.log(this.gridDatas);
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },

    // 详情按钮
    passsubmit(data) {
      console.log("你点击了详情按钮");
      this.dialogTableVisible = true;
      console.log(data);
      //跳转到支付详情页面
      this.$router.push({ path: "/trade/merchantTrad" });
    },
    // 退款详情按钮
    returnsubmit(data) {
      console.log("你点击了修改按钮");
      this.dialogTableVisible2 = true;
      console.log(data);
      //跳转到退款详情页面
      this.$router.push({
        path: "/trade/userRefund",
        query: {
          date: data.day
        }
      });
    },

    //分页功能选择
    handleSizeChange(val) {
      console.log("选择个数");
      console.log(val);
      this.pages.size = val;
      this.getList();
    },
    //分页功能选择
    handleCurrentChange(val) {
      console.log("选择第几页");
      console.log(val);
      this.pages.page = val;
      this.getList();
    },
    //格式化日期：yyyy-MM-dd
    formatDate(date) {
      var myyear = date.getFullYear();
      var mymonth = date.getMonth() + 1;
      var myweekday = date.getDate();

      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      return myyear + "-" + mymonth + "-" + myweekday;
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    //获得本月的开始日期
    getMonthStartDate() {
      var now = new Date(); //当前日期
      var nowMonth = now.getMonth(); //当前月
      var nowYear = now.getYear(); //当前年
      nowYear += nowYear < 2000 ? 1900 : 0; //
      var monthStartDate = new Date(nowYear, nowMonth, 1);
      return this.formatDate(monthStartDate);
    }
  }
};
</script>

<style scoped>
.bigBoxs {
  width: 100%;

  background-color: #fff;
  padding-bottom: 20px;
  display: inline-block;
}
.tableBox {
  margin-bottom: 10px;
}

.pagination-container {
  margin: 22px 0 60px 30%;
}
.allChose {
  width: 100%;
  min-height: 34px;

  text-align: right;
}
.searchs {
  width: 110px;
  font-size: 14px;
  text-align: center;
  margin-right: 1%;
  padding-left: 0;
  padding-right: 0;
}
.ppss {
  color: #4990e2;
  font-size: 14px;
}
.noppss {
  color: #999999;
  font-size: 14px;
}
.stopServer {
  font-size: 14px;
  color: #f6a623;
}
.rightMenu {
  width: 96%;
  padding-bottom: 50px;
  background-color: #fff;
  display: inline-block;
  margin-bottom: 40px;
}
.moneyStyles {
  font-size: 14px;
  color: #1c3672;
}
</style>