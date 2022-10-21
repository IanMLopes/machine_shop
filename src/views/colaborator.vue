<template lang='html'>
  <section class='Projeto' >
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Colaboradores</h4>
        </div>
      </div>
      <div class='col-md-12'>
        <div class='page-header-toolbar d-flex justify-content-between'>
          <div class='sort-wrapper btn-group' role='group' style="width: auto !important">
            <button type='button' style="width: 150px !important"  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 1"  >Listar</button>
             <!-- <button type='button'  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 2">Cadastrar</button> -->
            <!-- <button type='button' class='btn btn-primary toolbar-item'>Projeto</button> -->
          </div>
          <button class="btn rounded-circle d-flex flex-direction-end "  @click="optionProject = 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" style="color: #15b67d"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
    <div class='row'>
      <list-colaborator v-if="optionProject == 1" @editProject=" editProject"> </list-colaborator>       
      <register-colaborator v-if="optionProject == 2" @cadProject="optionProject = 1"> </register-colaborator>              
     <!-- <edit-project v-if="optionProject == 3" :editDadosproject="dadosProject" @editProjectSave="optionProject = 1" > </edit-project>  -->
    </div>

  </section>
</template>

<script>

import listColaborator from '../components/colaborator/list-colaborator'
import registerColaborator from '../components/colaborator/register-colaborator'
// import editProject from '../components/project/edit-project'

import JQuery from 'jquery'
let $ = JQuery

const Swal = require("sweetalert2");

export default {
  name: 'Projeto',
  data(){
    return {
      optionProject: 1,
      register: 1,
      // option: this.$route.params.option,
      nomeProjeto: '',
      dataHora:'',
      dsigner:'',
      cdProjeto: '',
      prazoEntrega:'',
      dadosProject: '',
    }
  },

  components: {
    listColaborator,
    registerColaborator,
    // editProject
  },

  Watch: {},

  mounted(){ 
    this.optionProject = 1;
  },

  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

    editProject(value){
      this.optionProject = 3;
      this.dadosProject = value;
    }

  }
}
</script>

<style>

</style>
