<template>
  <div class="right">
    <h1>{{$route.name}}</h1>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';
.right{
  flex 1
  padding 20px
  background rgba(0,0,0,0.1)
}
</style>