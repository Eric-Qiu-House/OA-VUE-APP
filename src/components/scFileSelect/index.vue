<!--
 * @Descripttion: 资源文件选择器
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年10月11日16:01:40
 * @LastEditors: Eric
 * @LastEditTime:	2024.07.13 00:18
 * @ReviseContent: 修改接口地址
-->

<template>
	<div class="sc-file-select">
		<!-- 文件夹 - 目录 -->
		<div class="sc-file-select__side" v-loading="menuLoading">
			<div class="sc-file-select__side-menu">
				<el-tree class="menu" :data="menu" @node-click="groupClick">
					<template #default="{ data }">
						<span class="el-tree-node__label">
							<el-icon class="icon"><el-icon-folder /></el-icon>{{ data.folder_name_ }}
						</span>
					</template>
				</el-tree>
			</div>
			<div class="sc-file-select__side-msg" v-if="multiple">
				已选择 <b>{{ value.length }}</b> / <b>{{ max }}</b> 项
			</div>
		</div>
		<div class="sc-file-select__files" v-loading="listLoading">
			<el-alert :title="`上传至文件夹 - “${folderInfo.folder_name_ ?? '?' }”`" type="success" style="margin-bottom:20px;"></el-alert>
			<div class="sc-file-select__top">
				<!-- 图片批量上传 -->
				<div class="upload" v-if="!hideUpload">
					<el-upload class="sc-file-select__upload" multiple :show-file-list="false" :file-list="fileList"
						:on-change="uploadChange" :before-upload="uploadBefore" :on-error="uploadError"
						:http-request="uploadRequest">
						<el-button type="primary" icon="el-icon-upload">本地上传 (批量)</el-button>
					</el-upload>
					<span class="tips"><el-icon><el-icon-warning /></el-icon>大小不超过{{ maxSize }}MB</span>
				</div>
				<!-- 搜索图片 -->
				<div class="keyword">
					<el-input v-model="keyword" prefix-icon="el-icon-search" placeholder="文件名搜索" clearable
						@keyup.enter="search" @clear="search"></el-input>
				</div>
			</div>
			<div class="sc-file-select__list">
				<div v-for="(item, index) in data" :key="index" class="sc-file-select__item">
					<div class="sc-file-select__item__file">
						<el-image
							:src="$CONFIG.FILE_URL + '/images' + `/${item.file_path_ + '/' + item.file_id_ + item.file_type_}`"
							:preview-src-list="[$CONFIG.FILE_URL + '/images' + `/${item.file_path_ + '/' + item.file_id_ + item.file_type_}`]"
							fit="contain" lazy>
						</el-image>
						<!-- 图片选项框 样式 -->
						<div class="sc-file-select__item__checkbox">
							<el-icon><el-icon-check /></el-icon>
						</div>
						<!-- 选中图片 样式 -->
						<div class="sc-file-select__item__select">
							<el-icon><el-icon-check /></el-icon>
						</div>
						<!-- hover 样式 -->
						<div class="sc-file-select__item__box" v-if="multiple">
						</div>
					</div>
					<p>{{ item.file_name_ }}</p>
				</div>
			</div>
			<div class="sc-file-select__pagination">
				<!-- 分页 -->
				<el-pagination small background layout="prev, pager, next" :total="total" :page-size="pageSize"
					v-model:currentPage="currentPage" @current-change="reload">
				</el-pagination>
			</div>
			<div class="sc-file-select__do">
				<!-- 插槽 -->
				<!-- <slot name="do"></slot> -->
				<el-button type="primary" :disabled="value.length <= 0" @click="submit">确 定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import config from "@/config/fileSelect"
import { fileSystemStore } from '@/store/fileSystem/fileSystemStore';
import { computed } from 'vue';
export default { 
	props: {
		modelValue: null,
		hideUpload: { type: Boolean, default: false },
		multiple: { type: Boolean, default: false },
		max: { type: Number, default: config.max },
		onlyImage: { type: Boolean, default: false },
		maxSize: { type: Number, default: config.maxSize },
	},
	data() {
		return {
			keyword: null,
			pageSize: 20,
			total: 0,
			currentPage: 1,
			data: [],
			menu: [],
			menuId: '',
			value: this.multiple ? [] : '',
			fileList: [],
			accept: this.onlyImage ? "image/gif, image/jpeg, image/png" : "",
			listLoading: false,
			menuLoading: false,
			treeProps: config.menuProps,
			fileProps: config.fileProps,
			files: config.files,
			folderData: {},
			formData: new FormData(),
			fileInput: null,
		}
	},
	setup() {
		const mainStore = fileSystemStore();

		// 传递菜单信息
		const handleRevamp = (i) => {
			mainStore.revamp(i);
		};

		return {
			folderInfo: computed(() => mainStore.folderInfo),
			handleRevamp
		};
	},
	watch: {
		multiple() {
			this.value = this.multiple ? [] : ''
			this.$emit('update:modelValue', JSON.parse(JSON.stringify(this.value)));
		}
	},
	mounted() {
		this.getMenu()
		this.getData()
	},
	methods: {
		submitForm() {
			const formData = new FormData();
			const files = this.$refs.fileInput.files;
			formData.append('fileData', files);
			console.log(files, 'files')

			const aaaa = formData.get('file');
			console.log('文件名:', aaaa.name);
			console.log('文件类型:', aaaa.type);
			console.log('文件大小:', aaaa.size);
			console.log('最后修改日期:', aaaa.lastModified);
			// for (let i = 0; i < files.length; i++) {
			// 	formData.append('files[]', files[i]);
			// 	console.log(formData.get('file'),'formData.get')
			// }

			// 发送 formData 到服务器端
			// 可以使用 axios 或其他 HTTP 客户端库发送 formData

			// 示例中使用 axios 发送 formData 到服务器
			// console.log(this.$refs.fileInput.files, 'formData')
			//   axios.post('/upload', formData)
			//     .then(response => {
			//       console.log(response.data);
			//     })
			//     .catch(error => {
			//       console.error('上传失败', error);
			//     });
		},
		//获取分类数据
		async getMenu() {
			this.menuLoading = true
			
			// var res = await config.menuApiObj.get()
			var res = await this.$fileApi.file.menu.get()
			this.menu = res
			this.menuLoading = false
		},
		//获取列表数据
		async getData() {
			this.listLoading = true
			var reqData = {
				[config.request.menuKey]: this.menuId,
				[config.request.page]: this.currentPage,
				[config.request.pageSize]: this.pageSize,
				[config.request.keyword]: this.keyword
			}
			if (this.onlyImage) {
				reqData.type = 'image'
			}
			var res = await this.$fileApi.file.list.get(reqData)
			// var res = await config.listApiObj.get(reqData)
			this.data = res
			this.listLoading = false
		},
		// 文件夹下的图片
		async getImgFolat(data) {
			// var res = await config.fileInfoApi.folderFile.post(data)
			var res = await this.$fileApi.file.folderFile.post(data)
			this.data = res
		},
		//树点击事件
		groupClick(data) {
			this.folderData = data
			this.handleRevamp(data)
			this.getImgFolat(data)
			// this.menuId = data.id
			// this.currentPage = 1
			// this.keyword = null
		},
		//分页刷新表格
		reload() {
			this.getData()
		},
		search() {
			this.currentPage = 1
			this.getData()
		},
		submit() {
			const value = JSON.parse(JSON.stringify(this.value))
			this.$emit('update:modelValue', value);
			this.$emit('submit', value);
		},
		//上传处理
		uploadChange(file, fileList) {
			// 创建 FormData 对象
			// const formData = new FormData();
			this.formData.append('file_path_', '0'); // 其他字段
			this.formData.append('file', file); // 文件字段
			// 添加文件到 FormData 对象
			console.log('文件已变更:', fileList);
			console.log('文件已变更file:', file);
			// this.formData.append("file", file);
			// this.uploadRequest()
			// console.log(this.formData, 'formData ---上传处理')

		},
		uploadBefore(file) {  //上传文件之前的钩子
			console.log(file.size, '上传文件之前')
			const maxSize = file.size / 1024 / 1024 < this.maxSize;
			if (!maxSize) {
				this.$message.warning(`上传文件大小不能超过 ${this.maxSize}MB!`);
				return false;
			}
		},
		async uploadRequest(options) { //覆盖默认的上传行为，自定义上传实现

			const { file } = options;

			// 创建 FormData 对象
			const formData = new FormData();
			formData.append('file_path_', this.folderData.file_path_); // 示例：添加额外的字段
			formData.append('file', file); // 添加文件

			// const file = this.$refs.fileInput.files[0]; // 获取选中的文件

			// if (!file) {
			// 	alert('请先选择文件');
			// 	return;
			// }

			try {
				// var apiObj = config.fileTransfer.upload;
				await this.$fileApi.upload.post(formData)
			} catch (error) {
				console.error('上传失败:', error);
				alert('文件上传失败');
			}
		},
		// uploadProcess(event, file) { //文件上传时的钩子，返回上传进度
		// 	console.log(event, file, '文件上传时')
		// 	var apiObj = config.fileTransfer.upload;
		// 				apiObj.post(file, {
		// 		// onUploadProgress: e => {
		// 		// 	param.onProgress(e)
		// 		// }
		// 	})
		// 	// file.progress = Number((event.loaded / event.total * 100).toFixed(2))
		// },
		uploadSuccess(res, file) { //文件上传成功时的钩子
			console.log(res, file, 'res, fileres, file')
		},
		uploadError(err, file, fileList) {  //文件上传失败时的钩子
			console.log('上传失败:', err, file, fileList);
			// this.$notify.error({
			// 	title: '上传文件错误',
			// 	message: err
			// })
		},
		//内置函数
		_isImg(fileUrl) {
			const imgExt = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
			const fileExt = fileUrl.substring(fileUrl.lastIndexOf("."))
			return imgExt.indexOf(fileExt) != -1
		},
		_getExt(fileUrl) {
			return fileUrl.substring(fileUrl.lastIndexOf(".") + 1)
		}
	}
}
</script>

<style scoped>
.sc-file-select {
	display: flex;
}

.sc-file-select__files {
	flex: 1;
}

.sc-file-select__list {
	height: 400px;
}

.sc-file-select__item {
	display: inline-block;
	float: left;
	margin: 0 15px 25px 0;
	width: 110px;
	cursor: pointer;
}

.sc-file-select__item__file {
	width: 110px;
	height: 110px;
	position: relative;
}

.sc-file-select__item__file .el-image {
	width: 110px;
	height: 110px;
}

.sc-file-select__item__box {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	border: 2px solid var(--el-color-success);
	z-index: 1;
	display: none;
}

.sc-file-select__item__box::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: var(--el-color-success);
	opacity: 0.2;
	display: none;
}

.sc-file-select__item:hover .sc-file-select__item__box {
	display: block;
}

.sc-file-select__item.active .sc-file-select__item__box {
	display: block;
}

.sc-file-select__item.active .sc-file-select__item__box::before {
	display: block;
}

.sc-file-select__item p {
	margin-top: 10px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	-webkit-text-overflow: ellipsis;
	text-align: center;
}

.sc-file-select__item__checkbox {
	position: absolute;
	width: 20px;
	height: 20px;
	top: 7px;
	right: 7px;
	z-index: 2;
	background: rgba(0, 0, 0, 0.2);
	border: 1px solid #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.sc-file-select__item__checkbox i {
	font-size: 14px;
	color: #fff;
	font-weight: bold;
	display: none;
}

.sc-file-select__item__select {
	position: absolute;
	width: 20px;
	height: 20px;
	top: 0px;
	right: 0px;
	z-index: 2;
	background: var(--el-color-success);
	display: none;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.sc-file-select__item__select i {
	font-size: 14px;
	color: #fff;
	font-weight: bold;
}

.sc-file-select__item.active .sc-file-select__item__checkbox {
	background: var(--el-color-success);
}

.sc-file-select__item.active .sc-file-select__item__checkbox i {
	display: block;
}

.sc-file-select__item.active .sc-file-select__item__select {
	display: flex;
}

.sc-file-select__item__file .item-file {
	width: 110px;
	height: 110px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.sc-file-select__item__file .item-file i {
	font-size: 40px;
}

.sc-file-select__item__file .item-file.item-file-doc {
	color: #409eff;
}

.sc-file-select__item__upload {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	background: rgba(255, 255, 255, 0.7);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.sc-file-select__side {
	width: 200px;
	margin-right: 15px;
	border-right: 1px solid rgba(128, 128, 128, 0.2);
	display: flex;
	flex-flow: column;
}

.sc-file-select__side-menu {
	flex: 1;
}

.sc-file-select__side-msg {
	height: 32px;
	line-height: 32px;
}

.sc-file-select__top {
	margin-bottom: 15px;
	display: flex;
	justify-content: space-between;
}

.sc-file-select__upload {
	display: inline-block;
}

.sc-file-select__top .tips {
	font-size: 12px;
	margin-left: 10px;
	color: #999;
}

.sc-file-select__top .tips i {
	font-size: 14px;
	margin-right: 5px;
	position: relative;
	bottom: -0.125em;
}

.sc-file-select__pagination {
	margin: 15px 0;
}

.sc-file-select__do {
	text-align: right;
}
</style>
