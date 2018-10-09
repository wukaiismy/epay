<template>
    <div>
      <Search @addChain='addChain' />
      <!-- 我是表格组件 -->
        <div class="bigBoxs">
           <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridData" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
              <el-table-column align="center" type="selection" width="55"> </el-table-column>
              <el-table-column property="date" label="创建日期"  align="center" ></el-table-column>
              <el-table-column property="danbaoNum" label="担保账户编号"  align="center"></el-table-column>
              <el-table-column property="danbaoName" label="担保账户名称"  align="center"></el-table-column>
              <el-table-column property="sotreName" label="连锁/直营商户名称"  align="center"></el-table-column>
              <el-table-column property="sonSotreName" label="子商户"  align="center"></el-table-column>
              <el-table-column property="sotreQudao" label="所属渠道商"  align="center"></el-table-column>
              <el-table-column label="押金金额"  align="center"  width="95%">
                <template slot-scope="scope">
                  <span type="text" size="small" class="moneyStyles">￥{{scope.row.rechargeMoney}}</span>
                </template>
              </el-table-column>  
              <el-table-column  label="押金期限"  align="center"  width="80%">
                 <template slot-scope="scope">
                  <span type="text" size="small" class="moneyStyles">{{scope.row.Days}}天</span>
                </template>
              </el-table-column>
              <el-table-column label="押金笔数"  align="center"  width="95%">
                <template slot-scope="scope">
                  <span type="text" size="small" class="moneyStyles">{{scope.row.rechargeNum}}</span>
                </template>
              </el-table-column>
              <el-table-column label="押金总额"  align="center"  width="90%">
                  <template slot-scope="scope">
                    <span type="text" size="small" class="moneyStyles">￥{{scope.row.rechargeAllMoney}}</span>
                </template>
              </el-table-column>
              <el-table-column  label="状态"  align="center" width="80%" >
                <template slot-scope="scope">
                  <span type="text" size="small" class="ppss"  v-if="scope.row.statuss==1" >上架中</span>
                  <span type="text" size="small" class="noppss" v-if="scope.row.statuss==2">已下架</span>
                  <span type="text" size="small" class="stopServer" v-if="scope.row.statuss==3">暂停服务</span>
                </template>
              </el-table-column>      
              <el-table-column  label="操作"   align="center" width="90%">
                <template slot-scope="scope" >
                  <el-button @click="passsubmit(scope.row)" type="text" size="small" class="xiaz" >详情</el-button>
                  <el-button type="text" size="small" class="shanchu" @click="returnsubmit(scope.row)">修改</el-button>
                </template>
              </el-table-column>     
      </el-table>
      <!-- 下面的选择按钮 -->
      <div class="allChose">
          <el-button v-waves class="searchs" plain type="primary" @click="jihuoJump">批量上架</el-button>
          <el-button v-waves class="searchs" plain  @click="passJump">批量下架</el-button>
          <el-button v-waves class="searchs" type="danger" plain  @click="allJump">暂停服务</el-button>
          <el-button v-waves class="searchs"  icon="el-icon-plus"  @click="AddJump">添加</el-button>
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
          <div class="diaTilte"><div class="titleMotai">账户信息</div>
              <div class="item"><div class="abs">创建日期：</div><span>2018-10-01 10:10:10</span></div>
              <div class="item"><div class="abs">账户编号：</div><span>10002154885</span></div>
              <div class="item"><div class="abs">账户名称：</div><span>共享单车押金</span></div>
              <div class="item"><div class="abs">押金期限：</div><span>30天</span></div>
              <div class="item"><div class="abs">押金金额：</div><span>￥9000</span></div>               
          </div>
          <div class="diaTilte title2"><div class="titleMotai">账户状态</div>
              <div class="item"><div class="abs">账户状态：</div><span class="shangjia">上架中</span></div>
              <div class="item"><div class="abs">押金笔数：</div><span>998</span></div>
              <div class="item"><div class="abs">押金总额：</div><span>￥99999.99</span></div>             
           </div>
            
           <div class="diaTilte title2"><div class="titleMotai">商家信息</div>
              <div class="item"><div class="abs">商家类型：</div><span class="">连锁商家</span></div>
              <div class="item"><div class="abs">商家名称：</div><span>金桔联盟</span></div>
              <div class="item"><div class="abs">商家编号：</div><span>1472589639</span></div>
              <div class="item"><div class="abs">所属渠道商类型：</div><span>普通商户</span></div>
              <div class="item"><div class="abs">所属渠道商名称：</div><span>成都巴啦啦公司</span></div>
              <div class="item"><div class="abs">所属渠道商编号：</div><span>952795279527</span></div>
           </div>         
      </el-dialog>
       
      <!-- 下面是添加模态框 -->
      <el-dialog :visible.sync="dialogTableVisible1"    width="680px" >
          <div class="diaTilte d1"><div class="titleMotai">账户信息</div>
              <div class="item i1"><div class="abs abs1">账户名称：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.storeName" placeholder="请输入账户名称"></el-input></span>
              </div>
               <div class="item i1"><div class="abs abs1">押金金额：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.yaMoney" placeholder="请输入账户名称"></el-input></span>
              </div>
               <div class="item i1"><div class="abs abs1">押金期限：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.Day" placeholder="请输入充值金额"></el-input>天</span>
              </div>
              <div class="item i1"><div class="abs abs1">是否开通押金：</div>
                 <span  class="addSpan cheeked">
                   <el-radio v-model="msg.kaitong" label="1">是</el-radio>
                   <el-radio v-model="msg.kaitong" label="2">否</el-radio>
                   <br>
                 </span>
              </div>
              <div class="item i1"><div class="abs abs1"></div>
                <span class="addSpan shuoms ">设置后，到期自动解押；否则需要手动解押，押金结算只能在解押时才能发起扣款</span>
              </div>
              <div class="item i1"><div class="abs abs1">是否立即下架：</div>
                 <span  class="addSpan">
                    <el-radio v-model="msg.xiajia" label="1">是</el-radio>                  
                    <el-radio v-model="msg.xiajia" label="2">否</el-radio>
                  </span>
              </div>      
               <div class="item i1"><div class="abs abs1">商家类型：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.storeType" placeholder="请输入商家类型"></el-input></span>
              </div>
               <div class="item i1"><div class="abs abs1">商家名称：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.storeNames" placeholder="请输入商家名称"></el-input></span>
              </div>
               <div class="item i1"><div class="abs abs1">适用门店：</div>
                  <span class="addSpan ">押金账户将通用于所有门店</span>
              </div>
                <!-- 下面是按钮 -->
              <div class="btnBox">
                  <el-button class="btnsubs"   @click="submitAdd">确认添加</el-button>
                  <el-button class="quXiao"  @click="quxiao">取消</el-button>         
               </div>  
           </div>             
      </el-dialog>
       <!-- 添加模态框结束 -->

       <!-- 下面是修改模态框 -->  
      <el-dialog :visible.sync="dialogTableVisible2"    width="680px" >
            <div class="diaTilte d1"><div class="titleMotai">账户信息</div>
              <div class="item i1"><div class="abs abs1">账户名称：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.storeName" placeholder="请输入账户名称"></el-input></span>
              </div>
              <div class="item i1"><div class="abs abs1">押金金额：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.yaMoney" placeholder="请输入账户名称"></el-input></span>
              </div>
              <div class="item i1"><div class="abs abs1">押金期限：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.Day" placeholder="请输入充值金额"></el-input>天</span>
              </div>
               <div class="item i1"><div class="abs abs1">是否开通押金：</div>
                 <span  class="addSpan cheeked">
                   <el-radio v-model="msg.kaitong" label="1">是</el-radio>
                    <el-radio v-model="msg.kaitong" label="2">否</el-radio>
                    <br> 
                 </span>
              </div>
              <div class="item i1"><div class="abs abs1"></div>
                <span  class="addSpan shuoms ">设置后，到期自动解押；否则需要手动解押，押金结算只能在解押时才能发起扣款</span>
              </div>
              <div class="item i1"><div class="abs abs1">是否立即下架：</div>
                <span  class="addSpan">
                   <el-radio v-model="msg.xiajia" label="1">是</el-radio>
                   <el-radio v-model="msg.xiajia" label="2">否</el-radio>
                </span>
              </div>   
               <div class="item i1"><div class="abs abs1">商家类型：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.storeType" placeholder="请输入商家类型"></el-input></span>
              </div>
              <div class="item i1"><div class="abs abs1">商家名称：</div>
                  <span class="addSpan"><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.storeNames" placeholder="请输入商家名称"></el-input></span>
              </div>
               <div class="item i1"> <div class="abs abs1">适用门店：</div>
                  <span class="addSpan ">押金账户将通用于所有门店</span>
              </div>
                   
                <!-- 下面是按钮 -->
                 <div class="btnBox">
                     <el-button class="btnsubs"   @click="submitChange">确认修改</el-button>
                     <el-button class="quXiao"  @click="quxiao">取消</el-button>                           
                 </div>  
              </div>             
      </el-dialog>

    </div>
</template>

<script>
import Search from "./search.vue";
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
        storeName: "",
        yaMoney: "",
        Day: "",
        kaitong: "1",
        xiajia: "2",
        storeType: "",
        storeNames: ""
      },
      gridData: [
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",

          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "2"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "3"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "2"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "2"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "3"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
          statuss: "1"
        },
        {
          date: "2018-09-10 10:11：00",
          danbaoNum: "125451251152",
          danbaoName: "成都一股云有限公司",
          sotreName: "金桔联盟",
          sonSotreName: "万达集团",
          sotreQudao: "成都一股云有限公司",
          rechargeMoney: "9000",
          Days: "300",
          rechargeNum: "100",
          rechargeAllMoney: "900000",
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
    // 修改按钮
    returnsubmit(data) {
      console.log("你点击了修改按钮");
      this.dialogTableVisible2 = true;
      console.log(data);
    },
    // 暂停服务按钮
    jihuoJump() {
      console.log("====================================");
      console.log("你点击了暂停服务按钮");
      console.log("====================================");
    },
    // 批量下架按钮
    passJump() {
      console.log("====================================");
      console.log("你点击了批量下架按钮");
      console.log("====================================");
    },
    // 批量激活和通过按钮
    allJump() {
      console.log("====================================");
      console.log("你点击了批量激活和通过");
      console.log("====================================");
    },
    // 添加按钮
    AddJump() {
      console.log("你点击了添加按钮");
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
    // 删除记录
    handleModifyStatus(row, status) {
      console.log(status);
      console.log(row);

      row.status = status;
    },
    // 导出功能
    handleDownload() {
      console.log("正在导出");
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
.i1 {
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
.item .shuoms {
  display: inline-block;
  width: 46.17%;
  height: 50px;
  font-size: 12px;
  color: #1c3672;
  line-height: 20px;
}
.firstChild {
  margin-left: 35px;
}
.btnBox {
  position: relative;
  top: 100px;
  width: 100%;
  height: 40px;
  margin: -60px auto 40px;
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