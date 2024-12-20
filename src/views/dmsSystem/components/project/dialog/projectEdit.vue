<template>
    <el-dialog v-model="dialogVisible" title="项目详情" width="600px">
        <el-form :model="projectForm" label-width="100px" v-loading="formLoading">
            <el-form-item label="项目号">
                <el-input v-model="projectForm.project_number_"></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
                <el-select v-model="projectForm.project_type_" placeholder="选择项目状态">
                    <el-option v-for="item in projectTypes.filter(option => option.value !== 0)" :key="item.value"
                        :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="项目状态">
                <el-select v-model="projectForm.project_statu_" placeholder="选择项目状态">
                    <el-option v-for="item in projectState[0].options.filter(option => option.value !== 0)"
                        :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model="projectForm.project_name_"></el-input>
            </el-form-item>
            <el-form-item label="项目经理">
                <el-select v-model="projectForm.project_manager_name_" placeholder="选择项目经理"
                    @click="handleNodeClick(projectForm.uuid_)" @change="handleManagerChange">
                    <el-option v-for="item in projectUserInfos" :key="item.id_" :label="item.fullname_"
                        :value="item.fullname_" />
                </el-select>
            </el-form-item>
            <el-form-item label="客户">
                <el-input v-model="projectForm.ship_owner_"></el-input>
            </el-form-item>
            <el-form-item label="船厂">
                <el-input v-model="projectForm.ship_person_"></el-input>
            </el-form-item>
            <el-form-item label="项目开始">
                <el-date-picker v-model="projectForm.start_date_" type="date" placeholder="选择开始日期"
                    style="width: 100%"></el-date-picker>
            </el-form-item>
            <el-form-item label="项目结束">
                <el-date-picker v-model="projectForm.end_date_" type="date" placeholder="选择结束日期"
                    style="width: 100%"></el-date-picker>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button v-loading="formLoading" @click="dialogVisible = false">取消</el-button>
            <el-button v-loading="formLoading" type="primary" @click="submitFormProject">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import scSelectFilter from '@/components/scSelectFilter'
import { inject } from 'vue';
export default {
    components: {
        scSelectFilter
    },
    setup() {
        const userType = inject('userType');  // 注入数据
        return {
            userType
        };
    },
    props: {
        editData: {
            type: Object,
            required: true,
        },
    },
    watch: {
        editData: {
            immediate: true, // 立即执行，初始化时也同步一次
            handler(newValue) {
                this.projectForm = { ...newValue }; // 同步 props 的数据
            },
        },
    },
    data() {
        return {
            projectTypeValue: 0, // 默认选中的tab
            projectTypes: [
                { label: '所有', value: 0 },
                { label: '市场响应', value: 1 },
                { label: '自研项目', value: 2 },
                { label: '工程项目', value: 3 },
            ],
            projectState: [
                {
                    title: "状态(单)",
                    key: "state",
                    options: [
                        {
                            label: "全部",
                            value: 0
                        },
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
                            label: "已完成",
                            value: 3,
                            icon: "el-icon-checked"
                        },
                        {
                            label: "已关闭",
                            value: 4,
                            icon: "el-icon-circle-close"
                        }
                    ]
                }
            ],
            selectedValues: {
                state: 0,
                // type: [""]
            },
            dialogVisible: false,
            projectForm: {},
            projectTable: [],
            projectUserInfos: [],
            projectLoading: false, // 添加加载状态
            formLoading: false
        }
    },
    created() {
        this.getProjectInfo()
    },
    methods: {
        open() {
            this.dialogVisible = true
        },
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
        handleManagerChange(value) {
            // 通过 fullname_ 查找完整的项目经理对象
            const selectedManager = this.projectUserInfos.find(item => item.fullname_ === value);
            if (selectedManager) {
                this.projectForm.project_manager_user_id_ = selectedManager.id_;  // 将 id_ 存储到 project_form 中
            } else {
                console.log('未找到对应的项目经理');
            }
        },
        openDialogProject(row) {
            if (row) {
                this.projectForm = { ...row };
            } else {
                // 初始化为新建时的默认值
                this.projectForm = {};
            }
            this.dialogVisible = true;
        },
        userInfo(id) {
            const postData = {
                id_: id
            }
            return this.$apiIAM.user.userIdReadUserInfo.post(postData)
        },
        async submitFormProject() {
            this.formLoading = true
            try {
                if (this.projectForm.uuid_) {
                    // 如果存在 uuid_，调用更新接口
                    await this.$dmsApi.project.update.post(this.projectForm);
                } else {
                    // 如果不存在 uuid_，调用新增接口
                    await this.$dmsApi.project.create.post(this.projectForm);
                }
            } catch (error) {
                console.error("Error submitting project form:", error);
            } finally {
                this.dialogVisible = false;
                this.formLoading = false; // 无论成功还是失败，都关闭弹框
                this.$emit('updetaProject')
                // this.postReadByIdProject()
            }
        },
        async getProjectInfo() {
            this.projectLoading = true; // 开始加载
            try {
                if(this.userType == 'admin') {
                    this.projectTable = await this.$dmsApi.project.readAll.get()
                }else if (this.userType == 'user') {
                    // this.postReadByIdProject()
                }
                } catch (error) {
                console.error("Error fetching user list:", error);
            } finally {
                this.projectLoading = false; // 加载完成
            }
        },
        async postReadByIdProject() {
            // 初始化提交数据对象
            const submitData = {};
            // 动态添加字段，排除值为 0 的字段
            if (this.projectTypeValue !== 0) {
                submitData.project_type_ = this.projectTypeValue;
            }
            if (this.selectedValues.state !== 0) {
                submitData.project_statu_ = this.selectedValues.state;
            }
            this.projectLoading = true; // 开始加载
            try {
                // 调用接口
                if (this.selectedValues.state == 0 && this.projectTypeValue == 0) {
                    this.getProjectInfo()
                } else {
                    if (submitData.project_statu_ == 0) {
                        delete submitData.project_statu_;
                    }
                    this.projectTable = await this.$dmsApi.project.readById.post(submitData);
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            } finally {
                this.projectLoading = false; // 加载完成
            }
        },
        // 标签切换
        tabChange() {
            this.postReadByIdProject()
        },
        //状态切换
        selectChange(selected) {
            this.selectedValues.state = selected.state
            this.postReadByIdProject()
        },
    }
}
</script>