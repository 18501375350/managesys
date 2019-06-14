<template>
  <div class="manageInfo">
    <div class="wrap">
      <div class="create">
        <el-button type="success" @click="$router.push('/home/device/adddevice/0')" v-if="isshow">新建</el-button>
      </div>
      <el-table :data="deviceList" border style="width: 1100px">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="ip" label="ip"></el-table-column>
        <el-table-column prop="door" label="机房"></el-table-column>
        <el-table-column prop="num" label="编号"></el-table-column>
        <el-table-column prop="width" label="宽带"></el-table-column>
        <el-table-column label="使用">
          <template slot-scope="scope">
            <span>{{scope.row.status=="1"?"空闲":"已出售"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="buy(scope.$index, scope.row)"
              :disabled="scope.row.status=='0'"
              v-if="!isshow"
            >购买</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="isshow"
            >查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="isshow"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import fn from "../../common/js/fn";
export default {
  inject: ["reload"],
  components: {},
  props: [],
  data() {
    return {
      deviceList: [],
      type: null,
      isshow: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 购买
    buy(index, row) {
      delete this.deviceList._id;
      fn.ajax(
        this,
        API.updateDevice,
        "get",
        { id: row.id, status: "0" },
        data => {
          this.reload();
        }
      );
    },
    // 查看
    handleEdit(index, row) {
      this.$router.push("/home/device/addDevice/" + row.id);
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fn.ajax(this, API.deleteDevice, "get", { id: row.id }, data => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    // 请求列表数据
    fn.ajax(this, API.searchDevice, "get", {}, data => {
      this.deviceList = data.data.data;
    });
    // 验证权限，显示/隐藏购买按钮
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
      this.type = user.type;
      if (this.type == 2) {
        this.isshow = false;
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.wrap {
  margin: 20px 0;
}

.create {
  margin-bottom: 20px;
}
</style>