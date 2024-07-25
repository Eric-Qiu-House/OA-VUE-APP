import config from "@/config";
import http from "@/utils/request";

export default {
    inquire: {
        url: `${config.API_URL}/cms/news/inquireList`,
        name: "新闻列表",
        async get(params) {
            return await http.get(this.url, params);
        }
    },
    inquireMenu: {
        url: `${config.API_URL}/cms/webMenu/inquireList`,
        name: "子菜单列表",
        async get(params) {
            return await http.get(this.url, params);
        }
    },
    inquireType: {
        url: `${config.API_URL}/cms/news/inquireType`,
        name: "类型查询",
        async post(params) {
            return await http.post(this.url, params);
        }
    },
    add: {
        url: `${config.API_URL}/cms/news/addNews`,
        name: "添加新闻",
        async post(params) {
            try {
                return await http.post(this.url, params);
            } catch (error) {
                console.error('Error fetching data:', error); // 打印错误信息到控制台
                throw error; // 重新抛出错误以便在调用该方法时可以捕获
            }
        }
    },
	where: {
		url: `${config.API_URL}/cms/news/whereId`,
		name: "新闻详情",
		post: async function (data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	updata: {
		url: `${config.API_URL}/cms/news/updata`,
		name: "修改新闻",
		post: async function (data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
};
