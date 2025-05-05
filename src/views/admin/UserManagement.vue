<template>
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
      <el-table-column prop="userId" label="用户ID" width="80"></el-table-column>
      <el-table-column prop="userNickname" label="用户名" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="motto" label="个性签名"></el-table-column>
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
</template>

<script>
import fetch from '../../api/fetch'

export default {
  name: 'UserManagement',
  data() {
    return {
      searchForm: {
        userId: '',
        userNickname: '',
        dateRange: []
      },
      userList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      selectedUsers: []
    }
  },
  methods: {
    handleSearch() {
      this.fetchUserList()
    },
    resetSearch() {
      this.searchForm = {
        userId: '',
        userNickname: '',
        dateRange: []
      }
      this.fetchUserList()
    },
    fetchUserList() {
      const params = {
        current: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchForm
      }
      fetch.filterUsers(params)
        .then((res) => {
          if (res.data.code === 0) {

            this.userList = res.data.data.records !== null ? res.data.data.records : this.userList;
            this.total=res.data.data.total;
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
    handleDelete(row) {
      if (row.userRole === 'admin') {
        this.$message.warning('不能删除管理员用户');
        return;
      }

      this.$confirm('确认删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch.deleteUsers([row.userId]).then(res => {
          if (res.data.code === 0) {
            this.$message.success('删除成功');
            this.fetchUserList();
          } else {
            this.$message.error(res.data.description || '删除失败');
          }
        }).catch(err => {
          const errorMsg = (err.response && err.response.data && err.response.data.description) || err.message || '删除失败';
          this.$message.error(errorMsg);
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleSelectionChange(val) {
      this.selectedUsers = val;
    },
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
        const userIds = this.selectedUsers.map(user => user.userId);
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
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchUserList()
    }
  },
  created() {
    this.fetchUserList()
  }
}
</script>

<style scoped>
.search-area {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>
