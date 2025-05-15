<template>
  <el-card>
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="评论ID">
          <el-input v-model="searchForm._id" placeholder="请输入评论ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="searchForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="电影名">
          <el-input v-model="searchForm.movieName" placeholder="请输入电影名"></el-input>
        </el-form-item>
        <el-form-item label="评论日期">
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
          <el-button type="danger" @click="handleBatchDelete" :disabled="selectedComments.length === 0">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <el-table
      :data="commentList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="_id" label="评论ID" width="80"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="120"></el-table-column>
      <el-table-column prop="movieName" label="电影名称" width="150"></el-table-column>
      <el-table-column prop="content" label="评论内容">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.content" placement="top">
            <span>{{ scope.row.content | ellipsis }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="rating" label="评分" width="80">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.rating"
            disabled
            text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="commentTime" label="评论时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.commentTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="点赞" width="100">
        <template slot-scope="scope">
            {{scope.row.votes}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button
            :type="scope.row.status === 1 ? 'warning' : 'success'"
            size="mini"
            @click="handleToggleStatus(scope.row)">
            {{scope.row.status === 1 ? '隐藏' : '显示'}}
          </el-button> -->
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)">
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
        :current-page="current"
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
  name: 'CommentManagement',
  data() {
    return {
      searchForm: {
        commentId: '',
        userName: '',
        movieName: '',
        dateRange: [],
        _id: ''
      },
      commentList: [],
      current: 0,
      pageSize: 10,
      total: 0,
      selectedComments: []
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return '';
      if (value.length > 50) {
        return value.slice(0, 50) + '...';
      }
      return value;
    },
    formatDate(value) {
      if (!value) return '';
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  methods: {
    handleSearch() {
      this.fetchCommentList()
    },
    resetSearch() {
      this.searchForm = {
        commentId: '',
        userName: '',
        movieName: '',
        dateRange: []
      }
      this.fetchCommentList()
    },
    // 查询评论
    fetchCommentList() {
      const params = {
        current: this.current,
        pageSize: this.pageSize,
        ...this.searchForm
      }
      fetch.getCommentList(params)
        .then((res) => {
          if (res.data.code === 0) {
            this.commentList = res.data.data.records || [];
            this.total = res.data.data.total || 0;
          } else {
            this.$message.warning(res.data.description);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    handleToggleStatus(row) {
      const action = row.status === 1 ? '隐藏' : '显示';
      this.$confirm(`确认${action}该评论?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch.updateCommentStatus({
          id: row.id,
          status: row.status === 1 ? 0 : 1
        }).then(res => {
          if (res.data.code === 0) {
            this.$message.success(`${action}成功`);
            this.fetchCommentList();
          } else {
            this.$message.error(res.data.description);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      }).catch(() => {
        this.$message.info('已取消操作');
      });
    },
    handleDelete(row) {
      this.$confirm('确认删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch.deleteComments([row._id]).then(res => {
          if (res.data.code === 0) {
            this.$message.success('删除成功');
            this.fetchCommentList();
          } else {
            this.$message.error(res.data.description);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleSelectionChange(val) {
      this.selectedComments = val;
    },
    handleBatchDelete() {
      if (this.selectedComments.length === 0) {
        this.$message.warning('请选择要删除的评论');
        return;
      }

      this.$confirm(`确认删除选中的 ${this.selectedComments.length} 条评论?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 修改这里：使用 _id 而不是 id
        const commentIds = this.selectedComments.map(comment => comment._id);
        fetch.deleteComments(commentIds).then(res => {
          if (res.data.code === 0) {
            this.$message.success('批量删除成功');
            this.fetchCommentList();
          } else {
            this.$message.error(res.data.description);
          }
        }).catch(err => {
          this.$message.error(err.message);
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchCommentList();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.fetchCommentList();
    }
  },
  created() {
    this.fetchCommentList()
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
