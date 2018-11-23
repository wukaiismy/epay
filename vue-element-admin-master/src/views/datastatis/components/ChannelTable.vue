<template>
    <div>
       <!-- 搜索部分 -->
       <Search @channelSearch='channelSearch' />
       <!-- 灰色间隔线 -->
        <div class="Gard1"></div>
         <!-- 下面是具体的表格展示部分 -->
                  <div>
                      <ChannelBiaoge ref='biaoge'  />
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
      console.log(data);
      var datas = {
        channel_name: data.storeName,
        channel_id: data.storeNum,
        begin_time: data.date[0],
        end_time: data.date[1]
      };
      this.$refs.biaoge.getList(datas);
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