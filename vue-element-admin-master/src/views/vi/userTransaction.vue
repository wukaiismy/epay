<template>
    <div>
         <component :is="componentId"  @addChain='addChain'></component> 
    </div>
</template>

<script>
import Table from "./components/Table1";
export default {
  name: "UserTransaction",
  components: {
    Table
  },
  data() {
    return {
      componentId: Table
    };
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