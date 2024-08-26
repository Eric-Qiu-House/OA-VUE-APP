<template>
	<!-- 密码登入 -->
	<el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" @keyup.enter="login">
		<el-form-item prop="user">
			<el-input v-model="form.user" prefix-icon="el-icon-user" clearable
				:placeholder="$t('login.userPlaceholder')">
				<template #append>
					<el-select v-model="userType" style="width: 130px;">
						<el-option :label="$t('login.user')" value="user"></el-option>
						<el-option :label="$t('login.admin')" value="admin"></el-option>
					</el-select>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="form.password" prefix-icon="el-icon-lock" clearable show-password
				:placeholder="$t('login.PWPlaceholder')"></el-input>
		</el-form-item>
		<el-form-item style="margin-bottom: 10px;">
			<el-col :span="12">
				<el-checkbox :label="$t('login.rememberMe')" v-model="form.autologin"></el-checkbox>
			</el-col>
			<el-col :span="12" class="login-forgot" @click="handleForgotPasswordClick">
				<a to="/reset_password">{{ $t('login.forgetPassword') }}？</a>
				<!-- 保留修改密码，以后开发 -->
				<!-- <router-link to="/reset_password">{{ $t('login.forgetPassword') }}？</router-link> -->
			</el-col>
		</el-form-item>
		<el-form-item>
			<!-- 登入按钮 -->
			<el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login">{{ $t('login.signIn')
				}}</el-button>
		</el-form-item>
		<div class="login-reg" @click="handleAddAccountClick">
			{{ $t('login.noAccount') }}
			<!-- 保留创建账号界面 -->
			<a to="/user_register">{{ $t('login.createAccount') }}</a>
			<!-- <router-link to="/user_register">{{ $t('login.createAccount') }}</router-link> -->
		</div>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			userType: 'user',
			form: {
				user: "shenyuan123",
				password: "qwe12345",
				autologin: false
			},
			rules: {
				user: [
					{ required: true, message: this.$t('login.userError'), trigger: 'blur' }
				],
				password: [
					{ required: true, message: this.$t('login.PWError'), trigger: 'blur' }
				]
			},
			islogin: false,
		}
	},
	watch: {
		userType(val) {
			if (val == 'admin') {
				this.form.user = 'admin'
				this.form.password = 'admin'
			} else if (val == 'user') {
				this.form.user = 'user'
				this.form.password = 'user'
			}
		}
	},
	mounted() {

	},
	methods: {
		handleForgotPasswordClick() {
			alert('请联系管理员重置密码');
		},
		handleAddAccountClick() {
			alert('请联系管理员开通账号');
		},
		async login() {
			// 验证表单是否填写正确
			var validate = await this.$refs.loginForm.validate().catch(() => { });
			if (!validate) {
				return false;
			}

			// 显示登录加载状态
			this.islogin = true;

			// 构建用户登录数据，其中密码使用MD5加密
			var data = {
				account_: this.form.user,
				password_: this.form.password,
				// password_: this.$TOOL.crypto.MD5(this.form.password)
			};

			// 使用API调用获取用户的token信息
			var user1 = await this.$API.auth.token.post(data);
			console.log(user1, '1');  // 打印获取到的用户数据

			// 模拟返回的用户信息 (通常从服务器获取，但此处直接定义在代码中)
			var user = {
				code: 200,  // 表示请求成功的状态码
				data: {
					token: user1.data.token,  // 模拟的token
					userInfo: user1.data.userInfo,
					userRouter: user1.data.userRouter,

				},
				message: ""  // 错误信息，如果有的话
			};

			// 判断是否登录成功
			if (user.code == 200) {
				console.log(user, 'user');  // 打印成功获取到的用户数据

				// 将token存储在Cookie中，根据是否自动登录决定过期时间
				this.$TOOL.cookie.set("TOKEN", user.data.token, {
					expires: this.form.autologin ? 24 * 60 * 60 : 0
				});

				// 将用户信息保存到本地存储中
				this.$TOOL.data.set("USER_INFO", user.data.userInfo);
			} else {
				// 登录失败，取消加载状态，并显示错误信息
				this.islogin = false;
				this.$message.warning(user.message);
				return false;
			}

			// 获取用户菜单
			var menu = null;
			if (this.form.user == 'admin') {
				// 如果是管理员用户，调用获取管理员菜单的API
				// menu = await this.$API.system.menu.myMenus.get();
			} else {
				// 否则，调用获取普通用户菜单的API
				// menu = await this.$API.demo.menu.get();
			}

			// 判断菜单是否获取成功
			if (user1.data.userRouter) {
				if (user1.data.userRouter.length == 0) {
					// 如果菜单为空，取消加载状态，并显示无权限提示
					this.islogin = false;
					this.$alert("当前用户无任何菜单权限，请联系系统管理员", "无权限访问", {
						type: 'error',
						center: true
					});
					return false;
				}
				// 将菜单和权限信息保存到本地存储中
				this.$TOOL.data.set("MENU", user1.data.userRouter);
				// this.$TOOL.data.set("PERMISSIONS", menu.data.permissions);
				// this.$TOOL.data.set("DASHBOARDGRID", menu.data.dashboardGrid);
			} else {
				// 获取菜单失败，取消加载状态，并显示错误信息
				this.islogin = false;
				this.$message.warning(menu.message,'无菜单权限，请联系管理员。');
				return false;
			}

			// 登录成功后，重定向到主页
			this.$router.replace({
				path: '/'
			});

			// 显示登录成功的信息
			this.$message.success("Login Success 登录成功");

			// 隐藏登录加载状态
			this.islogin = false;
		},

	}
}
</script>

<style></style>
