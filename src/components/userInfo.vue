<template>
  <div class="user-info-container">

    <!-- 查看模式 -->
    <el-card v-if="!isEdit" class="info-card">
      <div class="info-table">
        <table class="container">
          <tr class="info-row">
            <td class="label-col"><i class="el-icon-user"></i>昵称：</td>
            <td class="content-col">{{list.userNickname}}</td>
          </tr>
          <tr class="info-row">
            <td class="label-col"><i class="el-icon-male"></i>性别：</td>
            <td class="content-col">
              <span :class="{'male': list.sex === '男', 'female': list.sex === '女'}">
                {{list.sex}}
              </span>
            </td>
          </tr>
          <tr class="info-row">
            <td class="label-col"><i class="el-icon-mobile-phone"></i>手机号：</td>
            <td class="content-col">{{list.phone}}</td>
          </tr>
          <tr class="info-row">
            <td class="label-col"><i class="el-icon-collection-tag"></i>电影标签：</td>
            <td class="content-col">
              <div class="tags-container">
                <el-tag
                  v-for="n in list.prefGenres"
                  :key="n"
                  type="success"
                  effect="light"
                  class="tag-item">
                  {{n}}
                </el-tag>
              </div>
            </td>
          </tr>
          <tr class="info-row">
            <td class="label-col"><i class="el-icon-chat-line-square"></i>个人宣言：</td>
            <td class="content-col motto-text">{{list.motto || '这个人很懒，什么都没留下~'}}</td>
          </tr>
          <tr class="info-row">
            <td class="label-col"><i class="el-icon-id-card"></i>ID：</td>
            <td class="content-col">{{list.userId}}</td>
          </tr>
        </table>
      </div>
      
      <div class="button-group">
        <el-button type="primary" icon="el-icon-edit" @click="changeEdit">编辑资料</el-button>
        <el-button icon="el-icon-back" @click="toIndex">返回首页</el-button>
      </div>
    </el-card>

    <!-- 编辑模式 -->
    <el-card v-else class="edit-card">
      <el-form 
        :model="list" 
        status-icon 
        :rules="rules2" 
        ref="list" 
        label-width="100px" 
        class="formWrap">
        <el-form-item label="昵称" prop="username">
          <el-input v-model="list.userNickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        
        <el-form-item label="性别" prop="sex">
          <el-select v-model="list.sex" placeholder="请选择性别" style="width: 100%">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="list.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        
        <el-form-item label="电影标签" prop="userTags">
          <div class="tags-edit">
            <el-checkbox-group v-model="userTags">
              <el-checkbox 
                v-for="op in tags" 
                :key="op" 
                :label="op"
                class="tag-checkbox">
                {{op}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>

        <el-form-item label="个人宣言" prop="motto">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="写点什么来介绍自己吧..."
            v-model="list.motto">
          </el-input>
        </el-form-item>

        <el-form-item class="button-group">
          <el-button type="success" @click="submitInfo('list')">保存修改</el-button>
          <el-button @click="backToView">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.user-info-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.info-card, .edit-card {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  background: #fff;
  padding: 20px;
}

.info-row {
  transition: all 0.3s ease;
}

.info-row:hover {
  background-color: #f8f9fb;
}

.label-col {
  color: #606266;
  width: 120px;
  font-weight: 500;
}

.content-col {
  color: #2c3e50;
}

.label-col i {
  margin-right: 8px;
  color: #409EFF;
}

.male {
  color: #409EFF;
  font-weight: 500;
}

.female {
  color: #F56C6C;
  font-weight: 500;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  margin: 0;
  border-radius: 4px;
}

.motto-text {
  color: #606266;
  font-style: italic;
  line-height: 1.5;
}

.button-group {
  text-align: center;
  margin-top: 30px;
}

.button-group .el-button {
  padding: 12px 24px;
  font-size: 16px;
}

.formWrap {
  padding: 20px;
}

.tag-checkbox {
  margin-right: 15px;
  margin-bottom: 10px;
}

.el-form-item {
  margin-bottom: 25px;
}

.el-input, .el-select {
  width: 100%;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .user-info-container {
    padding: 10px;
  }
  
  .info-card, .edit-card {
    padding: 15px;
  }
  
  .page-title {
    font-size: 24px;
  }
}
</style>

<script>/* eslint-disable indent */

import fetch from '../api/fetch';

export default {
  props: ['list', 'imageUrl'],
  data() {

    const checknickname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'));
      }
      callback();
    };
    const checksex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('性别不能为空'));
      }
      callback();
    };
    return {
      refresh: 0,
      tags:this.list.prefGenres,
      userTags: [],
      isEdit: false,
      rules2: {
        username: [{ validator: checknickname, trigger: 'blur' }],
        sex: [{ validator: checksex, trigger: 'blur' }],
      },
    };
  },
  mounted() {
    
    // this.getUserTags();
  },
  watch: {
    refresh() {
      location.reload();
    },
  },
  methods: {
    getUserTags() {
      fetch
        .movieTags()
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.tags = res.data.data;
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning',
              });
            }
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((e) => {
          this.$message({
            message: '获取标签失败',
            type: 'warning',
          });
        });
    },
    changeEdit() {
      this.isEdit = !this.isEdit;
    },
    backToView() {
      this.isEdit = !this.isEdit;
      this.list.userTags = JSON.parse(this.list.userTags);
    },
    toIndex() {
      this.$router.push({ name: 'index' });
    },
    // 提交订单信息
    submitInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.userTags);
          this.list.userTags = JSON.stringify(this.userTags);
          console.log(this.list);
          fetch
            .putUserInfo(this.list)
            .then((res) => {
              console.log('list', this.list);
              if (res.data.code === 0) {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                });
              } else {
                this.$message({
                  message: res.data.description,
                  type: 'error',
                });
              }
            })
            .catch((e) => {
              this.$message({
                message: e,
                type: 'error',
              });
            });
        } else {
          console.log('error submit!!');
        }
      });
    },
  },
};
</script>
