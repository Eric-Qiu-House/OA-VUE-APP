<template>
    <el-row :gutter="40">
        <el-dialog v-model="dialogDwg" title="工时填报" width="500" :before-close="handleClose">
            <el-form v-loading="loading" :model="manhoursFrom" label-width="auto" style="max-width: 600px">
                <el-form-item label="图号">
                    <el-input v-model="manhoursFrom.drawing_number_" disabled />
                </el-form-item>
                <el-form-item label="图名">
                    <el-input v-model="manhoursFrom.drawing_name_" disabled />
                </el-form-item>
                <el-form-item label="填报人id">
                    <el-input v-model="manhoursFrom.user_id_" disabled />
                </el-form-item>
                <el-form-item label="填报人姓名">
                    <el-input v-model="manhoursFrom.user_name_" disabled />
                </el-form-item>
                <el-form-item label="填报日期">
                    <el-date-picker v-model="manhoursFrom.record_date_" type="datetime" placeholder="Pick a date"
                        :default-value="defaultDate" />
                </el-form-item>
                <el-form-item label="填报工时">
                    <el-input v-model="manhoursFrom.hours_" type="number" placeholder="请填写工时（不能超过12）" :min="0" :max="12"
                        @input="handleInput" />
                </el-form-item>
                <el-form-item label="审批人">
                    <el-select v-model="manhoursFrom.verifier_name_" placeholder="选择校验工程师"
                        @click="handleNodeClick(manhoursFrom.projec_id_)" @change="verifierChange">
                        <el-option v-for="item in projectUserInfos" :key="item.id_" :label="item.fullname_"
                            :value="item.fullname_" />
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="审批人">
                    <el-input v-model="manhoursFrom.verifier_name_" placeholder="Please input" />
                </el-form-item> -->
                <el-form-item label="填报说明">
                    <el-input v-model="manhoursFrom.submit_message_" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button v-model="dialogDwg">取消</el-button>
                    <el-button v-model="dialogDwg" type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            dialogDwg: false,
            // projectManagers: [],
            defaultDate: new Date(new Date().setSeconds(0, 0)),
            manhoursFrom: {
                user_id_: '',
                user_name_: '',
                record_date_: null,
                ratify_user_id_: '',
                ratify_user_name_: '',
            },
            projectUserInfos: [],
            loading: false
        }
    },
    mounted() {
        const userInfo = this.$TOOL.data.get("USER_INFO");
        this.manhoursFrom.record_date_ = new Date(new Date().setSeconds(0, 0))
        if (userInfo) {
            this.manhoursFrom.user_id_ = userInfo.id_;
            this.manhoursFrom.user_name_ = userInfo.fullname_;
        } else {
            console.error("USER_INFO is undefined");
        }
        // this.getfileInfo()
    },
    methods: {
        open() {
            this.dialogDwg = true
        },
        async onSubmit() {
            this.loading = true
            try {
                await this.$dmsApi.manHours.create.post(this.manhoursFrom)
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
                this.dialogDwg = false

            }
        },
        handleInput(value) {
            if (value < 1) {
                this.manhoursFrom.hours_ = 1;  // 防止负数输入
            } else if (value >= 12) {
                this.manhoursFrom.hours_ = 12;  // 限制最大值为12
            }
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
        verifierChange(value) {
            // 通过 fullname_ 查找完整的项目经理对象
            const selectedManager = this.projectUserInfos.find(item => item.fullname_ === value);
            if (selectedManager) {
                this.manhoursFrom.verifier_id_ = selectedManager.id_;  // 将 id_ 存储到 project_form 中
            } else {
                console.log('未找到对应的项目经理');
            }
        },
        //表单注入数据
        setData(data) {
            console.log(data, 'ssss1111111111111')
            // const a = {
            //     user_id_:'',
            //     user_name_:''
            // }
            this.manhoursFrom = { ...this.manhoursFrom, ...data }
        }
    }
}
</script>
