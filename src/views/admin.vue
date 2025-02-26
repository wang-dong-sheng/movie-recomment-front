<template>
  <div>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside
        :width="asideWidth"
        style="min-height: 100vh; background-color: #001529"
      >
        <!-- Logo区域 -->
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="" class="logo-img"/>
          <span class="logo-text" v-show="!isCollapse">推荐系统</span>
        </div>

        <!-- 菜单区域 -->
        <el-menu
          router
          :collapse="isCollapse"
          background-color="#001529"
          text-color="rgba(255,255,255,0.65)"
          active-text-color="#fff"
          :default-active="$route.path"
        >
          <!-- 首页 -->
          <el-menu-item index="/admin/dashboard">
            <i class="el-icon-house"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>

          <!-- 信息管理 -->
          <el-submenu index="info-management">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item index="/admin/user-management">用户管理</el-menu-item>
            <el-menu-item index="/admin/user-info">用户信息</el-menu-item>
            <el-menu-item index="/admin/admin-info">管理员信息</el-menu-item>
            <el-menu-item index="/admin/comment-management">
              <i class="el-icon-chat-line-square"></i>
              <span>评论管理</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容区 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- 折叠按钮 -->
          <i 
            :class="collapseIcon" 
            @click="handleCollapse"
            class="collapse-btn"
          ></i>

          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ getCurrentTitle }}</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 用户信息 -->
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                <img :src="userAvatar" class="user-avatar"/>
                <span>{{ userName }}</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主要内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      isCollapse: false,
      asideWidth: '200px',
      collapseIcon: 'el-icon-s-fold',
      userAvatar: '', // 用户头像
      userName: '', // 用户名
    }
  },
  computed: {
    getCurrentTitle() {
      // 根据当前路由获取标题
      const route = this.$route.matched[this.$route.matched.length - 1]
      return route.meta.title || ''
    }
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse
      this.asideWidth = this.isCollapse ? '64px' : '200px'
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    handleLogout() {
      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 执行退出登录逻辑
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {})
    }
  },
  created() {
    // 获取用户信息
    this.getUserInfo()
  }
}
</script>

<style scoped>
.logo-container {
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-img {
  width: 40px;
  height: 40px;
}

.logo-text {
  margin-left: 10px;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

/* 保持原有的菜单样式 */
.el-menu--inline {
  background-color: #000c17 !important;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
  border-radius: 5px !important;
  margin: 4px !important;
}

.el-menu-item {
  margin: 4px !important;
  height: 40px !important;
  line-height: 40px !important;
}

.el-submenu__title {
  margin: 4px !important;
  height: 40px !important;
  line-height: 40px !important;
}

.el-header {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: #545c64;
}

/* 折叠按钮样式 */
.collapse-btn {
  position: absolute;
  left: -13px;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 100;
}
</style>