<template>
    <div>
      <Search @addChain='addChain' @channelSearch='channelSearch' />
      <!-- 我是表格组件 -->
      <el-row :gutter="20">
        <el-col :span="16"> 
          <div class="bigBoxs">
            <el-table class="tableBox" v-loading="listLoading"  highlight-current-row
                     @current-change="handleCurrentpage" :key="tableKey" :data="gridDatas" border fit @selection-change="handleSelectionChange"  style="width:100%;">
              <el-table-column align="center" type="selection" width="55"></el-table-column>
              <el-table-column property="id" label="渠道编号"  align="center" ></el-table-column>
              <el-table-column property="name" label="渠道名称"  align="center"></el-table-column>
              <el-table-column property="bank_name" label="银行通道"  align="center"></el-table-column>
              <el-table-column  label="审核状态"  align="center" >
                <template slot-scope="scope">
                  <span type="text" size="small" class="ppss"  v-if="scope.row.review=='审核通过'" >审核通过</span>
                  <span type="text" size="small" class="noppss" v-if="scope.row.review=='待审核'">待审核</span>
                  <span type="text" size="small" class="noppss" v-if="scope.row.review=='驳回'">驳回</span>
                </template>
              </el-table-column>
              <el-table-column  label="激活状态"  align="center" >
                <template slot-scope="scope">
                  <span type="text" size="small" class="ppss"  v-if="scope.row.status=='激活'" >已激活</span>
                  <span type="text" size="small" class="noppss" v-if="scope.row.status=='未激活'">未激活</span>
                </template>
              </el-table-column>
              <el-table-column  label="操作"   align="center">
                <template slot-scope="scope" >
                  <el-button @click.stop="passsubmit(scope.row)" type="text" size="small" class="xiaz">通过</el-button>
                  <el-button type="text" size="small" class="shanchu" @click.stop="returnsubmit(scope.row)">驳回</el-button>
                </template>
              </el-table-column>               
          </el-table>
          <!-- 下面的选择按钮 -->
          <div class="allChose">
            <el-button v-waves class="searchs" type="primary"  @click="jihuoJump">批量激活</el-button>
            <el-button v-waves class="searchs" type="primary"  @click="passJump">批量通过</el-button>
            <el-button v-waves class="searchs" type="primary"  @click="allJump">批量通过和激活</el-button>
            <el-button v-waves class="searchs" type="primary"  @click="bohuiJump">批量驳回</el-button>
            <el-button v-waves class="searchs" type="primary"  icon="el-icon-download"  @click="daochuJump">导出</el-button>
          </div> 
        </div>
        <!-- 分页功能 -->
        <div class="pagination-container">
          <el-pagination v-show="total>0" :current-page.sync="pages.page" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div>
     </el-col>
      <el-col :span="8">    
          <!-- 下面是每个渠道商信息显示部门 -->
          <div class="rightMenu" v-if="isshow">
            <Details :detailMsg='detailMsg' />
          </div>
      </el-col>
    </el-row>
 </div>
</template>

<script>
import Search from "./search.vue";
import Details from "./Details.vue";
import waves from "@/directive/waves"; // 水波纹指令
import axios from "axios";
import {
  channelMsg,
  channelPass,
  channelSearch,
  channelRejected,
  channelVolumeActivation,
  channelVolumePass,
  channelALL,
  channelVolumeRejected,
  channelDownload,
  channelDetail
} from "@/api/intomanagement";
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
      isshow: false,

      detailMsg: null,
      gridDatas: [],
      filename: "",
      autoWidth: true
    };
  },
  components: {
    Search,
    Details
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
    // 搜索按钮传值回来
    channelSearch(data) {
      console.log(data);
      this.pages.page = 1;
      this.pages.size = 10;
      var datas = {
        name: data.channels,
        id: data.channelsNum,
        min_time: data.value1[0],
        max_time: data.value1[1],
        status: data.channelsStatus,
        review: data.channelsStatus1
      };
      console.log(datas);
      this.getList(datas);
      // this.gridData = data;
    },
    // 获取渠道进件基本列表信息
    getList(data) {
      this.listLoading = true;
      var channelURL =
        "/backend/api/v1/incoming/channellist/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      this.isshow = false;
      channelMsg(channelURL, data).then(res => {
        console.log("渠道进件表格基本信息");
        this.total = res.data.count;
        this.gridDatas = res.data.results;
        console.log(this.gridDatas);
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
    //选择当前行显示具体的信息
    handleCurrentpage(val) {
      console.log("显示详细信息");
      let channelDetailURL = "/backend/api/v1/incoming/channelid/";
      if (!val) return;
      channelDetail(channelDetailURL, val.id).then(res => {
        console.log(res.data[0]);
        this.detailMsg = res.data[0];
        console.log("显示详细信息");
        this.isshow = true;
      });
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 单个通过按钮按钮
    passsubmit(data) {
      console.log("你点击了单个通过按钮");
      console.log(data);
      var channelPassURL = "/backend/api/v1/incoming/channelreview/";
      var datas = { ids: data.id + ",0" };
      console.log(datas);
      channelPass(channelPassURL, datas).then(res => {
        console.log(res);
        // this.$message(res.data.msg);
        this.message(res.data.msg, res.data.code);
      });
    },
    // 单个驳回按钮
    returnsubmit(data) {
      console.log("你点击了单个驳回按钮");
      var channelRejectedURL = "/backend/api/v1/incoming/channelturndown/";
      var datas = { ids: data.id + ",0" };
      channelRejected(channelRejectedURL, datas).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
      });
    },
    // 批量的数据处理
    dataDeal() {
      var dataList = [];
      this.multipleSelection.forEach(function(v) {
        dataList.push(v.id);
      });
      dataList.push(0);
      var datas = { ids: dataList.join(",") };
      return datas;
    },
    // 批量激活按钮
    jihuoJump() {
      var channeljhURL = "/backend/api/v1/incoming/channelact/";
      channelVolumeActivation(channeljhURL, this.dataDeal()).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
      });
    },
    // 批量通过按钮
    passJump() {
      var channelAPassURL = "/backend/api/v1/incoming/channelreview/";
      channelVolumeActivation(channelAPassURL, this.dataDeal()).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
      });
    },
    // 批量激活和通过按钮
    allJump() {
      var channelAllURL = "/backend/api/v1/incoming/channelactandrev/";
      channelALL(channelAllURL, this.dataDeal()).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
      });
    },
    // 批量驳回按钮
    bohuiJump() {
      var channelRejectedURL = "/backend/api/v1/incoming/channelturndown/";
      channelVolumeRejected(channelRejectedURL, this.dataDeal()).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.code);
      });
    },
    // 导出按钮
    daochuJump() {
      let channelDownloadURL = "/backend/api/v1/incoming/channeltoexcel/";
      channelDownload(channelDownloadURL, this.dataDeal()).then(res => {
        console.log(res);
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", "渠道资料.xls");
        document.body.appendChild(link);
        link.click();
      });
    },

    //分页功能选择
    handleSizeChange(val) {
      this.pages.size = val;
      this.pages.page = 1;
      console.log(val);
      this.getList();
    },
    //分页功能选择
    handleCurrentChange(val) {
      console.log("选择分页");
      console.log(val);
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
  color: #d0011b;
}
.bigBoxs {
  width: 100%;
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
  margin: 20px 0 20px 150px;
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
  color: #333333;
  font-size: 14px;
}
.noppss {
  color: #f6a623;
  font-size: 14px;
}
.rightMenu {
  width: 96%;
  padding-bottom: 50px;
  background-color: #fff;
  display: inline-block;
  margin-bottom: 40px;
}
</style>