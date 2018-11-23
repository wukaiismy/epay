<template>
    <div class="filter-container" >      
           <div class="els">
                <div class="grid-content">所属渠道商名称：<el-input v-model="searchList.channels" clearable  style="width: 140px;"></el-input></div>
                <div class="grid-content">所属渠道商编号：<el-input v-model="searchList.channelsNum" clearable  style="width: 140px;"></el-input></div>
                <div class="grid-content">结算账号：<el-input v-model="searchList.setAccount" clearable style="width: 140px;"></el-input></div>               
           </div>
         <!-- 第二排的搜索 -->
           <div class="els">
                <div class="grid-content">结算方式：<el-input v-model="searchList.setType" style="width: 140px;" clearable></el-input></div>
                <div class="grid-content">划付状态：
                   <select v-model="searchList.payStatus" class="selectBox"  @click="ss()" >
                      <option v-for="(a,index) in options" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
                   </select>  
                </div>
                <span class="userSearch"> 创建日期：</span> 
                <el-date-picker v-model="searchList.date" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
               <el-button v-waves class="searchs" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
    </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "Search1",
  directives: {
    waves
  },
  data() {
    return {
      searchList: {
        channels: "",
        channelsNum: "",
        setAccount: "",
        setType: "",
        payStatus: "",
        date: ""
      },
      listLoading: false,
      options: [
        {
          value: "",
          label: "选择划付状态",
          disabled: ""
        },
        {
          value: "1",
          label: "划付成功"
        },
        {
          value: "2",
          label: "划付失败"
        }
      ]
    };
  },
  methods: {
    //搜索功能
    handleFilter() {
      console.log(this.searchList);
      this.$emit("channelSearch", this.searchList);
    },
    ss() {
      this.options[0].disabled = "disabled";
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
.selectBox {
  width: 120px;
  height: 35px;
  border: 1px solid #dcdfe6;
}
</style>