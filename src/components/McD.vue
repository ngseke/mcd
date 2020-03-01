<template lang="pug">
.container
  ToTop
  header.row.justify-content-center: .col-12.col-lg-10
    h1(title='I Love McD'): img(src='@/assets/logo.png' alt='I Love McD')
    span.updated(v-if='data' @click='refetch') 上次更新 {{ updatedDate }}
    
    Links(:sections='data.content' v-if='data')
      
  .panel.row: .col-12.col-lg-10
    .row.align-items-center
      .col-12.col-sm-auto
        TextField(v-model.trim='search' placeholder='搜尋' maxlength='10' :isOnKeyEnterBlur='true')
      .col-12.col-sm-auto
        label
          input(type='checkbox' v-model='isAllSetShow')
          span 所有套餐價格
        label
          input(type='checkbox' v-model='isTable')
          span 表格
  
  transition(name='fade' mode='out-in')
    .error(v-if='data === false') 暫時查不到價 :(
    Loader(v-else-if='!data')
    .row.justify-content-center(v-else)
      section.col-12.col-lg-10(v-for='section in data.content')
        h2(:id='section.title'): span {{ section.title }}
        span.no-result(v-if='!filterItems(section.content).length') 無結果
        DataTable(v-else-if='isTable' :list='filterItems(section.content)' :briefSets="briefSets" :isAllSetShow='isAllSetShow')
        List(v-else :list='filterItems(section.content)' :briefSets="briefSets" :isAllSetShow='isAllSetShow')
        
  Footer
    .source(v-if='data')
      span.label source:
      a(:href='data.source.url' target='_blank') {{ data.source.name }}
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import List from '@/components/List.vue'
import DataTable from '@/components/DataTable.vue'
import ToTop from '@/components/ToTop.vue'
import Loader from '@/components/Loader.vue'
import Links from '@/components/Links.vue'
import TextField from '@/components/TextField.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Menu',
  components: {
    List,
    DataTable,
    ToTop,
    Loader,
    Links,
    TextField,
    Footer,
  },
  data () {
    this.briefSets = ['單點', '經典', '薯餅']
    return {
      data: null,
      search: '',
      isAllSetShow: false,
      isTable: false,
    }
  },
  async mounted () {
    await this.fetch()
  },
  methods: {
    async fetch () {
      try {
        this.data = null
        this.data = (await axios.get('/api/get')).data
      } catch (err) {
        this.data = false
      }
    },
    refetch () {
      if (this.data) this.fetch()
    },
    filterItems (list) {
      return list.filter(item => item.main.includes(this.search))
    },
  },
  computed: {
    updatedDate () {
      const { data } = this
      return data
        ? dayjs(data.updatedDate).format('YYYY-MM-DD')
        : null
    },
  }
}
</script>
 
<style scoped lang="sass">
$panel-height: 5rem
  
header
  padding: 1rem 0 .5rem
  
.panel
  +flex-center
  background-color: $dark
  height: $panel-height
  position: sticky
  top: 0
  z-index: 6

h1
  display: inline-block
  color: $primary
  font-weight: 100
  margin-bottom: 0
  img
    height: 2rem
    width: auto
  
.updated
  cursor: pointer
  margin-bottom: .5rem
  font-size: 10px
  color: rgba(white, .8)
  display: inline-block
  padding-left: 5px
  
h2
  background-color: $dark
  font-weight: 100
  margin: .5rem 0 1rem
  position: sticky
  top: calc(#{$panel-height} - 5px)
  z-index: 5
  padding-bottom: .25rem
  &::after
    content: ''
    position: absolute
    bottom: -2.5rem
    left: 0
    right: 0
    height: 2.5rem
    background-image: linear-gradient(to top, rgba($dark, 0) 50%, $dark)
  span
    border-left: solid rgba(white, .5) 5px
    padding-left: 1rem

section
  margin-bottom: 1.5rem

.error
  text-align: center
  padding: 3rem 0
  margin-bottom: 3rem
  font-style: italic
    
.source
  color: rgba(white, .8)
  font-size: .8rem
  margin-bottom: 1rem
  .label
    margin-right: .25rem
  a
    color: $primary
      
.no-result
  color: rgba(white, .6)
  font-size: .8rem
  font-style: italic
  
.fade
  &-enter, &-leave-to
    opacity: 0
  &-enter-to, &-leave
    opacity: 1
  &-enter-active, &-leave-active
    transition: all .2s
</style>
