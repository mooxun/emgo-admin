import request from '@/utils/request';

export const userLogin = (data) => request.post('v1/passport/login', data); // 用户登录
