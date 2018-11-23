<template>
  <div class="app-container">
    <div class="filter-container">
     <span class="userSearch"> 登录账号：</span>
     <el-input placeholder="请输入登录账号" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/> 
      <span class="userSearch"> 选择时间：</span>
      <el-date-picker
      v-model="value1"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
      <el-button v-waves class="filter-item searchHandle" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>   
       <el-button v-waves  class="filter-item searchHandle" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
       <el-button v-waves  class="filter-item searchHandle" type="danger" icon="el-icon-warning" @click="deleted">删除记录</el-button>
       <el-button v-waves  class="filter-item searchHandle backspaces" type="warning" icon="el-icon-close" @click="exitss">退出</el-button>
    </div> 

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="gridData"
      border
      fit
      @selection-change="handleSelectionChange"
      highlight-current-row
      style="width:100%;">
       <el-table-column
       align="center"
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column label="序号"  type="index" align="center" width="100%">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="登录时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录账号"   align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录地点"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="IP"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作情况" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" >{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>    
         
    </el-table>

    <div class="pagination-container">
      <el-pagination  :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { fetchList, searchList, deletedList, DownloadList } from "@/api/home";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";

export default {
  name: "operationblog",
  directives: {
    waves
  },

  data() {
    return {
      gridData: [
        {
          id: "111",
          date: "2018-09-10 10:11：00",
          title: "100000451920.mch",
          author: "四川省成都市",
          ip: "192.168.2.112",
          pageviews: "回家打卡"
        },
        {
          id: "111",
          date: "2018-09-10 10:11：00",
          title: "100000451920.mch",
          author: "四川省成都市",
          ip: "192.168.2.112",
          pageviews: "回家打卡"
        },
        {
          id: "111",
          date: "2018-09-10 10:11：00",
          title: "100000451920.mch",
          author: "四川省成都市",
          ip: "192.168.2.112",
          pageviews: "回家打卡"
        },
        {
          id: "111",
          date: "2018-09-10 10:11：00",
          title: "100000451920.mch",
          author: "四川省成都市",
          ip: "192.168.2.112",
          pageviews: "回家打卡"
        },
        {
          id: "111",
          date: "2018-09-10 10:11：00",
          title: "100000451920.mch",
          author: "四川省成都市",
          ip: "192.168.2.112",
          pageviews: "回家打卡"
        },
        {
          id: "111",
          date: "2018-09-10 10:11：00",
          title: "100000451920.mch",
          author: "四川省成都市",
          ip: "192.168.2.112",
          pageviews: "回家打卡"
        },
        {
          id: "111",
          date: "2018-09-10 10:11：00",
          title: "100000451920.mch",
          author: "四川省成都市",
          ip: "192.168.2.112",
          pageviews: "回家打卡"
        },

        {
          id: "111",
          date: "2018-09-10 10:11：00",
          title: "100000451920.mch",
          author: "四川省成都市",
          ip: "192.168.2.112",
          pageviews: "回家打卡"
        }
      ],
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 100,
      listLoading: true,
      listQuery: {
        page: 5,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //选择行
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      console.log(111);
    },
    //   获取初始化数据，每当搜索或者点击分页时都会执行一次
    getList() {
      this.listLoading = true;
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items;
      //   this.total = response.data.total;

      //   // Just to simulate the time of the request

      // });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    //搜索功能
    handleFilter() {
      this.listQuery.page = 1;
      // ajax请求后,
      // searchList(this.listQuery).then(res => {
      //  console.log(res)}
      // this.getList();
    },
    //分页功能选择 ，和搜索api一样
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.listQuery.limit = val;
      // searchList(this.listQuery).then(res => {
      //  console.log(res)
      this.getList();
    },
    //分页功能选择 ，和搜索api一样
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listQuery.page = val;
      // searchList(this.listQuery).then(res => {
      //  console.log(res)
      this.getList();
    },

    // 导出功能
    handleDownload() {
      console.log("正在导出");
    },
    //删除功能
    deleted() {
      //  删除功能
      console.log(this.multipleSelection);
      // deletedList(this.multipleSelection).then(res => {
      //  console.log(res)
    },
    // 退出按钮
    exitss() {
      this.$store.dispatch("componentsId", "adminDashboard");
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
  // margin-left: 5%;
}
</style>

