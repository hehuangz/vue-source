/* @flow */
import RouterLink from './router-link'
import RouterView from './router-view'
let Vue
export default class HRouter {
  constructor (options) {
    this.$options = options // { mode, base, routes } 参数

    // 5. 路由变化，让 render 重新执行,即，方法就是将 current 设为响应式的
    // Vue.util.defineReactive(this, 'current', '/')

    // 8.2 设置 match 数组，遍历匹配路由
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', [])
    this.match()

    // 4. 监听路由变化
    window.addEventListener('hashchange', this.hashChange.bind(this))
    // 6. 页面刷新仍能监听到 current 变化
    window.addEventListener('load', this.hashChange.bind(this))
    // 7. 优化：缓存 routes 路由表，避免 3.1 中反复遍历
    // this.routesMap = {}
    // this.$options.routes.map(item => {
    //   this.routesMap[item.path] = item
    // })
  }

  hashChange () {
    this.current = window.location.hash.slice(1) // 截取#后面的字符
    this.matched = []
    this.match()
  }

  match (routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (this.current === '/' && route.path === '/') { // 首页
        return this.matched.push(route)
      }

      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
}

HRouter.install = function (_vue) {
  Vue = _vue
  // 1. $router属性挂载，随时可以访问到该实例
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 2. 实现 <router-link> 组件
  Vue.component('router-link', RouterLink)

  // 3. 实现 <router-view> 组件
  Vue.component('router-view', RouterView)
}
