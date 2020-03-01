<template lang="pug">
.text-field
  input(
    type='text'
    :value='value'
    @input="$emit('input', $event.target.value)"
    :placeholder='placeholder'
    :maxlength='maxlength'
    @keyup.enter='isOnKeyEnterBlur && $event.target.blur()'
  )
  transition(name='fade')
    button.clear-btn(@click="$emit('input', '')" v-if='value') ✗
</template>

<script>
export default {
  name: "TextField",
  props: ['value', 'maxlength', 'placeholder', 'isOnKeyEnterBlur'],
}
</script>

<style scoped lang="sass">
.text-field
  position: relative
  display: inline-block
  width: 100%
  margin-bottom: .25rem

  input[type=text]
    +clear-default-input-style
    color: white
    border: solid 1px grey
    padding: 2px 10px
    background-color: transparent
    transition: border .2s
    width: 100%

    &:focus
      appearance: none
      border: solid 1px $primary
      
  input:focus
    + button.clear-btn
      color: $primary
    
  button.clear-btn
    +clear-default-input-style
    transition: all .2s
    display: inline-block
    position: absolute
    padding: 0
    top: 50%
    transform: translateY(-50%)
    right: 10px
    color: $grey
</style>