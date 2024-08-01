import config from "@/config"
import http from "@/utils/request"

export default {
	token: {
		url: `${config.IAM_URL}/login/log`,
		name: "登录获取TOKEN",
		post: async function(data={
				account_:'admin1',
				password_:'admin123'
		}){
			data={
				account_:'admin1',
				password_:'admin123'
		}
			return await http.post(this.url, data);
		}
	}
}
