<template>
  <div>
    <el-card v-if="!isShow" class="empty-card">
      <img src="http://www.pqdong.com/wp-content/uploads/2020/03/tip-img.png">
      <p>啊哦，你还没有留下过评论！</p>
    </el-card>
    
    <el-card v-if="isShow" class="comment-card">
      <div class="card-header">
        <div class="title">
          <i class="el-icon-chat-line-square"></i>
          <span>我的评论</span>
        </div>
      </div>

      <!-- 评论列表 -->
      <el-table 
        :data="comment" 
        border 
        style="width: 100%"
        class="comment-table">
        <el-table-column prop="movieName" label="电影名称" width="200">
          <template slot-scope="scope">
            <span 
              style="color: #409EFF; cursor: pointer" 
              @click="getMovieDetail(scope.row.movieId)">
              {{ scope.row.movieName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.content" placement="top" :disabled="scope.row.content.length <= 50">
              <span>{{ scope.row.content | ellipsis }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="votes" label="点赞数" width="100" align="center">
          <template slot-scope="scope">
            <el-tag size="medium" type="success">{{ scope.row.votes }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="commentTime" label="评论时间" width="180" align="center">
          <template slot-scope="scope">
            {{ formatCommentTime(scope.row.commentTime) }}
          </template>
        </el-table-column>
        
        <!-- 新增操作列 -->
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
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
          @current-change="handleCurrentChange"
          :current-page="count"
          :page-size="12"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import fetch from '../api/fetch';

export default {
  props: [],
  data() {
    return {
      comment: [],
      isShow: false,
      count: 1,
      total: 0, // 新增总条数
    };
  },
  filters: {
    ellipsis(value) {
      if (!value) return '';
      if (value.length > 50) {
        return value.slice(0, 50) + '...';
      }
      return value;
    }
  },
  mounted() {
    this.getCommentDetail();
  },
  methods: {
    formatCommentTime(timestamp) {
      const time = parseInt(timestamp);
      const date = new Date(time);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    handleCurrentChange(val) {
      this.count = val;
      this.getCommentDetail();
    },
    getCommentDetail() {
      const user = JSON.parse(localStorage.getItem('user'));
      fetch
        .getCommentList({
          page: this.count,
          size: 12,
          userMd: user.userMd,
          userId: user.userId,
          content: '',
        })
        .then((res) => {
          if (res.status === 200) {
            this.comment = res.data.data.records;
            this.total = res.data.data.total || 0; // 设置总条数
            this.isShow = true;
          }
        })
        .catch((e) => {
          this.$message.error('获取评论失败');
          console.log(e);
        });
    },
    // 修改原有的 viewMovie 方法为 getMovieDetail 方法
    getMovieDetail(id) {
      localStorage.setItem('movieId', id);
      this.$router.push({ name: 'movieInfo' });
    },
    
    // 添加删除评论方法
    handleDelete(row) {
      this.$confirm('确认删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch.deleteComments([row.id]).then(res => {
          if (res.data.code === 0) {
            this.$message.success('删除成功');
            this.getCommentDetail(); // 重新加载评论列表
          } else {
            this.$message.error(res.data.description);
          }
        }).catch(err => {
          this.$message.error('删除失败');
          console.log(err);
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
  }
}
</script>

<style scoped>
.empty-card {
  text-align: center;
  padding: 30px;
}

.empty-card img {
  width: 200px;
  margin-bottom: 20px;
}

.empty-card p {
  color: #909399;
  font-size: 16px;
}

.comment-card {
  margin-bottom: 20px;
}

.card-header {
  padding: 0 0 20px 0;
}

.title {
  border-left: 4px solid #409EFF;
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.title i {
  margin-right: 5px;
  color: #409EFF;
}

.comment-table {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

/* 确保表格内容不会过度拥挤 */
.el-table {
  font-size: 14px;
}

.el-table td {
  padding: 12px 0;
}
</style>
