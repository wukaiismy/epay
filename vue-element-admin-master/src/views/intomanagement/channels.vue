<template>
    <div>
      <component :is="componentId"  @addChain='addChain'></component>      
    </div>
</template>

<script>
import Table from "./components/Table";
import AddChain from "./components/AddChain";
export default {
  name: "Channels",
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