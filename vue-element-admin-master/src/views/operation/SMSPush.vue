<template>
    <div class="bigBox">
      <!-- 选择按钮 -->
     <div class="clear">
        <div class="btnpub" :class="isShow=='1'?'tow':''" @click="mesHandle(1)">短信模块</div>
        <div class="btnpub" :class="isShow=='2'?'tow':''" @click="mesHandle(2)">结算模块</div>
        <div class="btnpub" :class="isShow=='3'?'tow':''" @click="mesHandle(3)">消息记录</div>
      </div>
     <div class="showTable">
      <component :is="componentId"></component>      
    </div>
    </div>
</template>

<script>
import SMSTable from "./components/SMSTable";
import SetModule from "./components/SetModule";
import MsgRecord from "./components/MsgRecord";
export default {
  name: "SMSPush",
  components: {
    SMSTable,
    SetModule,
    MsgRecord
  },
  data() {
    return {
      isShow: 1,
      componentId: SMSTable
    };
  },
  methods: {
    //点击获取不同页面
    mesHandle(data) {
      console.log("data");
      this.isShow = data;
      if (data == 1) {
        this.componentId = "SMSTable";
      } else if (data == 2) {
        this.componentId = "SetModule";
      } else if (data == 3) {
        this.componentId = "MsgRecord";
      }
    }
  }
};
</script>

<style scoped>
.bigBox {
  margin: 20px auto;
  width: 97.647%;
  background-color: #fff;
}
.btnpub {
  width: 33.33%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  background: #f0f0f0;
  display: inline-block;
  color: #666666;
  box-sizing: border-box;
  float: left;
  text-align: center;

  cursor: pointer;
}
.clear {
  zoom: 1;
}
.clear:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.tow {
  color: #1c3672;
  background-image: linear-gradient(-180deg, #eaf1fb 0%, #d0ddf5 100%);
}
.showTable {
  margin-top: 30px;
}
</style>