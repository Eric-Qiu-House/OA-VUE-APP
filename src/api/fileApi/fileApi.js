import config from "@/config"
import http from "@/utils/request"

export default {
	upload: {
		url: `${config.FILE_URL}/fileServer/fileTransfer/upload`,
		name: "文件上传",
		// 配置请求头
		post: async function (formData,
			config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			}
		) {
			return await http.post(this.url, formData, config);
		}
	},
	uploadFile: {
		url: `${config.FILE_URL}/uploadFile`,
		name: "附件上传",
		post: async function (data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	exportFile: {
		url: `${config.FILE_URL}/fileExport`,
		name: "导出附件",
		get: async function (data, config = {}) {
			return await http.get(this.url, data, config);
		}
	},
	importFile: {
		url: `${config.FILE_URL}/fileImport`,
		name: "导入附件",
		post: async function (data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	file: {
		menu: {
			url: `${config.FILE_URL}/fileServer/imgFolder/inquireList`,
			name: "获取文件分类",
			get: async function () {
				// console.log(http.get(this.url),'http.get(this.url)')
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.FILE_URL}/fileServer/imgInfo/inquireList`,
			name: "获取文件列表",
			get: async function (params) {
				return await http.get(this.url, params);
			}
		},
		folderFile: {
			url: `${config.FILE_URL}/fileServer/imgInfo/whereFileCatalog`,
			name: "获取文件夹下面的图片",
			post: async function (params) {
				return await http.post(this.url, params);
			}
		}
	}
}
