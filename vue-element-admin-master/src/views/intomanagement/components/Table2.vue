<template>
    <div>
      <Search @addChain='addChain' />
      <!-- 我是表格组件 -->
      <el-row :gutter="20">
        <el-col :span="16"> 
          <div class="bigBoxs">
            <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridData" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
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
    <!-- 下面是每个渠道商信息显示部门 -->
     <div class="rightMenu">
       <Details />
     </div>
     </el-col>
   </el-row>
 </div>
</template>

<script>
import Search from "./search2.vue";
import Details from "./Details2.vue";
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
      ]
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
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 单个通过按钮按钮
    passsubmit(data) {
      console.log("====================================");
      console.log("你点击了单个通过按钮");
      console.log(data.types);
      console.log("====================================");
    },
    // 单个驳回按钮
    returnsubmit(data) {
      console.log("你点击了单个驳回按钮");
      console.log(data.types);
    },
    // 批量激活按钮
    jihuoJump() {
      console.log("====================================");
      console.log("你点击了批量激活");
      console.log("====================================");
    },
    // 批量通过按钮
    passJump() {
      console.log("====================================");
      console.log("你点击了通过激活");
      console.log("====================================");
    },
    // 批量激活和通过按钮
    allJump() {
      console.log("====================================");
      console.log("你点击了批量激活和通过");
      console.log("====================================");
    },
    // 批量驳回按钮
    bohuiJump() {
      console.log("====================================");
      console.log("你点击了批量驳回");
      console.log("====================================");
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
  margin: 0 0 60px 2%;
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