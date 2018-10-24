<template>
  <el-row :gutter="20" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" >       
        <div class="card-panel-description">
          <div class="card-panel-text">用户总览</div>
          <el-row :gutter="10" class="twos">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"  class="twosItem" >
                <div class="grid-title">认证渠道商</div>
                 <count-to :start-val="0" :end-val="UserOverview.passed_channel" :duration="2600" class="card-panel-nums"/>               
              </el-col>
              <div class="gards1"></div>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="twosItem" >
                <div class="grid-title">商家注册量</div>
                 <count-to :start-val="0" :end-val="UserOverview.passed_merchant" :duration="2600" class="card-panel-nums"/>
                </el-col>
                <div class="gards1 g2"></div>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="twosItem" >
                <div class="grid-title">用户注册量</div>
                 <count-to :start-val="0" :end-val="UserOverview.users_count" :duration="2600" class="card-panel-nums"/>
              </el-col>            
            </el-row>
         
        </div>
      </div>
    </el-col>
    <!-- 待处理事务 -->
    <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" >        
        <div class="card-panel-description">
          <div class="card-panel-text">待处理事务</div>
            <el-row :gutter="10" class="twos">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"  class="twosItem" >
                <div class="grid-title">待渠道商认证审核</div>
                 <count-to :start-val="0" :end-val="UserOverview.Pending_channel" :duration="2600" class="card-panel-nums colers"/>               
              </el-col>
              <div class="gards1"></div>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="twosItem" >
                <div class="grid-title">待商家认证审核</div>
                 <count-to :start-val="0" :end-val="UserOverview.Pending_merchant" :duration="2600" class="card-panel-nums colers"/>
                </el-col>
                 <div class="gards1 g2"></div>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="twosItem" >
                <div class="grid-title">待处理异常订单</div>
                 <count-to :start-val="0" :end-val="0" :duration="2600" class="card-panel-nums colers"/>
              </el-col>            
            </el-row>
        </div>
      </div>
    </el-col>
   
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  name: "UserOverview",
  props: ["UserOverview"],
  components: {
    CountTo
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin: 18px 0 20px 0 !important;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 175px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    font-size: 24px;
    color: #1c3672;
    background: #ffffff;
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
      margin-top: 10px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        font-size: 16px;
        color: #1c3672;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
      .gards1 {
        height: 56px;
        width: 1px;
        border: 1px solid #f0f0f0;
        position: absolute;
        left: 33%;
      }
      .g2 {
        left: 66%;
      }
      .twos {
        margin-top: 20px;
        .grid-title {
          font-size: 14px;
          color: #333333;
          margin-bottom: 20px;
        }
        .card-panel-nums {
          font-size: 24px;
          color: #4990e2;
        }
        .colers {
          color: #f6a623;
        }
      }
    }
  }
}
</style>
