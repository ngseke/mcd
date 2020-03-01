<template lang="pug">
span.badge(v-if='isNew') {{ value }}{{ suffix }}
span.badge.badge-new(v-else)
</template>

<script>
export default {
  name: "Badge",
  props: ['value', 'suffix'],
  computed: {
    isNew () {
      const str = `${this.value}`
      return !str.includes('NEW')
    }
  },
}
</script>

<style scoped lang="sass">
.badge
  display: inline-block
  background-color: $primary
  color: $dark
  font-size: 12px
  font-weight: bold
  border-radius: 5px
  padding: 1px 5px
  margin-right: .75rem
  box-shadow: 2px 2px 0px $primary-dark
  flex-shrink: 0
  min-width: 1.75rem
  text-align: center
  
  &-new
    color: transparent
    background-color: transparent
    box-shadow: none
    margin-right: .5rem
    padding: 1px 0
    &::after
      text-shadow: 0 0 5px $primary
      color: $primary
      content: '★'
</style>