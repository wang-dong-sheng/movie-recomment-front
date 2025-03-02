import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import * as types from '../store/types';
// eslint-disable-next-line import/extensions
import index from '../views/index.vue';
// eslint-disable-next-line import/extensions
import CommonPage from '../components/common/commonPage.vue';
import Admin from '../views/admin.vue';

Vue.use(Router);
// eslint-disable-next-line global-require,import/no-dynamic-require
const login = resolve => require(['../views/login'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const register = resolve => require(['../views/register'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const userInfo = resolve => require(['../views/userInfo.vue'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const movieInfo = resolve => require(['../views/movieInfo.vue'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const personInfo = resolve => require(['../views/personInfo.vue'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const movieList = resolve => require(['../views/movieList.vue'], resolve);
// eslint-disable-next-line global-require,import/no-dynamic-require
const personList = resolve => require(['../views/personList.vue'], resolve);

const routes = [
  {
    path: '/',
    component: CommonPage,
    children: [
      {
        path: '/',
        name: 'index',
        component: index,
      },
    ],
  },
  {
    path: '/movieInfo',
    component: CommonPage,
    children: [
      {
        path: '/',
        name: 'movieInfo',
        component: movieInfo,
      },
    ],
  },
  {
    path: '/movieList',
    component: CommonPage,
    children: [
      {
        path: '/',
        name: 'movieList',
        component: movieList,
      },
    ],
  },
  {
    path: '/personList',
    component: CommonPage,
    children: [
      {
        path: '/',
        name: 'personList',
        component: personList,
      },
    ],
  },
  {
    path: '/personInfo',
    component: CommonPage,
    children: [
      {
        path: '/',
        name: 'personInfo',
        component: personInfo,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/userInfo',
    component: CommonPage,
    children: [
      {
        path: '/',
        name: 'userInfo',
        component: userInfo,
      },
    ],
  },
  {
    path: '/admin',
    component: Admin,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/admin/Dashboard.vue'),
        meta: {
          title: '系统首页',
          icon: 'el-icon-house'
        }
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => import('../views/admin/UserManagement.vue'),
        meta: {
          title: '用户管理',
          icon: 'el-icon-user'
        }
      },
      {
        path: 'user-info',
        name: 'UserInfo',
        component: () => import('../views/admin/UserInfo.vue'),
        meta: {
          title: '用户信息',
          icon: 'el-icon-info'
        }
      },
      {
        path: 'admin-info',
        name: 'AdminInfo',
        component: () => import('../views/admin/AdminInfo.vue'),
        meta: {
          title: '管理员信息',
          icon: 'el-icon-setting'
        }
      },
      {
        path: 'comment-management',
        name: 'CommentManagement',
        component: () => import('../views/admin/commentManagement.vue'),
        meta: {
          title: '评论管理',
          icon: 'el-icon-chat-line-square'
        }
      },
      {
        path: 'movie-management',
        name: 'MovieManagement',
        component: () => import('../views/admin/MovieManagement.vue'),
        meta: {
          title: '电影管理',
          icon: 'el-icon-film'
        }
      }
    ]
  },
];

const router = new Router({
  routes
});

// Add navigation guard for permission control
router.beforeEach((to, from, next) => {
  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Check if route is in admin section
  const isAdminRoute = to.path.startsWith('/admin');

  if (isAdminRoute) {
    // Only allow admin users to access admin routes
    if (user && user.userRole === 'admin') {
      next();
    } else {
      // Show permission error notification
      Vue.prototype.$message({
        message: '您没有权限访问管理员页面',
        type: 'error',
        duration: 3000
      });
      // Redirect non-admin users to home page
      next('/');
    }
  } else {
    // For non-admin routes, allow access
    next();
  }
});

export default router;

// 同步 localstorage 信息到 store
store.commit(types.SYNC);
