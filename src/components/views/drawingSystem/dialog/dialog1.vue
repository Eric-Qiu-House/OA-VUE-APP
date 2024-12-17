<template>
    <el-row :gutter="40">
        <el-dialog v-model="dialogDwg" title="图纸详情" width="600px">
            <el-form v-loading="loading" :model="dwgForm" label-width="100px">
                <el-form-item label="图号">
                    <el-input v-model="dwgForm.drawing_number_"></el-input>
                </el-form-item>
                <el-form-item label="图名">
                    <el-input v-model="dwgForm.drawing_name_"></el-input>
                </el-form-item>
                <el-form-item label="执行">
                    <el-select v-model="dwgForm.executor_name_" placeholder="选择执行工程师"
                        @click="handleNodeClick(dwgForm.project_id_)" @change="executorChange">
                        <el-option v-for="item in projectUserInfos" :key="item.id_" :label="item.fullname_"
                            :value="item.fullname_" />
                    </el-select>
                </el-form-item>
                <el-form-item label="校验">
                    <el-select v-model="dwgForm.verifier_name_" placeholder="选择校验工程师"
                        @click="handleNodeClick(dwgForm.project_id_)" @change="verifierChange">
                        <el-option v-for="item in projectUserInfos" :key="item.id_" :label="item.fullname_"
                            :value="item.fullname_" />
                    </el-select>
                </el-form-item>
                <el-form-item label="项目状态">
                    <el-select v-model="dwgForm.status_" placeholder="选择项目状态">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="项目开始">
                    <el-date-picker v-model="dwgForm.start_date_" type="date" placeholder="选择开始日期"
                        style="width: 100%"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目结束">
                    <el-date-picker v-model="dwgForm.delivery_date_" type="date" placeholder="选择结束日期"
                        style="width: 100%"></el-date-picker>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button v-loading="loading" @click="dialogVisible = false">取消</el-button>
                <el-button v-loading="loading" type="primary" @click="submitForm">提交</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            dialogDwg: false,
            dwgForm: {},
            projectUserInfos: [],
            loading: false,
            options: [
                {
                    label: "未开始",
                    value: 1,
                    icon: "el-icon-flag"
                },
                {
                    label: "执行中",
                    value: 2,
                    icon: "el-icon-bottom-left"
                },
                {
                    label: "已结束",
                    value: 3,
                    icon: "el-icon-checked"
                }
            ]
        }
    },
    methods: {
        async handleNodeClick(projectUuid) {
            const submitData = {
                project_id_: projectUuid
            }
            try {
                const projectUserIds = await this.$dmsApi.projectUsershiproute.readId.post(submitData)
                if (projectUserIds) {
                    this.projectUserInfos = await this.$apiIAM.user.usersByUserIds.post(projectUserIds)
                } else {
                    console.log('User not found');
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        },
        executorChange(value) {
            // 通过 fullname_ 查找完整的项目经理对象
            const selectedManager = this.projectUserInfos.find(item => item.fullname_ === value);
            if (selectedManager) {
                this.dwgForm.executor_id_ = selectedManager.id_;  // 将 id_ 存储到 project_form 中
            } else {
                console.log('未找到对应的项目经理');
            }
        },
        verifierChange(value) {
            // 通过 fullname_ 查找完整的项目经理对象
            const selectedManager = this.projectUserInfos.find(item => item.fullname_ === value);
            if (selectedManager) {
                this.dwgForm.verifier_id_ = selectedManager.id_;  // 将 id_ 存储到 project_form 中
            } else {
                console.log('未找到对应的项目经理');
            }
        },
        open() {
            this.dialogDwg = true
        },
        async submitForm() {
            this.loading = true;  // 添加 loading 状态，显示加载中
            try {
                await this.$dmsApi.drawingInfo.update.post(this.dwgForm);
                // 提交成功后的逻辑，比如提示成功信息
            } catch (error) {
                console.error('提交失败:', error);  // 记录错误详情
                // 可以选择展示友好的错误信息
            } finally {
                this.loading = false;  // 无论成功还是失败，结束加载状态
            this.dialogDwg = false

            }
        },
        //表单注入数据
        setData(data) {
            console.log(data, 'ssss')
            this.dwgForm = {...data}
        }
    }
}
</script>
