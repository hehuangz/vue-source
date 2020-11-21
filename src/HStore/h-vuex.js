let Vue
class Store {
  constructor (options) {
    this.options = options
    this._mutations = options.mutations
    this._actions = options.actions
    // 2. 响应式处理，可以用 Vue.util.defineReactive()，这里采用另一种方法，绑定到 data 身上
    // this.state = new Vue({
    //   data: options.state
    // })

    // 5. 步骤 2 中store直接暴露出去，可以任意修改，危险，所以改为可以保护 store 的方式，利用 class 的get
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })

    // 6. dispatch 中会再次调用 commit 方法，再次调用时 this 指向改变了，所以此处绑定 this, dispatch 也顺便绑了，因为他们可以互调
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // 7. 实现 getter 方法,$store.getters.doubleCount
    // this.getters = options.getters
    // for (const key in this.getters) {
    //     return this.getters[key]
    // }
    // console.log(this, 66)
  }

  get state () {
    return this._vm._data.$$state
  }

  set state (v) {
    console.error('危险，不能设置state')
  }

  // 4. 添加 commit、dispatch 方法
  commit (type, payload) {
    const entry = this._mutations[type]
    entry && entry(this.state, payload)
  }

  dispatch (type, payload) {
    const entry = this._actions[type]
    entry && entry(this, payload)
  }
}
function install (_vue) {
  Vue = _vue // 3. 额外定义 Vue 来接收 _vue，就是为了避免 webpack 打包时，把 vue 又打包一次进去。此处的 _vue 来源于 vue 的插件原理
  // 4. mixin 挂载 Vue.prototype.$store，供外部使用
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 1. 因为 Vuex.store，需导出 store，因为 Vue.use(Vuex)，需自定义一个 install 插件
export default {
  Store,
  install
}
