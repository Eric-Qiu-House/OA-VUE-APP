# 安装依赖
npm i

# 启动项目(开发模式)
npm run serve
启动完成后浏览器访问 http://localhost:2800

# API_URL地址
src/config/index

# 全局挂载方法
./scui

# 目录结构
src/
├── api/
│ ├── cmsApi/ # “CMS” api
│ ├── fileApi/ # 文件服务器api
│ ├── model/ # 新增的图标组件
│ │ ├── auth # token
│ │ ├── common #
│ │ ├──
│ │ ├──
├── assets/
│ ├── icons/ # 新增的图标组件
├── components/
│ ├── scCommon/ # SC存放通用组件
├── views/
│ ├── cmsSystem/ # CMS视图组件
│ ├── fileSystem/ # 文件服务器视图组件
│ └── 
├── router/
│ └── index.js # 配置 Vue Router 路由规则
├── store/
│ └── index.js # 配置 Vuex store，包括 state、mutations、actions 和 getters
├── services/
│ └── api.js # 配置和管理 API 请求的函数
├── utils/
│ ├── formatDate.js # 日期格式化工具函数
│ └── validate.js # 数据验证工具函数
├── plugins/
│ └── vuetify.js # 配置 Vuetify 插件（如使用 Vuetify 作为 UI 框架）
├── mixins/
│ └── commonMixin.js # 包含通用逻辑的混入
├── App.vue # 主应用组件，作为 Vue 实例的根组件
└── main.js # 应用的入口文件，创建 Vue 实例并挂载到 DOM 上