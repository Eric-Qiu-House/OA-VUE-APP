<template>
  <el-dialog title="版本信息" :model-value="dialogVisible" width="600px" :close-on-click-modal="false" @close="closeDialog">
    <el-form ref="formRef" :model="localFormData" :rules="rules" label-width="100px">
      <el-form-item label="版本号" prop="version_number_">
        <el-input v-model="localFormData.version_number_" placeholder="请输入版本号" />
      </el-form-item>
      <el-form-item label="版本信息" prop="version_information_">
        <sc-editor v-model="localFormData.version_information_" placeholder="请输入" :templates="templates"
          :height="200" />
      </el-form-item>
      <el-form-item label="发布日期" prop="creation_date_">
        <el-date-picker v-model="localFormData.creation_date_" type="date" placeholder="选择发布日期" format="YYYY-MM-DD"
          value-format="YYYY-MM-DD" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));

export default {
  components: { scEditor },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    formData: {
      type: Object,
      default: () => ({
        version_number_: '',
        version_information_: '',
        creation_date_: '',
      }),
    },
    mode: {
      type: String,
      default: 'add', // 可选值 'add' 或 'edit'
    },
  },
  data() {
    return {
      dialogVisible: this.modelValue,
      localFormData: { ...this.formData },
      loading: false,
      templates: [],
      rules: {
        version_number_: [{ required: true, message: '版本号不能为空', trigger: 'blur' }],
        version_information_: [{ required: true, message: '版本信息不能为空', trigger: 'blur' }],
        creation_date_: [{ required: true, message: '发布日期不能为空', trigger: 'change' }],
      },
    };
  },
  watch: {
    modelValue(newVal) {
      this.dialogVisible = newVal;
    },
    formData(newVal) {
      this.localFormData = { ...newVal };
    },
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
      this.$emit('update:modelValue', false);
    },
    async onSubmit() {
      this.loading = true;
      try {
        await this.$refs.formRef.validate(); // 校验表单

        if (this.mode === 'add') {
          await this.$iamApi.versions.create.post(this.localFormData); // 调用新增接口
        } else if (this.mode === 'edit') {
          await this.$iamApi.versions.update.post(this.localFormData); // 调用修改接口
        }

        this.$emit('submitted', { ...this.localFormData }); 
        this.closeDialog();
      } catch (error) {
        console.error('表单提交失败:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
