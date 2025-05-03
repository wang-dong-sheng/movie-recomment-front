<template>
  <div>
    <div class="cardContain">
      <div class="wrapper-card">
        <div class="card" v-for="(item, key) in movieList" :key="key">
          <meta name="referrer" content="no-referrer"/>
          <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}}    </p>
            <p style="color: #409EFF;">评分：{{item.rating}}分</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="count"
        :page-size="8"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import fetch from '../api/fetch';

export default {
  data() {
    return {
      movieList: [],
      count: 1,
      total: 0,
    };
  },
  mounted() {
    this.getRatedMovies();
  },
  methods: {
    handleCurrentChange(val) {
      this.count = val;
      this.getRatedMovies();
    },
    getRatedMovies() {
      const user = JSON.parse(localStorage.getItem('user'));
      fetch.getRatedMovieByUserId({
        current: this.count,
        pageSize: 8, 
        userId: user.userId
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.movieList = res.data.data.records;
            this.total = res.data.data.total;
          }
        }
      });
    },
    getMovieDetail(id) {
      localStorage.setItem('movieId', id);
      this.$router.push({ name: 'movieInfo' });
    },
  },
};
</script>

<style>
@import "../assets/Animate/animate.min.css";

.cardContain {
  width: 100%;
  height: 100%;
  background: #fff;
}

.wrapper-card {
  width: 1000px;
  min-height: auto;  /* 移除最小高度限制 */
  margin: 30px auto 0 auto;  /* 移除底部边距 */
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.wrapper-card .card {
  color: #07111B;
  font-size: 16px;
  width: 220px;
  height: 300px;
  margin: 0 15px 35px 15px;  /* 只保留底部和左右边距 */
  border-radius: 6px;
  position: relative;
}

.wrapper-card .image {
  border-radius: 6px;
  width: 100%;
  height: 85%;  /* 调整图片高度比例 */
  margin-bottom: 10px;
}

/* 调整文字容器的样式 */
.wrapper-card .card > div {
  position: absolute;  /* 绝对定位 */
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.9);  /* 添加半透明背景 */
}

.wrapper-card .card > div p {
  margin: 5px 0;
  line-height: 1.4;
}

.wrapper-card .card:hover {
  transform: translateY(-5px);
  transition: 3ms;
  box-shadow: 5px 5px 10px #888;
}

.wrapper-card .image {
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  border-radius: 6px;
}

.divisionx {
  width: 90%;
  margin: 10px auto;
  text-align: left;
  padding-left: 10px;
  color: #5a5a5a;
}

.pagination-container {
  text-align: center;
  margin: 0 0 20px 0;  /* 只保留底部边距 */
  clear: both;
}
</style>