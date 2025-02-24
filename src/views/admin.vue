<template>
  <div>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside
        :width="asideWidth"
        style="min-height: 100vh; background-color: #001529"
      >
        <div
          style="
            height: 60px;
            line-height: 60px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <img
            src="@/assets/logo.png"
            alt=""
            style="width: 40px; height: 40px"
          />
          <span style="margin-left: 5px; font-size: 20px" v-show="!isCollapse"
            >推荐系统</span
          >
        </div>

        <el-menu
          router
          background-color="#001529"
          :collapse="isCollapse"
          text-color="rgba(255,255,255,0.65)"
          active-text-color="#fff"
          style="border: none"
          :default-active="$route.path"
        >
          <!-- index是路由，只有在el-menu-item的时候才会生效，如果是二级菜单的一级路由才会有效和 default-active对应-->
          <!-- $route.path是当前浏览器访问的路由 -->
          <el-menu-item index="/admin">
            <i class="el-icon-house"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-menu-item index="/admin2">
            <template slot="title">
              <i class="el-icon-house"></i>
              <span>系统首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin1">
            <template slot="title">
              <i class="el-icon-house"></i>
              <span>系统首页</span>
            </template>
          </el-menu-item>
          <!-- <el-menu-item index="/movieList">movieList</el-menu-item>
                <el-menu-item>系统主页</el-menu-item> -->
          <el-submenu index="/infoManagement">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item index="/userInfo">用户信息</el-menu-item>
            <el-menu-item index="/adminInfo">管理员信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右边部分 -->
      <el-container>
        <!-- 头 -->
        <el-header style="display: flex; align-items: center">
          <i
            :class="collapseIcon"
            style="font-size: 26px"
            @click="handleCollapse"
          ></i>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }"
              >用户管理</el-breadcrumb-item
            >
          </el-breadcrumb>

          <div
            style="
              flex: 1;
              width: 0;
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
          >
            <el-dropdown placement="bottom">
              <!-- 头像后面更具user信息拿到对应的url进行加载 -->

              <div style="display: flex; align-items: center">
                <img
                  src="@/assets/logo.png"
                  alt=""
                  style="width: 40px; height: 40px"
                />
                <span>用户角色</span>
              </div>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主体 -->
        <el-main>
          <span>欢迎来到管理员界面</span>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      isCollapse: false, // 默认不收缩
      asideWidth: "200px",
      collapseIcon: "el-icon-s-fold",
      //   用户相关
      activeIndex2: "1",
      btnText: "取消",
      list: {
        username: "",
        sex: "",
        phone: "",
        userTags: [],
        userMd: "",
        userAvatar: "",
        motto: "",
      },
      imageUrl: "",
      head: {
        token: localStorage.getItem("token"),
      },
      refresh: 0,
    };
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.asideWidth = this.isCollapse ? "64px" : "200px";
      this.collapseIcon = this.isCollapse
        ? "el-icon-s-fold"
        : "el-icon-s-unfold";
    },
  },computed: {
    setDefault() {
      if (this.list.userAvatar != null) {
        return this.list.userAvatar;
      }
      return 'http://oimagec6.ydstatic.com/image?id=-4541055657611236390&product=bisheng';
    },
  },
  mounted() {
    this.getUserInfo();
    this.refresh = this.$route.params.refresh !== undefined ? this.$route.params.refresh : 0;
  },
  watch: {
    refresh() {
      location.reload();
    },
  },
  components: {
    user: Info,
    comment: CommentInfo,
  },
};
</script>

<style>
.el-menu--inline {
  background-color: #000c17 !important;
}
.el-menu--inline .el-menu-item {
  background-color: #000c17 !important;
  padding-left: 49px !important;
}

.el-menu-item:hover,
.el-submenu__title {
  color: #fff !important;
}
.el-submenu__title:hover i {
  color: #fff !important;
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
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  display: flex;
  align-items: center;
}
</style>
