<template>
    <div class="filter-container" >      
           <div class="els">
                <div class="grid-content">直营/连锁子商户名称：<el-input v-model="searchList.sonStoreName" style="width: 140px;" clearable></el-input></div>
                <div class="grid-content">直营/连锁子商户编号：<el-input v-model="searchList.sonStoreNum" style="width: 140px;" clearable></el-input></div>
                <div class="grid-content">连锁商户名称：<el-input v-model="searchList.storeName" style="width: 140px;" clearable></el-input></div>
                <div class="grid-content">连锁商户编号：<el-input v-model="searchList.storeNum" style="width: 140px;" clearable></el-input></div>   
                <span class="userSearch"> 创建日期：</span> 
                <el-date-picker v-model="searchList.date" type="daterange"  start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                <el-button v-waves class="searchs" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import { searchDataMsg } from "@/api/datastatis";
export default {
  name: "SearchStore",
  directives: {
    waves
  },
  data() {
    return {
      searchList: {
        sonStoreName: "",
        sonStoreNum: "",
        storeName: "",
        storeNum: "",
        date: ""
      },

      listLoading: false,
      listQuery: []
    };
  },
  methods: {
    //搜索功能
    handleFilter() {
      console.log(this.searchList);
      searchDataMsg(this.searchList).then(response => {
        console.log(response);
        this.$emit("channelSearch", response);
      });
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