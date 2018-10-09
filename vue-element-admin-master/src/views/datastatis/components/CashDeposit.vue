<template>
    <div>
       <!-- 搜索部分 -->
       <Search />
       <!-- 灰色间隔线 -->
        <div class="Gard1"></div>
         <!-- 下面是具体的表格展示部分 -->
                  <div>
                      <CashBiaoge />
                  </div>
    </div>
</template>

<script>
import Search from "./Search.vue";
import CashBiaoge from "./CashBiaoge";
export default {
  name: "CashDeposit",
  data() {
    return {};
  },
  components: {
    Search,
    CashBiaoge
  }
};
</script>

<style scoped>
.Gard1 {
  width: 100%;
  border: 1px solid #f0f0f0;
  margin: 10px 0 10px 0;
}
</style>