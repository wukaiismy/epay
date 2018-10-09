<template>
  <div class="dashboard-container">
    <component :is="componentsId"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
import operationblog from "./operationlog/operationblog";
import settings from "./settings";
import userinfo from "./userinfo";

// import editorDashboard from './editor'

export default {
  name: "Dashboard",
  components: {
    adminDashboard,
    operationblog,
    settings,
    userinfo
  },
  data() {
    return {
      currentRole: ""
    };
  },
  computed: {
    ...mapGetters(["roles", "componentsId"])
  },
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editorDashboard";
    }
  },
  methods: {
    //查看操作日志 ，组件切换方法
  }
};
</script>
