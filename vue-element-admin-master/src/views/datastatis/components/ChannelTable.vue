<template>
    <div>
       <!-- 搜索部分 -->
       <Search @channelSearch='channelSearch' />
       <!-- 灰色间隔线 -->
        <div class="Gard1"></div>
         <!-- 下面是具体的表格展示部分 -->
                  <div>
                      <ChannelBiaoge :dataList='dataList' />
                  </div>
    </div>
</template>

<script>
import Search from "./Search.vue";
import ChannelBiaoge from "./ChannelBiaoge";
export default {
  name: "ChannelTable",
  data() {
    return {
      dataList: null
    };
  },
  components: {
    Search,
    ChannelBiaoge
  },
  methods: {
    // 搜索按钮传值回来
    channelSearch(data) {
      // console.log(data);
      // this.dataList = data;
    }
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