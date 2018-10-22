<template>
    <div class="bigBox">
          <!-- 命名角色名称 -->
          <div class="newRoleName">角色名称：{{roleName}}</div>
          <!-- 下面是具体的权限管理部分 -->
          <CheckedBox @checked='checked' :option='datas.data1.option' :title='datas.data1.title' />
          <CheckedBox @checked='checked' :option='datas.data2.option' :title='datas.data2.title' />
          <CheckedBox @checked='checked' :option='datas.data3.option' :title='datas.data3.title' />
          <CheckedBox @checked='checked' :option='datas.data4.option' :title='datas.data4.title' />
          <CheckedBox @checked='checked' :option='datas.data5.option' :title='datas.data5.title' />
          <CheckedBox @checked='checked' :option='datas.data6.option' :title='datas.data6.title' />
          <CheckedBox @checked='checked' :option='datas.data7.option' :title='datas.data7.title' />
          <CheckedBox @checked='checked' :option='datas.data8.option' :title='datas.data8.title' />
          <CheckedBox @checked='checked' :option='datas.data9.option' :title='datas.data9.title' />
          <!-- 灰色线 -->
          <div class="gards"></div>
          <!-- 全选按钮 -->
          <el-checkbox  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <!-- 提交保存按钮 -->
         
          <div class="btnBox">
            <el-button  class="saves" @click="saveSubmit">保存</el-button>
            <el-button  class="addSubmit" @click="cancels">取消</el-button>
          </div>
    </div>
</template>

<script>
import CheckedBox from "./CheckedBox";
import datas from "./data.js";
import { RoleAuthorAdd } from "@/api/systemsetings";

export default {
  name: "ChangeRole",
  props: ["roleName"],
  components: {
    CheckedBox
  },
  data() {
    return {
      newRoleName: "",
      datas: datas,
      checkAll: false,
      isIndeterminate: false,
      dataList1: {},
      dataList: []
    };
  },
  methods: {
    //   保存按钮
    saveSubmit() {
      alert("保存成功");
      var Addurl = "url";
      RoleAuthorAdd(Addurl, this.dataList).then(response => {
        console.log(response);
      });
    },
    // 取消按钮
    cancels() {
      this.$emit("cancels");
    },
    //   子组件选择的东西
    checked(data, dataList) {
      if (data == "进件管理") {
        this.dataList[0] = dataList;
      } else if (data == "信条账户") {
        this.dataList[1] = dataList;
      } else if (data == "交易管理") {
        this.dataList[2] = dataList;
      } else if (data == "结算管理") {
        this.dataList[3] = dataList;
      } else if (data == "对账管理") {
        this.dataList[4] = dataList;
      } else if (data == "数据统计") {
        this.dataList[5] = dataList;
      } else if (data == "运营管理") {
        this.dataList[6] = dataList;
      } else if (data == "监控中心") {
        this.dataList[7] = dataList;
      } else if (data == "系统设置") {
        this.dataList[8] = dataList;
      }

      console.log(this.dataList);
    },
    // 全选按钮
    handleCheckAllChange(val) {
      //   this.checkedCities = val ? cityOptions : [];
      //   this.isIndeterminate = false;
      alert("请按组选择");
    }
  }
};
</script>

<style scoped>
.bigBox {
  width: 600px;
  height: 1153px;
  background-color: #fff;
  margin: 20px auto;
  padding: 20px 0 20px 0;
}
.newRoleName {
  font-size: 16px;
  color: #333333;
  text-align: center;
}
.gards {
  border: 1px solid #f0f0f0;
  width: 100%;
  margin: 20px auto;
}
.el-checkbox {
  margin-left: 30px;
}
.btnBox {
  text-align: center;
  margin-top: 30px;
}
.addSubmit {
  border: 1px solid #1c3672;
  border-radius: 6px;
  font-size: 14px;
  color: #1c3672;
  width: 200px;
  height: 36px;
  margin-left: 30px;
}
.saves {
  background-image: linear-gradient(-180deg, #d1ddf6 0%, #ebf1fc 100%);
  border-radius: 4px;
  font-size: 14px;
  color: #1c3672;
  width: 200px;
  height: 36px;
}
</style>