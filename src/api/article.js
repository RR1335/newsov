import inst from '@/utils/request'

/**
 * 文章分类列表查询
 */

export const articleCategoryListService = () => {
    return inst.get('/category')

}

export const articleCategoryAddService = (categoryData) => {
    return inst.post('/category',categoryData)
}

export const updateCategoryService = (categoryData) => {
    return inst.put('/category',categoryData)
}

export const deleteCategoryService = (categoryId) => {
    return inst.delete(`/category/${categoryId}`)
}


export const articleListService = (params)=>{
    return  inst.get('/article',{params:params})
}