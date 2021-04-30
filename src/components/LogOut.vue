<template >
    <v-btn icon @click="logOut">
      <v-icon>fas fa-power-off</v-icon>
    </v-btn>
</template>

<script>


export default {
  name: 'LogOut',
  data () {
    return {
      logout: { title: "Kilépés", icon: "fas fa-power-off" }
    }
  },
  methods: {
    logOut(){
      localStorage.removeItem('userid');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push('/model3d')
    }
  }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>
