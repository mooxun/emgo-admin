import request from '@/utils/request';

/**
 * 角色管理
 */
export const roleLists = () => request.get('v1/role/lists'); // 角色列表
export const createRole = (params) => request.post('v1/role/create', params); // 新增角色
export const updateRole = (params) => request.post('v1/role/update', params); // 更新角色
export const deleteRole = (params) => request.get('v1/role/delete', { params }); // 删除角色
export const roleDetail = (params) => request.get('v1/role/delete', { params }); // 角色详情

/**
 * 后台管理员
 */
export const adminLists = () => request.get('v1/admin/lists'); // 管理员列表
export const createAdmin = (params) => request.post('v1/admin/create', params); // 新增管理员
export const updateAdmin = (params) => request.post(`v1/admin/update/${params.id}`, params); // 更新管理员
export const deleteAdmin = (params) => request.post(`v1/admin/delete/${params.id}`, params); // 删除管理员
export const adminDetail = (params) => request.get('v1/admin/delete', { params }); // 管理员详情
