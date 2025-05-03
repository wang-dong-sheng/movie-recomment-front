<template>
  <div>
    <el-container class="main-container">
      <el-aside
        :width="asideWidth"
        style="min-height: 100vh; background-color: #001529"
      >
        <!-- Logo区域 -->
        <div class="logo-container">
          <span class="logo-text" v-show="!isCollapse">个人中心</span>
        </div>

        <!-- 菜单区域 -->
        <el-menu
          :collapse="isCollapse"
          background-color="#001529"
          text-color="rgba(255,255,255,0.65)"
          active-text-color="#fff"
          :default-active="activeTab"
        >
          <el-menu-item index="info" @click="handleTabClick('info')">
            <i class="el-icon-user"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="comments" @click="handleTabClick('comments')">
            <i class="el-icon-chat-line-square"></i>
            <span slot="title">我的评论</span>
          </el-menu-item>
          <el-menu-item index="rated" @click="handleTabClick('rated')">
            <i class="el-icon-film"></i>
            <span slot="title">评分历史</span>
          </el-menu-item>
        </el-menu>

        <!-- 添加返回首页按钮到侧边栏底部 -->
        <div class="home-button" :class="{ 'collapsed': isCollapse }">
          <el-button 
            type="text" 
            @click="goToHome" 
            class="home-btn"
          >
            <i class="el-icon-s-home"></i>
            <span v-show="!isCollapse">返回首页</span>
          </el-button>
        </div>
      </el-aside>

      <!-- 右侧内容区 -->
      <el-container class="right-container">

        
        <!-- 主要内容区 -->
        <el-main class="content-main">
          <user v-if="activeTab === 'info'" :list="list" :imageUrl="imageUrl"></user>
          <comment v-if="activeTab === 'comments'"></comment>
          <rated-movies v-if="activeTab === 'rated'"></rated-movies>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.main-container {
  height: 100vh;
  overflow: hidden;
}

.right-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-main {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f0f2f5;
}

/* 自定义滚动条样式 */
.content-main::-webkit-scrollbar {
  width: 6px;
}

.content-main::-webkit-scrollbar-thumb {
  background-color: #909399;
  border-radius: 3px;
}

.content-main::-webkit-scrollbar-track {
  background-color: #f0f2f5;
}

/* 添加返回首页按钮样式 */
.home-button {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  padding: 0 16px;
  box-sizing: border-box;
}

.home-button.collapsed {
  padding: 0 8px;
}

.home-btn {
  width: 100%;
  color: rgba(255,255,255,0.65) !important;
  font-size: 14px;
  padding: 12px 0;
  border-radius: 4px;
}

.home-btn:hover {
  color: #fff !important;
  background-color: rgba(255,255,255,0.1);
}

.home-btn i {
  margin-right: 5px;
}

/* 修改 el-aside 样式以支持绝对定位 */
.el-aside {
  position: relative;
}

/* 修改头部样式，由于移除了面包屑，简化样式 */
.el-header {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #545c64;
  padding-left: 20px;
  height: 60px;
}
</style>

<script>
import fetch from '../api/fetch';
import Info from '../components/userInfo';
import CommentInfo from '../components/commentInfo';
import RatedMovies from './ratedMovies';

export default {
  data() {
    return {
      activeIndex2: '1',
      btnText: '取消',
      list: JSON.parse(localStorage.getItem('user')),
      imageUrl: '',
      head: {
        token: localStorage.getItem('token'),
      },
      refresh: 0,
      // 新增的数据
      isCollapse: false,
      asideWidth: '200px',
      collapseIcon: 'el-icon-s-fold',
      activeTab: 'info',
    };
  },
  computed: {
    setDefault() {
      if (this.list.userAvatar != null) {
        return this.list.userAvatar;
      }
      return 'http://oimagec6.ydstatic.com/image?id=-4541055657611236390&product=bisheng';
    },
    currentTabName() {
      const tabNames = {
        info: '个人信息',
        comments: '我的评论',
        rated: '评分历史'
      };
      return tabNames[this.activeTab];
    }
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
    RatedMovies,
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.asideWidth = this.isCollapse ? '64px' : '200px';
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    },
    handleTabClick(tab) {
      this.activeTab = tab;
    },
    goToHome() {
      this.$router.push('/');
    },
    getUserInfo() {
      fetch
        .getUserInfo(localStorage.getItem('token'))
        .then((res) => {
          if (res.data.code === 0) {
            this.list = res.data.data !== null ? res.data.data : this.list;
            this.list.userTags = JSON.parse(this.list.userTags);
          } else {
            this.$message({
              type: 'warning',
              message: res.data.description,
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
          });
        });
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};
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

.el-header {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: #545c64;
  color: white;
}

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

.el-main {
  padding: 20px;
  background-color: #f0f2f5;
}
</style>
