<template>
    <div>
      <component :is="componentId"  @addChain='addChain'></component>      
    </div>
</template>

<script>
import Table from "./components/Table3";
import AddChain from "./components/AddChain3";
export default {
  name: "Retailbus",
  data() {
    return {
      componentId: Table
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