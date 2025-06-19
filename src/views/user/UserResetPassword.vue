<script setup>
import { ref } from 'vue'
import { updatePasswordService} from "@/api/user.js";
import {ElMessage} from "element-plus";
import { useRouter} from 'vue-router';
import {useTokenStore} from "@/stores/token.js";


const router = useRouter()
const tokenStore = useTokenStore()

// 定义数据模型
const passwordData = ref({
  oldPassword:  '',
  password: '',
  rePassword: ''     // 前端页面需要的，密码确认 —— 后台程序密码校验的命名是 rePassword
})

// 二次密码校验规则
const checkerPassword = (rule,value,callback) => {
  if(value === '') {
    callback(new Error('确认密码不能为空，请输入'))
  }else if(value.length < 3) {
    callback(new Error('密码长度 3 - 10个字符'))
  }else if(value.length > 10) {
    callback(new Error('密码长度 3 - 10个字符'))
  }else if(value !== passwordData.value.password) {
    callback(new Error('确认密码错误，请重新输入'))
  }else {
    callback()
  }
}

// 异步，先验证旧密码是否正确；再去验证新密码的正确性；
// 程序现在是一次传给后端验证全部

const rules = {
  oldPassword: [
    {required:true, message: '请输入当前密码', trigger: 'blur'},
    {min:3,max:10,message: '密码长度 3 - 10个字符', trigger: 'blur'},
  ],
  password: [
    {required:true, message: '请输入新密码', trigger: 'blur'},
    {min:3,max:10,message: '密码长度 3 - 10个字符', trigger: 'blur'},
  ],
  rePassword: [
    {validator:checkerPassword, trigger: 'blur'},
  ]
}


const updatePassword = async () => {
  const token = tokenStore.token
  console.log(passwordData.value)
  console.log(token)

  const passwordMap = new Map()

  passwordMap.set('old_pwd', passwordData.value.oldPassword)
  passwordMap.set('new_pwd', passwordData.value.password)
  passwordMap.set('re_pwd', passwordData.value.rePassword)


  console.log(passwordMap)

  let result = await updatePasswordService(passwordMap, token)

  ElMessage.success(result.data.message ? result.data.message : '密码更新成果')

  tokenStore.setToken('')


  router.push('/login')
}


</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>修改密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="passwordData" :rules="rules" label-width="100px" size="large">
        <el-form-item prop="oldPassword">
          <el-input  type="password"   placeholder="请输入当前密码" v-model="passwordData.oldPassword"></el-input>
        </el-form-item >
        <el-form-item prop="password">
          <el-input  type="password" placeholder="请输入新密码" v-model="passwordData.password"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input  type="password" placeholder="请再次输入新密码" v-model="passwordData.rePassword"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="updatePassword">
            修改密码
          </el-button>
        </el-form-item>



<!--          <el-form-item label="登录名称">-->
<!--            <el-input v-model="userInfo.username" disabled></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="用户昵称" prop="nickname">-->
<!--            <el-input v-model="userInfo.nickname"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="用户邮箱" prop="email">-->
<!--            <el-input v-model="userInfo.email"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary">提交修改</el-button>-->
<!--          </el-form-item>-->
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>