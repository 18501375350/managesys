<template>
  <div class="lg_wrap">
    <div class="login">
      <div class="title">
        <h2>登 录</h2>
      </div>
      <el-select v-model="user.type">
        <el-option label="超级管理员" value="0">超级管理员</el-option>
        <el-option label="普通管理员" value="1">普通管理员</el-option>
        <el-option label="用户" value="2">用户</el-option>
      </el-select>
      <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
      <el-input type="password" v-model="user.pass" placeholder="请输入密码"></el-input>
      <el-button type="primary" @click="onSubmit">登 录</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import fn from '../../common/js/fn'
export default {
  components: {},
  props: [],
  data() {
    return {
      user: {
        name: "",
        pass: "",
        type: ""
      }
      // msg: "",
      // msgType: ""
      // type: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      // 登录
      fn.ajax(this, API.login, "post", this.user, data => {
        localStorage.setItem("user", data.config.data);
        localStorage.setItem("username", data.config.data.name);
        localStorage.setItem("isAdmin", data.data.isAdmin);
        this.$router.replace("/home");
        this.$message({
          type: "success",
          message: data.data.info
        });
      });
    }
  },
  mounted() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$router.replace("/home");
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.lg_wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, cornflowerblue, skyblue, cornflowerblue);
}

.login {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  width: 400px;
  height: 300px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px #ccc;
  background: $select;

  .title {
    height: 50px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;
    line-height: 50px;
    font-size: $tit;
    color: $primary;
  }

  .el-input, .el-select, .el-button {
    margin: 5px 0;
  }
}

.el-select {
  width: 80%;
}

.el-input {
  width: 80%;
}

.el-button {
  width: 80%;
}

.tanchuang {
  width: 200px;
  margin: 0 auto;
}
</style>