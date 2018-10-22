<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
   <img class="imsg" src="../../../../assets/login/shouyelogo.png" alt="">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#4990E2"
     
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script> 

<style  >
.imsg {
  width: 113px;
  height: 50px;
  margin: 20px 0 30px 33px;
}
</style>

