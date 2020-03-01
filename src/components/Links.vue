<template lang="pug">
div.links
  ul
    li(v-for='i in links')
      a(v-scroll-to='{ el: i.el, offset: -70 }' href='#') \#{{ i.name }}
</template>

<script>
export default {
  name: "Links",
  props: ['sections'],
  computed: {
    links () {
      const { sections } = this
      if (!sections) return []
      return sections.map(_ => ({
        el: `#${_.title}`,
        name: _.title
      }))
    }
  },
}
</script>

<style scoped lang="sass">
.links
  position: relative
  ul
    width: 100%
    list-style: none
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    overflow: auto
    padding: 0
    font-size: 12px
    scroll-behavior: smooth
    margin-bottom: 0
    li
      margin-right: .5rem
      white-space: nowrap
      padding: 5px 0
      a
        color: $primary
      &:last-child
        padding-right: 1rem
    &::-webkit-scrollbar
      display: none
  &::after
    content: ''
    position: absolute
    top: 0
    bottom: 0
    right: 0
    width: 2rem
    background-image: linear-gradient(to left, $dark 10%, rgba($dark, 0))
</style>