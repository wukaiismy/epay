<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" id='fhadf'>
   <img class="imsg" src="../../../../assets/login/shouyelogo.png" alt="">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#4990E2"
      id='listdd'
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

<style >
.imsg {
  width: 113px;
  height: 50px;
  margin: 20px 0 30px 33px;
}

#app #fhadf #listdd .is-active {
  background-image: linear-gradient(
    -180deg,
    #ebf1fc 0%,
    #d1ddf6 100%
  ) !important;
  color: #1c3672 !important;
}
#listdd,
.el-submenu__title,
.el-menu-item,
.el-scrollbar__view,
#app #fhadf #listdd .el-menu-item {
  background-color: #1c3672 !important;
}
#listdd li {
  width: 200px;
  /* height: 51px; */
  border-bottom: 1px solid #162b5b;
  color: white !important;
  font-size: 16px;
}
#app .sidebar-container {
  width: 200px !important;
}
.el-submenu__title {
  font-size: 16px;
  height: 51px;
  line-height: 51px;
  box-sizing: border-box;
  border-bottom: 1px solid #162b5b !important;
  color: white !important;
}
#app .main-container {
  margin-left: 200px;
}
</style>

