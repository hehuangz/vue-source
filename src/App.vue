<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <!-- <h1 @click="$store.commit('UPDATE_COUNT')">sync 显示count：{{$store.state.count}}</h1>
    <h1 @click="$store.dispatch('add')">async 2s显示count：{{$store.state.count}}</h1>
    <h1>doubleCount：{{$store.getters.doubleCount}}</h1> -->
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.state = {} // 测试是否可以修改 state
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
