<template lang="html">
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <a href="#" class="nav-link">
            <!-- <div class="profile-image">
              <img class="img-xs rounded-circle" src="../../assets/images/faces/face8.jpg" alt="profile image">
              <div class="dot-indicator bg-success"></div>
            </div> -->
            <div class="text-wrapper">
              <p class="profile-name">{{dataUser.name_user}}</p>
             <!-- <p class="designation">Master user</p> -->
            </div>
          </a>
        </li>
        <li class="nav-item nav-category">Menu Principal</li>

        <li v-if="type_user == 1" class="nav-item">
            <router-link class="nav-link"to="/dashboard">
              <i class="menu-icon typcn typcn-document-add"></i>
              <span class="menu-title">Dashboard</span>
            </router-link>
        </li>

        <li v-if="type_user == 1 && departament == 9" class="nav-item">
          <a class="nav-link" v-b-toggle="'registration-dropdown'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">Gerenciar</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="registration-dropdown">
            <ul class="nav flex-column sub-menu text-uppercase">
              <li class="nav-item">
                <router-link class="nav-link" to="/colaborator">Colaborador</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/machine">Máquina</router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/registration-task">Tarefa</router-link>
              </li> -->
            </ul>
          </b-collapse>
        </li>
        <li v-if="type_user == 1 && (departament == 4 || departament == 6 || departament == 9 ) " class="nav-item">
            <router-link class="nav-link" to="/project"    >
              <i class="menu-icon typcn typcn-document-add"></i>
              <span class="menu-title">Projeto</span>
            </router-link>
        </li>

        <li v-if="type_user == 0 && (departament == 4 ) " class="nav-item">
            <router-link class="nav-link" to="/project"    >
              <i class="menu-icon typcn typcn-document-add"></i>
              <span class="menu-title">Projeto</span>
            </router-link>
        </li>
      
        <li v-if="type_user == 0 && departament == 6" class="nav-item">
            <router-link class="nav-link" to="/project"    >
              <i class="menu-icon typcn typcn-document-add"></i>
              <span class="menu-title">Tarefas</span>
            </router-link>
        </li>
        <li v-if="type_user == 1 && departament == 8" class="nav-item">
            <router-link class="nav-link" to="/project"    >
              <i class="menu-icon typcn typcn-document-add"></i>
              <span class="menu-title">Desenhos</span>
            </router-link>
        </li>
        <!--
        <li v-if="type_user == 1" class="nav-item">
          <a class="nav-link" v-b-toggle="'dashboard-dropdown'">
            <i class="menu-icon typcn typcn-document"></i>
            <span class="menu-title">Monitoramento</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="dashboard-dropdown">
            <ul class="nav flex-column sub-menu text-uppercase">
              <li class="nav-item">
                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/registration-ms">Registration</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/monitoring-">monitoring</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        -->
        <!--
         <li class="nav-item">
          <span class="nav-link" v-b-toggle="'charts-dropdown'">
            <i class="menu-icon typcn typcn-th-large-outline"></i>
            <span class="menu-title">Charts</span>
            <i class="menu-arrow"></i>
          </span>
          <b-collapse id="charts-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/chartjs/">Chart js</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        -->
        <!--
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'icons'">
            <i class="menu-icon typcn typcn-user-outline"></i>
            <span class="menu-title">Icons</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="icons">
            <ul class="nav flex-column sub-menu">
               <li class="nav-item">
                <router-link class="nav-link" to="/mdiIcons/">MDI</router-link>
              </li>
            </ul>
          </b-collapse>
        </li> 
        -->
        <!--
        <li class="nav-item">
          <a class="nav-link" href="https://www.bootstrapdash.com/product/star-admin-vue/docs/documentation.html">
            <i class="menu-icon typcn typcn-document-add"></i>
            <span class="menu-title">Doc</span>
          </a>
        </li>
        -->
      </ul>
    </nav>
  </section>
</template>

<script lang="js">
// import JQuery from 'jquery'
// eslint-disable-next-line
// let $ = JQuery
export default {
  name: 'app-sidebar',
  
  data(){
    return {
      type_user: '',
      dataUser:'',
      departament: '',
    }
  },

  mounted () {
    const body = document.querySelector('body')
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })

  this.dataUser = JSON.parse(sessionStorage.getItem('keyPermission'));
  this.type_user = this.dataUser.type_leader;
  this.departament = this.dataUser.department_user;  

  }
}
</script>

<style scoped lang="scss">
.app-sidebar {
}
</style>
