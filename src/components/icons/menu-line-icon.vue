<template>
  <svg class="open-menu__line" :class="'open-menu__line' + index" width="38" height="4" viewBox="0 0 38 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="4" fill="#FFC500"/>
  </svg>
</template>

<script>
export default {
  props: ['index']
}
</script>
