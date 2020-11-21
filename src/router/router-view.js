export default {
  render (h) {
    // 8. 实现嵌套路由, 8.1 router-view深度标记
    this.$vnode.data.routerView = true
    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++
        }
      }
      parent = parent.$parent
    }

    // 3.1 找到要渲染的组件
    // const com = this.$router.$options.routes.find(item => {
    //   return item.path === this.$router.current
    // })
    // return com && com.component ? h(com.component) : h(null)

    //  3.2 优化，避免反复渲染
    // const { routesMap, current } = this.$router
    // return h(routesMap[current].component)

    // 8.3 渲染
    let component = null
    const route = this.$router.matched[depth]
    if (route) {
      component = route.component
    }
    return h(component)
  }
}
