<template>
    <div class="filter-container" >
        <div class="els">
            <div class="grid-content">商户名称：<el-input v-model="storeName" clearable class="" style="width: 120px;"></el-input></div>               
            <div class="grid-content">商户编号：<el-input v-model="storeNums" clearable class="" style="width: 120px;"></el-input></div> 
            <div class="grid-content">担保账户编号：<el-input v-model="danbao" clearable class="" style="width: 120px;"></el-input></div>
        </div> 

        <div class="els"> 
            <div class="grid-content">所属渠道商名称：<el-input v-model="channels" style="width: 130px;" clearable></el-input></div>
            <div class="grid-content">所属渠道商编号：<el-input v-model="channelsNum" style="width: 130px;" clearable></el-input></div>      
            <span class="userSearch"> 创建时间：</span><el-date-picker v-model="value1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>             
            <div class="grid-content">状态：<el-input v-model="channelsStatus" style="width: 120px;" clearable></el-input></div>
            
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
      storeName: "",
      storeNums: "",
      danbao: "",
      channels: "",
      channelsNum: "",
      value1: "",
      channelsStatus: "",
      listLoading: false
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
.piliang {
  //   position: absolute;
  width: 140px;
  height: 40px;
  overflow: hidden;
  display: inline-block;
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
  border-radius: 6px;
  font-size: 16px;
  color: #1c3672;
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
}
.adds {
  background-image: linear-gradient(-137deg, #142855 0%, #4553a4 100%);
  //   right: 40px;
  color: #ffffff;
}
.daoBox {
  position: absolute;
  width: 315px;

  right: 0.21%;
  top: 25px;
}

/* 模态框样式*/
#bbb {
  width: 574px;
  height: 262px;
}
.diaTilte {
  position: absolute;
  top: 20px;
  left: 37%;
  margin-left: 5px;
  font-size: 16px;
  color: #1c3672;
}
.gards1 {
  border: 1px solid #f0f0f0;
  width: 95%;
  height: 1px;
  margin-left: 10px;
}
.downLoad {
  font-size: 14px;
  color: #1c3672;
  margin: 20px 0 0 20px;
  cursor: pointer;
}
.ds {
  margin-top: 20px;
}
.upload-demo {
  display: inline-block;
}
.shuoming {
  margin-top: 10px;
  font-size: 12px;
  color: #666666;
  text-indent: 25px;
  line-height: 17px;
}
</style>