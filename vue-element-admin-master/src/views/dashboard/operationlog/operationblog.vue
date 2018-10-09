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
      :data="list"
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
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录时间" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录账号" width="350px">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录地点" width="350px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="IP" width="306px"  align="center">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
        </template>
      </el-table-column>
      <el-table-column label="操作情况" align="center" width="250px">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>    
         
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";

export default {
  name: "operationblog",
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
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      importanceOptions: [1, 2, 3],

      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published"
      },

      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      }
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
    //   获取数据啊
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    //搜索功能
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    //分页功能选择
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    //分页功能选择
    handleCurrentChange(val) {
      this.listQuery.page = val;
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
    // 退出按钮
    exitss() {
      this.$store.dispatch("componentsId", "adminDashboard");
    },
    //删除功能
    deleted() {
      console.log(this.multipleSelection);
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

