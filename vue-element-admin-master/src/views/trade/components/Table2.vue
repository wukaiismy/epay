<template>
    <div id="dalos">
         <Search @addChain='addChain' />
         <!-- 我是表格组件 -->
         <div class="bigBoxs">
            <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridData" border fit highlight-current-row style="width:100%;">      
                <el-table-column property="date" label="交易日期"  align="center"  width="95%"  ></el-table-column>
                <el-table-column property="tardNum" label="交易编号"  align="center"   ></el-table-column>
                <el-table-column property="userName" label="用户姓名"  width="80%"  align="center"></el-table-column>
                <el-table-column property="sotreName" label="商户名称"     align="center"></el-table-column>
                <el-table-column property="sotreType" label="商户类型"  align="center"></el-table-column>
                <el-table-column property="lsStoreName" label="连锁商户名称"  align="center"></el-table-column>
                <el-table-column property="qdName" label="渠道商名称"  align="center"></el-table-column>
                <el-table-column  label="交易金额" width="85%"  align="center">
                  <template slot-scope="scope">
                    <span type="text" size="small" class="moneyStyles">￥{{scope.row.rechargeMoney}}</span>
                  </template>
                </el-table-column>
                  <el-table-column property="payFcu" label="支付方式"  align="center"></el-table-column>
                <el-table-column label="状态"  align="center"  width="95%">
                  <template slot-scope="scope">
                    <span type="text" size="small" class="shangjia"  v-if="scope.row.statuss==1" >已处理</span>
                    <span type="text" size="small" class="stopServer" v-if="scope.row.statuss==2">未处理</span>
                  </template>
                </el-table-column>               
                <el-table-column  label="操作" align="center" width="90%">
                  <template slot-scope="scope" >
                    <span type="text" size="small" class="moneyStyles"  v-if="scope.row.statuss==1"  @click="handleClick(scope.row)" >详情</span>
                    <span type="text" size="small" class="chuli" v-if="scope.row.statuss==2"  @click="abOrder(scope.row)">立即处理</span>                   
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
            <div class="diaTilte"><div class="titleMotai">异常交易处理详情</div>
                <div class="item"><div class="abs">异常原因：</div><span>PDS子账号交易失败</span></div>
                <div class="item"><div class="abs">处理结果：</div><span class="ppss">已处理</span></div>
                <div class="item"><div class="abs">处理详情：</div><span class=" shuoms ">设置后，到期自动解押；我的话说完，否则需要手动解押，谁赞成谁反对？</span></div>
                <div class="item"><div class="abs">处理人：</div><span>张娜拉</span></div>
                <div class="item"><div class="abs">处理账号：</div><span>1000000000020.mch</span></div>             
            </div>           
        </el-dialog>
        <!-- 详情展示页结束 -->

         <!-- 异常处理模态框开始 -->
        <el-dialog :visible.sync="dialogTableVisible1" custom-class='sssss' top="10vh"   width="500px" >
            <div class="diaTilte"><div class="titleMotai">异常交易处理详情</div>
               <div class="item"><div class="abs">异常原因：</div><span><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.abReason" placeholder="请输入异常原因"></el-input></span></div>
               <div class="item"><div class="abs">处理结果：</div><span >
                 <el-radio v-model="msg.status" label="1">已处理</el-radio>
                 <el-radio v-model="msg.status" label="2">未处理</el-radio>
                </span></div>
              <div class="item"><div class="abs">处理详情：</div><span class=" shuoms "><el-input type="textarea" autosize placeholder="请输入处理详情" v-model="msg.detail"></el-input></span></div>
              <div class="item"><div class="abs">处理人：</div><span><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.abUser" placeholder=""></el-input></span></div>
              <div class="item"><div class="abs">处理账号：</div><span><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.abUserNum" placeholder="请输入处理账号"></el-input></span></div> 
              <!-- 下面是按钮 -->
              <div class="btnBox">
                  <el-button class="btnsubs"   @click="submitAdd">确定</el-button>
                </div>             
            </div>         
      </el-dialog>
  </div>
</template>

<script>
import Search from "./Search.vue";
// import Details from "./Details.vue";
import waves from "@/directive/waves"; // 水波纹指令
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
export default {
  name: "Table2",
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
      msg: {
        abReason: "",
        status: "1",
        detail: "",
        abUser: "",
        abUserNum: ""
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
          statuss: "2"
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
          statuss: "2"
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
          statuss: "2"
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
          statuss: "2"
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
          statuss: "2"
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
    //    异常订单处理
    abOrder(val) {
      console.log(val);

      this.dialogTableVisible1 = true;
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
  cursor: pointer;
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
  padding: 1px 0 0 0;
  /* background-color: aqua; */
  min-height: 20px;
  text-align: left;
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
.chuli {
  color: #f66d23;
  cursor: pointer;
}
.item .shuoms {
  display: inline-block;
  width: 46.17%;
  margin-top: 10px;
  font-size: 12px;
  color: #333333;
  line-height: 20px;
}
.btnBox {
  position: relative;
  top: 30px;
  width: 100%;
  height: 40px;
  text-align: center;
}
.btnsubs {
  width: 240px;
  height: 40px;
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
  border-radius: 4px;
  font-size: 16px;
  color: #1c3672;
}
</style>