<template lang='html'>
  <section class='Projeto' >
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 v-if="!type_user && departament == 6" class='page-title'>Suas Tarefas</h4>
          <h4 v-else class='page-title'>Projeto</h4>
        <!--  <div class='quick-link-wrapper w-100 d-md-flex flex-md-wrap'>
            <ul class='quick-links'>
              <li><a href='#'>ICE Market data</a></li>
              <li><a href='#'>Own analysis</a></li>
              <li><a href='#'>Historic market data</a></li>
            </ul>
            <ul class='quick-links ml-auto'>
              <li><a href='#'>Settings</a></li>
              <li><a href='#'>Analytics</a></li>
              <li><a href='#'>Watchlist</a></li>
            </ul>
          </div> -->
        </div>
      </div>
      <div class='col-md-12'>
        <div class='page-header-toolbar d-flex justify-content-between'>
          <div class='sort-wrapper btn-group' role='group' style="width: auto !important">
            <button type='button' style="width: 150px !important"  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 1"  >Listar</button>
            <button v-if="!type_user && departament != 6" type='button' style="width: 150px !important"  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 2">Double Check</button>
            <button v-if="!type_user && departament != 6" type='button' style="width: 150px !important"  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 3">Triple Check</button>
            <button v-if="!type_user && departament != 6" type='button' style="width: 150px !important"  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 4">Revisão</button>
            <button v-if="type_user && departament == 6" type='button' style="width: 150px !important"  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 2">Retrabalho</button>
            <button v-if="type_user == 0 && departament == 6" type='button' style="width: 150px !important"  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 2">Retrabalho</button>
             <!-- <button type='button'  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 2">Cadastrar</button> -->
            <!-- <button type='button' class='btn btn-primary toolbar-item'>Projeto</button> -->
          </div>
          <button v-if="(type_user == 1 &&  departament == 9)" class="btn rounded-circle d-flex flex-direction-end "  @click="optionProject = 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" style="color: #15b67d"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
      <div class='row'>

        <list-project 
              v-if="(optionProject == 1)  && (type_user == 1 && departament == 9)" 
              @editProject=" editProject"> 
        </list-project>              

        <register-project 
              v-if="(optionProject == 2) && (type_user == 1) && departament == 9" 
              @cadProject="optionProject = 1"> 
        </register-project>              

        <edit-project 
              v-if="(optionProject == 3) && (type_user == 1)" 
              :editDadosproject="dadosProject" 
              @editProjectSave="optionProject = 1" > 
        </edit-project>    

        <list-project-designer 
              v-if="(optionProject == 1) && (departament == 4)" 
              @editProject=" editProject"> 
        </list-project-designer>     

        <double-check
              v-if="(optionProject == 2) && (departament == 4)"
              > 
        </double-check>

        <triple-check 
              v-if="(optionProject == 3) && (departament == 4)" 
              > 
        </triple-check>     

        <list-revision-designer 
              v-if="(optionProject == 4) && (departament == 4)" 
              > 
        </list-revision-designer>

        <list-project-manufacture 
              v-if="optionProject == 1 && type_user == 1 && departament == 6"
              > 
        </list-project-manufacture> 

        <list-task-operator
              v-if="optionProject == 1 && type_user == 0 && departament == 6"
              > 
        </list-task-operator>

        <list-rework-operator
              v-if="optionProject == 2 && type_user == 0 && departament == 6"
              > 
        </list-rework-operator>

        <list-drawing-quality
              v-if="type_user == 1 && departament == 8"
              > 
        </list-drawing-quality>

        <list-rework-manufacture 
              v-if="optionProject == 2 && type_user == 1 && departament == 6"
              > 
        </list-rework-manufacture> 
      </div>

  </section>
</template>

<script>

import listProject from '../components/project/list-project'
import registerProject from '../components/project/register-project'
import editProject from '../components/project/edit-project'

//engineer
import listProjectDesigner from '../components/project/list-project-designer'
import listRevisionDesigner from '../components/project/list-revision-designer'
import doubleCheck from '../components/drawing/double-check'
import tripleCheck from '../components/drawing/triple-check'

//manufacture
import listProjectManufacture from '../components/manufacture/list-project-manufacture'
import listReworkManufacture from '../components/manufacture/list-rework-manufacture'
import listTaskOperator from '../components/manufacture/list-task-operator'
import listReworkOperator from '../components/manufacture/list-rework-operator'

//quality
import listDrawingQuality from '../components/quality/list-drawing-quality'

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
      dataUser : JSON.parse(sessionStorage.getItem('keyPermission')),
      type_user: '',
      departament:'',
    }
  },

  components: {
    listProject,
    registerProject,
    editProject,
    listProjectDesigner,
    listRevisionDesigner,
    doubleCheck,
    tripleCheck,
    listProjectManufacture,
    listTaskOperator,
    listDrawingQuality, 
    listReworkManufacture,
    listReworkOperator
  },

  Watch: {},

  mounted(){ 
    this.optionProject = 1;
    this.type_user = this.dataUser.type_leader;
    this.departament = this.dataUser.department_user;
    console.log("departament: ", this.departament )
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
