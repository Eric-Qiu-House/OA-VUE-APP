<template>
	<el-card shadow="never" header="修改密码">
		<el-alert title="密码更新成功后，您将被重定向到登录页面，您可以使用新密码重新登录。" type="info" show-icon style="margin-bottom: 15px;" />
		<el-form ref="form" :model="form" :rules="rules" label-width="120px" style="margin-top:20px;">
			<el-form-item label="当前密码" prop="userPassword">
				<el-input v-model="form.userPassword" type="password" show-password placeholder="请输入当前密码"></el-input>
				<div class="el-form-item-msg">必须提供当前登录用户密码才能进行更改</div>
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword">
				<el-input v-model="form.newPassword" type="password" show-password placeholder="请输入新密码"></el-input>
				<sc-password-strength v-model="form.newPassword"></sc-password-strength>
				<div class="el-form-item-msg">请输入包含英文、数字的8位以上密码</div>
			</el-form-item>
			<el-form-item label="确认新密码" prop="confirmNewPassword">
				<el-input v-model="form.confirmNewPassword" type="password" show-password
					placeholder="请再次输入新密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="save">保存密码</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
import scPasswordStrength from '@/components/scPasswordStrength'

export default {
	components: {
		scPasswordStrength
	},
	data() {
		return {
			form: {
				userPassword: "",
				newPassword: "",
				confirmNewPassword: ""
			},
			rules: {
				userPassword: [
					{ required: true, message: '请输入当前密码' }
				],
				newPassword: [
					{ required: true, message: '请输入新密码', trigger: 'blur' },
					{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入新密码'));
							}
							if (value.length < 8 || value.length > 16) {
								return callback(new Error('密码长度必须在 8 到 16 个字符之间'));
							}
							if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
								return callback(new Error('密码必须包含至少一个字母和一个数字'));
							}
							callback(); // 验证通过
						},
						trigger: 'blur'
					}
				],
				confirmNewPassword: [
					{ required: true, message: '请再次输入新密码' },
					{
						validator: (rule, value, callback) => {
							if (value !== this.form.newPassword) {
								callback(new Error('两次输入密码不一致'));
							} else {
								callback();
							}
						}
					}
				]
			}
		}
	},
	methods: {
		async save() {
			try {

				var userInfo = this.$TOOL.data.get("USER_INFO");

				const data = {
					account_: userInfo.account_,
					password_: this.form.userPassword,
					newPassword_: this.form.newPassword
				} 
				await  this.$apiIAM.user.changePassword.post(data)
				this.$refs.form.validate(valid => {
					if (valid) {
						this.$alert("密码修改成功，是否跳转至登录页使用新密码登录", "修改成功", {
							type: 'success',
							center: true
						}).then(() => {
							this.$router.replace({
								path: '/login'
							})
						}).catch(() => { })
					} else {
						return false
					}
				})

			} catch (error) {
				console.error('Error in loginController:', error);
			}

		}
	}
}
</script>

<style></style>
