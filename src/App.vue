<template>
  
    <RouterView />

</template>

<style lang="scss">
    @import 'bootstrap/scss/bootstrap';
</style>

<style scoped>


nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
  color:#009688;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: center;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
<script>
import { RouterLink, RouterView } from "vue-router";
export default{
  data(){
    return{
      
    }
  }
}
</script>
