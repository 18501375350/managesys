<template>
  <div class="left">
    <router-link to="/home/manage" active-class="selector" v-if="type=='0'">管理员管理</router-link>
    <router-link to="/home/user" active-class="selector" v-if="type!='2'">用户管理</router-link>
    <router-link to="/home/notice" active-class="selector">通知</router-link>
    <router-link to="/home/device" active-class="selector">设备管理</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  data() {
    return {
      type: null
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    // 获取权限，判定导航显示/隐藏
    this.type = localStorage.getItem("isAdmin");
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.left {
  // min-width: 200px;
  width: 200px;
  background: $bgColor2;
  padding-top: 1px;
}

a {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: $con3;

  &:hover {
    background: $select;
  }
}

.selector {
  background: $bgColor1;
}
</style>