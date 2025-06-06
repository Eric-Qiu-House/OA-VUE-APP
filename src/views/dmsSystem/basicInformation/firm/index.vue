<template>
    <el-button type="primary" :disabled="!$isButtonVisible" icon="el-icon-plus" @click="openDialogAdd">
    </el-button>
    {{ message }}
    <scTable ref="table" v-loading="userLoading" :data="data" @selection-change="selectionChange" stripe remoteSort
        remoteFilter>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="企业名称" prop="firm_name_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="企业类型" prop="firm_type_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="国籍" prop="nationality_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="联系地址" prop="address_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="网站" prop="website_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="备注" prop="notes_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="联系方式" prop="status_" width="150" sortable='custom'>
            <template #default="scope">
                <el-button-group>
                    <el-button @click="openDrawer(scope.row)">查看</el-button>
                </el-button-group>
            </template>
        </el-table-column>
        <el-table-column label="操作" prop="status_" width="150" sortable='custom'>
            <template #default="scope">
                <el-button-group>
                    <el-button @click="openDialogForEdit(scope.row)">编辑</el-button>
                    <el-button @click="handleDelete(scope.row)">删除</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </scTable>

    <!-- 引入并使用 EditDialog -->
    <edit-dialog v-model="dialogVisible" :rowData="selectedRow" :dialogTitle="dialogType" @save="saveChanges" />
</template>

<script>
import EditDialog from '@/views/dmsSystem/basicInformation/firm/dialog/editDialog.vue'; // 引入 EditDialog 组件

export default {
    components: {
        EditDialog
    },
    props: {
        message: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            data: [],
            dialogVisible: false,  // 控制编辑 Dialog 的显示与隐藏
            selectedRow: null,     // 选中的行数据
            dialogType: ''
        };
    },
    watch: {
        async message(newValue) {
            const data = {
                firm_type_: newValue
            }
            this.data = await this.$dmsApi.firm.readById.post(data);
        }
    },
    async mounted() {
        const revData = {
            firm_type_: '船东'
        }
        this.data = await this.$dmsApi.firm.readById.post(revData);
    },
    methods: {
        openDialogAdd() {
            this.dialogType = '新增'
            this.dialogVisible = true;  // 打开 Dialog
        },

        // 打开编辑 Dialog
        openDialogForEdit(row) {
            this.selectedRow = row;  // 将选中行数据赋值给 selectedRow
            this.dialogType = '编辑'
            this.dialogVisible = true;  // 打开 Dialog
        },

        // 保存编辑后的数据
        saveChanges(updatedData) {
            console.log('保存的数据', updatedData);
            this.dialogVisible = false;
            this.$message.success('保存成功!');
        },
        // 删除企业
        async handleDelete(row) {
            try {
                // 确认删除操作
                await this.$confirm('确定要删除这个企业吗?', '删除确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });

                // 删除企业
                console.log('删除的企业: ', row);
                const revData = { uuid_: row.uuid_ }; // 假设 row.id 是企业的唯一标识
                await this.$dmsApi.firm.deleteRouter.post(revData);

                // 删除成功
                this.$message.success('删除成功!');
            } catch (error) {
                if (error !== 'cancel') {
                    // 处理删除失败的情况
                    console.error('删除失败:', error);
                    this.$message.error('删除失败，请重试!');
                } else {
                    // 用户取消删除
                    this.$message.info('取消删除');
                }
            }
        },

        // 打开查看 Drawer (如果有需要)
        openDrawer(row) {
            this.$emit('toggle-drawer');
            console.log('查看企业信息: ', row);
        }
    }
};
</script>