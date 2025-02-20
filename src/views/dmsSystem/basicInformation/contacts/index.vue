<template>
    <el-button type="primary" :disabled="!$isButtonVisible" icon="el-icon-plus" @click="openDialogForAdd">
      新增
    </el-button>
  
    <scTable ref="table" v-loading="userLoading" :data="data" @selection-change="selectionChange" stripe remoteSort
        remoteFilter>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="姓名" prop="email_" width="150" sortable="custom"></el-table-column>
      <el-table-column label="职务" prop="status_" width="150" sortable="custom"></el-table-column>
      <el-table-column label="联系号码" prop="email_" width="150" sortable="custom"></el-table-column>
      <el-table-column label="邮箱" prop="status_" width="150" sortable="custom"></el-table-column>
      <el-table-column label="操作" prop="status_" width="150" sortable="custom">
        <template #default="scope">
          <el-button-group>
            <el-button @click="openDialogForEdit(scope.row)">编辑</el-button>
            <el-button @click="handleDelete(scope.row)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </scTable>
  
    <!-- 使用 EditDialog 组件 -->
    <edit-dialog
      v-model="dialogVisible"
      :rowData="selectedRow"
      :dialogTitle="'编辑员工'"
      @save="saveChanges"
    />
  </template>
  
  <script>
  import EditDialog from '@/views/dmsSystem/basicInformation/contacts/dialog/EditDialog.vue'; // 引入 EditDialog 组件
  
  export default {
    components: {
      EditDialog
    },
    data() {
      return {
        data: [],
        dialogVisible: false,  // 控制 Dialog 显示
        selectedRow: null,     // 选中的行数据
      };
    },
    async mounted() {
      this.data = await this.$dmsApi.firm.read.post();
    },
    methods: {
      // 打开新增 Dialog
      openDialogForAdd() {
        this.selectedRow = null; // 清空选中行
        this.dialogVisible = true; // 打开 Dialog
      },
  
      // 打开编辑 Dialog
      openDialogForEdit(row) {
        this.selectedRow = row; // 将选中的行数据传递给 dialog
        this.dialogVisible = true; // 打开 Dialog
      },
  
      // 保存编辑后的数据
      saveChanges(updatedData) {
        if (this.selectedRow) {
          // 编辑操作
          Object.assign(this.selectedRow, updatedData);
          this.$message.success('编辑成功!');
        } else {
          // 新增操作
          this.data.push(updatedData);
          this.$message.success('新增成功!');
        }
        this.dialogVisible = false; // 关闭 Dialog
      },
  
      // 删除操作
      handleDelete(row) {
        this.$confirm('确定要删除这个员工吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            const index = this.data.indexOf(row);
            if (index > -1) {
              this.data.splice(index, 1); // 删除行数据
              this.$message.success('删除成功!');
            }
          })
          .catch(() => {
            this.$message.info('取消删除');
          });
      },
    }
  };
  </script>
  