<template>
  <div class="navbars" id="qqq">
    <!-- 侧导航栏的符号 -->
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
   
      <div class="titles">官方后台</div>
       <!--面包屑  -->
    <breadcrumb class="breadcrumb-container"/>
    <div class="right-menu">  
      <!-- 头部导航栏的相应部分 -->
      <template  v-if="device!=='mobile'" >        
      <div @click="downLoads" class="downloadBox  downLoads"><img class="downLoad" src="../../../assets/login/download.png" alt=""><span>下载</span></div>
      <div class="downloadBox kaifa"><img class="downLoad" src="../../../assets/login/developmentofthedocument.png" alt=""><span>开发文档</span></div>
      <div class="downloadBox caozuo"><img class="downLoad" src="../../../assets/login/operationmanual.png" alt=""><span>操作手册</span></div> 
      <div class="gards"></div>
      <div class="downloadBox companyName" @click='userinfoShow'>{{name}}</div>
      <div class="downloadBox numberId" @click="actBlog">{{ids}}</div>
      <div class="gard1"></div>
      </template>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
             首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

<el-dialog :visible.sync="dialogTableVisible" id="bbb">
  <div class="diaTilte"><img src="../../../assets/login/prompt.png" alt=""><span>报表文件生成后系统保留7天，过期自动删除</span></div> 
  <el-table :data="gridData" height="610" border class="titleTables" id='sss' >
    <el-table-column property="date" label="申请时间" width="190" align="center" ></el-table-column>
    <el-table-column property="types" label="类型" width="160" align="center"></el-table-column>
    <el-table-column property="files" label="文件名" width="260" align="center"></el-table-column>
    <el-table-column property="statuss" label="当前状态" width="158" align="center" ></el-table-column>
    <el-table-column  label="操作" width="150"  align="center">
       <template slot-scope="scope" >
        <el-button @click="handleClick(scope.row,'downLoad')" type="text" size="small" class="xiaz">下载</el-button>
        <el-button type="text" size="small" class="shanchu" @click="handleClick(scope.row,'deleted')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-dialog>



  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navbarDownLoads } from "@/api/navbarMsg";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
// import ErrorLog from "@/components/ErrorLog";

export default {
  components: {
    Breadcrumb,
    Hamburger
    // ErrorLog
  },
  data() {
    return {
      dialogTableVisible: false,
      gridData: [
        {
          date: "2016-05-03 12:12:12",
          types: "渠道商对账",
          files: "dvdfvdfv-bkr-1110000.34.mth",
          statuss: "未下载"
        },
        {
          date: "2016-05-03 12:12:12",
          types: "渠道商对账",
          files: "dvdfvdfv-bkr-1110000.34.mth",
          statuss: "未下载"
        },
        {
          date: "2016-05-03 12:12:12",
          types: "渠道商对账",
          files: "dvdfvdfv-bkr-1110000.34.mth",
          statuss: "未下载"
        },
        {
          date: "2016-05-03 12:12:12",
          types: "渠道商对账",
          files: "dvdfvdfv-bkr-1110000.34.mth",
          statuss: "未下载"
        },
        {
          date: "2016-05-03 12:12:12",
          types: "渠道商对账",
          files: "dvdfvdfv-bkr-1110000.34.mth",
          statuss: "未下载"
        },
        {
          date: "2016-05-03 12:12:12",
          types: "渠道商对账",
          files: "dvdfvdfv-bkr-1110000.34.mth",
          statuss: "未下载"
        },
        {
          date: "2016-05-03 12:12:12",
          types: "渠道商对账",
          files: "dvdfvdfv-bkr-1110000.34.mth",
          statuss: "未下载"
        },
        {
          date: "2016-05-03 12:12:12",
          types: "渠道商对账",
          files: "dvdfvdfv-bkr-1110000.34.mth",
          statuss: "未下载"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "ids", "tel", "avatar", "device"])
  },
  mounted() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      //退出登录
      this.$store.dispatch("FedLogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    // 点击下载按钮
    downLoads() {
      this.dialogTableVisible = true;
      // 进行ajax请求、
      TODO: navbarDownLoads().then(response => {
        this.gridData = response.data;
      });
    },
    // 模态框下载按钮
    handleClick(row, status) {
      console.log(row);
      console.log(status);
    },
    //设置账户密码

    actBlog() {
      console.log("账户设置");

      this.$store.dispatch("componentsId", "settings");
      //跳转到支付详情页面,防止其他页面点击时无法跳转
      this.$router.push({ path: "/dashboard" });
    },
    // 查看用户信息
    userinfoShow() {
      console.log("查看用户信息");
      this.$store.dispatch("componentsId", "userinfo");
      //跳转到支付详情页面,防止其他页面点击时无法跳转
      this.$router.push({ path: "/dashboard" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.titles {
  font-size: 18px;
  color: #1c3672;
  position: absolute;
  top: -10px;
  left: 50px;
  font-weight: bold;
}
.downLoad {
  height: 16px;
  position: relative;
  top: 3px;
}
.downloadBox {
  font-size: 12px;
  color: #666666;
  position: absolute;
  cursor: pointer;
}
.downloadBox span {
  margin-left: 10px;
  margin-top: -3px;
}
.downLoads {
  width: 58px;
  left: -570px;
}
.kaifa {
  width: 75px;
  left: -480px;
}
.caozuo {
  width: 75px;
  left: -383px;
}
.gards {
  width: 1px;
  height: 63px;
  border: 1px solid #f0f0f0;
  position: absolute;
  left: -283px;
  top: 19px;
}
.companyName {
  color: #333333;
  left: -261px;
}
.numberId {
  font-size: 12px;
  color: #1c3672;
  left: -101px;
}
.gard1 {
  width: 1px;
  height: 18px;
  border: 1px solid #f0f0f0;
  position: absolute;
  left: -110px;
  top: 42px;
}
.navbars {
  height: 100px;
  line-height: 100px;
  border-radius: 0px !important;
  .el-dialog__wrapper {
    line-height: 2 !important;
    height: 100%;
    .el-dialog {
      position: relative;
      .diaTilte {
        position: absolute;
        top: 20px;
        left: 37%;
        span {
          margin-left: 5px;
          font-size: 14px;
          color: #f6a623;
        }
      }
    }
  }

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    position: relative;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 15px;
        position: relative;
        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 18px;
        }
      }
    }
  }
}
#qqq #bbb #sss {
  margin-top: 20px;
}
.xiaz {
  color: #1c3672;
}
.shanchu {
  color: #d0011b;
}
</style>
