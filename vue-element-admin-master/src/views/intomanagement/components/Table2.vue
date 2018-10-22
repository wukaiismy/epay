<template>
    <div>
      <Search @addChain='addChain'  @channelSearch='channelSearch' />
      <!-- 我是表格组件 -->
      <el-row :gutter="20">
        <el-col :span="16"> 
          <div class="bigBoxs">
            <el-table class="tableBox"  @current-change="handleCurrentpage" v-loading="listLoading" :key="tableKey" :data="gridData" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
                <el-table-column align="center" type="selection"  width="55"></el-table-column>
                <el-table-column property="date" label="商户编号"  align="center" ></el-table-column>
                <el-table-column property="types" label="连锁商户名称"  align="center"></el-table-column>
                <el-table-column property="sonStore" label="子商户名称"  align="center"></el-table-column>
                <el-table-column property="qudao" label="所属渠道"  align="center"></el-table-column>
                <el-table-column property="files" label="银行通道"  align="center"></el-table-column>
                <el-table-column  label="审核状态"  align="center" >
                  <template slot-scope="scope">
                    <span type="text" size="small" class="ppss"  v-if="scope.row.statuss==1" >审核通过</span>
                    <span type="text" size="small" class="noppss" v-if="scope.row.statuss==2">驳回</span>
                  </template>
                </el-table-column>
                <el-table-column  label="激活状态"  align="center" >
                  <template slot-scope="scope">
                    <span type="text" size="small" class="ppss"  v-if="scope.row.statu1==1" >已激活</span>
                    <span type="text" size="small" class="noppss" v-if="scope.row.statu1==2"></span>
                  </template>
                </el-table-column>
                <el-table-column  label="操作"   align="center">
                  <template slot-scope="scope" >
                    <el-button @click="passsubmit(scope.row)" type="text" size="small" class="xiaz">通过</el-button>
                    <el-button type="text" size="small" class="shanchu" @click="returnsubmit(scope.row)">驳回</el-button>
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
            <el-pagination v-show="total>0" :current-page="pages.currentPage" :page-sizes="[10,20,30, 50]" :page-size="100" :total="100" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
          </div>
      </el-col>
      <el-col :span="8">    
    <!-- 下面是每个连锁子商户信息显示部门 -->
     <div class="rightMenu" v-show="isshow">
       <Details :detailMsg='detailMsg' />
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
        currentPage: 5
      },

      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      isshow: false,
      gridData: [
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "1",
          statu1: "1"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "2",
          statu1: "2"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "1",
          statu1: "2"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "2",
          statu1: "1"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "2",
          statu1: "2"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "1",
          statu1: "2"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "2",
          statu1: "1"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "1",
          statu1: "1"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "1",
          statu1: "1"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "1",
          statu1: "1"
        },
        {
          date: "125451251152",
          types: "成都一股云有限公司",
          sonStore: "万达公司",
          qudao: "金桔联盟",
          files: "华夏银行",
          statuss: "1",
          statu1: "1"
        }
      ],
      detailMsg: null
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
      // this.gridData = data;
    },
    //  获取连锁子商户进件基本列表信息
    getList() {
      this.listLoading = true;
      console.log("连锁子商户进件表格基本信息");
      let channelURL = "incoming/chainchildlist/";
      channelMsg(channelURL).then(res => {
        console.log(res);
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    //选择当前行显示具体的信息
    handleCurrentpage(val) {
      console.log(val);
      let channelDetailURL = "incoming/channelid";
      channelDetail(channelDetailURL, val.date).then(res => {
        console.log(res);
        this.detailMsg = res.data;
      });
      //显示详细信息
      console.log("显示详细信息");
      this.isshow = true;
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 单个通过按钮按钮
    passsubmit(data) {
      console.log("你点击了单个通过按钮");
      console.log(data.types);
      var channelPassURL = "incoming/channelreview";
      // channelPass(channelPassURL,data.date).then(res => {
      //   console.log(res);
      // });
    },
    // 单个驳回按钮
    returnsubmit(data) {
      console.log("你点击了单个驳回按钮");
      var channelRejectedURL = "incoming/channelturndown";
      // channelRejected(channelRejectedURL,data.date).then(res => {
      //   console.log(res);
      // });
    },
    // 批量激活按钮
    jihuoJump() {
      console.log("你点击了通过激活");
      var channeljhURL = "incoming/channelact";
      // channelVolumeActivation(channeljhURL,this.multipleSelection).then(res => {
      //   console.log(res);
      // });
    },
    // 批量通过按钮
    passJump() {
      console.log("你点击了通过激活");
      var channelAPassURL = "incoming/channelreview";
      // channelVolumeActivation(channelAPassURL,this.multipleSelection).then(res => {
      //   console.log(res);
      // });
    },
    // 批量激活和通过按钮
    allJump() {
      console.log("你点击了批量激活和通过");
      var channelAllURL = "incoming/channelactandrev";
      // channelALL(channelAllURL,this.multipleSelection).then(res => {
      //   console.log(res);
      // });
    },
    // 批量驳回按钮
    bohuiJump() {
      var channelRejectedURL = "incoming/channelturndown";
      // channelVolumeRejected(channelRejectedURL,this.multipleSelection).then(res => {
      //   console.log(res);
      // });
    },
    // 导出按钮
    daochuJump() {
      console.log("你点击了导出按钮");
      let channelDownloadURL = "incoming/channeltoexcel/";
      let dataList = [];
      //导出时后台需要FormData格式的数据
      var param = new FormData();
      param.append("ids", [11477723]);
      var aa = { ids: [11477723] };
      // this.multipleSelection.forEach(function(v) {
      //   dataList.push(v.date);
      // });
      // console.log(dataList);
      // channelDownload(channelDownloadURL,param).then(res => {
      //   console.log(res);
      // });
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