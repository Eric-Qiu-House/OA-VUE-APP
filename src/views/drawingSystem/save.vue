<template>
	<el-container>
		<el-dialog :title="titleMap[mode]" v-model="visible" :width="1800" destroy-on-close @closed="$emit('closed')">
			<el-container>
				<user-model></user-model>
			</el-container>

			<template #footer>
				<el-button @click="visible = false">取 消</el-button>
				<el-button v-if="mode != 'show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
			</template>
		</el-dialog>
	</el-container>
</template>

<script>
import userModel from '@/components/views/user'

export default {
	emits: ['success', 'closed'],
	components: {
		userModel
	},
	data() {
		return {
			mode: "add",
			titleMap: {
				add: '新增用户',
				edit: '编辑用户',
				show: '查看'
			},
			visible: false,
			isSaveing: false,
		}
	},
	mounted() {
		// this.getGroup()
		// this.getDept()
	},
	methods: {
		//显示
		open(mode = 'add') {
			this.mode = mode;
			this.visible = true;
			return this
		},
		//加载树数据
		async getGroup() {
			var res = await this.$API.system.role.list.get();
			this.groups = res.data.rows;
		},
		async getDept() {
			var res = await this.$API.system.dept.list.get();
			this.depts = res.data;
		},
		//表单提交方法
		submit() {
			this.$refs.dialogForm.validate(async (valid) => {
				if (valid) {
					this.isSaveing = true;
					var res = await this.$API.demo.post.post(this.form);
					this.isSaveing = false;
					if (res.code == 200) {
						this.$emit('success', this.form, this.mode)
						this.visible = false;
						this.$message.success("操作成功")
					} else {
						this.$alert(res.message, "提示", { type: 'error' })
					}
				} else {
					return false;
				}
			})
		},
		//表单注入数据
		setData(data) {
			this.form.id = data.id
			this.form.userName = data.userName
			this.form.avatar = data.avatar
			this.form.name = data.name
			this.form.group = data.group
			this.form.dept = data.dept

			//可以和上面一样单个注入，也可以像下面一样直接合并进去
			//Object.assign(this.form, data)
		}
	}
}
</script>

<style></style>
