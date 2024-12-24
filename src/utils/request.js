import axios from 'axios';
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus';
import sysConfig from "@/config";
import tool from '@/utils/tool';
import router from '@/router';

// 设置全局默认配置
axios.defaults.baseURL = ''; // 默认请求地址，建议从 sysConfig 中动态配置
axios.defaults.timeout = sysConfig.TIMEOUT; // 设置请求超时时间

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 获取 Token 并注入到请求头
    let token = tool.cookie.get("TOKEN");
    if (token) {
      config.headers[sysConfig.TOKEN_NAME] = sysConfig.TOKEN_PREFIX + token;
    }

    /** GET 请求
   * @param {string} X-User-ID :暂时用这个传递用户id给后端做查询服务；以后改成auth server服务来执行；
   */

    // 获取用户 ID 并注入到请求头
    const userInfo = tool.data.get("USER_INFO"); // 从存储中获取用户信息
    if (userInfo) {
      config.headers['X-User-ID'] = userInfo.id_; // 自定义请求头
    }

    // 禁止缓存 GET 请求，通过添加时间戳实现
    if (!sysConfig.REQUEST_CACHE && config.method === 'get') {
      config.params = config.params || {};
      config.params['_'] = new Date().getTime();
    }

    // 合并自定义的 Headers
    Object.assign(config.headers, sysConfig.HEADERS);

    return config; // 返回处理后的配置
  },
  (error) => {
    return Promise.reject(error); // 捕获请求错误
  }
);

// 避免多次弹出 401 错误提示框的标志位
let MessageBox_401_show = false;

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 成功返回直接处理数据
    return response;
  },
  (error) => {
    // 错误处理
    if (error.response) {
      switch (error.response.status) {
        case 404:
          ElNotification.error({
            title: '请求错误',
            message: "Status:404，正在请求不存在的服务器记录！"
          });
          break;
        case 500:
          ElNotification.error({
            title: '请求错误',
            message: error.response.data.message || "Status:500，服务器发生错误！"
          });
          break;
        case 401:
          if (!MessageBox_401_show) {
            MessageBox_401_show = true;
            ElMessageBox.confirm(
              '当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。',
              '无权限访问',
              {
                type: 'error',
                closeOnClickModal: false,
                center: true,
                confirmButtonText: '重新登录',
                beforeClose: (action, instance, done) => {
                  MessageBox_401_show = false; // 关闭前重置标志位
                  done();
                }
              }
            ).then(() => {
              router.replace({ path: '/login' });
            }).catch(() => { });
          }
          break;
        default:
          ElNotification.error({
            title: '请求错误',
            message: error.message || `Status:${error.response.status}，未知错误！`
          });
      }
    } else {
      ElNotification.error({
        title: '请求错误',
        message: "请求服务器无响应！"
      });
    }

    return Promise.reject(error.response); // 抛出错误响应，方便业务逻辑处理
  }
);

// 定义 http 模块，提供封装的请求方法
var http = {

  /** GET 请求
   * @param {string} url 接口地址
   * @param {object} params 请求参数
   * @param {object} config 自定义配置
   */
  get(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params,
        ...config
      }).then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },

  /** POST 请求
   * @param {string} url 接口地址
   * @param {object} data 请求体
   * @param {object} config 自定义配置
   */
  post(url, data = {}, config = {}, showMessage = true) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
        ...config
      })
        .then((response) => {
          // if (showMessage) ElMessage.success('操作成功');
          resolve(response.data);
        })
        .catch((error) => {
          if (showMessage) ElMessage.error('操作失败');
          reject(error);
        });
    });
  },

  /** PUT 请求 */
  put(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data,
        ...config
      }).then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },

  /** PATCH 请求 */
  patch(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'patch',
        url,
        data,
        ...config
      }).then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },

  /** DELETE 请求 */
  delete(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
        data,
        ...config
      }).then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },

  /** JSONP 请求 */
  jsonp(url, name = 'jsonp') {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      const _id = `jsonp${Math.ceil(Math.random() * 1000000)}`;
      script.id = _id;
      script.type = 'text/javascript';
      script.src = url;
      window[name] = (response) => {
        resolve(response);
        document.getElementsByTagName('head')[0].removeChild(script);
        try {
          delete window[name];
        } catch (e) {
          window[name] = undefined;
        }
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
};

export default http;
