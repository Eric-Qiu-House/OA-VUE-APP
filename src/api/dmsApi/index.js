import config from "@/config"
import http from "@/utils/request"
// import { create } from "sortablejs";

export default {
	project: {
		readAll: {
			url: `${config.DMS_URL}/dmsServer/project/readRouter`,
			name: "查询全部",
			get: async function(){
				return await http.get(this.url);
			}
		},
		create: {
			url: `${config.DMS_URL}/dmsServer/project/createRouter`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.DMS_URL}/dmsServer/project/updateRouter`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		readById: {
			url: `${config.DMS_URL}/dmsServer/project/readByIdRouter`,
			name: "条件查询",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		// delete: {
		// 	url: `${config.DMS_URL}/org/group/deleteGroup`,
		// 	name: "删除",
		// 	post: async function(params){
		// 		return await http.post(this.url,params);
		// 	}
		// },
	},
    projectUsershiproute: {
		readId: {
			url: `${config.DMS_URL}/dmsServer/projectUsershiproute/readByIdRouter`,
			name: "项目ID查用用户ID组",
			post: async function(params){
				return await http.post(this.url, params);
			}
		},
	},
	drawingInfo: {
		create: {
			url: `${config.DMS_URL}/dmsServer/drawingInfo/createRouter`,
			name: "create",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.DMS_URL}/dmsServer/drawingInfo/updateRouter`,
			name: "update",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		inquireList: {
			url: `${config.DMS_URL}/dmsServer/drawingInfo/readRouter`,
			name: "read",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		readById: {
			url: `${config.DMS_URL}/dmsServer/drawingInfo/readByIdRouter`,
			name: "read",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.DMS_URL}/dmsServer/drawingInfo/deleteRouter`,
			name: "delete",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
	},
	manHours: {
		create: {
			url: `${config.DMS_URL}/dmsServer/manHours/createRouter`,
			name: "create",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.DMS_URL}/dmsServer/manHours/updateRouter`,
			name: "update",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		inquireList: {
			url: `${config.DMS_URL}/dmsServer/manHours/readRouter`,
			name: "read",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		readById: {
			url: `${config.DMS_URL}/dmsServer/manHours/readByIdRouter`,
			name: "read",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		readByUserId: {
			url: `${config.DMS_URL}/dmsServer/manHours/readByUserIdRouter`,
			name: "readByUserId",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.DMS_URL}/dmsServer/manHours/deleteRouter`,
			name: "delete",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
	},
	drawingMenu: {
		readAll: {
			url: `${config.DMS_URL}/dmsServer/drawingMenu/readRouter`,
			name: "read",
			get: async function(){
				return await http.get(this.url);
			}
		},
		update: {
			url: `${config.DMS_URL}/dmsServer/drawingMenu/updateRouter`,
			name: "update",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		create: {
			url: `${config.DMS_URL}/dmsServer/drawingMenu/createRouter`,
			name: "update",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.DMS_URL}/dmsServer/drawingMenu/deleteRouter`,
			name: "update",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
	},
	drawingMenuProject: {
		read: {
			url: `${config.DMS_URL}/dmsServer/drawingMenuProject/readRouter`,
			name: "read",
			get: async function(){
				return await http.get(this.url);
			}
		},
		update: {
			url: `${config.DMS_URL}/dmsServer/drawingMenuProject/updateRouter`,
			name: "update",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		create: {
			url: `${config.DMS_URL}/dmsServer/drawingMenuProject/createRouter`,
			name: "update",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.DMS_URL}/dmsServer/drawingMenuProject/deleteRouter`,
			name: "update",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		readById: {
			url: `${config.DMS_URL}/dmsServer/drawingMenuProject/readByIdRouter`,
			name: "readById",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
	},
	fileInfo: {
		readId: {
			url: `${config.DMS_URL}/dmsServer/fileInfo/readByIdRouter`,
			name: "fileFind",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
	}, 
	csmFirm:{
		readAll: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/inquireSupplierList`,
			name: "查询全部",
			post: async function(){
				return await http.post(this.url);
			}
		},
		create: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/inquireSupplierById`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/updateSupplier`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/createSupplier`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},
	csmSystem:{
		readAll: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/inquireDeviceList`,
			name: "查询全部",
			post: async function(){
				return await http.post(this.url);
			}
		},
		create: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/inquireDeviceById`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/updateDevice`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/createDevice`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},
	csmProduct:{
		readAll: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/inquireSupplierList`,
			name: "查询全部",
			post: async function(){
				return await http.post(this.url);
			}
		},
		create: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/inquireSupplierById`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/updateSupplier`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.DMS_URL}/dmsServer/csmFirmmodel/createSupplier`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},
}
