<template>
    <div id="dalos">
     <Search @channelSearch='channelSearch' />
      <!-- 我是表格组件 -->
     <div class="bigBoxs">
       <el-table class="tableBox" v-loading="listLoading" :key="tableKey"  :data="gridData"  border fit highlight-current-row style="width:100%;">      
            <el-table-column property="create_at" label="创建时间"    align="center"></el-table-column>                                       
            <el-table-column property="company_number" label="企业编号"  align="center"  ></el-table-column>
            <el-table-column property="company_type" label="企业类型"     align="center"  ></el-table-column>
            <el-table-column property="company_name" label="企业名称"   align="center"></el-table-column>            
            <el-table-column property="mobile" label="电话号码"   align="center"></el-table-column>           
            <el-table-column property="login_id" label="登录账号"     align="center"></el-table-column>
            <el-table-column property="login_name" label="用户姓名" width="100%"  align="center"></el-table-column>
           
            <el-table-column label="状态"  align="center"   width="100%">
                <template slot-scope="scope">
                    <span type="text" size="small" class="shangjia"  v-if="scope.row.status==1">启用</span>
                    <span type="text" size="small" class="shanchu" v-if="scope.row.status==2">禁用</span>                   
                </template>
            </el-table-column>     
            <el-table-column  label="操作"   align="center" >
                <template slot-scope="scope" >
                    <!-- <el-button  type="text" size="small" class="xiaz" @click="addSumbit(scope.row)">添加</el-button> -->
                    
                    <el-button  type="text" size="small" class="xiaz"  @click="edits(scope.row)">编辑</el-button>
                    <el-button  type="text" size="small" class="chulz"  @click="handover(scope.row)">
                     
                    <span type="text" size="small" class="shangjia"  v-if="scope.row.status==2">启用</span>
                    <span type="text" size="small" class="shanchu" v-if="scope.row.status==1">禁用</span>                   
              
                      </el-button>
                    <el-button  type="text" size="small" class="stopServer" @click="deleted(scope.row)">删除</el-button>                   
                </template>
            </el-table-column>        
       </el-table>
       <!-- 下面的选择按钮 -->
       <div class="allChose">  
            <el-button v-waves class="adds"   icon="el-icon-plus"  @click="addSumbit">新增员工</el-button>    
          <!-- <el-button v-waves class="searchs" type="primary"  icon="el-icon-download"  @click="daochuJump">导出</el-button> -->
       </div> 
    </div>
     <!-- 分页功能 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="pages.page" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 主体内容结束 -->

     <!-- 下面是详情模态框 -->
     <el-dialog :visible.sync="dialogTableVisible" custom-class='sssss' top="20vh"   width="500px" >
       
        <div class="diaTilte"><div class="titleMotai">员工账户详情</div>
            <div class="item"><div class="abs">创建时间：</div><span>2018-12-30 24:24:24</span></div>
            <div class="item"><div class="abs">员工编号：</div><span>1234567890987655</span></div>
            <div class="item"><div class="abs">员工姓名：</div><span>刘德华</span> </div> 
            <div class="item"><div class="abs">员工电话：</div><span>17898776522</span> </div> 
            <div class="item"><div class="abs">是否启用：</div><span>启用</span> </div> 
            <div class="item"><div class="abs">角色权限：</div><span>财务</span> </div>            
        </div>      
        <div class="diaTilte title2"><div class="titleMotai">处理记录</div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务</div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务 ，运营已核实，什么什么原因  </div>
            <div class="item1">2018-12-30 24:24:24   系统暂停服务 ，运营已核实，什么什么原因  </div>            
       </div>          
      </el-dialog> 
       <!-- 详情模态框结束 -->
        <!-- 下面是新增员工模态框 -->
     <el-dialog :visible.sync="dialogTableVisible1" custom-class='sssss' top="20vh"   width="500px" >       
         <div class="diaTilte"><div class="titleMotai">新增员工账户</div>
               <!-- <div class="items"><div class="abs abs1">登录账号：</div><span><el-input  size="small"  style="width:29.17%; height:40px;" v-model="msg.loginNum" placeholder="自定义部分"></el-input><i class="dd"> @epayapp.com</i></span></div> -->
               <div class="items"><div class="abs abs1">员工姓名：</div><span><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.name" placeholder="请输入员工姓名"></el-input></span></div>
               <div class="items"><div class="abs abs1">手机号码：</div><span><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.mobile" placeholder="请输入电话"></el-input></span></div>          
               <div class="items"><div class="abs abs1">登录密码：</div><span><el-input  size="small"  style="width:46.17%; height:40px;" v-model="msg.password" placeholder="请输入密码"></el-input></span></div>
               <!-- <div class="items"><div class="abs abs1">是否启用：</div><span>
                  
                 <el-radio v-model="msg.qQY" label="1">启用</el-radio>
                 <el-radio v-model="msg.qQY" label="2">禁用</el-radio>
                 </span></div> 
               <div class="items"><div class="abs abs1">角色权限：</div><span class="checked" >
                 <el-radio v-model="msg.status" label="1">财务</el-radio>
                 <el-radio v-model="msg.status" label="2">运营</el-radio>
                <el-radio v-model="msg1.status" label="1">财务</el-radio>
                 <el-radio v-model="msg1.status" label="2">运营</el-radio>
                 <el-radio v-model="msg1.status" label="3">运维</el-radio>                 
               </span></div> -->
              <!-- 下面是按钮 -->
               <div class="btnBoxs">
                  <el-button class="submmitBtn"   @click="submitAdd">确定</el-button>
                </div>             
            </div>         
      </el-dialog> 
       <!-- 新增员工模态框结束 -->
       <!-- 下面是编辑模态框 -->
     <el-dialog :visible.sync="dialogTableVisible2" custom-class='sssss' top="20vh"   width="500px" >       
         <div class="diaTilte"><div class="titleMotai">修改员工账户</div>
               <div class="items"><div class="abs abs1">创建时间：</div><span><el-input  :disabled="true"  size="small"  style="width:46.17%; height:40px;" v-model="msg1.create_at"></el-input></span></div>
               <!-- <div class="items"><div class="abs abs1">员工编号：</div><span><el-input  :disabled="true" size="small"  style="width:46.17%; height:40px;" v-model="msg1.id" ></el-input></span></div>  -->
               <div class="items"><div class="abs abs1">员工姓名：</div><span><el-input  :disabled="true" size="small"  style="width:29.17%; height:40px;" v-model="msg1.login_name" ></el-input></span></div>
               <div class="items"><div class="abs abs1">员工电话：</div><span><el-input  :disabled="true" size="small"  style="width:46.17%; height:40px;" v-model="msg1.mobile" ></el-input></span></div>
               <div class="items"><div class="abs abs1">员工账户：</div><span><el-input   :disabled="true" size="small"  style="width:46.17%; height:40px;" v-model="msg1.login_id" ></el-input></span></div>          
               <div class="items"><div class="abs abs1">账号密码：</div><span><el-input  size="small"  style="width:46.17%; height:40px;" v-model="password"></el-input></span></div>
               <!-- <div class="items"><div class="abs abs1">是否启用：</div><span>                 
                 <el-radio v-model="msg1.qQY" label="1">启用</el-radio>
                 <el-radio v-model="msg1.qQY" label="2">禁用</el-radio>
                   </span></div> 
               <div class="items"><div class="abs abs1">角色权限：</div><span class="checked">
                 <el-radio v-model="msg1.status" label="1">财务</el-radio>
                 <el-radio v-model="msg1.status" label="2">运营</el-radio>
                 <el-radio v-model="msg1.status" label="3">运维</el-radio>
                   <el-radio v-model="msg1.status" label="1">财务</el-radio>
                 <el-radio v-model="msg1.status" label="2">运营</el-radio>
                 <el-radio v-model="msg1.status" label="3">运维</el-radio>                  
               </span></div> -->
              <!-- 下面是按钮 -->
               <div class="btnBoxs">
                  <el-button class="submmitBtn"   @click="submitChange">确定</el-button>
                </div>             
            </div>         
      </el-dialog> 
       <!-- 编辑模态框结束 -->
 </div>
</template>

<script>
import Search from "./components/Search.vue";

import waves from "@/directive/waves"; // 水波纹指令
import { userMsg, changeStyle, userDelete, userAdd } from "@/api/systemsetings";
export default {
  name: "UserAuthorization",
  directives: {
    waves
  },

  data() {
    return {
      pages: {
        page: 1,
        size: 10
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
      msg: {
        name: "",
        mobile: "",
        password: ""
      },
      msg1: {},
      password: "",
      gridData: []
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
        name: data.emName,
        id: data.emAccount,
        is_delete: data.status
      };
      console.log(datas);
      this.getList(datas);
    },
    // 获取角色权限基本列表信息
    getList(data) {
      this.listLoading = true;
      var basicURL =
        "/backend/api/v1/admin/adminlist/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      userMsg(basicURL, data).then(res => {
        console.log(res);
        var dataList = res.data.ret;
        console.log(dataList);
        for (var i = 0; i < dataList.length; i++) {
          dataList[i].create_at = dataList[i].create_at.split("T").join(" ");
        }
        this.total = res.data.count;
        this.gridData = dataList;
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    // 提示框函数
    message(msg, status) {
      var types = "";
      if (status == "200") {
        types = "success";
      } else {
        types = "error";
      }
      this.$message({
        message: msg,
        type: types
      });
    },
    // 编辑按钮
    edits(val) {
      console.log(val);
      this.dialogTableVisible2 = true;
      this.msg1 = val;
    },
    // 启用切换
    handover(val) {
      console.log("启用切换");
      console.log(val);
      var detailURL = "";
      if (val.status == "1") {
        detailURL = "/backend/api/v1/admin/disableadmin/";
      } else if (val.status == "2") {
        detailURL = "/backend/api/v1/admin/enableadmin/";
      }
      changeStyle(detailURL, val.login_id).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
      });
    },

    //删除功能
    deleted(val) {
      console.log(val);
      console.log("您点击了删除");
      var detailURL = "/backend/api/v1/admin/deleteadmin/";
      userDelete(detailURL, val.login_id).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
      });
    },
    // 新增员工
    addSumbit(val) {
      console.log(val);
      this.dialogTableVisible1 = true;
    },
    // 下面是新增员工权限提交按钮
    submitAdd() {
      var detailURL = "/backend/api/v1/admin/createadmin/";
      userAdd(detailURL, this.msg).then(res => {
        console.log(res);
        this.dialogTableVisible1 = false;
        this.message(res.data.msg, res.data.code);
      });
    },
    // 修改
    submitChange() {
      var detailURL = "/backend/api/v1/admin/editadmin/";
      var data = {
        psssword: this.password,
        login_id: this.msg1.login_id
      };
      console.log(data);
      userAdd(detailURL, data).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
        this.dialogTableVisible2 = false;
      });
    },
    //分页功能选择
    handleSizeChange(val) {
      this.pages.page = 1;
      this.pages.size = val;
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
  font-size: 14px;
  color: #1c3672;
}
.shanchu {
  font-size: 14px;
  color: #f66d23;
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
  margin: 0 auto 20px !important;
  padding: 0 20px 0 20px;
}

.diaTilte {
  position: relative;
  text-align: center;
  line-height: 36px;
  font-size: 16px;
  color: #1c3672;
  width: 498px;
  margin-bottom: 10px;

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
  font-size: 14px;
  margin-left: 30px;
  margin-right: 20px;
}
.submmitBtn {
  background-image: linear-gradient(-180deg, #d1ddf6 0%, #ebf1fc 100%);
  border-radius: 4px;
  font-size: 14px;
  color: #1c3672;
  width: 180px;
  height: 36px;
  /* margin-top: 30px; */
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
.adds {
  border: 1px solid #1c3672;
  border-radius: 6px;
  font-size: 12px;
  color: #1c3672;
  width: 160px;
  height: 34px;
}
.items {
  position: relative;
  padding: 1px 0 1px 0;
  min-height: 20px;
  text-align: left;
  /* margin-top: 20px; */
}
.items span {
  font-size: 14px;
  color: #333333;
  margin-left: 37%;
}
.items .checked {
  display: inline-block;

  width: 60%;
}
.el-radio,
.el-radio + .el-radio {
  margin-left: 0px;
  margin-right: 30px;
}
.dd {
  margin-left: 5px;
  font-style: normal;
}
.btnBoxs {
  position: relative;
  top: 30px;
  margin-bottom: -40px;
}
</style>