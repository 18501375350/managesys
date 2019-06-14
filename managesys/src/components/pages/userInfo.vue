<template>
  <div class="manageInfo">
    <div class="wrap">
      <div class="create">
        <el-button type="success" @click="$router.push('/home/user/addUser/0')">新建</el-button>
      </div>
      <el-table :data="userList" border style="width: 1100px">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex=='1'?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idx" label="身份证号"></el-table-column>
        <el-table-column prop="des" label="备注"></el-table-column>
        <el-table-column label="生日">
          <template slot-scope="scope">
            <span>{{scope.row.time|filterTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      userList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 添加
    handleEdit(index, row) {
      this.$router.push("/home/user/addUser/" + row.id);
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fn.ajax(this, API.deleteUser, "get", { id: row.id }, data => {
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
    // 加载列表数据
    fn.ajax(this, API.searchUser, "get", {}, data => {
      this.userList = data.data.data;
    });
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