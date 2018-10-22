<template>
    <div class="checkedBox" >
         <div class="checkedTitle">{{title}}</div>
          <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="c in option" :label="c" :key="c">{{c}}</el-checkbox>
          </el-checkbox-group>
    </div>
</template>

<script>
// const option = [
//   "渠道进件",
//   "连锁商户进件",
//   "连锁子商户进件",
//   "进件审核",
//   "直营商户进件"
// ];
export default {
  name: "CheckedBox",
  props: ["option", "title"],
  data() {
    return {
      checked: []
    };
  },
  mounted() {},
  methods: {
    handleCheckedCitiesChange(value) {
      console.log(this.checked);
      let titleName = this.title;

      this.$emit("checked", titleName, this.checked);
    }
  }
};
</script>

<style scoped>
.checkedBox {
  margin-top: 20px;
}
.checkedTitle {
  width: 100%;
  height: 36px;
  background: #f0f0f0;
  font-size: 14px;
  color: #1c3672;
  text-align: center;
  line-height: 36px;
}
.el-checkbox {
  width: 25%;
  text-align: left;
  margin-top: 20px;
  margin-left: 30px;
}
</style>