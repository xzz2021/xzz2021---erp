import axios from '@/libs/api.request'

// 定义获取数据列表逻辑封装

// 花纸车间表单数据
export const gethzcj = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/hzcj',
    params: {
      data
    },
    method: 'get'
  })
}

export const subhzcj = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/hzcj',
    data,
    method: 'post'
  })
}

// 成型报表表单数据
export const getcxbb = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/cxbb',
    params: {
      data
    },
    method: 'get'
  })
}

export const subcxbb = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/cxbb',
    data,
    method: 'post'
  })
}

// 磨边报表表单数据
export const getmbbb = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/mbbb',
    params: {
      data
    },
    method: 'get'
  })
}

export const submbbb = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/mbbb',
    data,
    method: 'post'
  })
}

// 质检报表表单数据
export const getzjsj = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/zjsj',
    params: {
      data
    },
    method: 'get'
  })
}

export const subzjsj = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/zjsj',
    data,
    method: 'post'
  })
}

// 包装报表表单数据
export const getbzbb = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/bzbb',
    params: {
      data
    },
    method: 'get'
  })
}

export const subbzbb = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/bzbb',
    data,
    method: 'post'
  })
}

// 材料查询
export const getclgl = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/clgl',
    params: {
      data
    },
    method: 'get'
  })
}

// 密胺出入库表单数据
export const getmayl = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/mayl',
    params: {
      data
    },
    method: 'get'
  })
}

export const submayl = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/mayl',
    data,
    method: 'post'
  })
}

// 密胺外发数据
export const getwfgl = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/wfgl',
    params: {
      data
    },
    method: 'get'
  })
}

// 花纸入库表单数据
export const gethzrk = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/hzrk',
    params: {
      data
    },
    method: 'get'
  })
}

export const subhzrk = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/hzrk',
    data,
    method: 'post'
  })
}

// 花纸出库表单数据
export const gethzck = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/hzck',
    params: {
      data
    },
    method: 'get'
  })
}

export const subhzck = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/hzck',
    data,
    method: 'post'
  })
}

// 成品出入库数据
export const getcpcl = (date) => {
  const data = date
  return axios.request({
    url: '/form/list/cpcl',
    params: {
      data
    },
    method: 'get'
  })
}

export const subcpcl = (list) => {
  const data = list
  return axios.request({
    url: '/form/list/cpcl',
    data,
    method: 'post'
  })
}
// export const login = ({ username, password }) => {
//   const data = {
//     username,
//     password
//   }
//   // console.log(data)
//   return axios.request({
//     // url: 'Dashboards/Account/Login',
//     url: '/api/login',
//     data,
//     method: 'post'
//   })
// }

// export const getUserInfo = (token) => {
//   return axios.request({
//     // url: 'get_info',
//     url: '/form/userinfo',
//     params: {
//       token
//     },
//     method: 'get'
//   })
// }
