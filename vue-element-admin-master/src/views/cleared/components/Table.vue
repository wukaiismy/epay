<template>
    <div id="dalos">
     <Search  @channelSearch='channelSearch'/>
      <!-- 我是表格组件 -->
     <div class="bigBoxs">
       <el-table class="tableBox" v-loading="listLoading" :key="tableKey"  :data="gridData"  @selection-change="handleSelectionChange"  border fit highlight-current-row style="width:100%;">      
             <el-table-column  align="center" type="selection" width="55"></el-table-column>
            <el-table-column property="startDate" label="创建日期"  align="center"  width="95%"  ></el-table-column>
            <el-table-column property="tardDate" label="交易日期"  align="center" width="95%"  ></el-table-column>
            <el-table-column property="payTardNum" label="信条交易号"   align="center"></el-table-column>
            <el-table-column property="sotreName" label="商户名称"     align="center"></el-table-column>
            <!-- <el-table-column property="sotreJC" label="商户简称"  align="center"></el-table-column> -->
            <el-table-column property="channelName" label="所属渠道商"  align="center"></el-table-column>
            <el-table-column property="JSName" label="结算户名"  align="center"></el-table-column>
            <el-table-column property="JSNum" label="结算账户"  align="center"></el-table-column>
            <el-table-column  label="结算金额" width="85%"  align="center">
                <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">￥{{scope.row.rechargeMoney| toThousandFilter}}</span>
                </template>
            </el-table-column>     
            <el-table-column label="状态"  align="center"  width="95%">
                <template slot-scope="scope">
                <span type="text" size="small" class="ppss"  v-if="scope.row.statuss==1" >划付成功</span>
                <span type="text" size="small" class="stopServer" v-if="scope.row.statuss==2">划付失败</span>
                </template>
            </el-table-column>     
            <el-table-column  label="操作"   align="center" width="90%">
                <template slot-scope="scope" >
                    <el-button  type="text" size="small" class="xiaz" @click="handleClick(scope.row)" >详情</el-button>    
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
      <el-pagination v-show="total>0" :current-page="pages.page" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->

     <!-- 下面是详情模态框 -->
     <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss' top="10vh"   width="500px" >
       
        <div class="diaTilte"><div class="titleMotai">商户信息</div>
            <div class="item"><div class="abs">创建日期：</div><span>2017-10-01 10:10:10</span></div>
            <div class="item"><div class="abs">交易日期：</div><span>2017-10-01 10:10:10</span></div>
            <div class="item"><div class="abs">商户类型：</div><span>连锁商户</span> </div>
            <div class="item"><div class="abs">支付方式：</div><span>担保账户支付</span></div>
            <div class="item"><div class="abs">连锁/直营商户名称：</div><span>万达集团</span></div>
            <div class="item"><div class="abs">连锁/直营商户编号：</div><span>2001215487965221</span></div>
            <div class="item"><div class="abs">子商户名称：</div><span>金桔联盟</span></div>
            <div class="item"><div class="abs">子商户编号：</div><span>90215487965221</span></div>
            <div class="item"><div class="abs">所属渠道商：</div><span>成都易付云公司</span></div>
            <div class="item"><div class="abs">渠道商编号：</div><span>10015487965221</span></div>
            <div class="item"><div class="abs">所属银行：</div><span>上海银行</span></div>
        </div>
      
        <div class="diaTilte title2"><div class="titleMotai">结算信息</div>
            <div class="item"><div class="abs">平台子账户：</div><span>10015487965221</span></div>
            <div class="item"><div class="abs">结算状态：</div><span class="shangjia">结算成功</span></div>
            <div class="item"><div class="abs">结算金额：</div><span>￥3000.00</span></div>
            <div class="item"><div class="abs">结算类型：</div><span>企业</span></div>
            <div class="item"><div class="abs">结算户名：</div><span>张学友</span></div>
            <div class="item"><div class="abs">结算银行：</div><span>上海银行</span></div>
            <div class="item"><div class="abs">结算账户：</div><span>200 22251 00265 222</span></div>
       </div>          
      </el-dialog> 
 </div>
</template>

<script>
import Search from "./Search.vue";
import waves from "@/directive/waves"; // 水波纹指令
import { merchantMsg, merchantDetail, merchantDownload } from "@/api/cleared";

export default {
  name: "Table",
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
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      gridData: [
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          payTardNum: "158854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳关海岸",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          rechargeMoney: "9000",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          payTardNum: "158854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳关海岸",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          rechargeMoney: "9000",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          payTardNum: "158854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳关海岸",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          rechargeMoney: "9000",
          statuss: "2"
        }
      ],
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
        merchant_id: data.storeNums,
        channel_id: data.channelsNum,
        channel_name: data.channels,
        begin_time: data.date[0],
        end_time: data.date[1],
        status: data.payStatus,
        bank_cardid: data.setAccount
      };
      // console.log(datas);
      this.getList(datas);
    },
    // 获取商户结算基本列表信息
    getList(data) {
      this.listLoading = true;
      console.log("商户结算表格基本信息");
      var basicURL =
        "/backend/api/v1/statements/showmerchant/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      merchantMsg(basicURL, data).then(res => {
        console.log(res);
        // var dataList = res.data.data.ret;
        // console.log(dataList);
        // for (var i = 0; i < dataList.length; i++) {
        //   dataList[i].create_at = dataList[i].create_at.split("T").join(" ");
        // }
        this.total = res.data.data.count;
        // this.gridDatas = dataList;
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
      dataList.push(0);
      var datas = { ids: dataList.join(",") };
      return datas;
    },
    //详情按钮
    handleClick(val) {
      console.log(val);
      this.dialogTableVisible = true;
      var detailURL = "/backend/api/v1/statements/showmerchant/";
      console.log("你点击了详情按钮");
      // merchantDetail(detailURL,val.id).then(res => {
      //   console.log(res);
      // this.detailMsg=data
      // });
    },

    // 导出按钮
    daochuJump() {
      console.log("导出按钮");
      // var DownloadURL = "record/expensetoexcel/";
      // merchantDownload(DownloadURL, this.dataDeal()).then(res => {
      //   console.log(res);
      //   let url = window.URL.createObjectURL(new Blob([res.data]));
      //   let link = document.createElement("a");
      //   link.style.display = "none";
      //   link.href = url;
      //   link.setAttribute("download", "商户结算.xls");
      //   document.body.appendChild(link);
      //   link.click();
      // });
    },

    //分页功能选择
    handleSizeChange(val) {
      console.log("选择个数");
      this.pages.size = val;
      this.pages.page = 1;
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
  color: #1c3672;
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