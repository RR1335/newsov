<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'

import {ElMessage} from "element-plus";
import {userLoginService,userRegisterService} from "@/api/user.js";
import { useRouter} from 'vue-router';
import {useTokenStore} from "@/stores/token.js";

//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

const router = useRouter()
const tokenStore = useTokenStore()

// 定义数据模型
const registerData = ref({
  username: '',
  password: '',
  rePassword: ''     // 前端页面需要的，密码确认 —— 后台程序密码校验的命名是 rePassword
})

// 校验规则
// 二次密码校验规则
const checkPassword = (rule,value,callback) => {
  if (value !== registerData.value.username) {
    callback()
  }else {
    callback("用户名、密码要不一样；请重新输入。")
  }
}

const checkerPassword = (rule,value,callback) => {
  if(value === '') {
    callback(new Error('确认密码不能为空，请输入'))
  }else if(value.length < 3) {
    callback(new Error('密码长度 3 - 10个字符'))
  }else if(value.length > 10) {
    callback(new Error('密码长度 3 - 10个字符'))
  }else if(value !== registerData.value.password) {
    callback(new Error('确认密码错误，请重新输入'))
  }else {
    callback()
  }
}

// const checkName = (rule,value,callback) => {
//   const pat = '^[a-zA-Z]\w*'
//   if (pat.test(value)) {
//     callback(new Error('用户名应字母开头字母数字组合'))
//   }
// }

const rules = {
  username: [
    // {validator: checkName, trigger: 'blur'},
    {required:true, message: '请输入用户名', trigger: 'blur'},
    {min:3,max:10,message: '用户名长度 3 - 10个字符/汉字', trigger: 'blur'},
  ],
  password: [
    {validator: checkPassword,trigger: 'blur'},
    {required:true, message: '请输入密码', trigger: 'blur'},
    {min:3,max:10,message: '密码长度 3 - 10个字符', trigger: 'blur'},
  ],
  rePassword: [
    {validator:checkerPassword, trigger: 'blur'},
  ]
}


const register = async () => {

    let result = await userRegisterService(registerData.value)

      ElMessage.success(result.data.message ? result.data.message : '注册成功，请登录！')

}


const login = async () => {

    let result = await userLoginService(registerData.value)
    ElMessage.success(result.data.message ? result.data.message : '登录成功')
    tokenStore.setToken(result.data.data)

    router.push('/')
}

// 清空
const clearRegisterData = async () => {
  registerData.value = {
    username: '',
    password: '',
    rePassword: ''
  }
}

</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister"  :model="registerData" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item >
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click = "register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" underline="never" @click="isRegister = false;clearRegisterData()">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" underline="never">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" underline="never" @click="isRegister = true;clearRegisterData()">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>