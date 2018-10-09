<template>
    <div>
      <Search @addChain='addChain' />
      <!-- 我是表格组件 -->
      <el-row :gutter="20">
        <el-col :span="16"> 
          <div class="bigBoxs">
            <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridData" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
              <el-table-column align="center" type="selection" width="55"></el-table-column>
              <el-table-column property="channelNum" label="渠道编号"  align="center" ></el-table-column>
              <el-table-column property="tardNum" label="交易订单号"  align="center"></el-table-column>
              <el-table-column label="信条对账金额"  align="center">
                 <template slot-scope="scope">
                  <span type="text" size="small" class="xiaz">￥{{scope.row.money1}}</span>
                </template>
              </el-table-column>
              <el-table-column  label="第三方对账金额"  align="center">
                <template slot-scope="scope">
                  <span type="text" size="small" class="xiaz">￥{{scope.row.money2}}</span>
                </template>
              </el-table-column>
              <el-table-column  label="异常类型"  align="center" width="95%">
                <template slot-scope="scope">
                  <span type="text" size="small" class="shanchu"  v-if="scope.row.statuss==1" >数据错误</span>
                  <span type="text" size="small" class="noppss" v-if="scope.row.statuss==2">多账</span>
                  <span type="text" size="small" class="noppss" v-if="scope.row.statuss==3">短账</span>
                </template>
              </el-table-column>
              <el-table-column  label="处理状态"  align="center" width="95%" >
                <template slot-scope="scope">
                  <span type="text" size="small" class="noppss"  v-if="scope.row.statu1==1" >等待处理</span>
                  <span type="text" size="small" class="ppss" v-if="scope.row.statu1==2">已调账</span>
                  <span type="text" size="small" class="tiaoz" v-if="scope.row.statu1==3">已处理</span>
                </template>
              </el-table-column>
              <el-table-column property="handing" label="处理方式"  align="center"  width="95%"></el-table-column>
              <el-table-column  label="操作"   align="center" width="80%" >
                <template slot-scope="scope" >
                  <el-button @click="passsubmit(scope.row)" type="text" size="small" class="xiaz">查看</el-button>            
                </template>
              </el-table-column>               
          </el-table>
          <!-- 下面的选择按钮 -->
          <div class="allChose">
            <el-button v-waves class="searchs" type="primary"  @click="cainaJump">采纳平台</el-button>
            <el-button v-waves class="searchs" type="primary"  @click="sanfangJump">采纳第三方</el-button>          
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
          <div class="rightMenu" v-show="isShow">
            <Details />
          </div>
      </el-col>
    </el-row>
 </div>
</template>

<script>
import Search from "./search.vue";
import Details from "./Details.vue";
import waves from "@/directive/waves"; // 水波纹指令
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
export default {
  name: "Table",
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
      isShow: false,
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      gridData: [
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "3",
          handing: "采纳第三方",
          statu1: "2"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "2",
          handing: "采纳第三方",
          statu1: "3"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "2",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
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
    // 查看按钮
    passsubmit(data) {
      console.log("你点击了查看按钮");
      console.log(data);
      this.isShow = true;
    },

    // 采纳平台按钮
    cainaJump() {
      console.log("====================================");
      console.log("你点击了采纳平台按钮");
      console.log("====================================");
    },
    // 采纳第三方按钮
    sanfangJump() {
      console.log("====================================");
      console.log("你点击了采纳第三方按钮");
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

.xiaz {
  color: #1c3672;
}
.tiaoz {
  color: #88acff;
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