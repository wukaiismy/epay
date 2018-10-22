<template>
    <div>
       <!-- 我是表格组件 -->
      <div class="bigBoxs">
          <el-table class="tableBox"  v-loading="listLoading"  :key="tableKey"  :data="gridData" border fit highlight-current-row style="width:100%;">
           
            <el-table-column property="date" label="日期"  align="center" ></el-table-column>
            <el-table-column property="danbaoNum" label="用户担保账户总额"  align="center"></el-table-column>
            <el-table-column  label="交易成功笔数"  align="center">
                 <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.danbaoName | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户担保交易总额"  align="center">
                 <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.sotreName | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column  label="用户担保现金总额"  align="center">
                <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.sonSotreName | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="账户现金发生总额"  align="center">
                 <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.sotreQudao | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户账户现金储值总额"  align="center" >
              <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.rechargeMoney | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商户现金储值总额"  align="center"  >
               <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.giveMoney | toThousandFilter}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="储值收益"  align="center" >
               <template slot-scope="scope">
                 <span type="text" size="small" class="moneyStyles">{{scope.row.rechargeNum | toThousandFilter}}</span>
               </template>
            </el-table-column>              
            <el-table-column  label="操作"   align="center">
              <template slot-scope="scope" >
                <el-button @click="passsubmit(scope.row)" type="text" size="small" class="stopServer" >冻结详情</el-button>
                <el-button type="text" size="small" class="moneyStyles" @click="returnsubmit(scope.row)">提现详情</el-button>
              </template>
            </el-table-column>       
    </el-table>
    </div>
     <!-- 分页功能 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="100" :total="100" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import { tebleMsg } from "@/api/datastatis";
export default {
  name: "BiaoGe1",
  directives: {
    waves
  },
  data() {
    return {
      pages: {
        currentPage: 5
      },
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      gridData: [
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000.01",
          danbaoName: "900000.09",
          sotreName: "900000.91",
          sonSotreName: "9000009.99",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "1000",
          danbaoName: "900000",
          sotreName: "900000",
          sonSotreName: "900000",
          sotreQudao: "900000",
          rechargeMoney: "9000",
          giveMoney: "1000",
          rechargeNum: "100"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取基本列表信息
    getList() {
      this.listLoading = true;
      console.log("表格基本信息");
      // tebleMsg("id").then(res => {
      //   console.log(res);
      // });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    // 详情按钮
    passsubmit(data) {
      console.log("====================================");
      console.log("你点击了详情按钮");
      this.dialogTableVisible = true;
      console.log(data);
      console.log("====================================");
    },
    // 修改按钮
    returnsubmit(data) {
      console.log("你点击了修改按钮");
      this.dialogTableVisible2 = true;
      console.log(data);
    },

    //搜索功能

    //分页功能选择
    handleSizeChange(val) {
      this.getList();
    },
    //分页功能选择
    handleCurrentChange(val) {
      console.log("选择分页");
      this.getList();
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