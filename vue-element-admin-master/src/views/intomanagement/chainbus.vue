<template>
    <div>
      <component :is="componentId" :searchURL='searchURL'  @addChain='addChain'></component>      
    </div>
</template>

<script>
import Table from "./components/Table1";
import AddChain from "./components/AddChain1";
export default {
  name: "Chainbus",
  data() {
    return {
      componentId: Table,
      searchURL: "incoming/chainchildlist/"
    };
  },
  components: {
    Table,
    AddChain
  },
  methods: {
    //search组件新增渠道商按钮传值
    addChain(data) {
      this.componentId = data;
    }
  }
};
</script>

<style scoped>
</style>