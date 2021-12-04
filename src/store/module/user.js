import {
  login,
  // logout,
  getUserInfo
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'
// import { Message } from 'element-ui'

export default {
  state: {
    username: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setusername (state, name) {
      state.username = name
    },
    setAccess (state, access) {
      state.access = access || []
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },

  actions: {
    // 登录
    handleLogin ({ commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          const data = res.data
          if (data.status === 1) {
            console.log(data.message)
            commit('setToken', '')
            // popMsg('密码错误，请稍后重试！')
            alert('账号或者密码有误，请检查后重新输入！')
          } else {
          // console.log('登录成功后的信息', data)
          // 这里是登录成功后调用返回的值，模板要求返回值是{access:admin},即根据当前登录账号返回用户名
          // commit('setToken', data.accessToken)
          // 若token为空-----setToken为'',则登录失败
            commit('setToken', data.token)
            resolve()
          }
        }).catch(err => {
          reject(err)
          console.log('报错的信息', err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    /* 最终目的是通过获取登录提交的信息成功后
      得到用户名密码从而renturn出权限
      即token为'super_admin'或者'admin'
    */
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            commit('setAvator', res.data.avator)
            console.log(res.data.avator)
            const data = res.data.data
            commit('setusername', data.username)
            commit('setUserId', data.id)
            // console.log(data.username.split())
            commit('setAccess', data.username)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            console.log('报错的信息', err)
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
