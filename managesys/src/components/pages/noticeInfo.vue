<template>
  <div class="noticeInfo">
    <div class="wrap">
      <div class="create">
        <el-button type="success" @click="$router.push('/home/notice/addNotice/0')" v-if="isshow">新建</el-button>
      </div>
      <el-table :data="newsList" border style="width: 1100px">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="tit" label="题目"></el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            <span>{{scope.row.time|filterTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
      newsList: [],
      isshow: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 添加
    handleEdit(index, row) {
      this.$router.push("/home/notice/addNotice/" + row.id);
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fn.ajax(this, API.deleteNews, "get", { id: row.id }, data => {
            this.$message({
              type: "success",
              message: data.data.info
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
    fn.ajax(this, API.searchNews, "get", {}, data => {
      this.newsList = data.data.data;
    });

    // 权限判定，用户登录隐藏删除按钮
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