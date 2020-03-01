<template lang="pug">
.to-top
  transition(name='translate')
    button(@click='top' v-if='isScrolled' title='返回頂部') ↑
</template>

<script>
import { throttle } from 'throttle-debounce'

const VueScrollTo = require('vue-scrollto')

export default {
  name: 'ToTop',
  data () {
    return {
      isScrolled: false,
    }
  },
  mounted () {
    this.setOnScroll()
  },
  methods: {
    setOnScroll () {
      const throttled = throttle(250, () => {
        this.isScrolled = document.documentElement.scrollTop > 100
      })

      window.addEventListener('scroll', throttled)
      this.$once('hook:beforeDestroy', () => window.removeEventListener('scroll', throttled))
    },
    top () {
      VueScrollTo.scrollTo('body', 200)
    }
  },
}
</script>
 
<style scoped lang="sass">
.translate
  &-enter, &-leave-to
    transform: translateX(5rem)
  &-enter-to, &-leave
    transform: none
  &-enter-active, &-leave-active
    transition: transform .2s
    
.to-top
  position: fixed
  bottom: 1rem
  right: 1rem
  z-index: 10
  button
    +clear-default-input-style
    +flex-center
    width: 3rem
    height: 3rem
    font-weight: 900
    background-color: white
    border-radius: 100rem
    user-select: none
    &:active
      background-color: $grey
</style>
