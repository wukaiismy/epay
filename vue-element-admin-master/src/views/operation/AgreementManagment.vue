<template>
    <div>
       <component :is="componentId" @showAgree='showAgree' @editAgree='editAgree'></component> 
    </div>
</template>

<script>
import AgreementShow from "./components/AgreementShow";
import AgreementShows from "./components/AgreementShows";
import EditAgree from "./components/EditAgree";
export default {
  name: "AgreementManagment",
  components: {
    AgreementShow,
    AgreementShows,
    EditAgree
  },
  data() {
    return {
      componentId: AgreementShow
    };
  },
  methods: {
    //子组件传值,查看
    showAgree(data) {
      console.log(data);
      this.componentId = AgreementShows;
    },
    //子组件传值,编辑
    editAgree(data) {
      console.log(data);
      this.componentId = EditAgree;
    }
  }
};
</script>

<style scoped>
</style>