<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="3">
                <el-card header="项目编号">
                    <el-tree v-loading="proNumLoading" style="max-width: 600px" :data="projectData" node-key="id_"
                        :props="defaultProps" @node-click="handleNodeClick" />
                </el-card>
            </el-col>
            <el-col :lg="21">
                <el-card>
                    <el-button type="primary" icon="el-icon-plus" :disabled="!$isButtonVisible" @click="add">工时导出</el-button>
                    <el-table v-loading="manhoursLoading" ref="usersData" :data="usersData"
                        @selection-change="selectionChange" stripe remoteSort remoteFilter>
                        <el-table-column label="审批单号" prop="审批单号" width="150" sortable="custom"></el-table-column>
                        <el-table-column label="图号" prop="图号" width="150" sortable="custom"></el-table-column>
                        <el-table-column label="图名" prop="图名" width="150" sortable="custom"></el-table-column>
                        <el-table-column label="人员" prop="人员" width="150" sortable="custom"></el-table-column>
                        <el-table-column label="工时" prop="工时" width="150" sortable="custom"></el-table-column>
                        <el-table-column label="工时日期" prop="工时日期" width="150" sortable="custom"></el-table-column>
                        <el-table-column label="审批人" prop="审批人" width="150" sortable="custom"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
export default {
    data() {
        return {
            defaultProps: {
                label: 'project_number_',  // 将 `label` 字段映射为 `project_number_`
            },
            projectId: '',
            selection: [],
            projectData: [],
            usersData: [],
            proNumLoading: false,
            manhoursLoading: false
        }
    },
    created() {
        this.getProjectInfo()
    },
    methods: {
        async getProjectInfo() {
            this.proNumLoading = true
            try {
                this.projectData = await this.$dmsApi.project.readAll.get()
            } catch (error) {
                console.error("Error fetching user list:", error);
            } finally {
                this.proNumLoading = false
            }
        },
        // 点击：项目编号
        async handleNodeClick(nodeData) {
            this.projectId = nodeData.uuid_;
            const postData = {
                project_id_: nodeData.uuid_
            };
            this.manhoursLoading = true
            try {
                const data = await this.$dmsApi.manHours.readByProjectManhours.post(postData);
                this.usersData = data;
                // 确保在 DOM 更新后处理其他逻辑
                this.$nextTick(() => {
                    console.log(this.usersData, 'this.usersData');
                });
            } catch (error) {
                console.error("Error fetching user list:", error);
            } finally {
                this.manhoursLoading = false
            }
        },
        //添加
        async add() {
            try {
                const postData = {
                    project_id_: this.projectId
                }
                const response = await this.$dmsApi.manHours.readByProjectManhoursCsv.post(postData)
                // 创建 URL 对象
                const url = window.URL.createObjectURL(new Blob([response]));
                // 创建链接元素并触发点击下载
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'project_manhours.csv');
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        },
        //表格选择后回调事件
        selectionChange(selection) {
            this.selection = selection;
        },
    }
}
</script>

