<template lang='html'>
      <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary">Editar Projeto</h5>
                    <p class="mb-5 mr-auto">Editar os dados abaixo.</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 auto-form-wrapper flex-column'>

                  <form  @submit.prevent="editProjeto" class="pt-0"  style="height: auto; width: 100%; max-width: 100%">
                    <div class=" col-lg-12  p-0 " >
                      <div class="d-flex collum-form mt-2 p-0">
                        <div class="form-group p-0 pr-1 col-lg-6 " >
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
                        <div class="form-group p-0 pr-1 col-lg-6  ">
                           <label>Designer Responsável:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control text-style" placeholder="designer" v-model="designer" > </div>
                        </div>
                        <div class="form-group p-0 pr-1 col-lg-6 ">
                            <label>Data de Entrega:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-network"></i>
                              </span>
                            </div>
                            <input type="date" class="form-control text-style" placeholder="Prazo de entrega" v-model="prazoEntrega"> </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form" >
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
                                      style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                    >
                                      <option value="1" selected class="text-center"> Criado </option>
                                      <option value="2" selected class="text-center"> Parado </option>
                                      <option value="3" selected class="text-center"> Fianalizada </option>
                              </select>                            
                          </div>
                        </div>
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

// import JQuery from 'jquery'
// let $ = JQuery

const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  props:['editDadosproject'],
  data(){
    return {
      nomeProjeto: '',
      dataHora:'',
      designer:'',
      cdProjeto: '',
      prazoEntrega:'',
      status:'',
      prefix_cod:''
    }
  },

  components: {},

  Watch: {},

  mounted(){ 
    console.log(" editDadosproject ->>", this.editDadosproject)
    if(this.editDadosproject){
      this.nomeProjeto = this.editDadosproject.name_project;
      this.dataHora = this.editDadosproject.date_input_project;
      this.designer = this.editDadosproject.pic_project;
      this.cdProjeto = this.editDadosproject.cod_project;
      this.prazoEntrega = this.editDadosproject.date_finish_project;
      this.status = this.editDadosproject.status_project;
      this.prefix_cod = this.editDadosproject.prefix_cod;
    }
   },

  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

    editProjeto(evt){


      let json = {
        name_project: this.nomeProjeto,
        pic_project: this.designer,
        date_finish_project: this.prazoEntrega,
        date_input_project: this.dataHora,
        status_project: Number(this.status),
        cod_project: this.cdProjeto,
        prefix_cod: this.prefix_cod,
      }

      console.log("data -->>", json)
     
      this.axios.put('/project/update ', json)
      .then((response) => {
        console.log("response- --->>", response)
        let res =  response.data.status;

        if(res == 'success'){
            this.Msg(
              "Projeto editado com sucesso!",
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
              "Falha ao editar Projeto!",
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
        // timer: time,
      }).then((result) => {

        if(icon == 'success' ){
          this.$emit('editProjectSave')
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
