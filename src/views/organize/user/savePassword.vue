<template>
    <el-dialog v-model="dialogVisible" :title="Tips" width="500" :before-close="handleClose">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
            label-width="auto" class="demo-ruleForm">
            <el-form-item label="账号" prop="pass">
                <el-input v-model="ruleForm.account_" type="text" autocomplete="off" disabled/>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="再次输入" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    重置
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                account_: '',
                pass: '',
                checkPass: '', // 添加校验字段
                newPassword_: '',
                Tips: ''
            },
            dialogVisible: false,
            rules: {
                pass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: this.validatePass2, trigger: 'blur' }
                ],
            },
            datas: {}
        }
    },
    methods: {
        async submitForm() {
            this.$refs.ruleFormRef.validate(async (valid) => {
                if (valid) {
                    const data = {
                        account_: this.ruleForm.account_,
                        newPassword_: this.ruleForm.pass,
                    };
                    try {
                        console.log(data, 'ssssssssssss')
                        await this.$iamApi.user.adminChangePassword.post(data);
                        this.$message.success('密码重置成功');
                        this.dialogVisible = false;
                    } catch (error) {
                        console.error('密码重置失败:', error);
                    }
                } else {
                    console.warn('表单校验未通过');
                }
            });
        },
        validatePass2(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        },
        setData(data) {
            this.ruleForm.account_ = data.account_;
            this.Tips = data.fullname_;
        },
        resetForm(ref) {
            this.$refs[ref].resetFields();
        }
    }
}
</script>
