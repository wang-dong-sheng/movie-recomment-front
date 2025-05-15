<template>
  <el-container>
    <!-- 侧边导航栏 -->
    <el-aside width="200px">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        background-color="#001529"
        text-color="rgba(255,255,255,0.65)"
        active-text-color="#fff"
      >
        <el-menu-item index="realtime" @click="scrollToSection('realtime')">
          <i class="el-icon-time"></i>
          <span>实时推荐</span>
        </el-menu-item>
        <el-menu-item index="hybrid" @click="scrollToSection('hybrid')">
          <i class="el-icon-share"></i>
          <span>混合推荐</span>
        </el-menu-item>
        <el-menu-item index="userbased" @click="scrollToSection('userbased')">
          <i class="el-icon-user"></i>
          <span>离线推荐-基于用户</span>
        </el-menu-item>
        <el-menu-item index="hot" @click="scrollToSection('hot')">
          <i class="el-icon-star-on"></i>
          <span>热门推荐</span>
        </el-menu-item>
        <el-menu-item index="rated" @click="scrollToSection('rated')">
          <i class="el-icon-medal"></i>
          <span>评分最多</span>
        </el-menu-item>
        <el-menu-item index="movies" @click="scrollToSection('movies')">
          <i class="el-icon-film"></i>
          <span>电影资源</span>
        </el-menu-item>
        <el-menu-item index="actors" @click="scrollToSection('actors')">
          <i class="el-icon-user-solid"></i>
          <span>演员资源</span>
        </el-menu-item>
        <el-menu-item index="about" @click="scrollToSection('about')">
          <i class="el-icon-info"></i>
          <span>关于我们</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主要内容区域 -->
    <el-container>
      <el-header style="text-align: center; font-size: 20px">
        <div class="header-content">
          电影推荐系统
        </div>
      </el-header>

      <el-main>
        <!-- 轮播图部分 -->
        <div class="indexContain">
          <div class="cardBox">
            <el-carousel trigger="click" height="400px" style="position: sticky;">
              <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
                <img :src="item.img" class="boxImg">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>

        <!-- 实时推荐部分 -->
        <div id="realtime" class="section">
          <div v-show="!isLogin" class="division"><h3>实时推荐</h3>
            <h3 style="color: #888;font-weight: 400">--- RECOMMENDMOVIES ---</h3></div>
          <div v-show="!isLogin" class="cardContainx">
            <div class="wrapper-cardx">
              <div class="card" v-for="(item, key) in recommendList" :key="key">
                <!--          引入资源防止403-->
                <meta name="referrer" content="no-referrer"/>
                <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
                <div>
                  <p style="white-space: pre-wrap;">{{item.name}}    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 混合推荐部分 -->
        <div id="hybrid" class="section">
          <div v-show="!isLogin" class="division">
            <h3>混合推荐</h3>
            <h3 style="color: #888;font-weight: 400">--- HYBRID RECOMMENDATIONS ---</h3>
          </div>
          <div v-show="!isLogin" class="cardContainx">
            <div class="wrapper-cardx">
              <div class="card" v-for="(item, key) in hybridRecommendList" :key="key">
                <meta name="referrer" content="no-referrer"/>
                <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
                <div>
                  <p style="white-space: pre-wrap;">{{item.name}}    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 基于用户的推荐部分 -->
        <div id="userbased" class="section">
          <div v-show="!isLogin" class="division">
            <h3>基于用户的推荐</h3>
            <h3 style="color: #888;font-weight: 400">--- USER BASED RECOMMENDATIONS ---</h3>
          </div>
          <div v-show="!isLogin" class="cardContainx">
            <div class="wrapper-cardx">
              <div class="card" v-for="(item, key) in userBasedRecommendList" :key="key">
                <meta name="referrer" content="no-referrer"/>
                <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
                <div>
                  <p style="white-space: pre-wrap;">{{item.name}}    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门推荐部分 -->
        <div id="hot" class="section">
          <div v-show="!isLogin" class="division">
            <h3>热门推荐</h3>
            <h3 style="color: #888;font-weight: 400">--- HOT RECOMMENDATIONS ---</h3>
          </div>
          <div v-show="!isLogin" class="cardContainx">
            <div class="wrapper-cardx">
              <div class="card" v-for="(item, key) in hotRecommendList" :key="key">
                <meta name="referrer" content="no-referrer"/>
                <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
                <div>
                  <p style="white-space: pre-wrap;">{{item.name}}    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 评分最多推荐部分 -->
        <div id="rated" class="section">
          <div v-show="!isLogin" class="division">
            <h3>最多评分</h3>
            <h3 style="color: #888;font-weight: 400">--- MOST RATED RECOMMENDATIONS ---</h3>
          </div>
          <div v-show="!isLogin" class="cardContainx">
            <div class="wrapper-cardx">
              <div class="card" v-for="(item, key) in rateMoreRecommendList" :key="key">
                <meta name="referrer" content="no-referrer"/>
                <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
                <div>
                  <p style="white-space: pre-wrap;">{{item.name}}    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 电影资源部分 -->
        <div id="movies" class="section">
          <div class="division"><h3>电影资源</h3>
            <h3 style="color: #888;font-weight: 400">--- HOTMOVIES ---</h3></div>
          <div class="cardContain">
            <div class="wrapper-card">
              <div class="card" v-for="(item, key) in movieList" :key="key">
                <meta name="referrer" content="no-referrer"/>
                <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
                <div>
                  <p style="white-space: pre-wrap;">{{item.name}}    </p>
                </div>
              </div>
            </div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[12, 24, 36, 48]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              style="margin: 20px 0; text-align: center;">
            </el-pagination>
          </div>
        </div>

        <!-- 演员资源部分 -->
        <div id="actors" class="section">
          <div class="division">
            <h3>演员资源</h3>
            <h3 style="color: #888;font-weight: 400">--- PERSONS ---</h3>
          </div>
          <div class="newsContain">
            <div class="temp">
    <!--        @click="personDetail(item.id)-->
              <div class="newsItem" v-for="(item, key) in personList" :key="key" @click="getPersonDetail(item.personId, item.name)">
                      <div class="picContain" ontouchstart="this.classList.toggle('hover');">
                        <meta name="referrer" content="no-referrer"/>
                        <img :src=item.avatar height="75" width="75">
                    </div>
                <div>
                  <p style="white-space: pre-wrap;">姓名：{{item.name}}          性别：{{item.sex}}          地点：{{item.birthPlace}}       别名：{{item.otherName}}</p>
                  <p style="margin-top:25px">职业： {{item.profession}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 关于我们部分 -->
        <div id="about" class="section">
          <div class="division"><h3>关于我们</h3>
            <h3 style="color: #888;font-weight: 400">--- ABOUT ---</h3></div>
          <div class="aboutus">
            <div id="aboutusInfo">
              <p style="font-size: 200%">协同过滤算法的电影推荐系统</p>
              <p style="font-size: 200%">为您推荐最好的电影，带给你最佳的观影体验！</p>
            </div>
          </div>
          <div class="division"><h3>联系我们</h3>
            <h3 style="color: #888;font-weight: 400">--- CONTACT ---</h3></div>
          <div class="footer">
            <a href="https://github.com/wang-dong-sheng/movie-recomment-front"><img src="../assets/github.png"><span>https://github.com/wang-dong-sheng/movie-recomment-front</span></a>
            <a href="https://github.com/wang-dong-sheng/movie-recomment-backended"><img src="../assets/github.png"><span>https://github.com/wang-dong-sheng/movie-recomment-backended</span></a>
          </div>
        </div>

        <!-- 标签选择对话框 -->
        <el-dialog
          title="选择您感兴趣的电影类型"
          :visible.sync="tagDialogVisible"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false"
          width="50%">
          <div class="tag-container">
            <el-checkbox-group v-model="selectedTags">
              <el-checkbox
                v-for="tag in allTags"
                :key="tag"
                :label="tag"
                border>
                {{ tag }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitTags" :disabled="selectedTags.length === 0">
              确认选择
            </el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import fetch from '../api/fetch';
// eslint-disable-next-line import/extensions,import/no-unresolved
import store from '../store/store';
// eslint-disable-next-line import/extensions,import/no-unresolved

export default {
  data() {
    return {
      crouselImg: [
        { img: 'https://ydschool-video.nosdn.127.net/1583850881001Snipaste_2020-03-10_22-35-21.png' },
        { img: 'https://ydschool-video.nosdn.127.net/1583851372811Snipaste_2020-03-10_22-43-36.png' },
        { img: 'https://ydschool-video.nosdn.127.net/1583851439196Snipaste_2020-03-10_22-42-28.png' },
        { img: 'https://ydschool-video.nosdn.127.net/1583851475466Snipaste_2020-03-10_22-40-12.png' },

      ],
      activeIndex2: '1',
      movieList: [],
      personList: [],
      recommendList: [{ movieId: 1306004, name: '重返中世纪', cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1878110577.jpg' },
        { movieId: 1307266, name: '一声惊雷', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2178025056.jpg' },
        { movieId: 1308835, name: '诸神混乱之女神陷阱', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1775859403.jpg' },
        { movieId: 1309166, name: '零号嫌疑犯', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529453201.jpg' }],
      isLogin: !!store.state.token,
      isShow: false,
      currentPage: 1,
      pageSize: 12,
      total: 0,
      searchForm: {},
      hybridRecommendList: [],
      userBasedRecommendList: [],
      hotRecommendList: [],
      rateMoreRecommendList: [],
      activeMenu: 'realtime', // 当前激活的菜单项
      tagDialogVisible: false,
      allTags: [
        '剧情', '喜剧', '爱情', '动作', '惊悚', '犯罪', '恐怖', '冒险',
        '科幻', '悬疑', '奇幻', '战争', '歌舞', '家庭', '历史', '传记',
        '音乐', '古装', '运动', '西部', '黑色电影', '动画', '武侠',
        '同性', '惊栗', '情色', '戏曲', '荒诞', '悬念', '儿童', '记录'
      ],
      selectedTags: [],
    };
  },

  mounted() {
    window.addEventListener('scroll', this.handler);
    this.fetchMovieList();
    this.getPerson();
    this.getHybridRecommendations();
    this.getUserBasedRecommend();
    this.getHotRecommend();
    this.getRateMoreRecommend();    this.getRecommend();
    window.addEventListener('scroll', this.handleScroll);
    this.checkFirstLogin();
  },
  methods: {
    handler() {
      const info = document.getElementById('aboutusInfo') || null;
      const card = document.getElementsByClassName('temp')[0] || null;
      this.currentPage = val;
      this.fetchMovieList();
      if (info === null || card === null) {

      } else if (document.documentElement.scrollTop > 1000) {
        card.classList.add('animated');
        card.classList.add('bounceInLeft');
        info.classList.add('animated');
        info.classList.add('bounceInLeft');
      } else {
        info.classList.remove('animated');
        info.classList.remove('bounceInLeft');
        card.classList.remove('animated');
        card.classList.remove('bounceInLeft');
      }
    },

    getPersonDetail(id, name) {
      localStorage.setItem('personId', id);
      localStorage.setItem('personName', name);
      this.$router.push({ name: 'personInfo' });
    },

    getPerson() {
      fetch.getPerson()
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.personList = res.data.data.personList;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getMovie() {
      fetch.filterMovies()
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.movieList = res.data.data.movieList;
            }
          }
        });
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

    getRecommend() {
      try {

        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : " ";
        // if (!userInfo || !userInfo.userId) {

        //   console.log('用户信息不存在');
        //   return;
        // }
        // alert(String(userInfo))
        const movieRecommendVo = {
          userId: userInfo.userId, // 确保是数字类型
          username:userInfo.userNickname,
          type: 'USER' // 枚举值通常是大写
        }


        fetch.getCurrentTimeMovies(movieRecommendVo)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.recommendList = res.data.data;
              }
            }
          })
          .catch(error => {
            console.error('获取推荐失败:', error);
          });
      } catch (error) {
        console.error('解析用户信息失败:', error);
      }
    },

    getMovieDetail(id) {
      // alert(id);
      localStorage.setItem('movieId', id);
      this.$router.push({ name: 'movieInfo' });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchMovieList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchMovieList();
    },
     // 获取混合推荐
     getHybridRecommendations() {
      try {
        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : " ";
        // if (!userInfo || !userInfo.userId) {
        //   console.log('用户信息不存在');
        //   return;
        // }
        const movieRecommendVo = {
          userId: userInfo.userId,
          username: userInfo.userNickname
          // type: 'HYBRID'
        }

        fetch.getHybridRecommendations(movieRecommendVo)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.hybridRecommendList = res.data.data;
              }
            }
          })
          .catch(error => {
            console.error('获取混合推荐失败:', error);
          });
      } catch (error) {
        console.error('解析用户信息失败:', error);
      }
    },

    // 获取基于用户的推荐
    getUserBasedRecommend() {
      try {
        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : " ";
        // if (!userInfo || !userInfo.userId) {
        //   console.log('用户信息不存在');
        //   return;
        // }
        const movieRecommendVo = {
          userId: userInfo.userId,
          username: userInfo.userNickname,
          type: 'USER'
        }

        fetch.getRecommend(movieRecommendVo)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.userBasedRecommendList = res.data.data;
              }
            }
          })
          .catch(error => {
            console.error('获取用户推荐失败:', error);
          });
      } catch (error) {
        console.error('解析用户信息失败:', error);
      }
    },

    // 获取热门推荐
    getHotRecommend() {
      try {
        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : " ";
        // if (!userInfo || !userInfo.userId) {
        //   console.log('用户信息不存在');
        //   return;
        // }
        const movieRecommendVo = {
          userId: userInfo.userId,
          username: userInfo.userNickname,
          type: 'HOT'
        }

        fetch.getHotMovies(movieRecommendVo)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.hotRecommendList = res.data.data;
              }
            }
          })
          .catch(error => {
            console.error('获取热门推荐失败:', error);

          });
      } catch (error) {

        console.error('解析用户信息失败:', error);
      }
    },

    // 获取评分最多推荐
    getRateMoreRecommend() {
      try {
        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : " ";
        // if (!userInfo || !userInfo.userId) {
        //   console.log('用户信息不存在');
        //   return;
        // }
        const movieRecommendVo = {
          userId: userInfo.userId,
          username: userInfo.userNickname,
          type: 'RATE'
        }

        fetch.getRateMoreMovies(movieRecommendVo)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.rateMoreRecommendList = res.data.data;
              }
            }
          })
          .catch(error => {
            console.error('获取评分最多推荐失败:', error);
          });
      } catch (error) {
        console.error('解析用户信息失败:', error);
      }
    },

    // 滚动到指定部分
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        this.activeMenu = sectionId;
        const offset = 70; // 设置偏移量
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    },

    // 监听滚动事件，更新当前激活的菜单项
    handleScroll() {
      const sections = ['realtime', 'hybrid', 'userbased', 'hot', 'rated', 'movies', 'actors', 'about'];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            this.activeMenu = sectionId;
            break;
          }
        }
      }
    },

    // 检查是否为新用户
    checkFirstLogin() {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo && userInfo.first === true) {
          this.tagDialogVisible = true;
        }
      } catch (error) {
        console.error('解析用户信息失败:', error);
      }
    },

    // 提交用户选择的标签
    async submitTags() {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (!userInfo || !userInfo.userId) {
          this.$message.error('用户信息不存在');
          return;
        }

        const params = {
          userId: userInfo.userId,
          userNickname: userInfo.userNickname,
          prefGenres: this.selectedTags
        };

        const res = await fetch.updateUserInfo(params);
        if (res.status === 200 && res.data.code === 0) {
          // 更新本地存储中的first标志
          userInfo.first = false;
          localStorage.setItem('user', JSON.stringify(userInfo));

          this.$message.success('标签选择成功！');
          this.tagDialogVisible = false;

          // 重新加载推荐
          this.getRecommend();
          this.getHybridRecommendations();
          this.getUserBasedRecommend();
          this.getHotRecommend();
          this.getRateMoreRecommend();
        } else {
          this.$message.error(res.data.description || '标签选择失败');
        }
      } catch (error) {
        console.error('提交标签失败:', error);
        this.$message.error('提交标签失败，请重试');
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>


<style>
  @import "../assets/Animate/animate.min.css";

  * {
    box-sizing: border-box;
  }

  body {
    background: #ededed;
    padding: 0;
    margin: 0;
  }

  .myMenu {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .indexContain {
    width: 100%;
    height: auto; /* 改为 auto */
    border: 1px solid #ededed;
    background: #fff;
    margin-bottom: 20px; /* 添加底部间距 */
  }

  .cardBox {
    position: relative;
    width: 1200px;
    margin: 0 auto; /* 修改 margin */
    box-shadow: 0 10px 15px #888;
    border-radius: 6px;
  }

  .cardContain {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .cardContainx {
    width: 100%;
    height: 30%;
    background: #fff;
  }

  .newsContain {
    padding-top: 1px;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .picContain {
    margin-right: 10px;
    perspective: 1000px;
  }

  .picContain:hover .flipper, .picContain.hover .flipper {
    transform: rotateY(180deg);
  }

  .picContain, .itemPic, .back {
    width: 80px;
    height: 80px;
  }

  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  .newsItem {
    display: flex;
    justify-content: flex-start;
    width: 1200px;
    margin: auto;
    height: 114px;
    text-align: left;
    color: #5a5a5a;
    font-weight: 500;
    padding-top: 15px;
    border-bottom: 1px solid #ededed;
  }

  .itemPic, .back {
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    background: #cc0000;
    text-align: center;
    color: white;
    font-weight: 500;
    line-height: 80px;
    white-space: nowrap;
  }

  .itemPic {
    z-index: 2;
  }

  .back {
    transform: rotateY(180deg);
  }

  .footer {
    width: 100%;
    height: 100px;
    background: black;
    padding-top: 20px
  }

  .footer a {
    color: white;
    text-decoration: none;
  }

  .aboutus {
    width: 100%;
    height: 500px;
    background: url("https://ydschool-video.nosdn.127.net/158480509232652112_AaOXxSky.jpg") no-repeat;
    background-size: 100% 100%;
    filter: grayscale(70%);
    opacity: 0.7;
    color: white;
    font-weight: 600;
    padding-top: 60px;
  }

  .aboutus p {
    margin-top: 30px;
    font-size: 18px;
  }

  #aboutusInfo {
    margin-top: 80px;
    animation-delay: 1s
  }

  .wrapper-card {
    width: 1200px;
    height: 1000px;
    margin: 30px auto auto auto;
    padding-top: 30px;
  }

  .wrapper-cardx {
    width: 1200px;
    height: 400px;
    margin: 10px auto auto auto; /* 减小上边距 */
    padding-top: 10px; /* 减小上内边距 */
  }

  .wrapper-cardx .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 30px;
    border-radius: 6px;
  }

  .wrapper-cardx .card:hover {
    transform: translateY(-5px);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }

  .wrapper-cardx .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
  }

  .wrapper-card .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 30px;
    border-radius: 6px;
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

  .boxImg {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .division {
    width: 100%;
    margin: 10px auto; /* 减小上下间距 */
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
  }

  .footer img {
    width: 25px;
    height: 25px;
    margin-right: 10px
  }

  .footer span {
    margin-right: 20px;
  }

  .recommandInfo p {
    margin-bottom: 6px;
  }

  .el-progress__text {
    font-size: 16px !important;
    text-align: center !important;
  }

  .el-carousel-item {
    display: flex;
    justify-content: space-around;
  }

  .el-carousel {
    width: 1200px;
    margin: 0 auto;
  }

  .mytable {
    width: 100%;
    height: 700px;
  }

  .progress2 {
    width: 182px;
    border: 0;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    position: fixed;
    height: 100vh;
    overflow-y: auto;
  }

  .el-menu-vertical {
    height: 100%;
  }

  .header-content {
    font-weight: bold;
  }

  .section {
    padding: 10px; /* 减小内边距 */
    margin-bottom: 10px; /* 减小底部间距 */
    scroll-margin-top: 70px; /* 调整滚动定位位置 */
  }

  .el-main {
    margin-left: 200px; /* 与侧边栏宽度相同 */
    padding: 20px;
  }

  @media screen and (max-width: 768px) {
    .el-aside {
      width: 64px !important;
    }

    .el-main {
      margin-left: 64px;
    }
  }

  .tag-container {
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
  }

  .tag-container .el-checkbox {
    margin: 10px;
  }

  .el-checkbox.is-bordered {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .dialog-footer {
    text-align: center;
    display: block;
  }

</style>
