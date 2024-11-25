<template>
	<sc-dialog v-model="visible" title="发布至 ？" @closed="$emit('closed')">
		<el-form ref="formData" style="max-width: 600px" :model="formData" :rules="rules" label-width="auto"
			class="demo-ruleForm">
			<el-form-item label="主页菜单：" prop="menu_class_">
				<el-select v-model="formData.menu_class_" placeholder="Select" style="width: 240px"
					@change="changeMainMenu(formData.menu_class_)">
					<el-option v-for="item in mainMenu" :key="item.id_" :label="item.folder_name_" :value="item.id_" />
				</el-select>
			</el-form-item>
			<!-- <el-form-item label="子页菜单：" :shwo="zcdShow" prop="belong_to_"> -->
			<el-form-item label="子页菜单：" v-show="formData.menu_class_ != null" prop="belong_to_">
				<el-select v-model="formData.belong_to_" placeholder="Select" style="width: 240px">
					<el-option v-for="item in subMenu" :key="item.id_" :label="item.menu_name_ch_" :value="item.id_" />
				</el-select>
			</el-form-item>
			<el-form-item label="语言类型：" prop="language_">
				<el-select v-model="formData.language_" placeholder="Select" style="width: 240px">
					<el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<!-- 
			<el-form-item>
				<el-button type="primary" @click="submitForm()">Submit</el-button>
				<el-button @click="resetForm(formData)">Reset</el-button>
			</el-form-item> -->
		</el-form>

		<template #footer>
			<el-button @click="visible = false">取 消</el-button>
			<el-button type="primary" @click="gitArticleAPI">确 定</el-button>
		</template>
	</sc-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
	props: {
		message: Object
	},
	data() {
		var userInfo = this.$TOOL.data.get("USER_INFO");
		return {
			visible: true,
			formData: {
				menu_class_: null,
				belong_to_: null,
				language_: '',
				update_by_: userInfo.id_,
				updater_: userInfo.fullname_
			},
			mainMenu: [],
			subMenu: [],
			subMenuCache: [],
			language: [
				{
					value: '0',
					label: '中文',
				},
				{
					value: '1',
					label: '英文',
				},
			],
			rules: {
				menu_class_: [
					{ required: true, message: '请选择发布的 主页菜单', trigger: 'blur' }
				],
				belong_to_: [
					{ required: true, message: '请选择发布的 子菜单', trigger: 'blur' }
				],
				language_: [
					{ required: true, message: '请选择文章语言类型', trigger: 'blur' }
				],
			},
			// zcdShow: false
		}
	},
	mounted() {
		this.formData = this.message
		this.getMenu()
		this.getMenuChild()
		// this.changeMainMenu(this.formData.menu_class_)
	},
	methods: {
		// 获取 - 主菜单
		async getMenu() {
			var res = await this.$fileApi.file.menu.get()
			this.mainMenu = res
		},
		// 获取 - 子菜单
		async getMenuChild() {
			var res = await this.$cmsApi.inquireMenu.get();
			this.subMenuCache = res
			this.subMenu = res
			// this.subMenu = res
		},
		// 改变主菜单 - 选择框
		changeMainMenu(i) {
			// 清空二级菜单
			this.formData.belong_to_ = ''
			this.subMenu = this.subMenuCache.filter(row => row.form_ == i)
		},
		submitForm() {
			this.$refs.formData.validate(valid => {
				if (valid) {
					// 表单验证通过，执行程序逻辑
				} else {
					// 表单验证不通过，可以给出提示或者其他处理
					console.log('Form validation failed');
				}
			});
		},
		// 重置表单
		resetForm() {
			this.$refs.formData.resetFields();
		},
		// 修改/添加 - 文章
		async gitArticleAPI() {
			const data = this.formData
			try {
				// 更新且重新赋值
				if (!data.id_) {
					await this.$cmsApi.add.post(data);
					ElMessage({
						message: '添加成功.',
						type: 'success',
					})
				} else {
					await this.$cmsApi.updata.post(data);
					// this.data = {}
					ElMessage({
						message: '修改成功.',
						type: 'success',
					})
				}
				this.$router.back()
			} catch (error) {
				console.error('Error updating data:', error);
			}
		}
	}
}
</script>

<style></style>
