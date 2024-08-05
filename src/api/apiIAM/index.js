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
		}
	},
	relation: {

	},
	role: {
		fromList: {
			url: `${config.IAM_URL}/org/role/inquireList`,
			name: "角色",
			get: async function(){
				return await http.get(this.url);
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
				console.log(params,'ssssss')
				return await http.post(this.url, params);
			}
		},
	},

}
