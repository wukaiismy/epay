<template>
    <div class="filter-container" >      
           <div class="els">
                <div class="grid-content">商户名称：<el-input v-model="searchList.storeName" clearable  style="width: 140px;"></el-input></div>
                <div class="grid-content">商户编号：<el-input v-model="searchList.storeNums" clearable  style="width: 140px;"></el-input></div>  
                <div class="grid-content">结算账号：<el-input v-model="searchList.setAccount" clearable style="width: 140px;"></el-input></div>               
           </div>
         <!-- 第二排的搜索 -->
           <div class="els">
                <div class="grid-content">所属渠道商名称：<el-input v-model="searchList.channels" style="width: 120px;" clearable></el-input></div>
                <div class="grid-content">所属渠道商编号：<el-input v-model="searchList.channelsNum" style="width: 120px;" clearable></el-input></div>
                <div class="grid-content">划付状态：<el-input v-model="searchList.payStatus" style="width: 130px;" clearable></el-input></div>
                <span class="userSearch"> 交易日期：</span> 
                <el-date-picker v-model="searchList.date" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
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
        storeName: "",
        storeNums: "",
        setAccount: "",
        channels: "",
        channelsNum: "",
        payStatus: "",
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
  margin-left: 20px;
}
</style>