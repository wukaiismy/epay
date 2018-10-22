<template>
    <div id="dalos">
        <Search   @channelSearch='channelSearch' />
      <!-- 我是表格组件 -->
        <div class="bigBoxs">
           <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridData" border fit @row-click="handleSelectionChange" highlight-current-row style="width:100%;">                
              <el-table-column property="date" label="交易日期"  align="center"  width="95%" ></el-table-column>
              <el-table-column property="tardNum" label="交易编号"  align="center" ></el-table-column>
              <el-table-column property="userName" label="用户姓名"  width="80%" align="center"></el-table-column>
              <el-table-column property="sotreName" label="商户名称"  align="center"></el-table-column>
              <el-table-column property="sotreType" label="商户类型"  align="center"></el-table-column>
              <el-table-column property="lsStoreName" label="连锁商户名称"  align="center"></el-table-column>
              <el-table-column property="qdName" label="渠道商名称" align="center"></el-table-column>
              <el-table-column  label="交易金额" width="85%" align="center">
                <template slot-scope="scope">
                  <span type="text" size="small" class="moneyStyles">￥{{scope.row.rechargeMoney| toThousandFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column property="payFcu" label="支付方式"  align="center"></el-table-column>
              <el-table-column label="状态"  align="center"  width="95%">
                <template slot-scope="scope">
                   <span type="text" size="small" class="ppss"  v-if="scope.row.statuss==1" >支付成功</span>
                   <span type="text" size="small" class="stopServer" v-if="scope.row.statuss==2">待支付</span>
                </template>
              </el-table-column>              
              <el-table-column  label="操作"   align="center" width="90%">
                <template slot-scope="scope" >
                   <el-button  type="text" size="small" class="xiaz" >退款</el-button>                 
                </template>
              </el-table-column>        
           </el-table>
          <!-- 下面的选择按钮 -->
          <div class="allChose">  
            <el-button v-waves class="searchs" type="primary"  icon="el-icon-download"  @click="daochuJump">导出</el-button>
         </div> 
    </div>
     <!-- 分页功能 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="100" :total="100" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->

     <!-- 下面是详情模态框 -->
      <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss' top="10vh"   width="500px" >
          <div class="diaTilte"><div class="titleMotai">交易信息</div>
              <div class="item"><div class="abs">交易日期：</div><span>2017-10-01 10:10:10</span></div>
              <div class="item"><div class="abs">交易编号：</div><span>2001215487965221</span></div>
              <div class="item"><div class="abs">交易金额：</div><span>￥2000.00</span></div>
              <div class="item"><div class="abs">支付方式：</div><span>担保账户支付</span></div>
              <div class="item"><div class="abs">担保账户支付：</div><span>￥2000.00</span></div>
              <div class="item"><div class="abs">担保账号：</div><span>2001215487965221</span></div>
              <div class="item"><div class="abs">信条支付：</div><span>￥1000.00</span></div>
              <div class="item"><div class="abs">信条账户：</div><span>90215487965221</span></div>
              <div class="item"><div class="abs">支付状态：</div><span class="ppss">支付成功</span></div>
          </div>
          
          <div class="diaTilte title2"><div class="titleMotai">用户信息</div><div class="item">
              <div class="abs">用户姓名：</div><span class="shangjia">张学友</span></div>
              <div class="item"><div class="abs">用户手机号：</div><span>15244412512</span></div> 
          </div>

          <div class="diaTilte title2"><div class="titleMotai">商家信息</div>
              <div class="item"><div class="abs">商户类型：</div><span class="shangjia">连锁商户</span></div>
              <div class="item"><div class="abs">商户名称：</div><span>简乐互动</span></div>
              <div class="item"><div class="abs">商户编号：</div><span>2000121455</span></div>         
          </div>
            
          <div class="diaTilte title2"><div class="titleMotai">结算信息</div>
              <div class="item"><div class="abs">现金支付金额：</div><span class="">￥3000.00</span></div>
              <div class="item"><div class="abs">现金赠送金额：</div><span>￥1000.00</span></div>
              <div class="item"><div class="abs">通道费率：</div><span>3.5‰</span></div>
              <div class="item"><div class="abs">结算金额：</div><span>￥4000.00</span></div>
          </div>          
      </el-dialog>
    </div>
</template>

<script>
import Search from "./Search.vue";
import waves from "@/directive/waves"; // 水波纹指令
import { merchantMsg, merchantDetail, merchantDownload } from "@/api/vi";
export default {
  name: "Table",
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
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      msg: {
        storeName: "",
        date: "",
        rechargeMoney: "",
        giveMoney: "",
        rate: "",
        rates: "",
        fanbei: "1",
        xiajia: "1",
        xjStatus: "2",
        storeType: "",
        storeNames: "",
        checkList: []
      },
      gridData: [
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        },
        {
          date: "2018-09-10",
          tardNum: "158854855255545",
          userName: "吴奇隆",
          sotreName: "阳关海岸会所",
          sotreType: "连锁子商户",
          lsStoreName: "成都一股云有限公司",
          qdName: "阿里巴巴",
          rechargeMoney: "9000",
          payFcu: "担保账户+信条支付",
          sotreQudao: "成都一股云有限公司",
          statuss: "1"
        }
      ],
      detailMsg: {},
      changeMsg: {}
    };
  },
  components: {
    Search
  },
  created() {
    this.getList();
  },
  methods: {
    // 搜索按钮传值回来
    channelSearch(data) {
      console.log(data);
      // this.gridData = data;
    },
    // 获取商户交易基本列表信息
    getList() {
      this.listLoading = true;
      console.log("商户交易表格基本信息");
      var basicURL = "incoming/channellist/";
      // merchantMsg(basicURL,"1").then(res => {
      //   console.log(res);
      // });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    //详情按钮
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      this.dialogTableVisible = true;
      console.log("你点击了详情按钮");
      var detailURL = "incoming/channellist/";
      // merchantDetail(detailURL,data.tardNum).then(res => {
      //   console.log(res);
      // this.detailMsg=data
      // });
    },

    // 导出按钮
    daochuJump() {
      console.log("导出按钮");
      var DownloadURL = "incoming/channellist/";
      // merchantDownload(DownloadURL,this.multipleSelection).then(res => {
      //   console.log(res);
      // this.msg=data
      // });
    },

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
.userSearch {
  font-size: 14px;
  color: #666666;
  margin-left: 4.4%;
}
.searchHandle {
  margin-left: 30px;
  margin-top: 5px;
}
.backspaces {
}
.xiaz {
  color: #f6a623;
}
.shanchu {
  color: #f6a623;
}
.bigBoxs {
  width: 96.47%;
  margin-left: 1%;
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
.item .ppss {
  color: #4990e2;
  font-size: 14px;
}
.noppss {
  color: #999999;
  font-size: 14px;
}
.stopServer {
  font-size: 14px;
  color: #d0011b;
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
#dalos .el-dialog__wrapper .el-dialog {
  margin: 0 auto 50px !important;
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
  margin-top: 10px;
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

.shangjia {
  color: #4990e2;
}
</style>