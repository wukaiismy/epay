<template>
    <div class="filter-container" >
        <el-row class="twos">
              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4"  class="twosItem" >
                <div class="grid-title">交易笔数</div>
                <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0"  :end-val="msg.count_yesterday" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0" :end-val="msg.count_history" :duration="2600" class="card-panel-nums"/>  
                 </div>              
              </el-col>
              <div class="gards1"></div>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" >
                <div class="grid-title">交易总额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0"  :decimals='2' :end-val="msg.lump_sum_yesterday*1" :duration="2600" class="card-panel-nums"/>  
                 </div>  
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0"  :decimals='2' :end-val="msg.lump_sum_history*1" :duration="2600" class="card-panel-nums"/>  
                 </div>  
                </el-col>
                <div class="gards1 g1"></div>

              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" >
                <div class="grid-title">交易现金总额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0"  :decimals='2' :end-val="msg.sum_amount_yesterday*1" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0"  :decimals='2'  :end-val="msg.sum_amount_history*1" :duration="2600" class="card-panel-nums"/>  
                 </div>  
              </el-col> 
                <div class="gards1 g2"></div>
              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4"  class="twosItem" >
                <div class="grid-title">交易赠送总额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0"  :decimals='2' :end-val="msg.sum_gift_yesterday*1" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="200"  :decimals='2' :end-val="msg.sum_gift_history*1" :duration="2600" class="card-panel-nums"/>  
                 </div>           
              </el-col>
              <div class="gards1  g3"></div>

              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" >
                <div class="grid-title">交易总净额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="220"  :decimals='2' :end-val="msg.sum_amount_yesterday*1" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="700"  :decimals='2' :end-val="msg.sum_amount_history*1" :duration="2600" class="card-panel-nums"/>  
                 </div>  
                </el-col>
                <div class="gards1 g4"></div>
              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" >
                <div class="grid-title">手续费收入</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0"  :decimals='2' :end-val="msg.sum_amount_yesterday*1" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="300"     :decimals='2' :end-val="msg.sum_amount_history*1" :duration="2600" class="card-panel-nums"/>  
                 </div>  
              </el-col>            
            </el-row>
    </div>
</template>

<script>
import CountTo from "vue-count-to";
import { dataMsg } from "@/api/datastatis";

export default {
  name: "Show1",
  data() {
    return {
      date: "",
      msg: {}
    };
  },
  components: {
    CountTo
  },
  mounted() {},
  created() {
    this.getMsg();
  },
  methods: {
    //获取交易概括基本信息
    getMsg() {
      dataMsg().then(res => {
        console.log("获取交易概括基础数据");
        console.log(res.data);
        this.msg = res.data;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-panel-description {
  margin-top: 30px;
  margin-left: 0px;
  .gards1 {
    height: 80px;
    width: 1px;
    border: 1px solid #f0f0f0;
    position: absolute;
    left: 16.677%;
  }
  .g1 {
    left: 33.33%;
  }
  .g2 {
    left: 50%;
  }
  .g3 {
    left: 66.777%;
  }
  .g4 {
    left: 83.333%;
  }
  .twos {
    margin-top: 20px;
    .grid-title {
      font-size: 14px;
      color: #333333;
      margin-bottom: 20px;
      text-align: center;
    }
    .card-panel-nums {
      font-size: 14px;
      color: #1c3672;
      position: relative;
      float: right;
    }
    .colers {
      color: #f6a623;
    }
  }
}
.twosItem {
  height: 100px;

  position: relative;
  padding: 0 1% 0 1%;
}
.titles {
  font-size: 14px;
  color: #999999;
  position: relative;
  display: inline-block;
}
.items {
  margin-top: 10px;
}
.Gard {
  width: 100%;
  border: 1px solid #f0f0f0;
  margin-top: 10px;
}
.searchBox {
  width: 100%;
  height: 34px;
  margin: 20px;
  position: relative;
  float: right;
}
.searchMonth,
.datas,
.searchDay,
.searchSubmit {
  float: right;
  margin-right: 20px;
}
</style>