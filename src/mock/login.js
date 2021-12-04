import { getParams } from '@/libs/util'
const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    id: '1',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    avator: ''
  },
  admin: {
    name: 'admin',
    id: '7',
    access: ['admin', 'xzz2021'],
    token: 'admin',
    avator: 'http://xzz2022.top/avator/milkshake.png'
  },
  xzz2021: {
    name: 'xzz2021',
    id: '4',
    access: ['xzz2021'],
    token: 'xzz2021',
    avator: ''
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return { token: USER_MAP[req.username].token }
}

export const getUserInfo = req => {
  // parsms提取出用户名和密码，等同于{username：admin, password: 123}
  const params = getParams(req.url)
  // 返回出权限也即用户名称
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
