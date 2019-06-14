import axios from 'axios'
import qs from 'qs'

// 未登录状态拦截
function errCallback(obj, data) {
    obj.$message({
        type: "warning",
        message: data.data.info
    });
    obj.$router.replace('/login');
    return;
}

// axios
function ajax(obj, url, method, params, callback) {
    var paramsName = 'params';
    if (method.toUpperCase() == 'POST') {
        // params = qs.stringify(params)
        paramsName = 'data'
    }
    axios({
        url: url,
        method: method,
        [paramsName]: params
    }).then(data => {
        if (data.data.code == -1) {
            errCallback(obj, data);
        }
        if (data.data.isok) {
            callback(data)
        } else {
            obj.$message.error(data.data.info);
        }
    });
}

export default {
    errCallback,
    ajax
}
