import axios from '@/libs/api.request'

// 定义登录逻辑封装
export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  // console.log(data)
  return axios.request({
    // url: 'Dashboards/Account/Login',
    url: '/api/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    // url: 'get_info',
    url: '/form/userinfo',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
