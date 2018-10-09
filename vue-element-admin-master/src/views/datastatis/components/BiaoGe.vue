<template>
    <div>
       <!-- 我是表格组件 -->
      <div class="bigBoxs">
          <el-table class="tableBox"  v-loading="listLoading"  :key="tableKey"  :data="gridData" border fit highlight-current-row style="width:100%;">
           
            <el-table-column property="date" label="日期"  align="center" ></el-table-column>
            <el-table-column property="danbaoNum" label="交易总笔数"  align="center"></el-table-column>
            <el-table-column  label="交易成功笔数"  align="center">
                 <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.danbaoName | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易成功总额"  align="center">
                 <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.sotreName | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column  label="交易成功现金额"  align="center">
                <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.sonSotreName | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="退款笔数"  align="center">
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
            </el-table-column>
            <el-table-column  label="渠道分润"  align="center" >
               <template slot-scope="scope">
                 <span type="text" size="small" class="moneyStyles">{{scope.row.rechargeNum | toThousandFilter}}</span>
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
      <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="100" :total="100" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "BiaoGe",
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
    //search组件新增渠道商按钮传值
    addChain(data) {
      console.log(data);
      this.$emit("addChain", data);
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
      this.$router.push({ path: "/trade/userRefund" });
    },

    //   获取数据啊
    getList() {
      this.listLoading = true;
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
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
    },
    // 删除记录
    handleModifyStatus(row, status) {
      console.log(status);
      console.log(row);

      row.status = status;
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
.el-table-column {
  /* height: 43px; */
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
/* 下面是模态框的样式*/
.el-dialog,
.sssss {
  margin: 0 auto 20px;
}
.diaTilte {
  position: relative;
  text-align: center;
  line-height: 36px;
  font-size: 16px;
  color: #1c3672;
  width: 498px;
  margin-bottom: 20px;
  left: -4%;
  top: -60px;
}
.d1 {
  width: 678px;
  left: -2.94%;
}
.titleMotai {
  background: #f0f0f0;
}
.item {
  position: relative;
  padding: 1px 0 20px 0;
  /* background-color: aqua; */
  height: 20px;
  text-align: left;
  margin-top: 20px;
}
.item span {
  font-size: 14px;
  color: #333333;
  margin-left: 44.2%;
}
.item .addSpan {
  margin-left: 36.176%;
}
.abs {
  position: absolute;
  right: 55.8%;
  font-size: 14px;
  color: #999999;
}
.abs1 {
  right: 63.82%;
  color: #666666;
}

.item .shangjia {
  color: #4990e2;
}
.ratess {
  font-size: 12px;
  color: #1c3672;
  margin: 20px;
}
.cheeked {
  display: inline-block;
  width: 46.17%;
}
.firstChild {
  margin-left: 35px;
}
.btnBox {
  position: relative;
  top: 100px;
  width: 100%;
  height: 40px;
  margin: 30px auto 30px;
}
.btnsubs {
  width: 240px;
  height: 40px;
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
  border-radius: 4px;
  font-size: 14px;
  color: #1c3672;
}
.quXiao {
  width: 240px;
  height: 40px;
  border: 1px solid #1c3672;
  border-radius: 4px;
  font-size: 14px;
  color: #1c3672;
}
</style>