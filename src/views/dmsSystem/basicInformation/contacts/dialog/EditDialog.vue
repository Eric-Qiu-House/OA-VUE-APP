<!-- EditDialog.vue -->
<template>
  <el-dialog
    :title="dialogTitle"
    width="50%"
    @close="resetForm"
    :model="visible"
  >
    <el-form :model="form" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="职务">
        <el-input v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="联系号码">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-form>

    <span class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    rowData: {
      type: Object,
      default: () => ({})
    },
    dialogTitle: {
      type: String,
      default: "编辑"
    }
  },
  data() {
    return {
      form: {
        name: '',
        position: '',
        phone: '',
        email: ''
      }
    };
  },
  watch: {
    rowData: {
      handler(newRowData) {
        if (newRowData) {
          this.form = { ...newRowData }; // 传递新的 rowData 更新 form
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSave() {
      this.$emit('save', this.form); // 向父组件传递数据
      this.handleClose();
    },
    handleClose() {
      this.$emit('update:visible', false); // 关闭 dialog
    },
    resetForm() {
      this.form = {
        name: '',
        position: '',
        phone: '',
        email: ''
      };
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
