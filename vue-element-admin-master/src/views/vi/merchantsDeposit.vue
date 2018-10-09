<template>
    <div>
       <component :is="componentId" ></component> 
    </div>
</template>

<script>
import Table from "./components/Table2";
export default {
  name: "MerchantsDeposit",
  components: {
    Table
  },
  data() {
    return {
      componentId: Table
    };
  },
  methods: {}
};
</script>

<style scoped>
</style>