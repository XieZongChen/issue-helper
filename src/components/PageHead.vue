<template>
  <el-menu
    :default-active="menuActive"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-row type="flex" justify="center" class="content">
      <el-col :xs="18" :sm="18" :md="12"
        ><div class="logo-box">
          <img alt="Vue logo" src="../assets/logo.png" class="logo" />
        </div>
        <el-menu-item index="1" class="menu-item">中文</el-menu-item>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from "vue";

export default defineComponent({
  name: "PageHead",
  setup: () => {
    const menuActive: Ref<string> = ref("1");
    return { menuActive };
  },
});
</script>

<style scoped>
.logo-box {
  float: left;
  height: 60px;
  display: flex;
  align-items: center;
}
.logo {
  width: 40px;
  height: 40px;
}
.menu-item {
  display: inline;
  float: right;
}
</style>
