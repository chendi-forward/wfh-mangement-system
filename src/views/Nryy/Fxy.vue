<template>
  <div>
    发现页
    <img :src="logo">
  </div>
</template>

<script>
  import logo from 'ASSETS/img/logo.png'
  export default {
    name: 'fxy',
    data () {
      return {
        logo: logo
      }
    },
    mounted () {
      console.log(this.logo)
    }
  }
</script>

<style scoped>

</style>
