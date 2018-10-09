<template>
    <div>
       <!-- 我是表格组件 -->
      <div class="bigBoxs">
          <el-table class="tableBox" @selection-change="handleSelectionChange"   v-loading="listLoading"  :key="tableKey"  :data="gridData" border fit highlight-current-row style="width:100%;">           
            <el-table-column  align="center" type="selection" width="55"></el-table-column>            
            <el-table-column property="pushContent" label="推送内容"  align="center"></el-table-column>
            <el-table-column property="triggerCondition" label="推送机制"  width="180px"  align="center"></el-table-column> 
            <el-table-column property="pushMan" label="接收人"  width="180px"  align="center" ></el-table-column>
            <el-table-column property="tel" label="电话"  width="180px"  align="center" ></el-table-column>
            <el-table-column property="pushTime" label="推送时间"  width="180px"  align="center" ></el-table-column>                                                                
            <el-table-column  label="操作"   align="center"  width="240px">
              <template slot-scope="scope" >
                <el-button @click="passsubmit(scope.row)" type="text" size="small" class="moneyStyles" >查看</el-button>                
                <el-button @click="deleted(scope.row)" type="text" size="small" class="deleted" >删除</el-button>              
              </template>
            </el-table-column>       
    </el-table>
    </div>
    <!-- 下面的选择按钮 -->
       <div class="allChose">      
          <el-button v-waves class="searchs"    @click="addSms">批量删除</el-button>
       </div> 
     <!-- 分页功能 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="100" :total="100" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->
   
    
        <!-- 下面是详情模态框 -->
        <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss' top="15vh"   width="500px" >
            <div class="diaTilte"><div class="titleMotai">查看</div>
                <div class="item"><div class="abs">用户类型：</div><span>{{dataChosed.pushObj}}</span></div>                  
                <div class="item"><div class="abs">电话：</div><span>{{dataChosed.tel}}</span></div>             
                <div class="item"><div class="abs">短信内容：</div><span class="shuoms">{{dataChosed.pushContent}}</span></div>                
                <div class="item"><div class="abs">触发条件：</div><span>{{dataChosed.pushMan}}</span></div>
                <div class="item"><div class="abs">状态：</div><span class="ppss">发送成功</span></div>             
            </div>           
        </el-dialog>
        <!-- 详情展示页结束 -->
          
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "MsgRecord",
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
      dataChosed: {},
      gridData: [
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent: "大哥别告生存手册我",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        },
        {
          pushObj: "B/C端用户",
          pushMan: "商户结算",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "登录/注册",
          pushTime: "2018-10-10 10:10:10",
          tel: "19922222222"
        }
      ],
      multipleSelection: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },

    // 查看按钮
    passsubmit(data) {
      this.dialogTableVisible = true;
      console.log(data);
      this.dataChosed = data;
    },

    // 删除按钮
    deleted() {
      alert("删除成功");
    },
    // 批量删除按钮
    addSms() {
      alert("批量删除成功");
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
    }
  }
};
</script>

<style scoped>
.bigBoxs {
  width: 100%;
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
  color: #d0011b;
  text-align: center;
  margin-right: 1%;
  padding-left: 0;
  padding-right: 0;
  border-radius: 6px;
  border: 1px solid #d0011b;
  height: 34px;
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
  color: #f6a623;
  margin-left: 20px;
  margin-right: 20px;
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
  margin-right: 30px;
}
.deleted {
  font-size: 14px;
  color: #d0011b;
  margin-left: 30px;
}
/* 下面是模态框的样式*/

.diaTilte {
  position: relative;
  text-align: center;
  line-height: 36px;
  font-size: 16px;
  color: #1c3672;
  width: 498px;
  left: -4%;
  top: -60px;
}
.d1 {
  width: 678px;
  left: -2.94%;
}
.titleMotai {
  background: #f0f0f0;
  margin-bottom: 10px;
}
.item {
  position: relative;
  min-height: 20px;
  text-align: left;
  font-size: 14px;
}
.item span {
  color: #333333;
  margin-left: 44.2%;
}
.item .addSpan {
  margin-left: 36.176%;
}
.item .ppss {
  color: #4990e2;
}
.abs {
  position: absolute;
  right: 55.8%;
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
.firstChild {
  margin-left: 35px;
}
.btnBox {
  position: relative;

  width: 100%;
  height: 36px;
  margin: 20px auto 0px;
}
.btnsubs {
  width: 240px;
  height: 36px;
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
  border-radius: 4px;
  font-size: 16px;
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
.item .shuoms {
  display: inline-block;
  width: 46.17%;
  margin-top: 10px;
  color: #333333;
  line-height: 20px;
}
.selectBox {
  width: 46.17%;
  height: 30px;
  border: 1px solid #dcdfe6;
}
</style>

