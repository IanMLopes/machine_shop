<template>
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabelReg"> Cadastrar Tarefas</h5>
          <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div> 
            <form  @submit.prevent="salvarTarefa" class="pt-0"  style="height: auto; width: 100%; max-width: 100%">
                  <div class=" col-lg-12  p-0" >
                    <div class="d-flex collum-form mt-2 p-0">
                      <div class="form-group p-0 pr-1 col-lg-6 " >
                          <label>Nome da Tarefa:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-outline"></i>
                            </span>
                          </div>
                            <input type="text" class="form-control text-style"  v-model="nomeTarefa"> 
                        </div>
                      </div>
                      <div class="form-group p-0 col-lg-6">
                          <label>Tempo Estimado:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-format-list-numbers"></i>
                            </span>
                          </div>
                          <input type="time" class="form-control text-style"  v-model="tempoEstimado"> 
                        </div>
                      </div>
                    </div>
                    <div class="d-flex collum-form">
                      <div class="form-group p-0 pr-1 col-lg-6 ">
                        <label>Data Início:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <input type="date" class="form-control text-style"  v-model="dataInicio">
                        </div>
                      </div>
                      <div class="form-group p-0 pr-1 col-lg-6 ">
                          <label>Hora Início:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-network"></i>
                              </span>
                            </div>
                            <input type="time" class="form-control text-style" v-model="horaInicio">
                          </div>
                      </div>
                    </div>
                    <div class="d-flex collum-form" >
                      <div class="form-group p-0 pr-1 col-lg-6 ">
                        <label>Quantidade de Peças:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <input type="number" class="form-control text-style" v-model="pecas">
                        </div>
                      </div>
                      <div class="form-group p-0 pr-1 col-lg-6 ">
                        <label>Tipo de Terafa:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <input type="number" class="form-control text-style"  v-model="tipoTask">
                        </div>
                      </div>
                    </div>
                    <div class="d-flex collum-form" >
                      <div class="form-group p-0 pr-1 col-lg-6">
                        <label>Tipo de Processo:</label>
                        <div class="input-group d-flex">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <select class="form-select p-2" 
                                  v-model="tipoProcesso" 
                                  style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                >
                                  <option value="" class="text-center"> Selecione </option>
                                  <option value="1" class="text-center"> Corte </option>
                                  <option value="2" class="text-center"> Torneamento </option>
                                  <option value="3" class="text-center"> Fresagem </option>
                                  <option value="4" class="text-center"> CNC </option>
                                  <option value="5" class="text-center"> Montagem </option>
                                  <option value="6" class="text-center"> Geral </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group p-0 pr-1 col-lg-6 ">
                        <label>Status:</label>
                        <div class="input-group d-flex">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <select class="form-select p-2"
                                  v-model="statusTask" 
                                  style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                >
                                  <option value="1" class="text-center"> Iniciada </option>
                                  <option value="2" class="text-center"> Parada </option>
                                  <option value="3" class="text-center"> Finalizada </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex collum-form" >
                      <div class="form-group p-0 pr-1 col-lg-6 ">
                          <label>Nome do Operador:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <select class="form-select p-2" 
                                    v-model="idUser" 
                                    style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                  >
                                    <option  value="" selected class="text-center"> Selecione </option>
                                    <option :value="item.register" v-for=" item in dataUser"  class="text-center"> {{item.name_user}} </option>
                            </select>                            
                        </div>
                      </div>
                    </div>
                    <div class="form-group text-left d-flex justify-content-end mt-5 mb-0">
                      <button class="btn btn-success submit-btn mr-3 py-2" style="">SALVAR</button>
                    </div>
                  </div>
              </form>
          </div>
        </div>
        <!--<div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Send message</button>
        </div> -->
      </div>
    </div>
</template>

<script>

const Swal = require("sweetalert2");

export default {

  props:['codProject'],

  data(){
    return {
      teste: false,
      nomeTarefa:'',
      tempoEstimado:'',
      dataInicio: '',
      horaInicio:'',
      pecas:'',
      tipoTask:'',
      tipoProcesso:'',
      statusTask: 1,
      dataUser:'',
      idUser:'',
    }
  },

  components: {},

  Watch: {
    codProject(val){
      // console.log("val--->>>", val)
    },
  },

  mounted(){
    // console.log("User colaborator -->>>>>", this.dataUser)
 
    this.listUser();
  },

  methods: {
    
    listUser(){
      this.axios.get('/users')
      .then((response) => {
        // console.log("response-user  --->>", response)
        let res =  response.data;
        // if(res.status == 'success'){
          this.dataUser = res.data;
          // console.log("User -->>>>>", this.dataUser)
        // } else {
        //   cnosnole.log("Não há nenhum registro!")
        // }
      })
      .catch((error) => {
        console.log("Erro: connect server")
      })       
    },

    salvarTarefa(evt){

      let dataHora  = this.dataInicio + " " + this.horaInicio;

      let json = {
            // id_task:3,
            id_project: this.codProject,
            type_task: Number(this.tipoTask),
            type_process: Number(this.tipoProcesso),
            name_task: this.nomeTarefa,
            date_scheduled_task: dataHora,
            status_task: Number(this.statusTask),
            time_task: this.tempoEstimado,
            id_user: this.idUser,
            qtd_piece: Number(this.pecas)
      }

      // console.log("data -->>", json)

      this.axios.post('/task/create', json)
      .then((response) => {
        // console.log("response- --->>", response)
        let res =  response.data.status;

        if(res == 'success'){
            this.Msg(
              "Tarefa criada com sucesso!",
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
              "Falha ao criar Tarefa!",
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
        consle.log("result",result)

        if(icon == 'success' ){
          // console.log("tarefa cadastrada com sucesso --->>")
          this.$emit('cadastProject')
          this.$emit('cadProject')
        } else { }

        if (result.isConfirmed) {
        } else {}
      });
    },


    statusType(value){
      switch (value) {
        case 1:
          this.textStatus = 'Agendadas';
          break;
        case 2:
          this.textStatus = 'Iniciadas';
          break;
        case 3:
          this.textStatus = 'Paradas';
          break;
        case 4:
          this.textStatus = 'Finalizadas';
          break;
        default:
          console.log(`Sem status  ${value}.`);
      }
    },

    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

    areaLateral(){
      if( $('.med').hasClass('active')){
          $('.med').removeClass('active');
      }else{
          $('.med').addClass('active');
      }
    },


    listProject(){
     
      this.axios.get('/projects')
      .then((response) => {
        let res =  response.data;
        if(res.status == 'success'){
          this.projects = res.data;
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },

    deletProject(value){

       let json = {
        cod_project: value,
      }

      console.log("json -->>", json)

      this.axios.delete(`/project/delete/${value}`, json)
      .then((response) => {
        console.log("response- --->>", response)
        let res =  response.data.status;

        if(res == 'success'){
            this.Msg(
              "Projeto excluído com sucesso!",
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
              "Falha ao excluir Projeto!",
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
          this.listProject();
        } else { }

        if (result.isConfirmed) {
        } else {}
      });
    },


  }
}
</script>

<style>

@media (max-width: 650px) {
  table  {
    font-size:12px;
  }
  .card .card-body {
        padding: 0 !important;
  }
}
@media (max-width: 502px) {
  table  {
    font-size:10px;
  }
}

.med{
  height: 98%  !important;
  /* width: 500px; */
  position: fixed;
  transition: all 0.5s;
  right: -100%; 
  margin-right: 0px;
  z-index: 9;
  top:10px;
  }

.active{
  right: 0px;
  height: 100%;
}

.text-style{
  font-family: Arial, Helvetica, sans-serif;
  font-size:15px; 
}

</style>
