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
                  src="this.list.userAvatar"
                  alt=""
                  style="width: 40px; height: 40px"
                />
                <span>{{this.list.userRole==user?"普通用户":"管理员"}}</span>
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
          <el-card>
            <!-- 搜索区域 -->
            <div class="search-area">
              <el-form :inline="true" :model="searchForm">
                <el-form-item label="用户ID">
                  <el-input v-model="searchForm.userId" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input v-model="searchForm.userNickname" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="注册日期">
                  <el-date-picker
                    v-model="searchForm.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSearch">搜索</el-button>
                  <el-button @click="resetSearch">重置</el-button>
                  <el-button type="danger" @click="handleBatchDelete" :disabled="selectedUsers.length === 0">
                    批量删除
                  </el-button>
                </el-form-item>
              </el-form>
            </div>

            <!-- 表格区域 -->
            <el-table 
              :data="userList" 
              border 
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="id" label="用户ID" width="80"></el-table-column>
              <el-table-column prop="userNickname" label="用户名" width="120"></el-table-column>
              <el-table-column prop="sex" label="性别" width="80"></el-table-column>
              <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
              <el-table-column prop=".motto" label="个性签名"></el-table-column>
              <el-table-column prop="createTime" label="注册日期" width="180"></el-table-column>
              <el-table-column label="用户角色" width="100">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.userRole === 'user' ? 'info' : 'success'">
                    {{scope.row.userRole === 'user' ? '普通用户' : '管理员'}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handleDelete(scope.row)"
                    :disabled="scope.row.userRole === 'admin'">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-container">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import fetch from '../../api/fetch'
import Info from '../components/userInfo'
import CommentInfo from '../components/commentInfo'

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
        userRole:""
      },
      imageUrl: "",
      head: {
        token: localStorage.getItem("token"),
      },
      refresh: 0,
      // 搜索表单
      searchForm: {
        userId: '',
        userNickname: '',
        dateRange: []
      },
      // 用户列表数据
      userList: [],
      // 分页相关
      currentPage: 1,
      pageSize: 10,
      total: 0,
      selectedUsers: [], // 新增：存储选中的用户
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
    // 搜索
    handleSearch() {
      // 实现搜索逻辑
      // fetch
      //   .filterUsers(this.searchForm)
      //   .then(res=>{
      //     if (res.data.code === 0) {
      //       alert(res.data.code)

      //     }
      //   })
      this.fetchUserList()
    },
    // 重置搜索
    resetSearch() {
      this.searchForm = {
        userId: '',
        userNickname: '',
        dateRange: []
      }
      this.fetchUserList()
    },
    // 获取用户列表
    fetchUserList() {
      // 这里实现获取用户列表的接口调用
      const params = {
        current: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchForm
      }
      // 调用API获取数据
      fetch
        .filterUsers(params)
        .then((res) => {
      
          if (res.data.code === 0) {
            this.userList = res.data.data.records !== null ? res.data.data.records : this.userList;
            // this.list.userTags = JSON.parse(this.list.userTags);
            // alert(this.list)
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
    // 修改：处理单个删除
    handleDelete(row) {
      // Check if user is admin
      if (row.userRole === 'admin') {
        this.$message.warning('不能删除管理员用户');
        return;
      }

      this.$confirm('确认删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除用户API，传入单个ID的数组
        fetch.deleteUsers([row.id]).then(res => {
          if (res.data.code === 0) {
            this.$message.success('删除成功');
            this.fetchUserList();
          } else {
            this.$message.error(res.data.description || '删除失败');
          }
        }).catch(err => {
          // 获取后端返回的错误信息
          const errorMsg = err.response && err.response.data && err.response.data.description || err.message || '删除失败';
          this.$message.error(errorMsg);
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchUserList()
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchUserList()
    },
    // 新增：选择项改变时的处理
    handleSelectionChange(val) {
      this.selectedUsers = val;
    },
    // 修改：处理批量删除，使用相同的deleteUsers接口
    handleBatchDelete() {
      if (this.selectedUsers.length === 0) {
        this.$message.warning('请选择要删除的用户');
        return;
      }

      const hasAdmin = this.selectedUsers.some(user => user.userRole === 'admin');
      if (hasAdmin) {
        this.$message.warning('不能删除管理员用户');
        return;
      }

      this.$confirm(`确认删除选中的 ${this.selectedUsers.length} 个用户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const userIds = this.selectedUsers.map(user => user.id);
        // 调用相同的删除接口
        fetch.deleteUsers(userIds).then(res => {
          if (res.data.code === 0) {
            this.$message.success('批量删除成功');
            this.fetchUserList();
          } else {
            this.$message.error(res.data.description);
          }
        }).catch(err => {
          this.$message.error('批量删除失败：' + err.message);
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
  },
  computed: {
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
    this.fetchUserList()
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
.search-area {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>
