<template>
    <div class="backBox">
       <img class="imgLogo" :src="back" alt="">
    </div>
</template>

<script>
import backLogo from "../../assets/jinjian/back.png";
export default {
  name: "Backs",
  data() {
    return {
      back: backLogo
    };
  }
};
</script>

<style scoped>
.backBox {
  display: inline-block;
}
</style>