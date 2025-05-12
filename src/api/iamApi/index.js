import config from "@/config"
import http from "@/utils/request"

export default {
	group: {
		fromList: {
			url: `${config.IAM_URL}/iamServer/group/inquireList`,
			name: "部门",
			get: async function(){
				return await http.get(this.url);
			}
		},
		add: {
			url: `${config.IAM_URL}/iamServer/group/addGroup`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.IAM_URL}/iamServer/group/deleteGroup`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		undate: {
			url: `${config.IAM_URL}/iamServer/group/updateGroup`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},
	relation: {
		readUserRelation: {
			url: `${config.IAM_URL}/iamServer/relation/readOneId`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.IAM_URL}/iamServer/relation/updateRelation`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},		
	},
	role: {
		fromList: {
			url: `${config.IAM_URL}/iamServer/role/inquireList`,
			name: "查询角色",
			get: async function(){
				return await http.get(this.url);
			}
		},
		add: {
			url: `${config.IAM_URL}/iamServer/role/addRole`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.IAM_URL}/iamServer/role/deleteRole`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.IAM_URL}/iamServer/role/updateRole`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},
	user: {
		fromList: {
			url: `${config.IAM_URL}/iamServer/user/inquireList`,
			name: "全部用户",
			get: async function(){
				return await http.get(this.url);
			}
		},
		readDim: {
			url: `${config.IAM_URL}/iamServer/user/readDimRouter`,
			name: "模糊查询",
			post: async function(params){
				return await http.post(this.url, params);
			}
		},
		usersByGroup: {
			url: `${config.IAM_URL}/iamServer/user/getUsersByGroup`,
			name: "部门查用户",
			post: async function(params){
				return await http.post(this.url, params);
			}
		},
		usersByUserIds: {
			url: `${config.IAM_URL}/iamServer/user/usersByUserIds`,
			name: "userIds read userInfo",
			post: async function(params){
				return await http.post(this.url, params);
			}
		},
		userIdReadUserInfo: {
			url: `${config.IAM_URL}/iamServer/user/whereUserId`,
			name: "userIds read userInfo",
			post: async function(params){
				return await http.post(this.url, params);
			}
		},
		add: {
			url: `${config.IAM_URL}/iamServer/user/addUser`,
			name: "添加",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		delete: {
			url: `${config.IAM_URL}/iamServer/user/deleteUser`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		undate: {
			url: `${config.IAM_URL}/iamServer/user/updateUser`,
			name: "更新",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		changePassword: {
			url: `${config.IAM_URL}/iamServer/login/changePassword`,
			name: "修改密码",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		adminChangePassword: {
			url: `${config.IAM_URL}/iamServer/login/adminChangePassword`,
			name: "管理员重置密码",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
	},
	system: {
		routerTree: {
			url: `${config.IAM_URL}/iamServer/sysRoute/systemRoutesTree`,
			name: "路由树",
			get: async function(){
				return await http.get(this.url);
			}
		},
		updetaRoute: {
			url: `${config.IAM_URL}/iamServer/sysRoute/updetaRoute`,
			name: "路由树",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		addRouter: {
			url: `${config.IAM_URL}/iamServer/sysRoute/addRouter`,
			name: "添加路由",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	},
	versions: {
		create: {
			url: `${config.IAM_URL}/iamServer/versions/create`,
			name: "新增",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		update: {
			url: `${config.IAM_URL}/iamServer/versions/update`,
			name: "修改",
			post: async function(params){
				return await http.post(this.url,params);
			}
		},
		read: {
			url: `${config.IAM_URL}/iamServer/versions/read`,
			name: "查询",
			get: async function(){
				return await http.get(this.url);
			}
		},
		readLast: {
			url: `${config.IAM_URL}/iamServer/versions/readLast`,
			name: "查询",
			get: async function(){
				return await http.get(this.url);
			}
		},
		delete: {
			url: `${config.IAM_URL}/iamServer/versions/delete`,
			name: "删除",
			post: async function(params){
				return await http.post(this.url,params);
			}
		}
	}

}
