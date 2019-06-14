<template>
  <div class="addDevice">
    <div class="wrap">
      <el-form label-width="80px">
        <el-form-item label="ip">
          <el-input v-model="deviceDesc.ip" clearable placeholder="请输入正确IP地址"></el-input>
        </el-form-item>
        <el-form-item label="机房">
          <el-input v-model="deviceDesc.door" clearable placeholder="请输入设备所在机房"></el-input>
        </el-form-item>
        <el-form-item label="编号" v-if="!isshow">
          <el-input v-model="deviceDesc.num" clearable :disabled="isshow" placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item label="宽带">
          <el-input v-model="deviceDesc.width" clearable placeholder="请输入设备宽带号"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <template>
            <el-radio v-model="deviceDesc.status" label="1">空闲</el-radio>
            <el-radio v-model="deviceDesc.status" label="0">已出售</el-radio>
          </template>
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
import fn from "../../common/js/fn";
export default {
  components: {},
  props: [],
  data() {
    return {
      deviceDesc: {
        ip: "",
        door: "",
        num: "",
        width: "",
        status: "1"
      },
      isshow: true // 判断输入框是否显示的变量
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 添加设备
    addManage() {
      fn.ajax(this, API.addDevice, "get", this.deviceDesc, data => {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.$router.go(-1);
      });
    },
    // 修改设备
    updateManage() {
      delete this.deviceDesc._id;
      fn.ajax(this, API.updateDevice, "get", this.deviceDesc, data => {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.$router.go(-1);
      });
    }
  },
  mounted() {
    // console.log(typeof this.$route.params.type);
    // 判断进入新增页/修改页
    if (this.$route.params.id == "0") {
      // 新增页
      this.isshow = false;
    } else {
      // 修改页，挂载先查询此ID的数据，添加到相应input框内
      this.isshow = true;
      fn.ajax(
        this,
        API.searchDevice,
        "get",
        { id: this.$route.params.id },
        data => {
          this.deviceDesc = data.data.data[0];
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