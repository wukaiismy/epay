<template>
    <div class="filter-container" >      
           <div class="els">
                <div class="grid-content">交易订单号：<el-input v-model="searchList.orderNum" style="width: 120px;" clearable></el-input></div>
                <div class="grid-content">处理状态：<el-input v-model="searchList.status" style="width: 120px;" clearable></el-input></div>
                <div class="grid-content">异常类型：<el-input v-model="searchList.abType" style="width: 130px;" clearable></el-input></div>   
                <span class="userSearch"> 创建日期：</span> 
                <el-date-picker v-model="searchList.date" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
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
      searchList: {
        orderNum: "",
        status: "",
        abType: "",
        date: ""
      },
      listLoading: false
    };
  },
  methods: {
    //搜索功能
    handleFilter() {
      console.log(this.searchList);
      this.$emit("channelSearch", this.searchList);
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
    margin: 30px 0 10px 20px;
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
  margin-left: 20px;
}
</style>