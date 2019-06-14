<template>
  <div class="addManage">
    <div class="wrap">
      <el-form label-width="80px">
        <el-form-item label="题目">
          <el-input v-model="noticeDesc.tit" clearable :disabled="!isdisabled" placeholder="请输入题目"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="noticeDesc.con"
            :disabled="!isdisabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="noticeDesc.time"
            type="date"
            placeholder="选择日期"
            :disabled="!isdisabled"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="control">
        <el-button type="primary" @click="addManage()" v-if="!isshow">注册</el-button>
        <el-button type="primary" @click="updateManage()" v-if="isshow" :disabled="!isdisabled">修改</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import fn from "../../common/js/fn";
export default {
  components: {},
  props: [],
  data() {
    return {
      noticeDesc: {
        tit: "",
        con: "",
        time: ""
      },
      isshow: true,
      isdisabled: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 添加
    addManage() {
      fn.ajax(this, API.addNews, "get", this.noticeDesc, data => {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.$router.go(-1);
      });
    },
    // 修改
    updateManage() {
      delete this.noticeDesc._id;
      fn.ajax(this, API.updateNews, "get", this.noticeDesc, data => {
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
        API.searchNews,
        "get",
        { id: this.$route.params.id },
        data => {
          this.noticeDesc = data.data.data[0];
        }
      );
    }
    // 判断权限，禁用/隐藏输入框
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
      this.type = user.type;
      if (this.type == 2) {
        this.isdisabled = false;
      }
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