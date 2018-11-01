<template>
    <div>
      <Search   @channelSearch='channelSearch'/>
      <!-- 我是表格组件 -->
      <div class="bigBoxs">
        <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridDatas" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column property="create_time" label="创建日期"  align="center"  width="95%"  ></el-table-column>
          <!-- <el-table-column property="NewDate" label="更新日期"  align="center"  width="95%"  ></el-table-column> -->
          <el-table-column property="user_name" label="用户姓名"  width="80%"  align="center"></el-table-column>
          <el-table-column property="userTel" label="电话"     align="center"></el-table-column>
          <!-- <el-table-column property="userAccount" label="用户账号"  align="center"></el-table-column> -->
          <el-table-column property="prepaid_card_id" label="预付卡账号"  align="center"></el-table-column>
          <el-table-column property="prepaid_card__merchant_name" label="商户名称"  align="center"></el-table-column>
          <!-- <el-table-column property="sotreJC" label="商户简称" width="85%"  align="center"></el-table-column> -->
          <el-table-column property="prepaid_card__merchant__channel__name" label="所属渠道商"  align="center"></el-table-column>
          <el-table-column label="充值金额"  align="center"  width="95%">
            <template slot-scope="scope">
              <span type="text" size="small" class="moneyStyles">{{scope.row.prepaid_card__amount| toThousandFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会员机制"  align="center" >
            <template slot-scope="scope">
              <span type="text" size="small" class="moneyStyles">赠送￥{{scope.row.prepaid_card__gift| toThousandFilter}}</span>
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
      <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->

     <!-- 下面是详情模态框啊 -->
      <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss'   width="500px" >
          <div class="diaTilte"><div class="titleMotai">用户信息</div>
             <div class="item"><div class="abs">创建日期：</div><span>2017-10-01 10:10:10</span></div>
             <div class="item"><div class="abs">更新日期：</div><span>2018-10-01 10:10:10</span> </div>
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
            
         <div class="diaTilte title2"><div class="titleMotai">预付卡信息</div>
              <div class="item"><div class="abs">预付卡账户：</div><span class="">1120 1100 0000 0000 020</span></div>
              <div class="item"><div class="abs">账户充值总额：</div><span>￥9999.99</span></div>
              <div class="item"><div class="abs">账户充值：</div><span>￥9999</span></div>
              <div class="item"><div class="abs">会员机制：</div><span>￥9999</span></div>
              <div class="item"><div class="abs">剩余总额：</div><span>￥9999</span></div>
              <div class="item"><div class="abs">剩余本金：</div><span>￥9999</span></div>
              <div class="item"><div class="abs">剩余赠送：</div><span>￥9999</span></div>
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
      var searchURL = "prepaid/merchantprepa/";
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
        "prepaid/userprepa/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      console.log("用户交易表格基本信息");
      merchantMsg(basicURL).then(res => {
        console.log(res);
        var dataList = res.data.data.ret;
        console.log(dataList);
        for (var i = 0; i < dataList.length; i++) {
          dataList[i].create_time = dataList[i].create_time
            .split("T")
            .join(" ");
        }
        this.total = res.data.data.count;
        this.gridDatas = dataList;
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 详情按钮
    passsubmit(data) {
      console.log("你点击了详情按钮");
      this.dialogTableVisible = true;
      var detailURL = "incoming/channellist/";
      // merchantDetail(detailURL,data.userAccount).then(res => {
      //   console.log(res);
      // this.detailMsg=data
      // })
    },

    // 激活按钮
    jihuoJump() {
      console.log("你点击了激活");
      var ActiveURL = "incoming/channellist/";
      // userActivation(ActiveURL,this.multipleSelection ).then(res => {
      //   console.log(res);
      // this.detailMsg=data
      // })
    },

    // 锁卡按钮
    suoka() {
      console.log("你点击了锁卡按钮");
      var LockCardURL = "incoming/channellist/";
      // userLockCard(LockCardURL,this.multipleSelection ).then(res => {
      //   console.log(res);
      // this.detailMsg=data
      // })
    },

    // 导出按钮
    daochuJump() {
      console.log("导出按钮");
      var DownloadURL = "incoming/channelact";
      // merchantDownload(DownloadURL,this.multipleSelection).then(res => {
      //   console.log(res);
      // this.msg=data
      // });
    },

    //分页功能选择
    handleSizeChange(val) {
      this.getList();
      this.pages.size = val;
      console.log(val);
    },
    //分页功能选择
    handleCurrentChange(val) {
      console.log("选择分页");
      this.pages.page = val;
      console.log(val);
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
</style>