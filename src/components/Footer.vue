<template lang="pug">
footer
  slot
  github-button(href='https://github.com/seanyellow/mcd' data-color-scheme='no-preference: dark; light: dark; dark: dark;') Star
</template>

<script>
import GithubButton from 'vue-github-button'

export default {
  name: "Footer",
  components: {
    GithubButton,
  },
}
</script>

<style scoped lang="sass">
footer
  padding: 1rem 0
  text-align: center
</style>