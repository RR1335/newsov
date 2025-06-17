import request from '@/utils/request'

/**
 * 文章分类列表查询
 */

const articleCategoryListService = () => {
    return  request.get('/category')

}


export  {
    articleCategoryListService
}