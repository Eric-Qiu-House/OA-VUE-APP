import config from "./config"
import tool from './utils/tool'
import http from "./utils/request"
import { permission, rolePermission } from './utils/permission'

//api 挂载url
import api from './api' // 基础api
import fileApi from './api/fileApi/fileApi' // 基础api
import cmsApi from './api/cmsApi/portalWeb' // 基础api
import iamApi from "./api/iamApi"
import dmsApi from "./api/dmsApi"
import proFileApi from "./api/proFileApi"


import scTable from './components/scTable'
import scTableColumn from './components/scTable/column.js'
import scFilterBar from './components/scFilterBar'
import scUpload from './components/scUpload'
import scUploadMultiple from './components/scUpload/multiple'
import scUploadFile from './components/scUpload/file'
import scFormTable from './components/scFormTable'
import scTableSelect from './components/scTableSelect'
import scPageHeader from './components/scPageHeader'
import scSelect from './components/scSelect'
import scDialog from './components/scDialog'
import scForm from './components/scForm'
import scTitle from './components/scTitle'
import scWaterMark from './components/scWaterMark'
import scQrCode from './components/scQrCode'

import scStatusIndicator from './components/scMini/scStatusIndicator'
import scTrend from './components/scMini/scTrend'

import auth from './directives/auth'
import auths from './directives/auths'
import authsAll from './directives/authsAll'
import role from './directives/role'
import time from './directives/time'
import copy from './directives/copy'
import errorHandler from './utils/errorHandler'

import * as elIcons from '@element-plus/icons-vue'
import * as scIcons from './assets/icons'

import { computed } from 'vue';

export default {
	install(app) {

		const isButtonVisible = computed(() => {
			const userInfo = tool.data.get("USER_INFO");
			return (userInfo?.user_type_ === 'admin' || userInfo?.user_type_ === 'manage') || false;
		});

		// 将计算出来的值挂载到 globalProperties
		app.config.globalProperties.$isButtonVisible = isButtonVisible;

		// 全局的按钮控制器
		// app.config.globalProperties.$isButtonVisible = (tool.data.get("USER_INFO")?.user_type_ === 'admin' || tool.data.get("USER_INFO")?.user_type_ === 'manage') || false;

		//挂载全局对象
		app.config.globalProperties.$CONFIG = config;
		app.config.globalProperties.$TOOL = tool;
		app.config.globalProperties.$HTTP = http;
		app.config.globalProperties.$AUTH = permission;
		app.config.globalProperties.$ROLE = rolePermission;

		// 挂载API
		app.config.globalProperties.$API = api;
		app.config.globalProperties.$fileApi = fileApi;
		app.config.globalProperties.$cmsApi = cmsApi;
		app.config.globalProperties.$apiIAM = iamApi;
		app.config.globalProperties.$iamApi = iamApi;
		app.config.globalProperties.$dmsApi = dmsApi;
		app.config.globalProperties.$proFileApi = proFileApi;


		//注册全局组件
		app.component('scTable', scTable);
		app.component('scTableColumn', scTableColumn);
		app.component('scFilterBar', scFilterBar);
		app.component('scUpload', scUpload);
		app.component('scUploadMultiple', scUploadMultiple);
		app.component('scUploadFile', scUploadFile);
		app.component('scFormTable', scFormTable);
		app.component('scTableSelect', scTableSelect);
		app.component('scPageHeader', scPageHeader);
		app.component('scSelect', scSelect);
		app.component('scDialog', scDialog);
		app.component('scForm', scForm);
		app.component('scTitle', scTitle);
		app.component('scWaterMark', scWaterMark);
		app.component('scQrCode', scQrCode);
		app.component('scStatusIndicator', scStatusIndicator);
		app.component('scTrend', scTrend);

		//注册全局指令
		app.directive('auth', auth)
		app.directive('auths', auths)
		app.directive('auths-all', authsAll)
		app.directive('role', role)
		app.directive('time', time)
		app.directive('copy', copy)

		//统一注册el-icon图标
		for (let icon in elIcons) {
			app.component(`ElIcon${icon}`, elIcons[icon])
		}
		//统一注册sc-icon图标
		for (let icon in scIcons) {
			app.component(`ScIcon${icon}`, scIcons[icon])
		}

		//关闭async-validator全局控制台警告
		window.ASYNC_VALIDATOR_NO_WARNING = 1

		//全局代码错误捕捉
		app.config.errorHandler = errorHandler
	}
}
