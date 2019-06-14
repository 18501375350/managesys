<template>
  <div class="manage">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  provide() {
    return {
      reload: this.reload
    };
  },
  props: [],
  data() {
    return {
      isRouterAlive: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    reload() {
      (this.isRouterAlive = false),
        this.$nextTick(function() {
          this.isRouterAlive = true;
        });
    }
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    // 进入页面拦截，权限判定
    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin == "0") {
      next();
    } else {
      next("/login");
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';
</style>