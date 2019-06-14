<template>
  <div class="addUser">
    <div class="wrap">
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input
            v-model="userDesc.name"
            clearable
            :disabled="isshow"
            @blur="reg(userDesc.name,'text')"
            placeholder="请输入6-12位，包括数字、字母、下划线"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="userDesc.pass"
            clearable
            :disabled="isshow"
            @blur="reg(userDesc.pass,'pass')"
            placeholder="请输入6-12位，包括数字、字母、下划线"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="!isshow">
          <el-input
            type="password"
            v-model="userDesc.surePass"
            clearable
            @blur="pass(userDesc.pass,userDesc.surePass)"
            placeholder="确认密码请与密码一致"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="userDesc.tel"
            clearable
            @blur="reg(userDesc.tel,'tel')"
            placeholder="请输入正确手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="userDesc.email"
            clearable
            @blur="reg(userDesc.email,'email')"
            placeholder="请输入正确邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio v-model="userDesc.sex" label="1" :disabled="isshow">男</el-radio>
            <el-radio v-model="userDesc.sex" label="2" :disabled="isshow">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="userDesc.idx"
            clearable
            :disabled="isshow"
            @blur="reg(userDesc.idx,'idx')"
            placeholder="请输入正确身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="userDesc.des" clearable placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="userDesc.time" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="control">
        <el-button type="primary" @click="addUser()" v-if="!isshow">发布</el-button>
        <el-button type="primary" @click="updateUser()" v-if="isshow">修改</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import yz from "../../common/js/yanzheng";
import fn from "../../common/js/fn";
export default {
  components: {},
  props: [],
  data() {
    return {
      userDesc: {
        id: "",
        name: "",
        pass: "",
        surePass: "",
        tel: "",
        email: "",
        sex: "1",
        idx: "",
        des: "",
        time: ""
      },
      isshow: true,
      iptArr: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 正则验证
    reg(str, fn) {
      var reg = yz[fn](str);
      if (!reg.isOk) {
        this.$message.error(reg.msg);
      }
    },
    // 确认密码验证
    pass(pass1, pass2) {
      if (pass1) {
        if (pass1 != pass2) {
          this.$message.error("确认密码与密码不一致");
        }
      }
    },
    // 添加
    addUser() {
      // 点击添加二次验证输入内容
      this.iptArr = [];
      var name = yz.text(this.userDesc.name);
      var pass = yz.pass(this.userDesc.pass);
      var tel = yz.tel(this.userDesc.tel);
      var email = yz.email(this.userDesc.email);
      var idx = yz.idx(this.userDesc.idx);
      this.iptArr.push(name.isOk, pass.isOk, tel.isOk, email.isOk, idx.isOk);
      var str = this.iptArr.every(item => {
        return item == true;
      });

      if (str && this.userDesc.pass == this.userDesc.surePass) {
        fn.ajax(this, API.addUser, "get", this.userDesc, data => {
          this.$message({
            message: data.data.info,
            type: "success"
          });
          this.$router.go(-1);
        });
      } else {
        this.$message.error("信息填写不正确");
        return;
      }
    },
    // 修改
    updateUser() {
      delete this.userDesc._id;
      fn.ajax(this, API.updateUser, "get", this.userDesc, data => {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.$router.go(-1);
      });
    }
  },
  mounted() {
    // 判断参数，区分新建页/修改页
    if (this.$route.params.id == "0") {
      // 参数为0，新建
      this.isshow = false;
    } else {
      // 参数为ID，修改
      this.isshow = true;
      fn.ajax(
        this,
        API.searchUser,
        "get",
        { id: this.$route.params.id },
        data => {
          this.userDesc = data.data.data[0];
        }
      );
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.wrap {
  width: 1000px;
  margin: 20px 0;
}

.control {
  text-align: center;
}
</style>