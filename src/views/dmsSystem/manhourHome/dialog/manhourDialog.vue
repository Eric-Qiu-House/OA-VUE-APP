<template>
    <el-row :gutter="40">
        <el-dialog v-model="dialogState" title="工时填报" width="1200" :before-close="handleClose">
            <el-card shadow="never">
                <!-- {{ recordDay }} -->
                <el-table ref="formRef" :data="recordDay" label-width="100px">
                    <!-- <el-form-item label="当日填报记录" prop="list" disabled> -->
                    <el-table-column prop="project_number_" label="项目" width="180">
                        <template #default="scope">
                            <el-select v-model="scope.row.project_number_" placeholder="请选择" disabled>
                                <el-option v-for="item in projectInfo" :key="item.project_number_"
                                    :label="item.project_number_ + ` - ` + item.project_name_"
                                    :value="item.project_number_"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="project_type_" label="项目阶段" min-width="120">
                        <template #default="scope">
                            <el-select v-model="scope.row.project_type_" disabled placeholder="请选择">
                                <el-option v-for="item in projectType" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="job_type_" label="工作类型" min-width="120">
                        <template #default="scope">
                            <el-select v-model="scope.row.job_type_" disabled placeholder="请选择阶段">
                                <el-option v-for="item in jobType" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="hours_" label="工时" min-width="100">
                        <template #default="scope">
                            <el-input v-model="scope.row.hours_" placeholder="请输入内容" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="record_date_" label="时间" min-width="100">
                        <template #default="scope">
                            <el-input v-model="scope.row.record_date_" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark_" label="备注" min-width="180">
                        <template #default="scope">
                            <el-input v-model="scope.row.remark_" type="textarea" disabled />
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_" fixed="right" label="操作" width="220">
                        <template #default="scope">
                            <!-- <el-button text type="primary" size="small" @click="openDwgDialog(scope.row)" >编辑</el-button> -->
                            <el-button text type="primary" :disabled="isReadOnly"
                                @click="deleteButton(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    <!-- <sc-form-table ref="rulesList" v-model="recordDay" :addTemplate="addTemplate" :disabled="true">
                            <el-table-column prop="project_number_" label="项目" width="180">
                                <template #default="scope">
                                    <el-select v-model="scope.row.project_number_" placeholder="请选择" disabled>
                                        <el-option v-for="item in projectInfo" :key="item.project_number_"
                                            :label="item.project_number_ + ` - ` + item.project_name_"
                                            :value="item.project_number_"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="project_type_" label="项目阶段" min-width="120">
                                <template #default="scope">
                                    <el-select v-model="scope.row.project_type_" disabled  placeholder="请选择">
                                        <el-option v-for="item in projectType" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="job_type_" label="工作类型" min-width="120">
                                <template #default="scope">
                                    <el-select v-model="scope.row.job_type_" disabled placeholder="请选择阶段">
                                        <el-option v-for="item in jobType" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="hours_" label="工时" min-width="100">
                                <template #default="scope">
                                    <el-input v-model="scope.row.hours_" placeholder="请输入内容" disabled></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="record_date_" label="时间" min-width="100">
                                <template #default="scope">
                                    <el-input v-model="scope.row.record_date_" placeholder="请输入工时" disabled></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark_" label="备注" min-width="180">
                                <template #default="scope">
                                    <el-input v-model="scope.row.remark_" type="textarea" disabled />
                                </template>
                            </el-table-column>
                        </sc-form-table> -->
                    <!-- </el-form-item> -->
                    <!-- <el-form-item label="当日填报记录" prop="list" disabled>
                        <sc-form-table ref="rulesList" v-model="recordDay" :addTemplate="addTemplate" :disabled="true">
                            <el-table-column prop="project_number_" label="项目" width="180">
                                <template #default="scope">
                                    <el-select v-model="scope.row.project_number_" placeholder="请选择" disabled>
                                        <el-option v-for="item in projectInfo" :key="item.project_number_"
                                            :label="item.project_number_ + ` - ` + item.project_name_"
                                            :value="item.project_number_"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="project_type_" label="项目阶段" min-width="120">
                                <template #default="scope">
                                    <el-select v-model="scope.row.project_type_" disabled  placeholder="请选择">
                                        <el-option v-for="item in projectType" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="job_type_" label="工作类型" min-width="120">
                                <template #default="scope">
                                    <el-select v-model="scope.row.job_type_" disabled placeholder="请选择阶段">
                                        <el-option v-for="item in jobType" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="hours_" label="工时" min-width="100">
                                <template #default="scope">
                                    <el-input v-model="scope.row.hours_" placeholder="请输入内容" disabled></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="record_date_" label="时间" min-width="100">
                                <template #default="scope">
                                    <el-input v-model="scope.row.record_date_" placeholder="请输入工时" disabled></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark_" label="备注" min-width="180">
                                <template #default="scope">
                                    <el-input v-model="scope.row.remark_" type="textarea" disabled />
                                </template>
                            </el-table-column>
                        </sc-form-table>
                    </el-form-item> -->
                </el-table>
            </el-card>
            <el-card shadow="never" title="新增填报">
                <el-form ref="formRef" :model="form" label-width="100px">
                    <el-form-item label="新增填报" prop="list">
                        <sc-form-table ref="rulesList" v-model="form.list" :addTemplate="addTemplate">
                            <el-table-column prop="project_number_" label="项目" width="180">
                                <template #default="scope">
                                    <el-select v-model="scope.row.project_number_" placeholder="请选择项目" filterable>
                                        <el-option v-for="item in projectInfo" :key="item.project_number_"
                                            :label="item.project_number_ + ` - ` + item.project_name_"
                                            :value="item.project_number_"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="project_type_" label="项目阶段" min-width="120">
                                <template #default="scope">
                                    <el-select v-model="scope.row.project_type_" placeholder="请选择阶段" filterable>
                                        <el-option v-for="item in projectType" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="job_type_" label="工作类型" min-width="120">
                                <template #default="scope">
                                    <el-select v-model="scope.row.job_type_" placeholder="请选择类型" filterable>
                                        <el-option v-for="item in jobType" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="hours_" label="工时" min-width="100">
                                <template #default="scope">
                                    <el-input v-model="scope.row.hours_" placeholder="请输入工时"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="record_date_" label="时间" min-width="100">
                                <template #default="scope">
                                    <el-input v-model="scope.row.record_date_" placeholder="请选择时间" disabled></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark_" label="备注" min-width="180">
                                <template #default="scope">
                                    <el-input v-model="scope.row.remark_" type="textarea" />
                                </template>
                            </el-table-column>
                        </sc-form-table>
                    </el-form-item>
                </el-form>
            </el-card>
            <template #footer>
                <div class="dialog-footer">
                    <el-button v-model="dialogState" @click="(dialogState = false)" :loading="loading">取消</el-button>
                    <el-button v-model="dialogState" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
                </div>
            </template>
        </el-dialog>
    </el-row>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';

export default {
    props: {
        receiveParams: Object,
    },
    data() {
        return {
            dialogState: false,
            projectInfo: [],
            userInfo: {},
            addTemplate: {
                user_id_: '',
                user_name_: '',
                project_number_: '',
                project_type_: '',
                job_type_: '',
                hours_: '',
                record_date_: '',
            },
            loading: true,
            form: {
                list: [
                    {
                        user_id_: '',
                        user_name_: '',
                        project_number_: '',
                        project_type_: '',
                        job_type_: '',
                        hours_: '',
                        record_date_: '',
                    },
                ],
            },
            recordDay: [],
            jobType: [
                { label: "基本设计", value: 1 },
                { label: "详细设计", value: 2 },
                { label: "研究设计", value: 3 },
                { label: "三维设计", value: 4 },
                { label: "设备订货", value: 5 },
                { label: "更改设计", value: 6 },
                { label: "技术支持", value: 7 },
                { label: "管理", value: 8 },
                { label: "其他", value: 9 },
            ],
            projectType: [
                { label: "研发项目", value: 1 },
                { label: "工程项目", value: 2 },
                { label: "研发+工程", value: 3 },
                { label: "维保项目", value: 4 },
                { label: "市场响应", value: 5 },
                { label: "其他", value: 6 },
            ],
        };
    },
    components: {
        scEditor,
    },
    watch: {
        dialogState(val) {
            if (val) {
                // this.resetForm();
            }
        },
        receiveParams(val) {
            if (val) {
                this.getUserDayManhour();
                this.form.list.forEach(item => {
                    item.record_date_ = this.receiveParams.day,
                        item.user_id_ = this.userInfo.id_,
                        item.user_name_ = this.userInfo.fullname_
                });
            }
        },
        form: {
            handler(newVal) {
                newVal.list.forEach(item => {
                    item.record_date_ = this.receiveParams.day,
                        item.user_id_ = this.userInfo.id_,
                        item.user_name_ = this.userInfo.fullname_
                });
            },
            deep: true,
        },
    },
    async mounted() {
        this.userInfo = this.$TOOL.data.get("USER_INFO");
        if (this.userInfo) {
            this.form.user_name_ = this.userInfo.fullname_;
            try {
                const response = await this.$dmsApi.project.readByUser.post();
                this.projectInfo = response;
            } catch (error) {
                console.error(error);
            }
        }
    },
    methods: {
        async openDwgDialog() {
            try {
                // 弹出确认对话框
                // const confirm = await ElMessageBox.confirm(
                //     '此操作将永久删除该项数据，是否继续？',
                //     '提示',
                //     {
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                //         type: 'warning',
                //     }
                // );
                // if (confirm) {
                // 执行删除逻辑
                // this.dwgloading = true
                // const referData = {
                //     uuid_: row.uuid_,
                // };
                // await this.$dmsApi.manHours.delete.post(referData);
                // this.$emit('invoke-parent-method');
                // this.dialogState = false; // 关闭弹窗
                // this.getDwgData(); // 刷新数据
                // }
            } catch (error) {
                // 捕获取消操作或其他错误
            }
        },
        async deleteButton(row) {
            try {
                // 获取当前用户操作日期
                const currentDate = new Date(); // 确保接收了用户操作日期
                const rowDate = new Date(row.record_date_);

                // 判断是否同月
                if (currentDate.getFullYear() !== rowDate.getFullYear() || currentDate.getMonth() !== rowDate.getMonth()) {
                    // 如果不是同一个月，弹出提示，阻止后续操作
                    ElMessage({
                        type: 'warning',
                        message: '只能删除当月的记录！',
                    });
                    return;
                }

                // 弹出确认对话框
                const confirm = await ElMessageBox.confirm(
                    '此操作将永久删除该项数据，是否继续？',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                );

                if (confirm) {
                    // 执行删除逻辑
                    const referData = {
                        uuid_: row.uuid_,
                    };
                    await this.$dmsApi.manHours.delete.post(referData);
                    this.$emit('invoke-parent-method'); // 通知父组件刷新数据
                    this.dialogState = false; // 关闭弹窗
                }
            } catch (error) {
                // 捕获取消操作或其他错误
                if (error !== 'cancel') {
                    console.error('删除失败:', error);
                }
            }
        },

        async getUserDayManhour() {
            const data = {
                user_id_: this.userInfo.id_,
                record_date_: this.receiveParams.day
            };
            this.loading = true;
            try {
                this.recordDay = await this.$dmsApi.manHours.inquireList.post(data);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        open() {
            this.dialogState = true;
        },
        resetForm() {
            // 重置表单
            this.form.list.length = 0
            // Object.assign(this.form.list[0], {
            //     user_id_: this.userInfo.id_,
            //     user_name_: this.userInfo.fullname_,
            //     record_date_: this.receiveParams.day,
            // });
        },
        async onSubmit() {
            this.loading = true;
            try {
                // 校验字段是否为空
                const isValid = this.form.list.every(item => {
                    const requiredFields = ['user_id_', 'user_name_', 'project_number_', 'job_type_', 'hours_', 'record_date_'];
                    return requiredFields.every(field => item[field]);
                });

                if (!isValid) {
                    this.$message.error('请确保所有信息均已填写');
                    return;
                }

                // 校验 hours_ 总和是否超过 24
                const totalHours = this.form.list.reduce((sum, item) => sum + Number(item.hours_ || 0), 0);
                if ((totalHours + this.receiveParams.dayHours) > 24) {
                    this.$message.error('累积工时不能超过 24 小时');
                    return;
                }

                // 提交数据
                await this.$dmsApi.manHours.create.post(this.form.list);

                // 接口返回成功后执行的操作
                this.$message.success('提交成功');
                this.form.list = []; // 清空表单
                this.dialogState = false; // 关闭弹窗
                this.resetForm(); // 重置表单
                this.$emit('invoke-parent-method');
            } catch (error) {
                this.$message.error('提交失败，请稍后重试');
            } finally {
                // 无论成功或失败都执行的操作
                this.loading = false;
            }
        },
    },
};
</script>