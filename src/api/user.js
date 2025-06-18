import inst from '@/utils/request'

export const userLoginService = (loginData) => {

    const params = new URLSearchParams();
    for (const key in loginData) {
        params.append(key, loginData[key]);
    }

    console.log("字符串 ", params);
    const result =  inst.post('/user/login', params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        // console.log("有结果吗 ？ ",result);

    return result;

}

export const userRegisterService = (registerData) => {
    const params = new URLSearchParams();
    for (const key in registerData) {
        params.append(key, registerData[key]);
    }
    const result =  inst.post('/user/register', params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    return result;
}

export const userInfoService = () => {
    return inst.get('/user/userInfo')
}

export const updateUserInfoService = (userInfoData) => {
    return inst.put('/user/update', userInfoData)
}