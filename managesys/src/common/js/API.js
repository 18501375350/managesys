var baseURL = '/api'    // 根路径
// var baseURL = ''    // 根路径

var login = baseURL + '/login'  // 登录
var exit = baseURL+'/exit'  // 登出

var searchManage = baseURL + '/findManage'  // 查询管理员
var addManage = baseURL + '/addManage'  // 添加管理员
var updateManage = baseURL + '/updateManage'    // 修改管理员
var deleteManage = baseURL + '/delManage'   // 删除管理员

var searchUser = baseURL + '/findUser'  // 查询用户
var addUser = baseURL + '/addUser'  // 添加用户
var updateUser = baseURL + '/updateUser'    // 修改用户
var deleteUser = baseURL + '/delUser'   // 删除用户

var searchNews = baseURL + '/findNews'  // 查找通知
var deleteNews = baseURL + '/delNews'   // 删除通知
var addNews = baseURL + '/addNews'  // 添加通知
var updateNews = baseURL + '/updateNews'    // 修改通知

var searchDevice = baseURL + '/findDevice'  // 查询设备
var deleteDevice = baseURL + '/delDevice'   // 删除设备
var addDevice = baseURL + '/addDevice'  // 添加设备
var updateDevice = baseURL + '/updateDevice'    // 修改设备

export default {
    login,
    exit,
    searchManage,
    addManage,
    updateManage,
    deleteManage,
    searchUser,
    addUser,
    updateUser,
    deleteUser,
    searchNews,
    deleteNews,
    addNews,
    updateNews,
    searchDevice,
    deleteDevice,
    addDevice,
    updateDevice
}