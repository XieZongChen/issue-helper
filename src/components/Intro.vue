<template>
  <el-card class="box-card">
    <template v-slot:header>
      <div class="intro-header" v-html="contentText.introTitle" />
    </template>

    <p v-html="contentText.introOne" />

    <el-button
      type="text"
      v-html="contentText.explainTitle"
      @click="introVisible = true"
    />

    <p v-html="contentText.introTwo" />

    <el-dialog
      :title="contentText.explainTitle"
      width="50%"
      v-model:visible="introVisible"
    >
      <p v-html="contentText.explain"></p>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from "vue";
import * as content from "../content.json";

export default defineComponent({
  name: "Intro",
  setup: () => {
    const contentText: Ref<any> = ref(content);
    const introVisible: Ref<boolean> = ref(false);
    return { contentText, introVisible };
  },
});
</script>

<style scoped>
.intro-header {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2em;
}
</style>
