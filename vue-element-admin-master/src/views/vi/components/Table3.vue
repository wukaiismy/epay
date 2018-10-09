<template>
    <div>
       <Search @addChain='addChain' />
       <!-- 我是表格组件 -->
       <div class="bigBoxs">
          <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridData" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column property="date" label="创建日期"  align="center"  width="95%"  ></el-table-column>
            <el-table-column property="NewDate" label="更新日期"  align="center"  width="95%"  ></el-table-column>
            <el-table-column property="userName" label="用户姓名"  width="80%"  align="center"></el-table-column>
            <el-table-column property="userTel" label="电话"     align="center"></el-table-column>
            <el-table-column property="userAccount" label="用户账号"  align="center"></el-table-column>
            <el-table-column property="yajinNum" label="押金单号"  align="center"></el-table-column>
            <el-table-column property="sotreName" label="商品名称"  align="center"></el-table-column>
            <el-table-column property="sotreJC" label="商户简称" width="85%"  align="center"></el-table-column>
            <el-table-column property="sotreQudao" label="所属渠道商"  align="center"></el-table-column>
            <el-table-column label="押金总额"  align="center"  width="95%">
              <template slot-scope="scope">
                  <span type="text" size="small" class="moneyStyles">￥{{scope.row.yajinAllMoney}}</span>
              </template>
            </el-table-column>      
            <el-table-column  label="状态"  align="center" width="80%" >
              <template slot-scope="scope">
                <span type="text" size="small" class="stopServer"  v-if="scope.row.statuss==1" >冻结中</span>
                <span type="text" size="small" class="ppss" v-if="scope.row.statuss==2">已解压</span>              
              </template>
            </el-table-column>    
            <el-table-column  label="操作"   align="center" width="100%">
              <template slot-scope="scope" >
                <el-button @click="passsubmit(scope.row)" type="text" size="small" class="xiaz" >详情</el-button>
                <el-button @click="jieyaJump1(scope.row)" type="text"  size="small" class="ppss" v-if="scope.row.statuss==1" >解压</el-button>
              </template>
            </el-table-column>           
         </el-table>
        <!-- 下面的选择按钮 -->
        <div class="allChose">
          <el-button v-waves class="searchs" plain type="primary" @click="jieyaJump">解压</el-button>   
          <el-button v-waves class="searchs" type="primary"  icon="el-icon-download"  @click="daochuJump">导出</el-button>
        </div> 
      </div>
      <!-- 分页功能 -->
      <div class="pagination-container">
        <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="100" :total="100" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </div>
      <!-- 主体内容结束 -->

     <!-- 下面是详情模态框啊 -->
      <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss'   width="500px" >
           <div class="diaTilte"><div class="titleMotai">用户信息</div>
              <div class="item"><div class="abs">创建日期：</div><span>2017-10-01 10:10:10</span></div>
              <div class="item"><div class="abs">更新日期：</div><span>2018-10-01 10:10:10</span></div>
              <div class="item"><div class="abs">用户姓名：</div><span>刘德华</span></div>
              <div class="item"><div class="abs">信条账号：</div><span>2000120128578</span></div>
              <div class="item"><div class="abs">电话号码：</div><span>13555565847</span></div>             
           </div>
           <div class="diaTilte title2"><div class="titleMotai">商户信息</div>
              <div class="item"><div class="abs">商户名称：</div><span class="shangjia">简乐互动游戏公司</span></div>
              <div class="item"><div class="abs">商户简称：</div><span>简乐互动</span></div>
              <div class="item"><div class="abs">商户编号：</div><span>2000121455</span></div>
              <div class="item"><div class="abs">所属渠道：</div><span>阿里巴巴集团</span></div>
              <div class="item"><div class="abs">渠道商编号：</div><span>1120110000000000020</span></div>
              <div class="item"><div class="abs">所属银行：</div><span>华夏银行</span></div>
              <div class="item"><div class="abs">所属银行编号：</div><span>110000000000020</span></div>
           </div>
            
           <div class="diaTilte title2"><div class="titleMotai">押金信息</div>
              <div class="item"><div class="abs">押金单号：</div><span class="">1120 1100 0000 0000 020</span></div>
              <div class="item"><div class="abs">押金总额：</div><span>￥9999.99</span></div>
              <div class="item"><div class="abs">押金状态：</div><span class="stopServer">冻结中</span></div>
              <div class="item"><div class="abs">冻结时间：</div><span>2018-10-01 10:01:10</span></div>
              <div class="item"><div class="abs">预计解冻时间：</div><span>2018-10-01 10:01:10</span></div>
              <div class="item"><div class="abs">解冻机制：</div><span class="shuoms" >到期自动解冻／手动解冻／用户方发起解冻确认</span></div>             
           </div>        
      </el-dialog>   

   </div>
</template>

<script>
import Search from "./SearchUser.vue";
// import Details from "./Details.vue";
import waves from "@/directive/waves"; // 水波纹指令
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
export default {
  name: "Table3",
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
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "2"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          NewDate: "2018-09-10 10:11：00",
          userName: "吴奇隆",
          userTel: "19902565214",
          userAccount: "158854855255545",
          yajinNum: "3008854855255545",
          sotreName: "阳关海岸会所",
          sotreJC: "阳光海岸",
          sotreQudao: "成都一股云有限公司",
          yajinAllMoney: "9000",
          statuss: "2"
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
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 详情按钮
    passsubmit(data) {
      console.log("====================================");
      console.log("你点击了详情按钮");
      this.dialogTableVisible = true;
      console.log(data);
      console.log("====================================");
    },
    // 表格右边单个解压按钮
    jieyaJump1(data) {
      console.log("====================================");
      console.log("你点击了单个解压");
      console.log("====================================");
      this.jieyaJump();
    },
    // 解压按钮
    jieyaJump() {
      console.log("====================================");
      console.log("你点击了解压");
      console.log("====================================");
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
.ppss {
  color: #4990e2;
  font-size: 14px;
}
.noppss {
  color: #999999;
  font-size: 14px;
}
.item .stopServer {
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
.item .shuoms {
  display: inline-block;
  width: 46.17%;
  height: 50px;
  font-size: 12px;
  color: #1c3672;
  line-height: 20px;
  margin-top: 10px;
}
</style>