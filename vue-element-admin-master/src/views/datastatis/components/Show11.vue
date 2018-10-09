<template>
    <div class="filter-container" >
        <el-row class="twos">
              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4"  class="twosItem" >
                <div class="grid-title">担保交易发生总额</div>
                <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0" :end-val="400" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0" :end-val="10000" :duration="2600" class="card-panel-nums"/>  
                 </div>              
              </el-col>
              <div class="gards1"></div>

              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" >
                <div class="grid-title">担保交易发生现金总额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0" :end-val="5600" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0" :end-val="150000" :duration="2600" class="card-panel-nums"/>  
                 </div>  
                </el-col>
                <div class="gards1 g1"></div>

              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" >
                <div class="grid-title">担保账户赠送总额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0" :end-val="500" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0" :end-val="150000" :duration="2600" class="card-panel-nums"/>  
                 </div>  
              </el-col> 
                <div class="gards1 g2"></div>
              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4"  class="twosItem" >
                <div class="grid-title">担保押金总额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0" :end-val="400" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0" :end-val="10000" :duration="2600" class="card-panel-nums"/>  
                 </div>           
              </el-col>
              <div class="gards1  g3"></div>

              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" >
                <div class="grid-title">担保账户结算总额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0" :end-val="400" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0" :end-val="10000" :duration="2600" class="card-panel-nums"/>  
                 </div>  
                </el-col>
                <div class="gards1 g4"></div>
              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" >
                <div class="grid-title">担保账户储蓄现金总额</div>
                 <div class="items"><span class="titles">昨日</span>
                 <count-to :start-val="0" :end-val="400" :duration="2600" class="card-panel-nums"/>  
                 </div> 
                  <div class="items"><span class="titles">累计</span>
                 <count-to :start-val="0" :end-val="10000" :duration="2600" class="card-panel-nums"/>  
                 </div>  
              </el-col>            
            </el-row>
    </div>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  name: "Show11",
  data() {
    return {
      date: ""
    };
  },
  components: {
    CountTo
  },
  methods: {}
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
.searchDay {
}

.datas {
}
.searchSubmit {
}
</style>