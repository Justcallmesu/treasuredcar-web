<template>
  <router-view/>
</template>

<script>
export default{
  data(){
    return{
      isHamburgerActive:false
    }
  },
  methods:{
    toggleHamburger(){
      this.isHamburgerActive = !this.isHamburgerActive;
    }
  },
  provide(){
    return {
      isHamburgerActive: ()=>this.isHamburgerActive,
      toggleHamburger:this.toggleHamburger
    }
  },
  computed:{
    getHamburger(){
      return this.isHamburgerActive;
    }
  }
}
</script>