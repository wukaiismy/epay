<template>
    <div>
      <Search @addChain='addChain'  @channelSearch='channelSearch' />
      <!-- 我是表格组件 -->
      <el-row :gutter="20">
        <el-col :span="16"> 
          <div class="bigBoxs">
            <el-table class="tableBox"  @current-change="handleCurrentpage" v-loading="listLoading" :key="tableKey" :data="gridDatas" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
                <el-table-column align="center" type="selection"  width="55"></el-table-column>
                <el-table-column property="id" label="商户编号"  align="center" ></el-table-column>
                <el-table-column property="mechant_type" label="连锁商户类型"  align="center"></el-table-column>
                <el-table-column property="name" label="子商户名称"  align="center"></el-table-column>
                <el-table-column property="channel.name" label="所属渠道"  align="center"></el-table-column>
                <el-table-column property="merchantfile.set_bank_name" label="银行通道"  align="center"></el-table-column>
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
            <el-pagination v-show="total>0" :current-page="pages.page" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
          </div>
      </el-col>
      <el-col :span="8">    
    <!-- 下面是每个连锁子商户信息显示部门 -->
     <div class="rightMenu" v-if="isshow">
       <Details :detailMsg='detailMsg'  />
     </div>
     </el-col>
   </el-row>
 </div>
</template>

<script>
import Search from "./search2.vue";
import Details from "./Details2.vue";
import waves from "@/directive/waves"; // 水波纹指令
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
  name: "Table2",
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

      detailMsg: [],
      gridDatas: []
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
        channel: data.channels,
        bank_name: data.banks,
        name: data.storeName,
        id: data.storeNums,
        status: data.channelsStatus,
        min_time: data.value1[0],
        max_time: data.value1[1],
        review: data.channelsStatus1
      };
      console.log(datas);
      this.getList(datas);
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
    //  获取连锁子商户进件基本列表信息
    getList(data) {
      this.listLoading = true;
      console.log("连锁子商户进件表格基本信息");
      let channelURL =
        "/backend/api/v1/incoming/chainchildlist/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      this.isshow = false;
      channelMsg(channelURL, data).then(res => {
        this.total = res.data.count;
        this.gridDatas = res.data.results;

        console.log(this.gridDatas);
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    //选择当前行显示具体的信息
    handleCurrentpage(val) {
      if (!val) return;
      console.log(val);
      this.detailMsg = [];
      let channelDetailURL = "/backend/api/v1/incoming/merchantid/";
      channelDetail(channelDetailURL, val.id).then(res => {
        this.detailMsg.push(res.data[0]);
        // 查询相应的连锁商信息
        channelDetail(channelDetailURL, val.head_chain).then(res => {
          this.detailMsg.push(res.data[0]);
          console.log("显示详细信息");
          console.log(this.detailMsg);
          this.isshow = true;
        });
      });
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 单个通过按钮按钮
    passsubmit(data) {
      var channelPassURL = "/backend/api/v1/incoming/merchantbatchre/";
      var datas = { ids: data.id + ",0" };
      channelPass(channelPassURL, datas).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.status);
      });
    },
    // 单个驳回按钮
    returnsubmit(data) {
      console.log("你点击了单个驳回按钮");
      var channelRejectedURL = "/backend/api/v1/incoming/merchantjection/";
      var datas = { ids: data.id + ",0" };
      channelRejected(channelRejectedURL, datas).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.status);
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
      var channeljhURL = "/backend/api/v1/incoming/merchantact/";
      channelVolumeActivation(channeljhURL, this.dataDeal()).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.status);
      });
    },
    // 批量通过按钮
    passJump() {
      var channelAPassURL = "/backend/api/v1/incoming/merchantbatchre/";
      channelVolumeActivation(channelAPassURL, this.dataDeal()).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.status);
      });
    },
    // 批量激活和通过按钮
    allJump() {
      console.log("你点击了批量激活和通过");
      var channelAllURL = "/backend/api/v1/incoming/merchantactandrev/";
      channelALL(channelAllURL, this.dataDeal()).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.status);
      });
    },
    // 批量驳回按钮
    bohuiJump() {
      var channelRejectedURL = "/backend/api/v1/incoming/merchantjection/";
      channelVolumeRejected(channelRejectedURL, this.dataDeal()).then(res => {
        console.log(res);
        this.message(res.data.msg, res.data.status);
      });
    },
    // 导出按钮
    daochuJump() {
      console.log("你点击了导出按钮");
      let channelDownloadURL = "/backend/api/v1/incoming/merchanttoexcle/";
      channelDownload(channelDownloadURL, this.dataDeal()).then(res => {
        console.log(res);
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", "连锁子商户.xls");
        document.body.appendChild(link);
        link.click();
      });
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
.backspaces {
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
  margin: 20px 0 60px 150px;
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