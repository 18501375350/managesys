<template>
  <div class="index">
    <v-header></v-header>
    <v-main></v-main>
  </div>
</template>

<script type="text/ecmascript-6">
import vHeader from "../views/header";
import vMain from "../views/main";
export default {
  components: {
    vHeader,
    vMain
  },
  props: [],
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    // 进入页面拦截
    var user = localStorage.getItem('user');
    if(!user){
      this.$router.replace('/login')
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.index {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>