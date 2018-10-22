<template>
    <div class="agreeBox">
         <el-table class="tableBox" :header-cell-style="{background:'#F0F0F0'}"  :data="gridData" border fit highlight-current-row style="width:100%;">                            
                <el-table-column property="roleName" label="角色名称"  align="center"></el-table-column>
                <el-table-column property="roleNum" label="成员数量"   align="center"></el-table-column> 
                <el-table-column property="autherName" label="创建者用户名"   align="center"></el-table-column> 
                <el-table-column property="date" label="时间"   align="center"></el-table-column>                                                                        
                <el-table-column  label="操作"   align="center" >
                <template slot-scope="scope" >
                    <el-button @click="passsubmit(scope.row)" type="text" size="small" class="moneyStyles" >修改</el-button>                
                    <el-button  type="text" size="small" class="stopServer"  @click="deleted(scope.row)" >删除</el-button>              
                </template>
                </el-table-column>       
          </el-table>
          <!-- 添加按钮 -->
          <div class="btnBox">
            <el-button icon="el-icon-plus"  class="addSubmit" @click="addRole">新增权限角色</el-button>
          </div>
    </div>
</template>

<script>
import { RoleAuthorizationMsg, RoleAuthorDelete } from "@/api/systemsetings";
export default {
  name: "RoleHome",
  data() {
    return {
      gridData: [
        {
          roleName: "财务",
          roleNum: "10",
          autherName: "100000451920.mch",
          date: "2018-12-30 24:12:24"
        },
        {
          roleName: "运维",
          roleNum: "10",
          autherName: "100000451920.mch",
          date: "2018-12-30 24:12:24"
        },
        {
          roleName: "维护",
          roleNum: "10",
          autherName: "100000451920.mch",
          date: "2018-12-30 24:12:24"
        }
      ]
    };
  },
  mounted() {
    this.getmsg();
  },
  methods: {
    // 获取角色权限的基本信息
    getmsg() {
      // RoleAuthorizationMsg(this.searchList).then(response => {
      //   console.log(response);
      //   this.gridData=response.data
      // });
    },
    // 修改按钮
    passsubmit(data) {
      console.log(data);
      this.$emit("showAgree", data.roleName);
    },

    // 新增权限按钮
    addRole() {
      this.$emit("editAgree");
    },
    // 删除按钮
    deleted(data) {
      console.log(data);

      alert("您点击了删除按钮");
      // RoleAuthorDelete(data.roleName).then(response => {
      //   console.log(response);
      //   this.gridData=response.data
      // });
    }
  }
};
</script>

<style scoped>
.agreeBox {
  width: 88.235%;
  min-height: 186px;
  margin: 90px auto;
}
.tableBox {
  margin-bottom: 10px;
  font-size: 16px;
}
.stopServer {
  font-size: 16px;
  color: #d0011b;
  margin-left: 20px;
  margin-right: 20px;
}
.moneyStyles {
  font-size: 16px;
  color: #1c3672;
  margin-right: 30px;
}
.btnBox {
  text-align: center;
  margin-top: 30px;
}
.addSubmit {
  border: 1px solid #1c3672;
  border-radius: 6px;
  font-size: 12px;
  color: #1c3672;
  width: 17.65%;
  height: 36px;
}
</style>