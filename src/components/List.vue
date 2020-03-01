<template lang="pug">
transition-group.row.menu(name='item' tag='ul')
  li(v-for='item in list' :class='liClass' :key='item.main')
    .header
      Badge(:value='item.no' suffix='號')
      h3.main {{ item.main }}
    .row
      .col-auto.set(v-for='(price, setName) in item.content' v-show='getIsSetShow(setName)')
        .set-name {{ setName }}
        .price(:class='{ border: setName.includes(`單點`) }') {{ price }}
</template>

<script>
import { menu } from '@/mixins/menu'
import Badge from '@/components/Badge.vue'

export default {
  name: 'List',
  mixins: [menu],
  components: {
    Badge
  },
  props: ['isAllSetShow', 'list', 'briefSets'],
  computed: {
    liClass () {
      const { isAllSetShow } = this
      return {
        'col-12 col-lg-6': isAllSetShow,
        'col-6 col-md-4 col-lg-3': !isAllSetShow,
      }
    },
  }
}
</script>
 
<style scoped lang="sass">
ul.menu
  list-style: none
  padding: 0
  li
    margin-bottom: .5rem
    .set
      margin-bottom: .5rem
      .set-name
        font-size: 10px
        color: rgba(white, .8)
      .price
        font-family: 'Oswald'
        font-size: 1.2rem
        font-weight: 300
        border: solid 1px transparent
        border-radius: 10px
        &::before
          content: '$'
          font-size: 1rem
        &.border
          border-color: rgba($grey, .5)
          padding: 1px 3px
          
    
.header
  display: flex
  align-items: flex-start
  margin-bottom: .5rem
  
h3.main
  color: $primary
  display: inline-block
  font-size: 14px
  font-weight: normal
  margin: 0
</style>
