import qs from "qs"; //使用qs将请求从参数转化位字符串
import getStorage from './getStorage.js';

export default function ({
  $axios,
  redirect,
  route
}) {
  $axios.interceptors.response.use((response) => {
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 返回 401 清除token信息并跳转到登录页面
            if (process.client) {
              if (route.path !== '/login') {
                confirm('登录过期或还未登录');
                redirect({
                  path: '/login'
                })
                location.replace('/login')
                window.localStorage.removeItem('usertoken');
              }
            }
        }
      }
      return Promise.reject(error.response.data.error) // 返回接口返回的错误信息
    })
  $axios.onRequest(config => {
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });
    if (getStorage()) {
      config.headers.Authorization = getStorage();
    }
    return config;
  });

  $axios.onResponse(response => {
    return Promise.resolve(response.data);
  });
  $axios.onError(error => {
      return Promise.reject(error);
  });
}
