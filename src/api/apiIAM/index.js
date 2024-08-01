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
		}
	},

}
