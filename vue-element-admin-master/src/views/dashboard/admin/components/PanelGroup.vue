<template>
  <el-row :gutter="20" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
       
        <div class="card-panel-description">
          <div class="card-panel-text">今日交易笔数</div>
          <count-to :start-val="0" :end-val="panelGroup.today_count" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        
        <div class="card-panel-description">
          <div class="card-panel-text">今日交易总额</div>
           ￥<count-to :start-val="0"  :decimals='2' :end-val="panelGroup.today_sum*1" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
       
        <div class="card-panel-description">
          <div class="card-panel-text">本月交易笔数</div>
         <count-to :start-val="0"  :end-val="panelGroup.count_tomonth" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">        
        <div class="card-panel-description">
          <div class="card-panel-text">本月交易总额</div>
           ￥<count-to   :start-val="0"  :decimals='2' :end-val="panelGroup.sum_tomonth*1" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  props: ["panelGroup"],
  components: {
    CountTo
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      console.log(this.panelGroup);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin: 18px 0 20px 0 !important;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 100px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    font-size: 24px;
    color: #1c3672;
    background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
    border-radius: 6px;
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      text-align: center;
      margin-top: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        font-size: 16px;
        color: #333333;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
