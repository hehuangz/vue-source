import RouterLink from './router-link'
import RouterView from './router-view'
let Vue
export default class HRouter {
  constructor (options) {
    this.$options = options // {mode, base, routes}参数

    // 5. 路由变化，让 render 重新执行,即，方法就是将 current 设为响应式的
    Vue.util.defineReactive(this, 'current', '/')
    // 4. 监听路由变化
    window.addEventListener('hashchange', this.hashChange.bind(this))
    // 6. 页面刷新仍能监听到 current 变化
    window.addEventListener('load', this.hashChange.bind(this))
    // 7. 优化：缓存 routes 路由表，避免 3.1 中反复遍历
    this.routesMap = {}
    this.$options.routes.map(item => {
      this.routesMap[item.path] = item
    })
  }

  hashChange () {
    this.current = window.location.hash.slice(1) // 截取#后面的字符
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
