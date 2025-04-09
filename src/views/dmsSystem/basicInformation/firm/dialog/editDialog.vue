<template>
  <el-dialog :title="dialogTitle" width="50%" @close="resetForm" :model:="visible">
    <el-form :model="form" label-width="100px">
      <el-form-item label="企业名称">
        <el-input v-model="form.firm_name_"></el-input>
      </el-form-item>

      <el-form-item label="企业类型">
        <el-select v-model="form.firm_type_" placeholder="请选择企业类型">
          <el-option v-for="item in firmTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="国籍">
        <el-select v-model="form.nationality_" filterable placeholder="请选择国籍">
          <el-option v-for="item in nationalityOptions" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
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
import firmConfig from '@/config/firm'
import nationalityConfig from '@/config/nationality'

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
      default: ''
    }
  },
  data() {
    return {
      form: {
        firm_name_: '',
        firm_type_: '',
        nationality_: '', // 绑定到下拉组件
        address_: '',
        website_: '',
        notes_: ''
      },
      firmTypes: firmConfig.firmType,
      nationalityOptions: nationalityConfig, // 国籍选项列表
    };
  },
  methods: {
    async handleSave() {
      try {
        if (this.dialogTitle == '新增') {
          await this.$dmsApi.firm.create.post(this.form);
        }
        if (this.dialogTitle == '编辑') {
          await this.$dmsApi.firm.update.post(this.form);
        }
      } catch (error) {
        console.log(error)
      }

      this.$emit('save', this.form);
      this.handleClose();
    },
    handleClose() {
      this.form = {
        firm_name_: '',
        firm_type_: '',
        nationality_: '',
        address_: '',
        website_: '',
        notes_: ''
      };
      this.$emit('update:visible', false);
    },
    resetForm() {
      this.form = { ...this.rowData };
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>