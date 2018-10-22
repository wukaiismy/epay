<template>
    <div>
       <component :is="componentId" :datalist='datalist' :dataEdit='dataEdit' @showAgree='showAgree' @editAgree='editAgree'></component> 
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
      componentId: AgreementShow,
      datalist: {},
      dataEdit: ""
    };
  },
  methods: {
    //子组件传值,查看
    showAgree(data) {
      console.log(data);
      this.datalist = data;
      this.componentId = AgreementShows;
    },
    //子组件传值,编辑
    editAgree(data) {
      console.log(data);
      this.dataEdit = data;
      this.componentId = EditAgree;
    }
  }
};
</script>

<style scoped>
</style>