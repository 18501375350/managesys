<template>
  <div class="header">
    <div class="hd clearfix">
      <div class="info">
        <div class="pic">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560331281994&di=a0ebb72172628f7345ec5267312fe600&imgtype=0&src=http%3A%2F%2Fp2.pstatp.com%2Flarge%2F1257%2F692371963"
            alt
          >
        </div>
        <div class="myInfo">
          <span>{{user.name}}</span>
          <div class="mask">
            <p @click="loginOut()">退出登录</p>
          </div>
        </div>
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
      user: {}
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 退出登录
    loginOut() {
      fn.ajax(this, API.exit, "get", {}, data => {
        localStorage.removeItem("user");
        this.$message({
          type: "success",
          message: data.data.info
        });
        this.$router.replace("/login");
      });
    }
  },
  mounted() {
    // 获取用户信息
    var u = localStorage.getItem("user");
    this.user = JSON.parse(u);
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.hd {
  // width 100%
  height: $headerH;
  border-bottom: 1px solid $default;
  background: $bgColor1;
  padding: 0 20px;

  .info {
    float: right;
    height: $headerH;

    .pic {
      float: left;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: $info;
      margin-top: 5px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .myInfo {
      position: relative;
      // width: 100px;
      text-align: center;
      float: left;
      margin-left: 20px;

      &:hover {
        background: $select;

        .mask {
          display: block;
        }
      }

      span {
        line-height: $headerH;
        font-size: $con3;
        padding: 0 30px;
      }

      .mask {
        position: absolute;
        top: $headerH;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        width: 140px;
        height: $headerH;
        background-color: $select;
        border-top: 1px solid $info;
        border-radius: 3px;

        p {
          font-size: $con3;
          text-align: center;
          line-height: $headerH;
          cursor: pointer;
        }
      }
    }
  }
}
</style>