<template lang='html'>
      <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
            <div class='d-flex'>
                    <div class='wrapper'>
                      <h3 class='mb-0 font-weight-semibold'>Projeto</h3>
                    </div>
            </div>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>  
                 <div>
                    <h5 class="  font-weight-medium text-primary">Cadastro de Projeto</h5>
                    <p class="mb-5 mr-auto">Insira os dados abaixo.</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 auto-form-wrapper flex-column'>

                  <form  @submit.prevent="salvarProjeto" class="pt-0"  style="height: auto; width: 100%; max-width: 100%">
                    <div class=" col-lg-12  p-0 " >
                      <div class="d-flex collum-form mt-2 p-0">
                        <div class="form-group p-0 pr-1 col-lg-6">
                            <label>Nome do Projeto:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-outline"></i>
                              </span>
                            </div>
                              <input type="text" class="form-control text-style" placeholder="Nome do Projeto" v-model="nomeProjeto"> </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                            <label>Data de Início:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-format-list-numbers"></i>
                              </span>
                            </div>
                            <input type="date" class="form-control text-style" placeholder="Data/Hora Inicial" v-model="dataHora"> </div>
                        </div>
                      </div>

                      <div class="d-flex collum-form">
                        <div class="form-group p-0 pr-1 col-lg-6 ">
                            <label>Prazo de Entrega:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-network"></i>
                              </span>
                            </div>
                            <input type="date" class="form-control text-style" placeholder="Prazo de entrega" v-model="prazoEntrega"> </div>
                        </div>
                        <div class="form-group p-0 pr-1 col-lg-6  ">
                           <label>Designer Responsável:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                             <select  class="form-select p-2" 
                                      v-model="designer" 
                                      placeholder="Setor"
                                      type="number"
                                      style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080; height: 45px"
                                    >
                              <option value="" selected class="text-center">
                                        <span> Selecione </span>
                              </option>
                              <option :value="item.id_user" 
                                      selected class="text-center"
                                      v-for="item in engineer" :key="item.id_user"
                                    >
                                      <span> {{item.name_user}}</span>
                              </option>
                            </select> 
                          </div>
                        </div>
                      </div>

                      <div class="d-flex collum-form" >
                        <div class="form-group p-0 pr-1 col-lg-6 ">
                              <label>Prefix:</label>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text">
                                  <i class="mdi mdi-account-network"></i>
                                </span>
                              </div>
                                <select class="form-select p-2" 
                                        v-model="prefix_cod" 
                                        style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                      >
                                        <option value="" selected class="text-center"> Prefix </option>
                                        <option value="I" class="text-center"> I </option>
                                        <option value="LTA" class="text-center"> LTA </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group p-0 pr-1 col-lg-6 ">
                            <label>Status:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-network"></i>
                              </span>
                            </div>
                            <select class="form-select p-2" 
                                      v-model="status" 
                                      disabled
                                      style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                    >
                                      <option value="1" selected class="text-center"> Criado </option>
                              </select>                            
                          </div>
                        </div>
                      </div>
                
                      <div class="form-group text-left d-flex justify-content-end mt-5 mb-0">
                        <button class="btn btn-success submit-btn mr-3 py-2" style="" >SALVAR</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>

import JQuery from 'jquery'
let $ = JQuery

const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  data(){
    return {
      register: 1,
      // option: this.$route.params.option,
      nomeProjeto: '',
      dataHora:'',
      designer:'',
      cdProjeto: '',
      prazoEntrega:'',
      status:1,
      prefix_cod:'',
      engineer: '',
      doubleCheck: ''
    }
  },

  components: {},

  Watch: {},

  mounted(){ 
    this.searchEngineer();    
   },

  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

     searchEngineer(){

        let json =  { 
                      department_user: 4,
                      type_leader:0,
                    }   

      this.axios.post('/user/bydepartment', json)
      .then((response) => {
        console.log("response engineer project- --->>", response)
        let res =  response.data;
        if(res.status == true){
          this.engineer = res.data; 
        } else {
          this.engineer = 'Não foi possivél buscar Designer';
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },

    salvarProjeto(evt){

      let json = {
        name_project: this.nomeProjeto,
        date_input_project: this.dataHora,
        pic_project: Number(this.designer), 
        double_check: 0, 
        date_finish_project: this.prazoEntrega,
        status_project: Number(this.status),
        prefix_cod: this.prefix_cod,
      }
     
      this.axios.post('/project/create', json)
      .then((response) => {
        console.log("response- --->>", response)
        let res =  response.data.status;

        if(res == 'success'){
            this.Msg(
              "Projeto criado com sucesso!",
              "",
              "success",
              3000,
              false,
              "Não",
              false,
              "Sim",
            );
        
        } else {
          this.Msg(
              "Falha ao criar Projeto!",
              "",
              "error",
              3000,
              false,
              "OK",
              false,
              "",
            );
        
        }

      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },

    
    Msg(
      title,
      msg,
      icon,
      time,
      btnCancelar,
      titleBtnCancelar,
      btnConfirmar,
      titleBtnConfirmar,
    ) {
      
      this.$swal.fire({
        position: "center",
        type: icon, //success, warning, error
        title: title,
        text: msg,

        showCancelButton: btnCancelar,
        cancelButtonText: titleBtnCancelar,
        cancelButtonColor: "#cd4949",

        showConfirmButton: btnConfirmar,
        confirmButtonText: titleBtnConfirmar,
        confirmButtonColor: "#32a976",
        timer: time,
      }).then((result) => {

        if(icon == 'success' ){
          this.$emit('cadProject')
        } else { }

        if (result.isConfirmed) {
        } else {}
      });
    },

  }
}
</script>

<style>

.text-style{
  font-family: Arial, Helvetica, sans-serif;
  font-size:15px; 
}

@media (max-width: 1024px) {
  .collum-form  {
    flex-direction: column;
  }
}
</style>
