export default {
  props: {
    to: {
      type: String,
      require: true
    }
  },
  // 渲染组件，使用 render 函数，不能使用 template，因为是运行时的版本，这个版本没有编译器
  // 使用 render 可以不用 h 方法，可以写 jsx，因为有 vue-cli，如果没有 cli 则不能使用
  render (h) {
    // <a href="about">去往about页面</a>
    // return <a href={this.to}>{this.$slots.default}</a>
    return h('a', {
      attrs: { href: '#' + this.to }
    },
    this.$slots.default
    )
  }
}
