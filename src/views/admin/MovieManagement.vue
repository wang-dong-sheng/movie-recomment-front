<template>
  <el-card>
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="电影名称">
          <el-input v-model="searchForm.name" placeholder="请输入电影名称"></el-input>
        </el-form-item>
        <el-form-item label="上映日期">
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
          <el-button type="success" @click="handleAdd">添加电影</el-button>
          <el-button type="danger" @click="handleBatchDelete" :disabled="selectedMovies.length === 0">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <el-table
      :data="movieList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="电影名称" width="150"></el-table-column>
      <el-table-column prop="directors" label="导演" width="120"></el-table-column>
      <el-table-column prop="actors" label="主演" width="150"></el-table-column>
      <el-table-column prop="genres" label="类型" width="100"></el-table-column>
      <el-table-column prop="mins" label="时长(分钟)" width="100"></el-table-column>
      <el-table-column prop="year" label="上映日期" width="120"></el-table-column>
      <el-table-column prop="score" label="评分" width="80"></el-table-column>
      <el-table-column prop="storyline" label="简介" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isUp === 1 ? 'success' : 'info'">
            {{scope.row.isUp === 1 ? '上映中' : '下架'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleUpOrDown(scope.row)">
            {{scope.row.isUp === 1 ? '下架' : '上映'}}
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

    <!-- 添加电影对话框 -->
    <el-dialog :title="isEdit ? '编辑电影' : '添加电影'" :visible.sync="dialogVisible" width="60%">
      <el-form :model="movieForm" :rules="rules" ref="movieForm" label-width="100px">
        <el-form-item label="电影名称" prop="name">
          <el-input v-model="movieForm.name"></el-input>
        </el-form-item>

        <el-form-item label="导演" prop="directors">
          <el-input v-model="movieForm.directors" placeholder="多个导演用逗号分隔"></el-input>
        </el-form-item>

        <el-form-item label="主演" prop="actors">
          <el-input v-model="movieForm.actors" placeholder="多个演员用逗号分隔"></el-input>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="类型" prop="genres">
              <el-input v-model="movieForm.genres" placeholder="多个类型用逗号分隔"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="语言" prop="languages">
              <el-input v-model="movieForm.languages" placeholder="多个语言用逗号分隔"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地区" prop="regions">
              <el-input v-model="movieForm.regions" placeholder="多个地区用逗号分隔"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="时长(分钟)" prop="mins">
              <el-input-number v-model="movieForm.mins" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上映年份" prop="year">
              <el-input-number v-model="movieForm.year" :min="1900"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上映日期" prop="releaseDate">
              <el-date-picker
                v-model="movieForm.releaseDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="评分" prop="score">
              <el-input-number v-model="movieForm.score" :min="0" :max="10" :precision="1" :step="0.1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评分人数" prop="votes">
              <el-input-number v-model="movieForm.votes" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签" prop="tags">
              <el-input v-model="movieForm.tags" placeholder="多个标签用逗号分隔"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="封面图片" prop="cover">
          <el-input v-model="movieForm.cover" placeholder="请输入封面图片URL"></el-input>
        </el-form-item>

        <el-form-item label="官方网站" prop="officialSite">
          <el-input v-model="movieForm.officialSite"></el-input>
        </el-form-item>

        <el-form-item label="剧情简介" prop="storyline">
          <el-input type="textarea" v-model="movieForm.storyline" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import fetch from '../../api/fetch'

export default {
  name: 'MovieManagement',
  data() {
    return {
      searchForm: {
        movieId: '',
        name: '',
        dateRange: []
      },
      movieList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      selectedMovies: [],
      dialogVisible: false,
      isEdit: false,
      movieForm: {
        movieId: '',
        name: '',
        directors: '',
        actors: '',
        genres: '',
        languages: '',
        regions: '',
        mins: 90,
        year: new Date().getFullYear(),
        releaseDate: '',
        score: 0,
        votes: 0,
        tags: '',
        cover: '',
        officialSite: '',
        storyline: '',
        isUp: 1
      },
      rules: {
        name: [{ required: true, message: '请输入电影名称', trigger: 'blur' }],
        directors: [{ required: true, message: '请输入导演', trigger: 'blur' }],
        actors: [{ required: true, message: '请输入主演', trigger: 'blur' }],
        genres: [{ required: true, message: '请输入类型', trigger: 'blur' }],
        mins: [{ required: true, message: '请输入时长', trigger: 'blur' }],
        year: [{ required: true, message: '请输入上映年份', trigger: 'blur' }],
        releaseDate: [{ required: true, message: '请选择上映日期', trigger: 'blur' }],
        storyline: [{ required: true, message: '请输入剧情简介', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSearch() {
      this.fetchMovieList()
    },
    resetSearch() {
      this.searchForm = {
        movieId: '',
        name: '',
        dateRange: []
      }
      this.fetchMovieList()
    },
    fetchMovieList() {
      const params = {
        current: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchForm
      }
      fetch.filterMovies(params)
        .then((res) => {
          if (res.data.code === 0) {
            this.movieList = res.data.data.records !== null ? res.data.data.records : this.movieList;
            this.total = res.data.data.total;
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
    handleAdd() {
      this.isEdit = false
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.movieForm && this.$refs.movieForm.resetFields()
        this.movieForm = {
          movieId: '',
          name: '',
          directors: '',
          actors: '',
          genres: '',
          languages: '',
          regions: '',
          mins: 90,
          year: new Date().getFullYear(),
          releaseDate: '',
          score: 0,
          votes: 0,
          tags: '',
          cover: '',
          officialSite: '',
          storyline: '',
          isUp: 1
        }
      })
    },
    handleEdit(row) {
      this.isEdit = true
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.movieForm && this.$refs.movieForm.resetFields()
        this.movieForm = {
          movieId: row.movieId,
          name: row.name,
          directors: row.directors,
          actors: row.actors,
          genres: row.genres,
          languages: row.languages,
          regions: row.regions,
          mins: row.mins,
          year: row.year,
          releaseDate: row.releaseDate,
          score: row.score,
          votes: row.votes,
          tags: row.tags,
          cover: row.cover,
          officialSite: row.officialSite,
          storyline: row.storyline,
          isUp: row.isUp
        }
      })
    },
    handleUpOrDown(row) {
      const isCurrentlyUp = row.isUp === 1;
      const actionText = isCurrentlyUp ? '下架' : '上映';

      this.$confirm(`确认${actionText}该电影?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          tag: isCurrentlyUp ? 0 : 1,  // 当前是上映状态时传0表示下架，反之传1表示上映
          movieId: row.movieId
        };

        fetch.upOrDownMovies(params).then(res => {
          if (res.data.code === 0) {
            this.$message.success(`${actionText}成功`);
            this.fetchMovieList();
          } else {
            this.$message.error(res.data.description || `${actionText}失败`);
          }
        }).catch(err => {
          this.$message.error(`${actionText}失败：` + err.message);
        });
      }).catch(() => {
        this.$message.info(`已取消${actionText}`);
      });
    },
    handleSelectionChange(val) {
      this.selectedMovies = val;
    },
    handleBatchDelete() {
      if (this.selectedMovies.length === 0) {
        this.$message.warning('请选择要删除的电影');
        return;
      }

      this.$confirm(`确认删除选中的 ${this.selectedMovies.length} 部电影?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const movieIds = this.selectedMovies.map(movie => movie.movieId);
        fetch.deleteMovies(movieIds).then(res => {
          if (res.data.code === 0) {
            this.$message.success('批量删除成功');
            this.fetchMovieList();
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
      this.fetchMovieList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchMovieList()
    },
    submitForm() {
      this.$refs.movieForm.validate((valid) => {
        if (valid) {
          const request = this.isEdit
            ? fetch.updateMovie(this.movieForm)  // 编辑请求
            : fetch.addMovie(this.movieForm)     // 新增请求

          request.then(res => {
            if (res.data.code === 0) {
              this.$message.success(this.isEdit ? '修改电影成功' : '添加电影成功')
              this.dialogVisible = false
              this.fetchMovieList()
            } else {
              this.$message.error(res.data.description || (this.isEdit ? '修改失败' : '添加失败'))
            }
          }).catch(err => {
            this.$message.error((this.isEdit ? '修改' : '添加') + '失败：' + err.message)
          })
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.fetchMovieList()
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
