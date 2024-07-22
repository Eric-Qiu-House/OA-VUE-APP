import config from "@/config"

//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: config.DASHBOARD_URL || '/dashboard',
	},
	{
		path: "/login",
		component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/user_register",
		component: () => import(/* webpackChunkName: "userRegister" */ '@/views/login/userRegister'),
		meta: {
			title: "注册"
		}
	},
	{
		path: "/reset_password",
		component: () => import(/* webpackChunkName: "resetPassword" */ '@/views/login/resetPassword'),
		meta: {
			title: "重置密码"
		}
	},
	{
		name:'newsParticular',
		path: "/cms/news/newsParticular",
		component: () => import(/* webpackChunkName: "resetPassword" */ '@/views/cms/news/newsParticular'),
		meta: {
			title: "新闻详情"
		}
	}
]

export default routes;
