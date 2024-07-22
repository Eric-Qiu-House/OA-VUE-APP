<template>
	<el-container>
		<el-header>
			<div class="mb-4">
				<el-button type="primary" @click="table_up()">
					<el-icon>
						<Check />
					</el-icon>
					保存
				</el-button>
				<el-button @click="this.$router.back()">
					<el-icon>
						<Back />
					</el-icon>
					返回
				</el-button>
			</div>
		</el-header>
		<el-main class="nopadding">
			<!-- <el-card shadow="never" header="异步" style="margin-top: 15px;">
				<el-button type="primary" @click="asyn1">异步加载1</el-button>
				<el-button type="primary" @click="asyn2">异步加载2</el-button>
				<el-alert title="适用于页面有很多弹窗操作,利用异步组件按需加载,加快首屏的加载速度和打包体积" style="margin-top: 20px;"></el-alert>
			</el-card> -->
			<el-card shadow="never">
				<el-form ref="form" :model="form" :rules="rules" label-width="100px">
					<el-form-item label="标题" prop="title_">
						<el-input v-model="form.title_"></el-input>
					</el-form-item>
					<el-form-item label="内容" prop="content_">
						<sc-editor v-model="form.content_" placeholder="请输入" :templates="templates"
							:height="400"></sc-editor>
					</el-form-item>
				</el-form>
			</el-card>
		</el-main>
	</el-container>
	<dialog-issue v-if="asynDialog" draggable :message="form" @closed="asynDialog = false"></dialog-issue>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import scCropper from '@/components/scCropper'
const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));
export default {
	name: "editor",
	components: {
		scEditor,
		scCropper,
		dialogIssue: defineAsyncComponent(() => import("./widgets/dialogIssue")),
	},
	data() {
		return {
			form: {},
			// news: [],
			// cropperImg: 'img/avatar.jpg',
			// compress: 0.5,
			// aspectRatio: 0,
			// uploadImg: '',
			// imgData: '',
			asynDialog: false,
			templates: [
				{
					title: '模板:[自定义HTML]',
					description: '',
					content: '<strong>演示模板</strong>'
				},
				{
					title: '模板：[列表]',
					description: '',
					content: '<ol><li>演示列表1</li><li>演示列表2</li></ol>'
				}
			],
			rules: {
				title_: [
					{ required: true, message: '请输入标题', trigger: 'change' },
				],
				content_: [
					{ required: true, message: '请输入文本内容', trigger: 'change' },
				]
			}
		}
	},
	created() {
		if (this.$route.query.id) {
			this.fetchNewsDetails()
		}
	},
	methods: {
		// 打开弹窗
		asyn1() {
		},
		// 提交 新文章
		table_up() {
			this.$refs.form.validate(valid => {
				if (valid) {
					// 表单验证通过，执行程序逻辑
					console.log(valid, 'valiaddddd')
					this.asynDialog = true
					// this.gitAPI();
				} else {
					// 表单验证不通过，可以给出提示或者其他处理
					console.log('Form validation failed');
				}
			});
		},

		// 导入 文章
		async fetchNewsDetails() {
			try {
				const data = {
					id_: this.$route.query.id
				}
				this.form = await this.$API.news.where.post(data);
			} catch (error) {
				console.error("Error fetching user list:", error);
			}
		},
	}
}
</script>

<style></style>
