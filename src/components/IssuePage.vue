<template>
  <PageHead />
  <el-row type="flex" justify="center" class="content">
    <el-col :xs="18" :sm="18" :md="12"><Intro /></el-col>
  </el-row>
  <el-row type="flex" justify="center" class="content">
    <el-col :xs="18" :sm="18" :md="12"><IssueForm /></el-col>
  </el-row>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import PageHead from "./PageHead.vue";
import Intro from "./Intro.vue";
import IssueForm from "./IssueForm.vue";

export default defineComponent({
  name: "IssuePage",
  components: {
    PageHead,
    Intro,
    IssueForm,
  },
});
</script>

<style scoped>
.content {
  margin-top: 40px;
}
</style>
