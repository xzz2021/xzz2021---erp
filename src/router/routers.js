import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '欢迎使用!',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },

  // 自定义菜单路由
  {
    path: '/menu',
    name: '订单管理',
    component: Main,
    meta: {
      hideInBread: true,
      access: ['admin', 'xzz2021']
    },
    children: [
      {
        path: 'ddlr',
        name: '订单录入',
        meta: {
          icon: 'md-cart',
          title: '订单录入'
        },
        component: () => import('@/view/menu/ddlr/index.vue')
      }
    ]
  },
  // {
  //   path: '/view/menu',
  //   name: '商品管理',
  //   meta: {
  //     icon: 'ios-desktop-outline',
  //     title: '商品管理'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'wlxx',
  //       name: '物料信息',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '物料信息'
  //       },
  //       component: () => import('@/view/menu/wlxx/index.vue')
  //     },
  //     {
  //       path: 'wlxx',
  //       name: '成品信息',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '成品信息'
  //       },
  //       component: () => import('@/view/menu/wlxx/index.vue')
  //     }]
  // },
  // {
  //   path: '/view/storeHouse',
  //   name: '客户管理',
  //   meta: {
  //     icon: 'ios-contacts-outline',
  //     title: '客户管理'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'gzsh',
  //       name: '1区',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '1区'
  //       },
  //       component: () => import('@/view/storeHouse/gzsh/index.vue')
  //     },
  //     {
  //       path: 'gzsh',
  //       name: '2区',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: 'gzsh'
  //       },
  //       component: () => import('@/view/storeHouse/gzsh/index.vue')
  //     }]
  // },
  {
    path: '/menu',
    name: '仓库管理',
    meta: {
      icon: 'md-appstore',
      title: '仓库管理',
      access: ['admin']
    },
    component: Main,
    children: [
      {
        path: 'clgl',
        name: '材料管理',
        meta: {
          icon: 'ios-leaf-outline',
          title: '材料管理'
        },
        component: () => import('@/view/menu/clgl/index.vue')
      },
      {
        path: '/menu/clk',
        name: '出入库管理',
        meta: {
          icon: 'ios-switch',
          title: '出入库管理',
          showAlways: true
        },
        component: parentView,
        children: [
          {
            path: 'mayl',
            name: '密胺出入库管理',
            meta: {
              icon: 'ios-keypad-outline',
              title: '密胺出入库管理'
            },
            component: () => import('@/view/menu/mayl/index.vue')
          },
          {
            path: 'hzrk',
            name: '花纸入库',
            meta: {
              icon: 'ios-paper-plane-outline',
              title: '花纸入库'
            },
            component: () => import('@/view/menu/hzrk/index.vue')
          },
          {
            path: 'hzck',
            name: '花纸出库',
            meta: {
              icon: 'ios-redo-outline',
              title: '花纸出库'
            },
            component: () => import('@/view/menu/hzck/index.vue')
          }
        ]
      },
      {
        path: 'wfgl',
        name: '外发管理',
        meta: {
          icon: 'md-plane',
          title: '外发管理'
        },
        component: () => import('@/view/menu/wfgl/index.vue')
      },
      {
        path: 'cpcl',
        name: '成品出入库管理',
        meta: {
          icon: 'ios-sunny-outline',
          title: '成品出入库管理'
        },
        component: () => import('@/view/menu/cpcl/index.vue')
      }]
  },
  // {
  //   path: '/view/storeHouse',
  //   name: '部门管理',
  //   meta: {
  //     icon: 'ios-star',
  //     title: '部门管理'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'gzsh',
  //       name: '订单审核',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '订单审核'
  //       },
  //       component: () => import('@/view/storeHouse/gzsh/index.vue')
  //     },
  //     {
  //       path: 'gzsh',
  //       name: '成品信息',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '成品信息'
  //       },
  //       component: () => import('@/view/storeHouse/gzsh/index.vue')
  //     }]
  // },
  // {
  //   path: '/view/storeHouse',
  //   name: '工资审核',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'gzsh',
  //       name: '工资审核',
  //       meta: {
  //         icon: 'ios-card',
  //         title: '工资审核',
  //         beforeCloseName: '工资审核'
  //       },
  //       component: () => import('@/view/storeHouse/gzsh/index.vue')
  //     }
  //   ]
  // },
  {
    path: '/view',
    name: '数据报表',
    meta: {
      icon: 'ios-clipboard-outline',
      title: '数据报表',
      access: ['admin']
    },
    component: Main,
    children: [
      {
        path: 'menu/hzcj',
        name: '花纸车间报表',
        meta: {
          icon: 'ios-color-wand',
          title: '花纸车间报表'
        },
        component: () => import('@/view/menu/hzcj/index.vue')
      },
      {
        path: 'menu/cxbb',
        name: '成型报表',
        meta: {
          icon: 'ios-bulb-outline',
          title: '成型报表'
        },
        component: () => import('@/view/menu/cxbb/index.vue')
      },
      {
        path: 'menu/mbbb',
        name: '磨边报表',
        meta: {
          icon: 'ios-build-outline',
          title: '磨边报表'
        },
        component: () => import('@/view/menu/mbbb/index.vue')
      },
      {
        path: 'menu/zjsj',
        name: '质检数据',
        meta: {
          icon: 'ios-camera-outline',
          title: '质检数据'
        },
        component: () => import('@/view/menu/zjsj/index.vue')
      },
      {
        path: 'menu/bzbb',
        name: '包装报表',
        meta: {
          icon: 'ios-mail-outline',
          title: '包装报表'
        },
        component: () => import('@/view/menu/bzbb/index.vue')
      }
      // {
      //   path: 'test',
      //   name: '测试一',
      //   meta: {
      //     icon: 'md-arrow-dropdown-circle',
      //     title: '测试一'
      //   },
      //   component: () => import('@/view/menu/test/index.vue')
      // }
    ]
  },
  {
    path: '/menu',
    name: '系统设置',
    meta: {
      hideInBread: true,
      access: ['admin']
    },
    component: Main,
    children: [
      {
        path: 'xtsz',
        name: '系统设置',
        meta: {
          icon: 'md-settings',
          title: '系统设置'

        },
        component: () => import('@/view/menu/xtsz/index.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
