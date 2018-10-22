<template>
    <div>
       <!-- 我是表格组件 -->
      <div class="bigBoxs">
          <el-table class="tableBox"  v-loading="listLoading"  :key="tableKey"  :data="gridData" border fit highlight-current-row style="width:100%;">           
            <el-table-column property="pushObj" label="推送对象"  width="180px"  align="center" ></el-table-column>
            <el-table-column property="pushContent" label="推送内容"  align="center"></el-table-column>
            <el-table-column property="triggerCondition" label="触发条件"  width="180px"  align="center"></el-table-column>                                   
            <el-table-column  label="推送条数"  align="center"   width="180px">
                <template slot-scope="scope">
                <span type="text" size="small" class="moneyStyles">{{scope.row.pushNum | toThousandFilter }}</span>
              </template>
            </el-table-column>                    
            <el-table-column  label="操作"   align="center"  width="240px">
              <template slot-scope="scope" >
                <el-button @click="passsubmit(scope.row)" type="text" size="small" class="moneyStyles" >查看</el-button> 
                <el-button @click="returnsubmit(scope.row)" type="text" size="small" class="stopServer" >编辑</el-button> 
                <el-button @click="deleted(scope.row)" type="text" size="small" class="deleted" >删除</el-button>              
              </template>
            </el-table-column>       
    </el-table>
    </div>
    <!-- 下面的选择按钮 -->
       <div class="allChose">      
          <el-button v-waves class="searchs"   icon="el-icon-plus"  @click="addSms">新增</el-button>
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
                <div class="item"><div class="abs">消息类型：</div><span>站内信</span></div>              
                <div class="item"><div class="abs">短信内容：</div><span class="shuoms">{{dataChosed.pushContent}}</span></div>
                <!-- <div class="item"><div class="abs">推送机制：</div><span >{{dataChosed.mechanism}}</span></div> -->
                <div class="item"><div class="abs">触发条件：</div><span>{{dataChosed.triggerCondition}}</span></div>
                <div class="item"><div class="abs">状态：</div><span class="ppss">发送成功</span></div>             
            </div>           
        </el-dialog>
        <!-- 详情展示页结束 -->
    
         <!-- 编辑模态框开始 -->
        <el-dialog :visible.sync="dialogTableVisible1" custom-class='sssss' top="15vh"   width="500px" >
            <div class="diaTilte"><div class="titleMotai">编辑</div>
               <div class="item"><div class="abs">用户类型：</div><span><el-input disabled  size="small"  style="width:46.17%; height:40px;" v-model="dataChosed.pushObj" ></el-input></span></div>             
              <div class="item"><div class="abs">短信内容：</div><span class=" shuoms "><el-input type="textarea"  :autosize="{ minRows: 3, maxRows: 5}"  v-model="dataChosed.pushContent"></el-input></span></div>
              <div class="item"><div class="abs">推送机制：</div><span><el-input disabled size="small"  style="width:46.17%; height:40px;" v-model="dataChosed.mechanism"></el-input></span></div>
              <div class="item"><div class="abs">触发条件：</div><span><el-input disabled size="small"  style="width:46.17%; height:40px;" v-model="dataChosed.triggerCondition" ></el-input></span></div>             
              <div class="btnBox">
                  <el-button class="btnsubs"   @click="submitAdd">确定</el-button>
                </div>             
            </div>         
      </el-dialog>
         <!-- 编辑模态框结束 -->

          <!-- 新增模态框开始 -->
        <el-dialog :visible.sync="dialogTableVisible2" custom-class='sssss' top="15vh"   width="500px" >
            <div class="diaTilte"><div class="titleMotai">编辑</div>
               <div class="item"><div class="abs">用户类型：</div><span>
                    <select v-model="dataAdd.pushObj" class="selectBox"  @click="ss()" >
                      <option v-for="(a,index) in options" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
                    </select>                                
                </span></div>             
              <div class="item"><div class="abs">短信内容：</div><span class=" shuoms "><el-input type="textarea" placeholder="输入短信内容"  :autosize="{ minRows: 3, maxRows: 5}"  v-model="dataAdd.pushContent"></el-input></span></div>
              <div class="item"><div class="abs">推送机制：</div><span>
                  <select v-model="dataAdd.mechanism" class="selectBox"  @click="ss()" >
                      <option v-for="(a,index) in options1" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
                  </select>
                  </span></div>
              <div class="item"><div class="abs">触发条件：</div><span>
                  <select v-model="dataAdd.triggerCondition" class="selectBox"  @click="ss()" >
                     <option v-for="(a,index) in options2" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
                  </select>
                  </span></div>             
              <div class="btnBox">
                  <el-button class="btnsubs"   @click="submitAdd">确定</el-button>
                </div>              
            </div>         
      </el-dialog>
         <!-- 新增模态框结束 -->
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import { smsMsg, smsSubmit, deleted, merchantDownload } from "@/api/operation";

export default {
  name: "SetModule",
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
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dataChosed: {
        pushObj: "dis",
        pushContent: "",
        mechanism: "dis1",
        triggerCondition: "dis2"
      },
      dataAdd: {
        pushObj: "dis",
        pushContent: "",
        mechanism: "dis1",
        triggerCondition: "dis2"
      },
      options: [
        {
          value: "dis",
          label: "请选择用户类型",
          disabled: ""
        },
        {
          value: "B/C端用户",
          label: "B/C端用户"
        },
        {
          value: "后台管理",
          label: "后台管理"
        }
      ],
      options1: [
        {
          value: "dis1",
          label: "选择推送机制",
          disabled: ""
        },
        {
          value: "普通渠道商用户",
          label: "普通渠道商用户"
        },
        {
          value: "站内信",
          label: "站内信"
        }
      ],
      options2: [
        {
          value: "dis2",
          label: "选择触发条件",
          disabled: ""
        },
        {
          value: "登录/注册",
          label: "登录/注册"
        },
        {
          value: "找回密码",
          label: "找回密码"
        }
      ],
      gridData: [
        {
          pushObj: "B/C端用户",
          pushContent:
            "尊敬的商户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent: "天王盖地虎，宝塔镇山河",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        },
        {
          pushObj: "B/C端用户",
          pushContent:
            "（信条）用户xxxx于2018-12-30 24:24:24注册/登录，请您妥善保管，验证码由你的手机...",
          triggerCondition: "商户结算",
          mechanism: "普通渠道商用户",
          pushNum: "1222220"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取结算模块基本列表信息
    getList() {
      this.listLoading = true;
      console.log("结算模块表格基本信息");
      // smsMsg("id").then(res => {
      //   console.log(res);
      // });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    ss() {
      this.options[0].disabled = "disabled";
      this.options1[0].disabled = "disabled";
      this.options2[0].disabled = "disabled";
    },
    // 查看按钮
    passsubmit(data) {
      this.dialogTableVisible = true;
      console.log(data);
      this.dataChosed = data;
    },
    // 编辑按钮
    returnsubmit(data) {
      console.log("你点击了修改按钮");
      this.dialogTableVisible1 = true;
      this.dataChosed = data;
      console.log(data);
    },
    // 删除按钮
    deleted(data) {
      alert("删除成功");
      // deleted(data).then(res => {
      //   console.log(res);
      // })
    },
    // 新增按钮
    addSms() {
      this.dialogTableVisible2 = true;
    },
    // 短信推送确认按钮
    submitAdd() {
      alert("提交成功");
      console.log(this.dataChosed);
      // smsSubmit(this.dataChosed).then(res => {
      //   console.log(res);
      //
      // })
    },

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
  font-size: 12px;
  color: #1c3672;
  text-align: center;
  margin-right: 1%;
  padding-left: 0;
  padding-right: 0;
  border-radius: 6px;
  border: 1px solid #1c3672;
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
}
.deleted {
  font-size: 14px;
  color: #d0011b;
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