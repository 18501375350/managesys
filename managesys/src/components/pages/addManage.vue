<template>
  <div class="addManage">
    <div class="wrap">
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input
            v-model="manageDesc.name"
            clearable
            :disabled="isshow"
            @blur="reg(manageDesc.name,'text')"
            placeholder="请输入6-12位，包括数字、字母、下划线"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="manageDesc.pass"
            clearable
            :disabled="isshow"
            @blur="reg(manageDesc.pass,'pass')"
            placeholder="请输入6-12位，包括数字、字母、下划线"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="!isshow">
          <el-input
            type="password"
            v-model="manageDesc.surePass"
            clearable
            @blur="pass(manageDesc.pass,manageDesc.surePass)"
            placeholder="确认密码请与密码一致"
          ></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-input v-model="manageDesc.prop" clearable placeholder="请输入属性"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="manageDesc.time"
            type="date"
            placeholder="选择日期"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="control">
        <el-button type="primary" @click="addManage()" v-if="!isshow">注册</el-button>
        <el-button type="primary" @click="updateManage()" v-if="isshow">修改</el-button>
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
      manageDesc: {
        name: "",
        pass: "",
        surePass: "",
        prop: "",
        time: ""
      },
      isshow: true,
      manage: {},
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
    addManage() {
      // 点击添加二次验证输入内容
      this.iptArr = [];
      var name = yz.text(this.manageDesc.name);
      var pass = yz.pass(this.manageDesc.pass);
      this.iptArr.push(name.isOk, pass.isOk);
      var str = this.iptArr.every(item => {
        return item == true;
      });
      // console.log(str);

      if (str && this.manageDesc.pass == this.manageDesc.surePass) {
        fn.ajax(this, API.addManage, "get", this.manageDesc, data => {
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
    updateManage() {
      delete this.manageDesc._id;
      fn.ajax(this, API.updateManage, "get", this.manageDesc, data => {
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
        API.searchManage,
        "get",
        { id: this.$route.params.id },
        data => {
          this.manageDesc = data.data.data[0];
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