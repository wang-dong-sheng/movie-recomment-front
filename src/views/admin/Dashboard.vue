<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <h1 class="title">欢迎使用电影推荐系统</h1>
      <div class="subtitle">基于协同过滤的电影推荐系统</div>
    </div>

    <div class="features-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="feature-card">
            <div class="card-icon">
              <i class="el-icon-data-analysis"></i>
            </div>
            <h3>智能推荐</h3>
            <p>采用协同过滤算法，为您提供个性化电影推荐</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="feature-card">
            <div class="card-icon">
              <i class="el-icon-cpu"></i>
            </div>
            <h3>技术架构</h3>
            <p>前后端分离架构，基于Spring Boot开发</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="feature-card">
            <div class="card-icon">
              <i class="el-icon-connection"></i>
            </div>
            <h3>技术栈</h3>
            <p>整合Spark、Kafka、Redis、ES、MongoDB、SpringBoot等主流技术</p>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="tech-stack">
      <h2>核心技术栈</h2>
      <div class="tech-list">
        <el-tag v-for="tech in techStack" :key="tech" class="tech-item">
          {{ tech }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      techStack: ['SpringBoot', 'Spark', 'MongoDB', 'ElasticSearch', 'Redis', 'Maven',"Kafka"]
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.5em;
  color: #303133;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2em;
  color: #606266;
}

.features-container {
  margin-bottom: 40px;
}

.feature-card {
  text-align: center;
  padding: 20px;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 3em;
  color: #409EFF;
  margin-bottom: 15px;
}

.tech-stack {
  text-align: center;
}

.tech-list {
  margin-top: 20px;
}

.tech-item {
  margin: 5px;
  padding: 8px 15px;
}

h2 {
  color: #303133;
  margin-bottom: 20px;
}

h3 {
  color: #303133;
  margin: 15px 0;
}

p {
  color: #606266;
  line-height: 1.6;
}
</style>
