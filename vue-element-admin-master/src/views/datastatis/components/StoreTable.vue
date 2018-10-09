<template>
    <div>
       <!-- 搜索部分 -->
       <SearchStore />
       <!-- 灰色间隔线 -->
        <div class="Gard1"></div>
         <!-- 下面是具体的表格展示部分 -->
                  <div>
                      <ChannelBiaoge />
                  </div>
    </div>
</template>

<script>
import SearchStore from "./SearchStore.vue";
import ChannelBiaoge from "./ChannelBiaoge";
export default {
  name: "StoreTable",
  data() {
    return {};
  },
  components: {
    SearchStore,
    ChannelBiaoge
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