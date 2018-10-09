<template>
    <div id="dalos">
     <Search @addChain='addChain' />
      <!-- 我是表格组件 -->
     <div class="bigBoxs">
       <el-table class="tableBox" v-loading="listLoading" :key="tableKey"  :data="gridData"  border fit highlight-current-row style="width:100%;">      
            <el-table-column property="startDate" label="创建日期"  align="center"  ></el-table-column>
            <el-table-column property="tardDate" label="交易日期"  align="center" ></el-table-column>
            <el-table-column property="channelName" label="渠道商名称"   align="center"></el-table-column>
            <el-table-column property="JSName" label="结算户名" width="99%"    align="center"></el-table-column>
            <el-table-column property="JSNum" label="结算账户"  align="center"></el-table-column>
            <el-table-column property="accountType" label="结算类型" width="99%" align="center"></el-table-column>
            <el-table-column  label="结算金额" width="85%"  align="center">
                <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">￥{{scope.row.rechargeMoney}}</span>
                </template>
            </el-table-column>     
            <el-table-column label="状态"  align="center"  width="99%">
                <template slot-scope="scope">
                <span type="text" size="small" class="ppss"  v-if="scope.row.statuss==1" >划付成功</span>
                <span type="text" size="small" class="stopServer" v-if="scope.row.statuss==2">等待划付</span>
                </template>
            </el-table-column>     
            <el-table-column  label="操作"   align="center" width="99%">
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
      <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="100" :total="100" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->

     <!-- 下面是详情模态框 -->
     <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss' top="10vh"   width="500px" >
       
        <div class="diaTilte"><div class="titleMotai">渠道商信息</div>
            <div class="item"><div class="abs">结账类型：</div><span>月结</span></div>
            <div class="item"><div class="abs">创建日期：</div><span>2017-10-01 10:10:10</span></div>
            <div class="item"><div class="abs">交易日期：</div><span>2017-10-01 10:10:10</span> </div>
            <div class="item"><div class="abs">渠道商类型：</div><span>普通渠道商</span></div>
            <div class="item"><div class="abs">所属渠道：</div><span>万达集团</span></div>
            <div class="item"><div class="abs">渠道商编号：</div><span>2001215487965221</span></div>
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
import Search from "./Search1.vue";
// import Details from "./Details.vue";
import waves from "@/directive/waves"; // 水波纹指令
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
export default {
  name: "Table1",
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
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
      gridData: [
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "2"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "2"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "2"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "2"
        },
        {
          startDate: "2018-09-10 10:10:10",
          tardDate: "2018-09-10 10:10:10",
          channelName: "成都一股云有限公司",
          JSName: "阿里巴巴",
          JSNum: "200854855255545",
          accountType: "T+1结算",
          rechargeMoney: "9000",
          statuss: "1"
        }
      ]
    };
  },
  components: {
    Search
    // Details
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

    //详情按钮
    handleClick(val) {
      this.multipleSelection = val;
      console.log(val);
      this.dialogTableVisible = true;
    },

    // 导出按钮
    daochuJump() {
      console.log("====================================");
      console.log("你点击了导出按钮");
      console.log("====================================");
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

    //删除功能
    deleted() {
      console.log(this.multipleSelection);
    },
    // 下面是添加模态框的方法
    submitAdd() {
      alert("添加成功");
    },
    // 取消按钮
    quxiao() {
      this.dialogTableVisible1 = false;
      this.dialogTableVisible2 = false;
    },
    //修改模态框提交
    submitChange() {
      alert("修改成功");
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