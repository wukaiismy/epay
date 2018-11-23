<template>
    <div id="dalos">
         <Search  @channelSearch='channelSearch' />
         <!-- 我是表格组件 -->
        <div class="bigBoxs">
          <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridDatas"  @selection-change="handleSelectionChange" border fit highlight-current-row style="width:100%;">     
               <el-table-column  align="center" type="selection" width="55"></el-table-column>
              <el-table-column property="create_at" label="交易日期" align="center" width="95%"></el-table-column>
              <el-table-column property="id" label="交易编号"  align="center"   ></el-table-column>
              <el-table-column property="username" label="用户姓名"  width="80%"  align="center"></el-table-column>
              <el-table-column property="merchent__name" label="商户名称"  align="center"></el-table-column>
              <el-table-column property="merchent__mechant_type" label="商户类型"  align="center"></el-table-column>
              <!-- <el-table-column property="lsStoreName" label="连锁商户名称"  align="center"></el-table-column> -->
              <el-table-column property="merchent__channel__name" label="渠道商名称"  align="center"></el-table-column>
              <el-table-column  label="交易金额" width="85%"  align="center">
                <template slot-scope="scope">
                  <span type="text" size="small" class="moneyStyles">￥{{scope.row.amount| toThousandFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column  label="支付方式"  align="center">
                 <template slot-scope="scope">
                  <span type="text" size="small" class="moneyStyles">担保账户+信条支付</span>
                </template>
              </el-table-column>
              <el-table-column property="payAccont" label="退款账户"  align="center"></el-table-column>
              <el-table-column label="状态"  align="center"  width="95%">
                <template slot-scope="scope">
                  <span type="text" size="small" class="noppss"  v-if="scope.row.status==1" >线下已处理</span>
                  <span type="text" size="small" class="shangjia" v-if="scope.row.status==2">退款成功</span>
                  <span type="text" size="small" class="xiaz" v-if="scope.row.status==3">退款失败</span>
                </template>
              </el-table-column>              
              <el-table-column  label="操作"   align="center" width="90%">
                <template slot-scope="scope" >
                  <el-button  type="text" size="small" class="moneyStyles" @click="passsubmit(scope.row)">详情</el-button>                 
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
          <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
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
                <!-- <div class="item"><div class="abs">信条账户：</div><span>90215487965221</span></div> -->
                <div class="item"><div class="abs">支付状态：</div><span class="ppss">支付成功</span></div>
            </div>

            <div class="diaTilte title2"><div class="titleMotai">用户信息</div>
                <div class="item"><div class="abs">用户姓名：</div><span class="shangjia">张学友</span></div>
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
               <div class="item"><div class="abs">退款金额：</div><span>￥3000.00</span></div>
               <div class="item"><div class="abs">退款状态：</div><span class="ppss">退款成功</span></div>
            </div>          
      </el-dialog>
   </div>
</template>

<script>
import Search from "./Search.vue";
import waves from "@/directive/waves"; // 水波纹指令
import { merchantMsg, merchantDetail, merchantDownload } from "@/api/vi";
export default {
  name: "Table1",
  directives: {
    waves
  },
  data() {
    return {
      pages: {
        currentPage: 2,
        page: 1,
        size: 10
      },
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      dialogTableVisible: false,
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

      detailMsg: {},
      changeMsg: {},
      gridDatas: []
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
      this.pages.page = 1;
      this.pages.size = 10;
      var datas = {
        merchant_name: data.storeName,
        merchantid: data.storeNums,
        id1: data.tardNum,
        channelid: data.channelsNum,
        channel_name: data.channels,
        begin_time: data.date[0],
        end_time: data.date[1],
        status: data.statuss
      };
      // console.log(datas);
      this.getList(datas);
    },
    //   获取数据啊
    getList(data) {
      this.listLoading = true;
      console.log("用户退款表格基本信息");
      var basicURL =
        "/backend/api/v1/record/expenselist/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      merchantMsg(basicURL, data).then(res => {
        console.log(res);
        var dataList = res.data.data.ret;
        console.log(dataList);
        for (var i = 0; i < dataList.length; i++) {
          dataList[i].create_at = dataList[i].create_at.split("T").join(" ");
        }
        this.total = res.data.data.count;
        this.gridDatas = dataList;
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val);
    },
    // 批量的数据处理
    dataDeal() {
      var dataList = [];
      this.multipleSelection.forEach(function(v) {
        dataList.push(v.id);
      });
      var datas = { ids: dataList.join(",") };
      return datas;
    },
    // 详情按钮
    passsubmit(data) {
      this.dialogTableVisible = true;
      console.log(data);
      var detailURL = "/backend/api/v1/record/expenseid/";
      // merchantDetail(detailURL,data.id).then(res => {
      //   console.log(res);
      // this.detailMsg=data
      // });
    },

    // 导出按钮
    daochuJump() {
      console.log("导出按钮");
      var DownloadURL = "/backend/api/v1/record/expensetoexcel/";
      merchantDownload(DownloadURL, this.dataDeal()).then(res => {
        console.log(res);
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", "商户交易.xls");
        document.body.appendChild(link);
        link.click();
      });
    },

    //分页功能选择
    handleSizeChange(val) {
      console.log("选择个数");
      this.pages.size = val;
      this.getList();
    },
    //分页功能选择
    handleCurrentChange(val) {
      console.log("选择分页");
      this.pages.page = val;
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