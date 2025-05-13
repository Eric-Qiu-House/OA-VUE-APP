<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode == 'show'" ref="dialogForm" label-width="100px"
			label-position="left">
			<!-- <el-form-item label="头像" prop="avatar">
		  <sc-upload v-model="form.avatar" title="上传头像" :cropper="true" :compress="0.5"
			:aspectRatio="1 / 1"></sc-upload> -->
			<!-- </el-form-item> -->
			<el-form-item label="登录账号" prop="userName">
				<el-input v-model="form.userName" placeholder="用于登录系统" clearable></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" placeholder="请输入完整的真实姓名" clearable></el-input>
			</el-form-item>
			<template v-if="mode == 'add'">
				<el-form-item label="登录密码" prop="password">
					<el-input type="password" v-model="form.password" clearable show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="password2">
					<el-input type="password" v-model="form.password2" clearable show-password></el-input>
				</el-form-item>
			</template>
			<el-form-item label="所属部门" prop="dept">
				<el-cascader v-model="form.dept" :options="depts" :props="deptsProps" clearable
					style="width: 100%;"></el-cascader>
			</el-form-item>
			<el-form-item label="用户类型" prop="user_type_">
				<el-input v-model="form.user_type_" placeholder="请输入完整的真实姓名" clearable></el-input>
			</el-form-item>
			
			<el-form-item label="所属角色" prop="role">
				<el-select v-model="form.role" multiple filterable style="width: 100%">
					<el-option v-for="item in roleData" :key="item.id_" :label="item.name_" :value="item.id_" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取 消</el-button>
			<el-button v-if="mode != 'show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
export default {
	emits: ['success', 'closed'],
	data() {
		return {
			mode: "add",
			titleMap: {
				add: '新增用户',
				edit: '编辑用户',
				show: '查看'
			},
			value: '0',
			visible: false,
			isSaveing: false,
			// 表单数据
			form: {
				id: "",
				userName: "",
				//   avatar: "",
				name: "",
				password: '',
				password2: '',
				user_type_: 'user',
				// status: '0',
				dept: [],
				role: []
			},
			// 验证规则
			rules: {
				userName: [
					{ required: true, message: '请输入登录账号' }
				],
				name: [
					{ required: true, message: '请输入真实姓名' }
				],
				password: [
					{ required: true, message: '请输入登录密码' },
					{
						validator: (rule, value, callback) => {
							const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
							if (!regex.test(value)) {
								callback(new Error('密码必须为6-16位，且包含字母和数字'));
							} else {
								if (this.form.password2 !== '') {
									this.$refs.dialogForm.validateField('password2');
								}
								callback();
							}
						}
					}
				],
				password2: [
					{ required: true, message: '请再次输入密码' },
					{
						validator: (rule, value, callback) => {
							if (value !== this.form.password) {
								callback(new Error('两次输入密码不一致!'));
							} else {
								callback();
							}
						}
					}
				],
				dept: [
					{ required: true, message: '请选择所属部门' }
				],
				role: [
					{ required: true, message: '请选择所属角色', trigger: 'change' }
				]
			},
			// 所需数据选项
			roleData: [],
			roleDataProps: {
				value: "id_",
				label: 'name_',
				multiple: true,
				checkStrictly: true
			},
			depts: [],
			deptsProps: {
				value: "id_",
				label: 'name_',
				children: 'children',
				checkStrictly: true,
				emitPath: false // 只返回选中的最后一级的 ID
			},
			userRelationData: {}
		}
	},
	mounted() {
		this.getGroup();
		this.getDept();
	},
	methods: {
		// 显示
		open(mode = 'add') {
			this.mode = mode;
			this.visible = true;
			return this;
		},
		// 加载角色数据
		async getGroup() {
			var res = await this.$apiIAM.role.fromList.get();
			this.roleData = res;
		},
		// 加载部门数据
		async getDept() {
			var res = await this.$apiIAM.group.fromList.get();
			this.depts = res;
		},
		// 加载用户已拥有的部门和角色
		async userRelation() {
			var newData = {
				id_: this.form.id
			};
			this.userRelationData = await this.$apiIAM.relation.readUserRelation.post(newData);

			// 确保 roleData 已经加载完成后再设置
			if (this.roleData.length > 0) {
				this.form.dept = this.userRelationData.group_id_;
				this.form.role = this.userRelationData.role_id_;
			}
		},
		findDeptName(depts, targetId) {
			for (const dept of depts) {
				if (dept.id_ == targetId) return dept.name_;
				if (dept.children) {
					const found = this.findDeptName(dept.children, targetId);
					if (found) return found;
				}
			}
			return null; // 未找到
		},
		// 表单提交方法
		submit() {
			if (this.mode === 'add') {
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true;
						let newdata = {
							account_: this.form.userName,
							fullname_: this.form.name,
							avatar_: this.form.avatar,
							// status_: this.form.status,
							password_: this.form.password,
							group_id_: this.form.dept,
							role_id_: this.form.role,
							group_name_: this.findDeptName(this.depts, this.form.dept)
						};
						var res = await this.$apiIAM.user.add.post(newdata);
						this.isSaveing = false;
						if (res.code === 200) {
							this.$emit('success', this.form, this.mode);
							this.visible = false;
							this.$message.success("操作成功");
						} else {
							this.$alert(res.message, "提示", { type: 'error' });
						}
					} else {
						return false;
					}
				});
			} else if (this.mode === 'edit') {
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true;
						let newdata = {
							id_: this.form.id,
							group_id_: this.form.dept,
							role_id_: this.form.role,
							group_name_: this.findDeptName(this.depts, this.form.dept)
						};
						var res = await this.$apiIAM.relation.update.post(newdata);
						this.isSaveing = false;
						if (res.code === 200) {
							this.$emit('success', this.form, this.mode);
							this.visible = false;
							this.$message.success("操作成功");
						} else {
							this.$alert(res.message, "提示", { type: 'error' });
						}
					} else {
						return false;
					}
				});
			}
		},
		// 表单注入数据
		async setData(data) {
			this.form.id = data.id_;
			this.form.userName = data.account_;
			this.form.avatar = data.avatar_;
			this.form.name = data.fullname_;
			// this.form.status = data.status_;


			// 使用 Promise.all 确保所有数据加载完成后再设置
			await Promise.all([this.getGroup(), this.userRelation()]);

			// 在 roleData 和 userRelation 都加载完成后再设置 role 和 dept
			this.form.dept = this.userRelationData.group_id_;
			this.form.role = this.userRelationData.role_id_;
		}
	}
}
</script>

<style></style>