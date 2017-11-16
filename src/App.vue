<template>
  <div id="app">
    <loading v-model="loadbar.isLoading"></loading>
    <div :class="['container', {'active': nav.status}]">
      <router-view class="router-view" :key="key"></router-view>
    </div>
  </div>
</template>

<script type="text/babel">
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
  import hold from 'src/commons/hold'

  export default {
    name: 'app',
    components: {
      Loading
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        user: state => state.user,
        nav: state => state.nav,
        loadbar: state => state.loadbar,
        direction: state => state.direction
      }),
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date(): this.$route + +new Date()
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.name == from.name) {
          if(!this.isObjectValueEqual(to.params, from.params) || !this.isObjectValueEqual(to.query, from.query)) {
            this.$router.go(0);
          }
        }
      }
    },
    mounted () {
      // let userCode = this.$store.state.user.userCode || hold.storage.get("userCode"),
      //     storageOpenId = hold.storage.get("openId"),
      //     storeOpenId = this.$store.state.user.openId,
      //     openId = storageOpenId || storeOpenId;
      // let _this = this;

      // if(userCode && userCode != 'undefined' && userCode != '') {
      //   this.getUserInfo(openId, userCode);
      // } else if(openId && openId != 'undefined' && openId != '') {
      //   this.getUserCode(openId);
      // }
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/common.scss";
</style>

<style lang="scss" scoped>
  @import '~lib/sandal/core';
  @import '~assets/css/core/functions', '~assets/css/core/mixins', '~assets/css/core/vars';
  

</style>
