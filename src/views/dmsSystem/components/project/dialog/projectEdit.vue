    <template>
        <el-dialog v-model="dialogVisible" title="项目详情" width="600px">
            <el-form :model="projectForm" ref="form" :rules="projectFormRules" label-width="100px"
                v-loading="formLoading">
                <el-form-item label="企业" prop="firm_">
                    <el-select v-model="projectForm.firm_" placeholder="选择合同主体">
                        <el-option v-for="item in projectFirm.filter(option => option.value !== 0)" :key="item.value"
                            :label="item.label" :value="item.label" :disabled="item.value < initialStatus" />
                    </el-select>
                </el-form-item>

                <el-form-item label="项目号" prop="project_number_">
                    <el-input v-model="projectForm.project_number_" />
                </el-form-item>

                <el-form-item label="项目名称" prop="project_name_">
                    <el-input v-model="projectForm.project_name_" />
                </el-form-item>

                <el-form-item label="项目类型" prop="project_type_">
                    <el-select v-model="projectForm.project_type_" placeholder="选择项目类型">
                        <el-option v-for="item in projectTypes.filter(option => option.value !== 0)" :key="item.value"
                            :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="项目阶段" prop="pro_stage_">
                    <el-select v-model="projectForm.pro_stage_" placeholder="选择项目阶段">
                        <el-option v-for="item in proStage.filter(option => option.value !== 0)" :key="item.value"
                            :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="项目成员" v-if="isShow">
                    <div style="display: flex;">
                        <el-input v-model="selectedUserIds" disabled />
                        <el-button type="primary" :icon="Edit" circle @click="addUser" />
                    </div>
                </el-form-item>

                <el-form-item label="阶段负责人" v-if="isShow">
                    <userInput v-model="projectForm.project_manager_name_"  @onUserInput="onUserInput" placeholder="请输入姓名进行查询"  />
                </el-form-item>

                <el-form-item label="项目状态">
                    <el-select v-model="projectForm.project_statu_" placeholder="选择项目状态">
                        <el-option v-for="item in projectState[2].options.filter(option => option.value !== 0)"
                            :key="item.value" :label="item.label" :value="item.value"
                            :disabled="item.value < initialStatus" />
                    </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input v-model="projectForm.remarks_" type="textarea" autosize placeholder="可输入备注信息" />
                </el-form-item>

                <!-- <el-form-item label="船东" v-if="isShow">
                    <el-input v-model="projectForm.ship_owner_" />
                </el-form-item>

                <el-form-item label="船厂" v-if="isShow">
                    <el-input v-model="projectForm.ship_person_" />
                </el-form-item>

                <el-form-item label="船级社" v-if="isShow">
                    <el-input v-model="projectForm.ship_person_" />
                </el-form-item>

                <el-form-item label="设计院" v-if="isShow">
                    <el-input v-model="projectForm.ship_person_" />
                </el-form-item> -->

                <el-form-item label="项目开始" v-if="isShow">
                    <el-date-picker v-model="projectForm.start_date_" type="date" style="width: 100%"
                        placeholder="选择开始日期" />
                </el-form-item>

                <el-form-item label="项目结束" v-if="isShow">
                    <el-date-picker v-model="projectForm.end_date_" type="date" style="width: 100%"
                        placeholder="选择结束日期" />
                </el-form-item>
            </el-form>

            <div class="dialog-footer">
                <el-button v-loading="formLoading" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" v-loading="formLoading" @click="submitFormProject">提交</el-button>
            </div>
        </el-dialog>

        <organize-edit v-if="dialogVisible" ref="saveDialog" @success="fetchUsers" @closed="dialogVisible = false" />
    </template>

<script>
import config from '@/utils/projectBasicstInfo'
import userInput from '@/views/iamSystem/components/user/inputUser'
import OrganizeEdit from '@/views/dmsSystem/projectOrganize/dialog/organizeEdit.vue'
import { Edit } from '@element-plus/icons-vue'

export default {
    components: { userInput, OrganizeEdit },
    props: {
        editData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dialogVisible: false,
            formLoading: false,
            initialStatus: '',
            selectedUserIds: [],
            isShow: String,
            Edit,
            projectUserInfos: [],
            projectForm: {},
            projectFormRules: {
                firm_: [{ required: true, message: '合同主体不能为空', trigger: 'blur' }],
                project_number_: [{ required: true, message: '项目号不能为空', trigger: 'blur' }],
                project_name_: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
                project_type_: [{ required: true, message: '项目类型不能为空', trigger: 'blur' }],
                pro_stage_: [{ required: true, message: '项目阶段不能为空', trigger: 'blur' }]
            },
            projectTypes: config.proType,
            proStage: config.proStage,
            projectState: config.proState,
            projectFirm: config.proFirm
        }
    },
    watch: {
        editData: {
            immediate: true,
            handler(newVal) {
                this.projectForm = { ...newVal };
                this.isShow = this.projectForm.uuid_
                this.initialStatus = this.projectForm.project_statu_;
                // 如果有 uuid_ 则立即查询项目组成员
                if (this.projectForm.uuid_) {
                    this.handleNodeClick();
                }
            }
        },

        dialogVisible(newValue) {
            if (!newValue) { // 当对话框关闭时
                this.projectUserInfos = []; // 
            }
        }
    },

    methods: {

        // 打开此页面
        open() {
            this.selectedUserIds = [];
            this.dialogVisible = true;
        },

        resetFormData() {
            this.selectedUserIds = [];
            this.projectUserInfos = [];
            this.formLoading = false;
            this.initialStatus = '';
            this.projectForm = { ...this.editData }; // 重新复制 editData 避免引用污染
        },

        // 修改项目用户成员
        addUser() {
            this.$nextTick(() => {
                this.$refs.saveDialog?.open?.()?.setData(this.projectUserInfos, this.projectForm)
            })
        },

        // 查询项目组 - 并添加到 input 中
        async handleNodeClick() {
            try {
                const userIDs = await this.getProjectUseIDs(); // ✅ 等待 Promise 完成
                console.log(userIDs, 'userIDs');

                if (userIDs && userIDs.length > 0) {
                    await this.getProjectUserInfo(userIDs); // ✅ 继续处理用户信息
                } else {
                    this.selectedUserIds = []; // 清空 selectedUserIds
                    this.$message.warning('请添加项目组成员！');
                }
            } catch (error) {
                console.error("获取项目成员失败:", error);
                this.$message.error("获取项目成员失败");
            }
        },

        // 项目组 - 用户ID
        async getProjectUseIDs() {
            try {
                const submitData = {
                    project_id_: this.projectForm.uuid_
                }
                let userIDs = await this.$dmsApi.projectUsershiproute.readId.post(submitData)
                return userIDs
            } catch (error) {
                console.error
            }
        },

        // ID 查询 用户名信息
        async getProjectUserInfo(userIDs) {
            try {
                console.log(userIDs, 'userIDs')
                this.projectUserInfos = await this.$apiIAM.user.usersByUserIds.post(userIDs)
                this.selectedUserIds = this.projectUserInfos.map(user => user.fullname_);
            } catch (error) {
                console.error
            }
        },

        //  添加 阶段负责人
        onUserInput(val) {
            this.projectForm.project_manager_user_id_ = val
            console.log(this.projectForm)

        },

        // 提交表单
        async submitFormProject() {
            const valid = await this.$refs.form.validate().catch(() => false)
            if (!valid) return

            this.formLoading = true
            try {
                if (this.projectForm.uuid_) {
                    // 修改
                    await this.$dmsApi.project.update.post(this.projectForm)
                } else {
                    // 增加
                    const resData = await this.$dmsApi.project.create.post(this.projectForm)
                    if (resData) {
                        const userInfo = this.$TOOL.data.get("USER_INFO");
                        const reqData = {
                            project_id_: resData.uuid_,
                            users: [ userInfo.id_ ]
                        };
                        await this.$dmsApi.projectUsershiproute.update.post(reqData);
                    }
                }
                this.$emit('updateProject')
                this.dialogVisible = false
            } catch (err) {
                console.error('提交失败', err)
            } finally {
                this.formLoading = false
            }
        }
    }
}
</script>
