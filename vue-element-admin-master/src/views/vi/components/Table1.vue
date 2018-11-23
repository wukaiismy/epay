<template>
    <div>
      <Search   @channelSearch='channelSearch'/>
      <!-- 我是表格组件 -->
      <div class="bigBoxs">
        <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridDatas" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column property="create_at" label="创建日期"  align="center"  width="95%"  ></el-table-column>
          <!-- <el-table-column property="NewDate" label="更新日期"  align="center"  width="95%"  ></el-table-column> -->
          <el-table-column property="user_name" label="用户姓名"  width="80%"  align="center"></el-table-column>
          <el-table-column property="user_mobile" label="电话"     align="center"></el-table-column>
          <!-- <el-table-column property="userAccount" label="用户账号"  align="center"></el-table-column> -->
          <el-table-column property="user_account" label="用户账户"  align="center"></el-table-column>
          <el-table-column property="merchant_name" label="商户名称"  align="center"></el-table-column>
          <!-- <el-table-column property="sotreJC" label="商户简称" width="85%"  align="center"></el-table-column> -->
          <el-table-column property="channel_name" label="所属渠道商"  align="center"></el-table-column>
          <el-table-column label="充值金额"  align="center"  width="95%">
            <template slot-scope="scope">
              <span type="text" size="small" class="moneyStyles">{{scope.row.amount.toString()| toThousandFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会员机制"  align="center" >
            <template slot-scope="scope">
              <span type="text" size="small" class="moneyStyles">赠送￥{{scope.row.gift.toString()| toThousandFilter}}</span>
            </template>
          </el-table-column>       
          <!-- <el-table-column label="剩余金额"  align="center"  width="95%">
            <template slot-scope="scope">
              <span type="text" size="small" class="moneyStyles">￥{{scope.row.rechargeAllMoney| toThousandFilter}}</span>
            </template>
          </el-table-column> -->
          <el-table-column  label="状态"  align="center" width="80%" >
            <template slot-scope="scope">
              <span type="text" size="small" class="ppss"  v-if="scope.row.status==1" >激活</span>
              <span type="text" size="small" class="stopServer" v-if="scope.row.status==2">锁卡</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作"   align="center" width="90%">
            <template slot-scope="scope" >
              <el-button @click="passsubmit(scope.row)" type="text" size="small" class="xiaz" >详情</el-button>            
            </template>
          </el-table-column>    
        </el-table>
    <!-- 下面的选择按钮 -->
    <div class="allChose">
       <el-button v-waves class="searchs" plain type="primary" @click="jihuoJump">激活</el-button>
       <el-button v-waves class="searchs" type="danger" plain  @click="suoka">锁卡</el-button>
       <el-button v-waves class="searchs" type="primary"  icon="el-icon-download"  @click="daochuJump">导出</el-button>
    </div> 
  </div>
     <!-- 分页功能 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="pages.page" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->

     <!-- 下面是详情模态框啊 -->
      <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss'  top="10vh"  width="500px" >
          <div class="diaTilte"><div class="titleMotai">用户信息</div>
             <div class="item"><div class="abs">创建日期：</div><span>{{userMsg.create_at}}</span></div>
             <div class="item"><div class="abs">更新日期：</div><span>{{userMsg.update_at}}</span> </div>
             <div class="item"><div class="abs">用户姓名：</div><span>{{userMsg.user_name}}</span></div>
             <div class="item"><div class="abs">信条账号：</div><span>{{userMsg.user_account}}</span></div>
             <div class="item"><div class="abs">电话号码：</div><span>{{userMsg.user_mobile}}</span></div>              
          </div>
          <div class="diaTilte title2"><div class="titleMotai">商户信息</div>
             <div class="item"><div class="abs">商户名称：</div><span class="shangjia">{{detailMsg.merchant_name}}</span></div>         
             <div class="item"><div class="abs">商户编号：</div><span>{{detailMsg.merchant_id}}</span></div>
             <div class="item"><div class="abs">所属渠道：</div><span>{{detailMsg.channel_name}}</span></div>
             <div class="item"><div class="abs">渠道商编号：</div><span>{{detailMsg.channel_id}}</span></div>
             <div class="item"><div class="abs">所属银行：</div><span>{{detailMsg.bank_name}}</span></div>
             <div class="item"><div class="abs">所属银行编号：</div><span>{{detailMsg.bank_id}}</span></div>
         </div>
            
         <div class="diaTilte title2"><div class="titleMotai">预付卡信息</div>
         <el-table class="tableBox B1" v-loading="listLoading" :key="tableKey" :data="prepaMsg" border fit highlight-current-row style="width:90%;">
          <el-table-column property="prepaid_name" label="预付卡名称"   align="center"></el-table-column>
          <el-table-column property="prepaid_id" label="预付卡ID"     align="center"></el-table-column>         
          <el-table-column property="amount" label="充值"  align="center"></el-table-column>
          <el-table-column property="gift" label="赠送"  align="center"></el-table-column>            
        </el-table>
              
          </div>             
      </el-dialog>
  </div>
</template>

<script>
import Search from "./search1.vue";
import waves from "@/directive/waves"; // 水波纹指令
import {
  merchantMsg,
  merchantDetail,
  prepaDetail,
  userActivation,
  userLockCard,
  accountSearch,
  merchantDownload
} from "@/api/vi";
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
      userMsg: {},
      detailMsg: {},
      prepaMsg: {},
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
        prepaid: data.danbao,
        channelid: data.channelsNum,
        channel_name: data.channels,
        begin_time: data.date[0],
        end_time: data.date[1]
      };
      console.log(datas);
      this.getList(datas);
    },
    // 获取用户交易基本列表信息
    getList(data) {
      this.listLoading = true;
      var basicURL =
        "/backend/api/v1/prepaid/userprepa/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      console.log("用户交易表格基本信息");
      merchantMsg(basicURL).then(res => {
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
    // 提示框函数
    message(msg, status) {
      this.$message({
        message: msg,
        type: status
      });
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 详情按钮
    passsubmit(data) {
      console.log("你点击了详情按钮");
      console.log(data);
      this.userMsg = data;
      this.userMsg.update_at = this.userMsg.update_at.split("T").join(" ");
      var detailURL = "/backend/api/v1/prepaid/userprepaid/";
      merchantDetail(detailURL, data.user_account).then(res => {
        console.log(res);
        this.detailMsg = res.data;
        if (res.data.merchant_id) {
          var preURL = "/backend/api/v1/prepaid/userprepaidlist/";
          var prepaList = {
            id: data.user_account,
            user_id: res.data.user_id,
            merchant_id: res.data.merchant_id
          };
          console.log(prepaList);
          prepaDetail(preURL, prepaList).then(res => {
            console.log(res);
            this.prepaMsg = res.data.data.ret;
            console.log(this.prepaMsg);
            this.dialogTableVisible = true;
          });
        }
      });
    },

    // 激活按钮
    jihuoJump() {
      console.log("你点击了激活");
      var ActiveURL = "/backend/api/v1/incoming/channellist/";
      // userActivation(ActiveURL,this.multipleSelection ).then(res => {
      //   console.log(res);
      // this.detailMsg=data
      // })
    },

    // 锁卡按钮
    suoka() {
      console.log("你点击了锁卡按钮");
      var LockCardURL = "/backend/api/v1/incoming/channellist/";
      // userLockCard(LockCardURL,this.multipleSelection ).then(res => {
      //   console.log(res);
      // this.detailMsg=data
      // })
    },

    // 导出按钮
    daochuJump() {
      console.log("导出按钮");
      var DownloadURL = "/backend/api/v1/incoming/channelact";
      // merchantDownload(DownloadURL,this.multipleSelection).then(res => {
      //   console.log(res);
      // this.msg=data
      // });
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
.B1 {
  width: 90%;
  background-color: #4990e2;
  margin: 20px auto 0px;
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
.el-dialog,
.sssss {
  /* margin: 0 auto 20px; */
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
  padding: 1px 0 1px 0;
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