<template>
    <div>
       <component :is="componentId" :roleName='roleName' @cancels='cancels' @showAgree='showAgree' @editAgree='editAgree'></component>
    </div>
</template>

<script>
import RoleHome from "./components/RoleHome";
import AddRole from "./components/AddRole";
import ChangeRole from "./components/ChangeRole";
export default {
  name: "RoleAuthorization",
  components: {
    RoleHome,
    AddRole,
    ChangeRole
  },
  data() {
    return {
      componentId: RoleHome,
      roleName: ""
    };
  },
  methods: {
    //子组件传值,编辑
    showAgree(data) {
      console.log(data);
      this.roleName = data;
      this.componentId = ChangeRole;
    },
    //子组件传值,新增
    editAgree() {
      this.componentId = AddRole;
    },
    //  子组件取消按钮
    cancels() {
      this.componentId = RoleHome;
    }
  }
};
</script>

<style scoped>
</style>