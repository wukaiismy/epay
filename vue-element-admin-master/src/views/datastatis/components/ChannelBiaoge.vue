<template>
    <div>
       <!-- 我是表格组件 -->
      <div class="bigBoxs">
          <el-table class="tableBox"  v-loading="listLoading"  :key="tableKey"  :data="gridData" border fit highlight-current-row style="width:100%;">
           
            <!-- <el-table-column property="date" label="创建日期"  align="center" ></el-table-column>          -->
            <el-table-column property="channel_id" label="渠道编号"  align="center"></el-table-column> 
            <el-table-column property="channel_name" label="渠道商名称"  align="center"></el-table-column>                      
            <el-table-column  label="用户担保交易总数"  align="center">
                <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.dpre_count_all | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户担保交易总现金额"  align="center">
                 <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.dpre_sum_all_amount | toThousandFilter }}</span>
              </template>
            </el-table-column>
             <el-table-column  label="用户担保交易总赠送金额"  align="center" >
               <template slot-scope="scope">
                 <span type="text" size="small" class="moneyStyles">{{scope.row.dpre_sum_all_gift | toThousandFilter}}</span>
               </template>
            </el-table-column>    
            <el-table-column label="用户担保交易总额"  align="center"  >
              <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{(scope.row.dpre_sum_all_amount*1+scope.row.dpre_sum_all_gift*1). toString()  | toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="交易总笔数"  align="center"  >
               <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{(scope.row.dpre_count_all*1+scope.row.pre_count_all*1). toString()  | toThousandFilter }}</span>
              </template>
            </el-table-column>
             <el-table-column  label="余额支付总现金额"  align="center" >
               <template slot-scope="scope">
                 <span type="text" size="small" class="moneyStyles">{{scope.row.pre_sum_all_amount | toThousandFilter}}</span>
               </template>
            </el-table-column>                     
            <el-table-column  label="操作"   align="center">
              <template slot-scope="scope" >
                <el-button @click="passsubmit(scope.row)" type="text" size="small" class="moneyStyles" >详情</el-button>              
              </template>
            </el-table-column>       
    </el-table>
    </div>
    <!-- 下面的选择按钮 -->
       <div class="allChose">      
          <el-button v-waves class="searchs" type="primary"  icon="el-icon-download"  @click="daochuJump">导出</el-button>
       </div> 
     <!-- 分页功能 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="pages.page" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import { channelMsgList, channelDownload } from "@/api/datastatis";
export default {
  name: "ChannelBiaoge",

  directives: {
    waves
  },
  data() {
    return {
      pages: {
        page: 1,
        size: 10
      },
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      gridData: [
        {
          date: "2018-09-10 10:11:00",
          channel_id: "100000000030",
          channel_name: "金桔联盟",
          dpre_count_all: "9000",
          dpre_sum_all_amount: "900000.22",
          dpre_sum_all_gift: "9000.22",
          pre_count_all: "10001",
          pre_sum_all_amount: "8003.59"
        },
        {
          date: "2018-09-10 10:11:00",
          channel_id: "100000000030",
          channel_name: "金桔联盟",
          dpre_count_all: "90009",
          dpre_sum_all_amount: "900000.22",
          dpre_sum_all_gift: "9000.22",
          pre_count_all: "1000",
          pre_sum_all_amount: "8003.59"
        },

        {
          date: "2018-09-10 10:11:00",
          channel_id: "100000000030",
          channel_name: "金桔联盟",
          dpre_count_all: "9009",
          dpre_sum_all_amount: "900000.22",
          dpre_sum_all_gift: "9000.22",
          pre_count_all: "10",
          pre_sum_all_amount: "8003.59"
        }
      ],
      filename: "交易统计",
      detailMsg: null,
      gridDatas: [],

      autoWidth: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //渠道交易表格基本信息
    getList(data) {
      this.listLoading = true;
      console.log("渠道交易表格基本信息");
      console.log(data);
      var Urls =
        "/backend/api/v1/statistics/channelsumdata/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      channelMsgList(Urls, data).then(res => {
        console.log(res);
        this.total = res.data.data.count;
        this.gridDatas = res.data.data.ret;
      });
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

    //分页功能选择
    handleSizeChange(val) {
      this.pages.size = val;
      this.pages.page = 1;
      this.getList();
    },
    //分页功能选择
    handleCurrentChange(val) {
      console.log("选择分页");
      this.pages.page = val;
      this.getList();
    },

    // 导出按钮
    daochuJump() {
      console.log("导出按钮");
      // channelDownload(this.multipleSelection).then(res => {
      //   console.log(res);
      // this.msg=data
      // });
      // 直接本地导出
      if (this.gridData.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "日期",
            "渠道商名字",
            "商户编号",
            "所属渠道商",
            "用户担保交易总数",
            "用户担保交易总额",
            "交易笔数",
            "支付总现金"
          ];
          const filterVal = [
            "date",
            "storeName",
            "storeNum",
            "channelName",
            "sonSotreName",
            "sotreQudao",
            "giveMoney",
            "rechargeNum"
          ];
          const list = this.gridData;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          });
          // this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "请设置1个表格",
          type: "warning"
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
  min-height: 30px;
  min-width: 300px;
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