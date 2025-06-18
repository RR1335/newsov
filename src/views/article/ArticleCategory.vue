<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import {ElMessage,ElMessageBox} from "element-plus";
import {articleCategoryListService,
        articleCategoryAddService,
        updateCategoryService,
        deleteCategoryService} from '@/api/article.js'

const categorys = ref([
  {
    "id": 3,
    "categoryName": "美食",
    "categoryAlias": "my",
    "createTime": "2023-09-02 12:06:59",
    "updateTime": "2023-09-02 12:06:59"
  },
  {
    "id": 4,
    "categoryName": "娱乐",
    "categoryAlias": "yl",
    "createTime": "2023-09-02 12:08:16",
    "updateTime": "2023-09-02 12:08:16"
  },
  {
    "id": 5,
    "categoryName": "军事",
    "categoryAlias": "js",
    "createTime": "2023-09-02 12:08:33",
    "updateTime": "2023-09-02 12:08:33"
  }
])

const dialogVisible = ref(false)
const categoryTitle = ref("")
//添加分类数据模型
const categoryModel = ref({
  categoryName: '',
  categoryAlias: ''
})
//添加分类表单校验
const rules = {
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {min:3,max:10,message: '分类长度长度 3 - 10个字符', trigger: 'blur'},
  ],
  categoryAlias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {min:3,max:10,message: '分类别名长度 3 - 10个字符', trigger: 'blur'},
  ]
}

const articleCategoryList = async () => {
  let list = await articleCategoryListService();
  categorys.value = list.data.data;
}
articleCategoryList();

// 增加分类
const addCategory = async () => {
  let result =  await articleCategoryAddService(categoryModel.value)

  ElMessage.success(result.data.message ? result.data.message : "添加分类成功")

  // 刷新当前页面，并消除窗口
  articleCategoryList()
  dialogVisible.value = false
}

const showDialog = (row) => {
  dialogVisible.value=true
  categoryTitle.value='编辑分类'

  categoryModel.value.categoryName = row.categoryName;
  categoryModel.value.categoryAlias = row.categoryAlias
  // 扩展 id 数据，传递后端程序
  categoryModel.value.id = row.id

}

// 编辑分类
const updateCategory = async () => {
  let result = await updateCategoryService(categoryModel.value);
  ElMessage.success(result.data.message ? result.data.message : "修改分类成功")

  articleCategoryList()
  dialogVisible.value = false
}

// 清空弹窗数据
const clearData = () => {
  categoryModel.value.categoryName = '';
  categoryModel.value.categoryAlias = '';
}

// 删除
const deleteCategory =  async (row) => {

  ElMessageBox.confirm(
      '请确认是否删除，请确认或取消。',
      '删除提示，请确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        // 后台没写删除方法
        let result = await deleteCategoryService(row.id)
        ElMessage({
          type: 'success',
          message: result.data.message,
        })
        articleCategoryList()

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        })
      })
}

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章分类</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible=true;categoryTitle='添加分类';clearData()">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categorys" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="categoryName"></el-table-column>
      <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="categoryTitle" width="30%">
      <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="categoryAlias">
          <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary"  @click="categoryTitle === '添加分类' ? addCategory() : updateCategory()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>