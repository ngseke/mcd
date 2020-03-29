<template lang="pug">
.data-table
  table
    thead
      tr
        td(v-for='set in sets')
          .set-name {{ set }}
    transition-group.menu(name='item' tag='tbody')
      tr(v-for='item in list' :key='item.main')
        td
          Badge(:value='item.no')
          h3.main {{ item.main }}
        td(v-for='(price, setName) in item.content' v-show='getIsSetShow(setName)')
          .set
            .price(:class='{ border: setName.includes(`單點`) }') {{ price }}
</template>

<script>
import { menu } from '@/mixins/menu'
import Badge from '@/components/Badge.vue'

export default {
  name: 'DataTable',
  mixins: [menu],
  components: {
    Badge
  },
  props: ['isAllSetShow', 'list', 'briefSets'],
  computed: {
    sets () {
      const head = Object.keys(this.list[0].content)
        .filter(this.getIsSetShow)
        .map(i => i.replace(/配餐/g, ''))
        
      return [null, ...head]
    }
  }
}
</script>
 
<style scoped lang="sass">
.data-table
  max-width: 100%
  overflow-x: auto
  scroll-behavior: smooth
  position: relative
  &::-webkit-scrollbar
    display: none
  
table
  tr
    td
      transition: padding .2s
      @include media-breakpoint-up(md)
        padding: 3px 10px!important
    
  thead
    tr
      td
        height: 3rem
        padding-bottom: 5px
        
  tbody
    tr
      td
        width: auto
        &:first-child
          min-width: 7rem
          white-space: nowrap
        &:not(:first-child)
          text-align: right
          padding: 2px 5px
          
          
.set-name
  display: flex
  justify-content: flex-end
  align-items: center
  font-size: 10px
  color: rgba(white, .8)
  height: 100%
  text-align: right
  vertical-align: middle
  width: 100%
  @include media-breakpoint-down(sm)
    writing-mode: vertical-rl
   
  
.price
  display: inline-block
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
