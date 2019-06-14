export default {
    // 手机号验证
    tel: function (str) {
        var reg = /^1[3578]\d{9}$/;
        var isOk = reg.test(str)
        var msg = ''
        if (!isOk) {
            msg = '手机号输入错误'
        }
        return {
            isOk,
            msg
        }
    },
    // 邮箱验证
    email: function (str) {
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        var isOk = reg.test(str)
        var msg = ''
        if (!isOk) {
            msg = '邮箱输入错误'
        }
        return {
            isOk,
            msg
        }
    },
    // 身份证号验证
    idx: function (str) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var isOk = reg.test(str)
        var msg = ''
        if (!isOk) {
            msg = '身份证号输入错误'
        }
        return {
            isOk,
            msg
        }
    },
    // 账号验证
    text: function (str) {
        var reg = /^\w{6,12}/;
        var isOk = reg.test(str)
        var msg = ''
        if (!isOk) {
            msg = '账号输入错误'
        }
        return {
            isOk,
            msg
        }
    },
    // 密码验证
    pass: function (str) {
        var reg = /^\w{6,12}/;
        var isOk = reg.test(str)
        var msg = ''
        if (!isOk) {
            msg = '密码输入错误'
        }
        return {
            isOk,
            msg
        }
    }

}