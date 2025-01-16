<template>
    <el-card>
        <el-button type="primary" @click="showForm('add')">新增填报</el-button>
        <el-card shadow="never" style="margin-top: 20px;">
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="version_number_" label="版本号" width="180" />
                <el-table-column prop="version_information_" label="版本信息" width="180">
                    <template #default="scope">
                        <div v-html="scope.row.version_information_"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="creation_date_" label="发布日期" width="180" />
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button size="small" @click="editRow(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <form-dialog v-model="dialogVisible" :form-data="editFormData" :mode="dialogMode" @submitted="fetchTableData" />
    </el-card>
</template>

<script>
import { defineComponent, ref } from 'vue';
import FormDialog from './formDialog.vue';

export default defineComponent({
    components: { FormDialog },
    setup() {
        const dialogVisible = ref(false);
        const dialogMode = ref('add'); // 'add' 或 'edit'
        const editFormData = ref(null);
        const tableData = ref([]);

        const showForm = (mode, data = null) => {
            dialogMode.value = mode;
            editFormData.value = data ? { ...data } : {};
            dialogVisible.value = true;
        };

        const editRow = (row) => {
            showForm('edit', row);
        };

        const onFormSubmit = async (formData) => {
            if (editFormData.value && editFormData.value.version_number_) {
                // 更新逻辑
                console.log('更新数据：', formData);
                // 调用 API 更新逻辑
            } else {
                // 新增逻辑
                console.log('新增数据：', formData);
                // 调用 API 新增逻辑
            }
            dialogVisible.value = false;
        };
        return {
            dialogVisible,
            dialogMode,
            editFormData,
            tableData,
            showForm,
            editRow,
            onFormSubmit,
        };
    },
	mounted() {
		this.fetchTableData();
	},
    methods: {
        async fetchTableData () {
            // 模拟数据获取
            this.tableData = await this.$iamApi.versions.read.get()
        }
    }
});
</script>
