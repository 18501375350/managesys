<template>
  <div class="notice">
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
  mounted() {}
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';
</style>