<template>
    <div class="filter-container" >      
           <div class="els">
                <div class="grid-content">状态：<el-input v-model="status" clearable  style="width: 140px;"></el-input></div>              
                <span class="userSearch"> 交易日期：</span> 
                <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>              
           </div>
         <!-- 第二排的搜索 -->
           <div class="els">
                <div class="grid-content">商户名称：<el-input v-model="storeName" style="width: 120px;" clearable></el-input></div>
                <div class="grid-content">商户编号：<el-input v-model="storeNums" style="width: 120px;" clearable></el-input></div>
                <div class="grid-content">所属渠道商名称：<el-input v-model="channels" style="width: 130px;" clearable></el-input></div>
                <div class="grid-content">所属渠道商编号：<el-input v-model="channelsNum" style="width: 130px;" clearable></el-input></div>
                
               <el-button v-waves class="searchs" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "Search",
  directives: {
    waves
  },
  data() {
    return {
      status: "",
      date: "",
      storeName: "",
      storeNums: "",
      channels: "",
      channelsNum: "",
      listLoading: false,
      listQuery: []
    };
  },
  methods: {
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
      this.getList();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  margin: 0 auto;
}
.els {
  text-align: center;
  .grid-content {
    display: inline-block;
    font-size: 14px;
    margin: 20px 0 10px 10px;
    color: #666666;
    .el-input {
      display: inline-block;
    }
  }
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 255px;
}
.searchs {
  position: relative;
  margin-left: 20px;
}
.userSearch {
  font-size: 14px;
  color: #666666;
  margin-left: 10px;
}
</style>