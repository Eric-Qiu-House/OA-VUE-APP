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
		readUserRelation: {
			url: `${config.IAM_URL}/org/relation/readOneId`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.IAM_URL}/org/relation/updateRelation`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		
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
		update: {
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
		usersByUserIds: {
			url: `${config.IAM_URL}/org/user/usersByUserIds`,
			name: "userIds read userInfo",
			post: async function(params){
				return await http.post(this.url, params);
			}
		},
		userIdReadUserInfo: {
			url: `${config.IAM_URL}/org/user/whereUserId`,
			name: "userIds read userInfo",
			post: async function(params){
				return await http.post(this.url, params);
			}
		},
		add: {
			url: `${config.IAM_URL}/org/user/addUser`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.IAM_URL}/org/user/deleteUser`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		undate: {
			url: `${config.IAM_URL}/org/user/updateUser`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		changePassword: {
			url: `${config.IAM_URL}/login/changePassword`,
			name: "修改密码",
			post: async function(params){
				return await http.post(this.url,params);
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
		addRouter: {
			url: `${config.IAM_URL}/system/router/addRouter`,
			name: "添加路由",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},

}
