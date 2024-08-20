import config from "@/config"
import http from "@/utils/request"

export default {
	group: {
		fromList: {
			url: `${config.IAM_URL}/org/group/inquireList`,
			name: "部门",
			get: async function(){
				return await http.get(this.url);
			}
		},
		add: {
			url: `${config.IAM_URL}/org/group/addGroup`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.IAM_URL}/org/group/deleteGroup`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		undate: {
			url: `${config.IAM_URL}/org/group/updateGroup`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},
	relation: {

	},
	role: {
		fromList: {
			url: `${config.IAM_URL}/org/role/inquireList`,
			name: "查询角色",
			get: async function(){
				return await http.get(this.url);
			}
		},
		add: {
			url: `${config.IAM_URL}/org/role/addRole`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.IAM_URL}/org/role/deleteRole`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		undate: {
			url: `${config.IAM_URL}/org/role/updateRole`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},
	user: {
		fromList: {
			url: `${config.IAM_URL}/org/user/inquireList`,
			name: "用户",
			get: async function(){
				return await http.get(this.url);
			}
		},
		usersByGroup: {
			url: `${config.IAM_URL}/org/user/getUsersByGroup`,
			name: "部门查用户",
			post: async function(params){
				return await http.post(this.url, params);
			}
		},
	},
	system: {
		routerTree: {
			url: `${config.IAM_URL}/system/router/systemRoutesTree`,
			name: "路由树",
			get: async function(){
				return await http.get(this.url);
			}
		},
		updetaRoute: {
			url: `${config.IAM_URL}/system/router/updetaRoute`,
			name: "路由树",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
	}

}
