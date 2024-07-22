<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="18">
				<el-card shadow="never">
					<el-alert style="margin-bottom:20px;"></el-alert>
					<sc-file-select v-model="file" :multiple="multiple" :hideUpload="hideUpload" :max="99" @submit="submit">
						<template #do>
							<el-button>自定义插槽</el-button>
						</template>
					</sc-file-select>
				</el-card>
			</el-col>
			<el-col :lg="6">
				<el-card shadow="never" header="功能区">
					<el-button type="primary" @click="multiple = !multiple">开启选择框</el-button>
					<el-button type="primary" @click="hideUpload = !hideUpload">上传开关</el-button>
				</el-card>
				<el-card shadow="never" header="图片剪裁工具">
					<!-- <el-alert title="设置cropper就可以开启上传前剪裁, 并已封装compress和aspectRatio, 打开F12查看网络请求" type="success" style="margin-bottom:20px;"></el-alert> -->
					<!-- cropper 开启图片剪裁 -->
					<sc-upload v-model="uploadImg" title="开启剪裁"  :cropper="true" :compress="compress" :aspectRatio="aspectRatio"></sc-upload>
				</el-card>
				<el-card shadow="never" header="参数和方法">
					<el-form label-width="100px">
						<el-form-item label="图片比例">
						    <el-select v-model="aspectRatio" placeholder="请选择">
								<el-option label="自由" :value="0"></el-option>
								<el-option label="1:1" :value="1/1"></el-option>
								<el-option label="4:3" :value="4/3"></el-option>
								<el-option label="16:9" :value="16/9"></el-option>
							</el-select>
							<div class="el-form-item-msg">固定选区或者不固定</div>
						</el-form-item>
						<el-form-item label="图片压缩率">
						    <el-select v-model="compress" placeholder="请选择">
								<el-option label="0.1" :value="0.1"></el-option>
								<el-option label="0.5" :value="0.5"></el-option>
								<el-option label="1" :value="1"></el-option>
							</el-select>
							<div class="el-form-item-msg">图像压缩率，值为：0.1-1</div>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import scFileSelect from '@/components/scFileSelect'

	export default {
		name: 'fileselect',
		components: {
			scFileSelect
		},
		data() {
			return {
				file: '',
				multiple: false,
				hideUpload: false,
				upload: '',
				upload2: '',
				aspectRatio: '',
				uploadImg: '',
				compress: ''
			}
		},
		mounted() {

		},
		methods: {
			submit(value){
				console.log(value)
				this.$message("返回值请查看F12控制台console.log()")
			}
		}
	}
</script>

<style scoped>

</style>
