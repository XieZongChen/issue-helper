<template>
  <el-form
    ref="formRef"
    :model="form"
    label-width="auto"
    :rules="rules"
    label-position="top"
  >
    <el-row type="flex" justify="center" :gutter="20">
      <!-- 选择要提交的库 -->
      <el-col :xs="18" :sm="18" :md="12"
        ><el-form-item :label="contentText.repoSelectHint" prop="repo">
          <el-select
            v-model="form.repo"
            placeholder="请选择"
            class="form-select"
          >
            <el-option
              v-for="item in contentText.repos"
              :key="item.github"
              :label="item.name"
              :value="item.npm"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- Issue 类别 -->
      <el-col :xs="18" :sm="18" :md="12"
        ><el-form-item :label="contentText.issueTypesHint" prop="type">
          <el-select
            v-model="form.type"
            placeholder="请选择"
            class="form-select"
          >
            <el-option
              v-for="item in contentText.issueTypes"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- Issue 标题 -->
    <el-form-item :label="contentText.issueTitleHint" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <template v-if="isBug">
      <el-row type="flex" justify="center" :gutter="20">
        <!-- 项目版本 -->
        <el-col :xs="18" :sm="18" :md="12"
          ><el-form-item
            :label="contentText.versionRepositoryHint"
            prop="versionRepository"
          >
            <el-select
              v-model="form.versionRepository"
              placeholder="请选择"
              class="form-select"
            >
              <el-option
                v-for="item in version.repo"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 环境 -->
        <el-col :xs="18" :sm="18" :md="12"
          ><el-form-item
            :label="contentText.versionBrowserHint"
            prop="versionBrowser"
          >
            <el-input v-model="form.versionBrowser"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-alert
        :title="contentText.firstTip"
        type="info"
        :closable="false"
        show-icon
      />

      <!-- 重现链接 -->
      <el-form-item :label="contentText.reproduceHint" prop="reproduce">
        <el-input v-model="form.reproduce"></el-input>
      </el-form-item>
      <el-alert
        :title="contentText.secondTip"
        type="info"
        :closable="false"
        show-icon
      />
      <el-button
        type="text"
        v-html="contentText.reproduceHintSamll"
        @click="tipVisible = true"
      />
      <el-dialog
        :title="contentText.reproduceTitle"
        width="50%"
        v-model:visible="tipVisible"
      >
        <p v-html="contentText.reproduceExplain"></p>
      </el-dialog>

      <!-- 重现步骤 -->
      <el-form-item :label="contentText.stepsHint" prop="steps">
        <el-input
          v-model="form.steps"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </el-form-item>
      <el-alert
        :title="contentText.thirdTip"
        type="info"
        :closable="false"
        show-icon
      />

      <!-- 期望的结果是什么 -->
      <el-form-item :label="contentText.expectHint" prop="expected">
        <el-input
          v-model="form.expected"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </el-form-item>

      <!-- 实际的结果是什么 -->
      <el-form-item :label="contentText.actualHint" prop="actual">
        <el-input
          v-model="form.actual"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </el-form-item>

      <!-- 补充说明（可选） -->
      <el-form-item :label="contentText.remarks" prop="remarks">
        <el-input
          v-model="form.remarks"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </el-form-item>
      <el-alert
        :title="contentText.fourthTip"
        type="info"
        :closable="false"
        show-icon
      />
    </template>

    <template v-else>
      <!-- 这个功能解决了什么问题 -->
      <el-form-item :label="contentText.functionContent" prop="functionContent">
        <el-input v-model="form.functionContent"></el-input>
      </el-form-item>
      <el-alert
        :title="contentText.functionContentTip"
        type="info"
        :closable="false"
        show-icon
      />

      <!-- 你期望的 API 是怎样的 -->
      <el-form-item
        :label="contentText.functionalExpectations"
        prop="functionalExpectations"
      >
        <el-input
          v-model="form.functionalExpectations"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </el-form-item>
      <el-alert
        :title="contentText.functionalExpectationsTip"
        type="info"
        :closable="false"
        show-icon
      />
    </template>

    <el-row type="flex" justify="center" :gutter="20">
      <el-col :span="3"
        ><el-form-item>
          <el-button
            type="primary"
            v-html="contentText.preview"
            @click="handlePreview()"
            class="preview"
          /> </el-form-item
      ></el-col>
    </el-row>
  </el-form>

  <el-dialog
    :title="contentText.dialog.title"
    width="50%"
    v-model:visible="previewVisible"
  >
    <div v-html="issueHTML"></div>
    <template v-slot:footer>
      <el-button
        type="primary"
        v-html="contentText.dialog.button"
        @click="create()"
      />
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  Ref,
  reactive,
  toRefs,
  computed,
  watch,
} from "vue";
import axios from "axios";
import marked from "marked";
import hanabi from "hanabi";
import * as content from "../content.json";
import { FormData, RepoItem } from "../data";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code: any) => hanabi(code),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

const comment = "<!-- generated by issue-helper DO NOT REMOVE -->";

export default defineComponent({
  name: "IssueForm",
  setup: () => {
    const contentText: Ref<any> = ref(content);
    const formRef: Ref<any> = ref(null);
    const formData: FormData = reactive({
      form: {
        repo: "",
        title: "",
        type: "Bug",
        versionRepository: "",
        versionBrowser: "",
        reproduce: "",
        steps: "",
        expected: "",
        actual: "",
        remarks: "",
        functionContent: "",
        functionalExpectations: "",
      },
      version: {
        repo: [],
      },
    });
    const issue: Ref<string> = ref("");
    const issueHTML = computed(() => marked(issue.value));
    const tipVisible: Ref<boolean> = ref(false);
    const previewVisible: Ref<boolean> = ref(false);

    const isBug = computed(() => formData.form.type === "Bug");

    const rules = computed(() => {
      const valid = contentText.value.valid;
      let rules: any = {};
      for (let prop in valid) {
        if (prop === "remarks") {
          continue;
        }
        rules[prop] = [
          {
            required: true,
            message: valid[prop],
            trigger: "change",
          },
        ];
      }

      rules["reproduce"].push({
        trigger: "blur",
        validator: (rule: any, val: string, cb: (value?: string) => void) => {
          if (/(github|jsfiddle|codepen|jsbin|codesandbox)/gi.test(val)) {
            cb();
          } else {
            cb("请填写正确的重现链接");
          }
        },
      });

      return rules;
    });

    const versionApi = computed(() => {
      return {
        repositoryVersion: `https://registry.npm.taobao.org/${
          formData.form.repo && formData.form.repo
        }`,
        vueVersion: "https://registry.npm.taobao.org/vue",
      };
    });

    async function fetchRepositoryVersion() {
      const res = await axios.get(versionApi.value.repositoryVersion);
      formData.version.repo = Object.keys(res.data.versions);
      formData.form.versionRepository = formData.version.repo[0];
    }
    watch(
      () => formData.form.repo,
      () => {
        fetchRepositoryVersion();
      }
    );

    function createIssue() {
      issue.value = isBug.value
        ? `
### ${formData.form.repo} 项目版本
${formData.form.versionRepository}

### 环境
${formData.form.versionBrowser}

### 重现链接
${formData.form.reproduce}

### 重现步骤
${formData.form.steps}

### 期望的结果
${formData.form.expected}

### 实际的结果
${formData.form.actual}

### 补充说明
${formData.form.remarks}

`.trim()
        : `

### 这个功能解决的问题
${formData.form.functionContent}

### 期望的 API
${formData.form.functionalExpectations}

`.trim();
      previewVisible.value = true;
    }

    function handlePreview() {
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          createIssue();
        } else {
          console.error("error submit!!");
          return false;
        }
      });
    }

    const body = computed(() => {
      const issueString = `
${comment}

${issue.value}

${comment}
`;
      return encodeURIComponent(issueString).replace(/%2B/gi, "+");
    });

    function create() {
      const idx = contentText.value.repos.findIndex(
        (i: RepoItem) => i.npm === formData.form.repo
      );

      window.open(
        `https://github.com/${contentText.value.repos[idx].github}/issues/new?title=${formData.form.title}&body=${body.value}`
      );
    }
    return {
      ...toRefs(formData),
      contentText,
      formRef,
      rules,
      tipVisible,
      isBug,
      previewVisible,
      handlePreview,
      issueHTML,
      create,
    };
  },
});
</script>

<style scoped>
:deep(.el-form-item label) {
  font-size: 18px;
}

.form-select {
  width: 100%;
}

.el-alert {
  margin-bottom: 10px;
}

.preview {
  margin-top: 10px;
}
</style>
