<template>
    <el-dialog
      :title="dialogTitle"
      width="50%"
      @close="resetForm"
      :model:="visible"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="企业名称">
          <el-input v-model="form.firm_name_"></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-input v-model="form.firm_type_"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-input v-model="form.nationality_"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address_"></el-input>
        </el-form-item>
        <el-form-item label="网站">
          <el-input v-model="form.website_"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.notes_"></el-input>
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
          firm_name_: '',
          firm_type_: '',
          nationality_: '',
          address_: '',
          website_: '',
          notes_: ''
        }
      };
    },
    mounted() {
      // 每次弹出框打开时，使用传递的 rowData 更新 form 数据
      if (this.rowData) {
        this.form = { ...this.rowData };
      }
    },
    methods: {
      handleSave() {
        this.$emit('save', this.form);  // 将编辑后的数据传递给父组件
        this.handleClose();
      },
      handleClose() {
        this.$emit('update:visible', false);  // 关闭 dialog
      },
      resetForm() {
        // 保证关闭时清空 form 数据，准备下一次使用
        this.form = {
          firm_name_: '',
          firm_type_: '',
          nationality_: '',
          address_: '',
          website_: '',
          notes_: ''
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
  