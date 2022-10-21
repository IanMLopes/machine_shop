<template lang="html">

  <section class="main-view">
    <div class="container-scroller">
      <app-header/>
      <div class="container-fluid page-body-wrapper">
        <app-sidebar/>
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view ></router-view>

           <!-- v-if="optionRegister ? $router.push({name:'profile', params: {optionRegister} } ) : 'name.router' " -->


          <!--  this.$router.push({
                name: 'EXAMPLE', 
                params: { errors: '123' }
            }); -->
             <!-- v-if="optionRegister ? $emit('registrationOption', optionRegister) : 'name.router' " -->
           <!-- <div>
              <profile-user  v-if="optionRegister"></profile-user>
            </div>
            -->
          </div>
             <!-- v-if="nome.router == 'registration' ? $emit('registrationOption', optionRegister) : '' " -->
          <!-- content wrapper ends -->
          <app-footer/>
        </div>
        <!-- main panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>

</template>

<script>
import AppHeader from '../src/components/partials/AppHeader'
import AppSidebar from '../src/components/partials/AppSidebar'
import AppFooter from '../src/components/partials/AppFooter'
import ProfileUser from './views/profile-user'

export default {
  name: 'main',
  data(){
    return {
      // optionRegister: 0,
    }
  },

  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    ProfileUser
  },

  watch: {
    // optionProfile: (value) => {
    //   console.log("value ==>", value)
    // }

  },

  beforeCreate() {
    if (!this.$session.exists()) {
        this.$router.push("/");
    }
  },

  methods:{  }
}
</script>

<style scoped lang="scss">
  .main-view {

  }
</style>
