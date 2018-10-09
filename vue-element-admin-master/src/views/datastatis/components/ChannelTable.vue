<template>
    <div>
       <!-- 搜索部分 -->
       <Search />
       <!-- 灰色间隔线 -->
        <div class="Gard1"></div>
         <!-- 下面是具体的表格展示部分 -->
                  <div>
                      <ChannelBiaoge />
                  </div>
    </div>
</template>

<script>
import Search from "./Search.vue";
import ChannelBiaoge from "./ChannelBiaoge";
export default {
  name: "ChannelTable",
  data() {
    return {};
  },
  components: {
    Search,
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