import inst from '@/utils/request'
import {useTokenStore} from '@/stores/token.js'

/**
 * 文章分类列表查询
 */

export const articleCategoryListService = () => {
    const tokenStore = useTokenStore()

/*    return  inst.get('/category',{
        headers: {
            // 在 pinia 中定义的响应式对象，不需要 value 直接使用
            'Authorization': tokenStore.token
        }
    })*/
    return inst.get('/category')

}

