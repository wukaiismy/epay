<template>
    <div id="dalos">
     <Search  @channelSearch='channelSearch' />
      <!-- 我是表格组件 -->
     <div class="bigBoxs">
       <el-table class="tableBox" v-loading="listLoading" :key="tableKey"  :data="gridData"  border fit highlight-current-row style="width:100%;">      
            <el-table-column property="startDate" label="更新日期"  align="center"  width="95%"  ></el-table-column>
            <el-table-column property="sotreName" label="商户名称"  align="center"  ></el-table-column>
            <el-table-column property="sotreNum" label="商户编号"   align="center"></el-table-column>
            <el-table-column property="channelName" label="所属渠道商"     align="center"></el-table-column>
            <el-table-column property="channelNum" label="所属渠道商编号"  align="center"></el-table-column>
            <el-table-column property="tradP" label="交易频次"   width="99%" align="center"></el-table-column>
            <el-table-column property="riskType" label="风险类型"  width="99%"  align="center"></el-table-column>                 
            <el-table-column label="状态"  align="center"  width="99%">
                <template slot-scope="scope">
                    <span type="text" size="small" class="ppss"  v-if="scope.row.statuss==1">已处理</span>
                    <span type="text" size="small" class="stopServer" v-if="scope.row.statuss==2">未处理</span>
                    <span type="text" size="small" class="chulz"  v-if="scope.row.statuss==3">处理中</span>
                    <span type="text" size="small" class="noppss" v-if="scope.row.statuss==4">已暂停服务</span>
                </template>
            </el-table-column>     
            <el-table-column  label="操作"   align="center" >
                <template slot-scope="scope" >
                    <el-button  type="text" size="small" class="xiaz" @click="handleClick(scope.row)"  v-if="scope.row.statuss==1">处理详情</el-button>
                    <div  v-if="scope.row.statuss==2">
                        <el-button  type="text" size="small" class="ppss" @click="handleClick(scope.row)" >风险分析</el-button> 
                        <el-button  type="text" size="small" class="shanchu" @click="stopClick(scope.row)" >暂停服务</el-button>     
                     </div>
                     <div v-if="scope.row.statuss==3||scope.row.statuss==4">
                        <el-button  type="text" size="small" class="ppss" @click="handleClick(scope.row)" >风险分析</el-button> 
                        <el-button  type="text" size="small" class="noppss"  >已暂停服务</el-button>     
                     </div>
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
     <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss' top="20vh"   width="500px" >
       
        <div class="diaTilte"><div class="titleMotai">风险原因</div>
            <div class="item"><div class="abs">交易频率：</div><span>3.41</span></div>
            <div class="item"><div class="abs">高频次分析：</div><span>固定范围内用户高频次交易</span></div>
            <div class="item"><div class="abs">高频次体现：</div><span>无</span> </div>            
        </div>      
        <div class="diaTilte title2"><div class="titleMotai">处理记录</div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务</div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务 ，运营已核实，什么什么原因  </div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务 ，运营已核实，什么什么原因  </div>
            
       </div>          
      </el-dialog> 
       <!-- 详情模态框结束 -->
        <!-- 下面是暂停模态框 -->
     <el-dialog :visible.sync="dialogTableVisible1" custom-class='sssss' top="20vh"   width="500px" >       
        <div class="diaTilte"><div class="titleMotai">风险原因</div>
            <div class="item"><div class="abs">交易频率：</div><span>3.41</span></div>
            <div class="item"><div class="abs">高频次分析：</div><span>固定范围内用户高频次交易</span></div>
            <div class="item"><div class="abs">高频次体现：</div><span>无</span> </div>            
        </div>      
        <div class="diaTilte title2"><div class="titleMotai">处理记录</div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务</div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务 ，运营已核实，什么什么原因  </div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务 ，运营已核实，什么什么原因  </div>
            <div class="item1">
              <el-input type="textarea" style="width: 460px;" :autosize="{ minRows: 6, maxRows: 7}" placeholder="请输入内容" v-model="textarea3"></el-input>
            </div>
             <!-- 下面的选择按钮 -->
       <div class="item1 submit">      
          <el-button v-waves class="submmitBtn"   @click="submmitBtn">提交</el-button>
          <el-button v-waves class="stopBtn"    @click="stopBtn">暂停服务</el-button>
       </div> 
       </div>          
      </el-dialog> 
       <!-- 暂停模态框结束 -->
 </div>
</template>

<script>
import Search from "./Search.vue";
import waves from "@/directive/waves"; // 水波纹指令
import { MerchantRiskMsg } from "@/api/monitorCenter";
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
      textarea3: "",
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
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "2"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "3"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "4"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "2"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "3"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "4"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "3"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
          statuss: "1"
        },
        {
          startDate: "2018-09-10 10:10:10",
          sotreName: "阳关海岸会所",
          sotreNum: "158854855255545",
          channelName: "成都一股云有限公司",
          channelNum: "200854855255545",
          tradP: "3.40",
          riskType: "洗钱",
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
    //获取商户风险基本列表信息
    getList() {
      this.listLoading = true;
      console.log("商户风险表格基本信息");
      // MerchantRiskMsg("id").then(res => {
      //   console.log(res);
      // });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    //详情按钮
    handleClick(val) {
      this.multipleSelection = val;
      console.log(val);
      this.dialogTableVisible = true;
    },
    // 暂停服务
    stopClick(val) {
      console.log(val);
      this.dialogTableVisible1 = true;
    },
    // 模态框暂停风险的提交按钮
    submmitBtn() {
      console.log("你点击了提交按钮");
    },
    // 模态框暂停风险的暂停服务按钮
    stopBtn() {
      console.log("你点击了暂停服务按钮");
    },
    // 导出按钮
    daochuJump() {
      console.log("====================================");
      console.log("你点击了导出按钮");
      console.log("====================================");
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

.xiaz {
  font-size: 14px;
  color: #1c3672;
}
.shanchu {
  font-size: 14px;
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
.item .ppss,
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
  color: #d0011b;
}

.moneyStyles {
  font-size: 14px;
  color: #1c3672;
}
/* 下面是模态框的样式*/
#dalos .el-dialog__wrapper .el-dialog {
  margin: 0 auto 50px !important;
  padding: 0 20px 0 20px;
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
.item1 {
  position: relative;
  padding: 1px 20px 0px 20px;
  /* background-color: aqua; */
  min-height: 20px;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
}
.submit {
  margin-top: 30px;
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
.chulz {
  color: #f6a623;
}
.submmitBtn {
  background-image: linear-gradient(-180deg, #d1ddf6 0%, #ebf1fc 100%);
  border-radius: 4px;
  font-size: 14px;
  color: #1c3672;
  width: 180px;
  height: 36px;
}
.stopBtn {
  border: 1px solid #d0011b;
  border-radius: 4px;
  font-size: 14px;
  color: #d0011b;
  width: 180px;
  height: 36px;
  margin-left: 30px;
}
</style>