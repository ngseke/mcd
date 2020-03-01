<template lang="pug">
.loader
  .icon {{ icon }}
  div loading...
</template>

<script>
export default {
  name: "Loader",
  computed: {
    icon () {
      const icons = ['🍔', '🍟', '🥤', '🍦']
      return icons.sort(() => Math.random() - 0.5)[0]
    }
  },
}
</script>

<style scoped lang="sass">
.loader
  color: $primary
  font-weight: 100
  text-align: center
  letter-spacing: 2px
  text-transform: uppercase
  padding: 5rem 0
  .icon
    margin-bottom: 5px
    font-size: 1.5rem
</style>