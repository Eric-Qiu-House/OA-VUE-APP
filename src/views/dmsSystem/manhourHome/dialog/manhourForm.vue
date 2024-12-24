<template>
    <el-row :gutter="40">
        <el-dialog v-model="dialogDwg" title="工时填报" width="1200" :before-close="handleClose">
            {{ state }}
            <el-form ref="form" :rules="rules" v-loading="loading" :model="manhoursFrom" label-width="auto"
                style="max-width: 1200px">
                <el-form-item label="图号">
                    <el-input v-model="manhoursFrom.drawing_number_" disabled />
                </el-form-item>
                <el-form-item label="图名">
                    <el-input v-model="manhoursFrom.drawing_name_" disabled />
                </el-form-item>
                <!-- <el-form-item label="填报人id">
                    <el-input v-model="manhoursFrom.user_id_" disabled />
                </el-form-item> -->
                <el-form-item label="填报人姓名" prop="user_name_">
                    <el-input v-model="manhoursFrom.user_name_" disabled />
                </el-form-item>
                <el-form-item label="填报日期" prop="record_date_">
                    <el-date-picker v-model="manhoursFrom.record_date_" type="date" placeholder="Pick a date"
                        :disabled="state == '审核' || !(manhoursFrom.user_id_ == $TOOL.data.get('USER_INFO').id_)"
                        :default-value="defaultDate" :disabled-date="disableFutureDates" />
                </el-form-item>
                <el-form-item label="填报工时" prop="hours_">
                    <el-input v-model="manhoursFrom.hours_" type="number" placeholder="请填写工时（不能超过16）" :min="0" :max="16"
                        :disabled="state == '审核' || !(manhoursFrom.user_id_ == $TOOL.data.get('USER_INFO').id_)" @input="handleInput" />
                </el-form-item>
                <el-form-item label="审批人" prop="verifier_name_">
                    <el-input v-model="manhoursFrom.verifier_name_" disabled />
                </el-form-item>
                <!-- 保留的功能 -->
                <!-- <el-form-item label="审批人">
                    <el-select v-model="manhoursFrom.verifier_name_" placeholder="选择校验工程师"
                        @click="handleNodeClick(manhoursFrom.projec_id_)" @change="verifierChange">
                        <el-option v-for="item in projectUserInfos" :key="item.id_" :label="item.fullname_"
                            :value="item.fullname_" />
                    </el-select>
                </el-form-item> -->
                <el-form-item label="审批状态" v-if="manhoursFrom.ratify_type_ != null">
                    <el-select v-model="manhoursFrom.ratify_type_"
                        :disabled="!(manhoursFrom.verifier_id_ == $TOOL.data.get('USER_INFO').id_)"
                        placeholder="请选择审批状态">
                        <el-option label="待审批" v-show="false" :value=0 :style="{ color: 'gray' }"></el-option>
                        <el-option label="通过" :value=1 :style="{ color: 'green' }"></el-option>
                        <el-option label="拒绝" :value=2 :style="{ color: 'red' }"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="审批人">
                    <el-input v-model="manhoursFrom.verifier_name_" placeholder="Please input" />
                </el-form-item> -->
                <el-form-item label="审批说明">
                    <sc-editor v-model="manhoursFrom.submit_message_" placeholder="请输入" :height="300"></sc-editor>
                    <!-- <el-input v-model="manhoursFrom.submit_message_" type="textarea" /> -->
                </el-form-item>
                <el-form-item>
                    <el-button v-model="dialogDwg" v-if="manhoursFrom.user_id_ == $TOOL.data.get('USER_INFO').id_" type="primary" @click="onSubmit">提交申请</el-button>
                    <el-button v-model="dialogDwg" v-if="manhoursFrom.verifier_id_ == $TOOL.data.get('USER_INFO').id_ && state == '审核' " type="danger" @click="onSubmit">拒绝</el-button>
                    <el-button v-model="dialogDwg" v-if="manhoursFrom.verifier_id_ == $TOOL.data.get('USER_INFO').id_ && state == '审核' " type="success" @click="onSubmit">通过</el-button>
                    <el-button v-model="dialogDwg" @click="(dialogDwg = false)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-row>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));

export default {
    props: {
        state: String,
    },
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
            rules: {
                user_name_: [
                    { required: true, message: '填报人不能为空', trigger: 'blur' }
                ],
                record_date_: [
                    { required: true, message: '请选择本次提交工时日期', trigger: 'blur' }
                ],
                hours_: [
                    { required: true, message: '请填报期间产生的工时', trigger: 'blur' }
                ],
                verifier_name_: [
                    { required: true, message: '审批人不能为空', trigger: 'blur' }
                ]
            },
            // defaultDate: new Date(), // 设置默认日期为今天
            projectUserInfos: [],
            loading: false
        }
    },
    components: {
        scEditor
    },
    mounted() {
        const userInfo = this.$TOOL.data.get("USER_INFO");
        // this.manhoursFrom.record_date_ = new Date(new Date().setSeconds(0, 0))
        if (userInfo) {
            this.manhoursFrom.user_id_ = userInfo.id_;
            this.manhoursFrom.user_name_ = userInfo.fullname_;
        } else {
            console.error("USER_INFO is undefined");
        }
        // this.getfileInfo()
    },
    methods: {
        // 禁用未来日期
        disableFutureDates(date) {
            return date > new Date(); // 禁用大于今天的日期
        },
        open() {
            this.dialogDwg = true
        },
        async onSubmit() {
            const valid = await new Promise((resolve) => {
                this.$refs.form.validate((valid) => {
                    resolve(valid);
                });
            });
            // 如果校验不通过，返回
            if (!valid) {
                this.formLoading = false;
                return; // 退出函数，避免执行后续代码
            }
            this.loading = true
            // 如果 `manhoursFrom.record_date_` 是一个包含时间的 datetime 格式（例如 '2024-12-20T12:00:00'）
            // if (this.manhoursFrom.record_date_) {
            //     // 将其转换为 'YYYY-MM-DD' 格式
            // this.manhoursFrom.record_date_ = this.manhoursFrom.record_date_.split('T')[0];  // 或者使用其他方法转换
            // }
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
            if (this.state == '审核') {
                this.manhoursFrom = { ...data }
            } else {
                if (data.uuid_) {
                    data.drawing_uuid_ = data.uuid_;
                    // delete data.uuid_;  // 可选：删除原始的 uuid_ 字段，避免污染
                }
                this.manhoursFrom = { ...this.manhoursFrom, ...data }
            }

        }
    }
}
</script>
