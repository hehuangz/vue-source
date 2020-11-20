export default {
  render (h) {
    // 3.1 找到要渲染的组件
    // const com = this.$router.$options.routes.find(item => {
    //   return item.path === this.$router.current
    // })
    // return com && com.component ? h(com.component) : h(null)

    //  3.2 优化，避免反复渲染
    const { routesMap, current } = this.$router
    return h(routesMap[current].component)
  }
}
