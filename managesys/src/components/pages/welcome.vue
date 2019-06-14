<template>
  <div class="wrapper">
    <h1 class="tit">
      Welcome&nbsp;
      <span>{{username}}-{{type}}</span>
    </h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  data() {
    return {
      username: "",
      type: ""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    // 判断用户角色
    var user = JSON.parse(localStorage.getItem("user"));
    this.username = user.name;
    this.type = user.type;
    if (this.type == "0") {
      this.type = "超级管理员";
    } else if (this.type == "1") {
      this.type = "管理员";
    } else {
      this.type = "用户";
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.tit {
  font-size: 42px;
  line-height: 100px;
  width 80%
  margin 20px
  padding: 0 30px;
  color: $default = #666;
  border-bottom: 3px solid $primary;

  span {
    font-size: 32px;
    color: $primary;
  }
}
</style>