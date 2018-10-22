<template>
    <div class="filter-container" >
        <el-row class="twos"  :gutter="20">
              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4" @click.native="checked(1,'newVisitis')"  class="twosItem" :class="isShow=='1'?'selceted':''"  >
                <div class="grid-title">用户担保交易数</div>              
                 <count-to :start-val="0" :end-val="msg.tradeNum*1" :decimals='2' :duration="2600" class="card-panel-nums"/>                 
              </el-col>
              <div class="gards1"></div>

              <el-col  :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem"  :class="isShow=='2'?'selceted':''"  @click.native="checked(2,'newVisitis')" >
                <div class="grid-title">用户担保交易总额</div>
                 <count-to :start-val="0" :end-val="msg.tradeAllMoney*1" :decimals='2' :duration="2600" class="card-panel-nums"/>  
                </el-col>
                <div class="gards1 g1"></div>

              <el-col  :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="twosItem"  :class="isShow=='3'?'selceted':''" @click.native="checked(3,'messages')" >
                <div class="grid-title">用户担保交易现金总额</div>
                <count-to :start-val="0" :end-val="msg.tradeCMoney*1" :decimals='2' :duration="2600" class="card-panel-nums"/>  
              </el-col> 
                <div class="gards1 g2"></div>
              <el-col   :xs="3" :sm="3" :md="3" :lg="3" :xl="3"  class="twosItem"  :class="isShow=='4'?'selceted':''"  @click.native="checked(4,'purchases')" >
                <div class="grid-title">账户现金发生总额</div>
                <count-to :start-val="0" :end-val="msg.tradegiveMoney*1" :decimals='2' :duration="2600" class="card-panel-nums"/>          
              </el-col>
              <div class="gards1  g3"></div>

              <el-col   :xs="3" :sm="3" :md="3" :lg="3"  :xl="3" class="twosItem"  :class="isShow=='5'?'selceted':''"  @click.native="checked(5,'shoppings')" >
                <div class="grid-title">用户账户储值总额</div>
                 <count-to :start-val="0" :decimals='2'  :end-val="msg.tradeJMoney*1" :duration="2600" class="card-panel-nums"/>  
                </el-col>
                <div class="gards1 g4"></div>
              <el-col   :xs="3" :sm="3" :md="3" :lg="3"  :xl="3" class="twosItem"   :class="isShow=='6'?'selceted':''"  @click.native="checked(6,'shoppings')">
                <div class="grid-title">商户现金储值总额</div>
                <count-to :start-val="0" :end-val="msg.tradexianJMoney*1" :decimals='2' :duration="2600" class="card-panel-nums"/>  
              </el-col>
               <div class="gards1 g5"></div>
              <el-col   :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="twosItem" :class="isShow=='7'?'selceted':''"  @click.native="checked(7,'shoppings')">
                <div class="grid-title">储蓄收益</div>
                <count-to :start-val="0" :end-val="msg.tradeRate*1" :decimals='2' :duration="2600" class="card-panel-nums"/>  
              </el-col>                
            </el-row>
    </div>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  name: "ShowMoney1",
  props: ["searchMsg"],
  data() {
    return {
      date: "",
      isShow: 2,
      msg: {
        tradeNum: "100000",
        tradeAllMoney: "315000.01",
        tradeCMoney: "666620.02",
        tradegiveMoney: "222222.36",
        tradeJMoney: "26559522.02",
        tradexianJMoney: "26559522.99",
        tradeRate: "15552656.69"
      }
    };
  },
  components: {
    CountTo
  },
  methods: {
    checked(data, type) {
      console.log(data);
      this.isShow = data;
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-panel-description {
  margin-top: 30px;
  margin-left: 0px;

  .gards1 {
    height: 60px;
    width: 1px;
    border: 1px solid #f0f0f0;

    position: absolute;
    left: 16.677%;
    top: 34px;
  }
  .g1 {
    left: 33.33%;
  }
  .g2 {
    left: 45.88%;
  }
  .g3 {
    left: 58.33%;
  }
  .g4 {
    left: 70.78%;
  }
  .g5 {
    left: 83.33%;
  }
  .twos {
    margin-top: 20px;
    .grid-title {
      font-size: 14px;
      color: #333333;
      margin-bottom: 20px;
      margin-top: 30px;
    }
    .card-panel-nums {
      font-size: 20px;
      color: #1c3672;
      text-align: center;
    }
    .colers {
      color: #f6a623;
    }
  }
}
.twosItem {
  height: 128px;
  text-align: center;
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
.selceted {
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
}
</style>