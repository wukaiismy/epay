<template>
    <div class="bigBox">
      <!-- 选择按钮 -->
     <div class="clear">
        <div class="btnpub" :class="isShow?'tow':''" @click="mesHandle(1)">担保交易</div>
        <div class="btnpub" :class="!isShow?'tow':''" @click="mesHandle(2)">担保押金</div>
      </div>
     <div>
      <component :is="componentId"></component>      
    </div>
    </div>
</template>

<script>
import ChannelTable from "./components/ChannelTable";
import CashDeposit from "./components/CashDeposit";
export default {
  name: "ChanelTrad",
  components: {
    ChannelTable,
    CashDeposit
    // AddChain
  },
  data() {
    return {
      isShow: true,
      componentId: ChannelTable
    };
  },
  methods: {
    //点击获取不同页面
    mesHandle(data) {
      console.log("data");
      if (data == 1) {
        this.isShow = true;
        this.componentId = "ChannelTable";
      } else {
        this.isShow = false;
        this.componentId = "CashDeposit";
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
  width: 50%;
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
</style>