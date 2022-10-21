<template>
       
    <div class="modal-dialog modal-xl"
      >
      <div class="modal-content  mb-4">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"> Adicionar Designer</h5>
          <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style=" overflow-y: scroll; height: 100% ">

            <form  @submit.prevent="salvarDesenho" class="pt-0"  style="max-width: 100%">
                  <div class=" col-lg-12  p-0" >
                    <div class="d-flex collum-form mt-2 p-0">
                      <div class="form-group p-0 pr-1 col-lg-6">
                          <label>Especificação:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-outline"></i>
                            </span>
                          </div>
                            <input type="text" class="form-control text-style"  v-model="especDrawing"> 
                        </div>
                      </div>
                      <div class="form-group p-0 col-lg-6">
                          <label>Material:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-format-list-numbers"></i>
                            </span>
                          </div>
                          <input type="text" class="form-control text-style"  v-model="materialDrawing"> 
                        </div>
                      </div>
                    </div>
                    <div class="d-flex collum-form">
                      <div class="form-group p-0 pr-1 col-lg-6 ">
                        <label>Fabricante:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <input type="text" class="form-control text-style"  v-model="fabricanteDrawing">
                        </div>
                      </div>
                          <div class="form-group p-0 pr-1 col-lg-6 ">
                        <label>Quantidade de Peças:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <input type="number" class="form-control text-style" v-model="pecasDrawing">
                        </div>
                      </div>
                    </div>
                    <div class="d-flex collum-form" >
                      <div class="form-group p-0 pr-1 col-lg-6 ">
                        <label>Prioridade:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <div class="d-flex">
                            <div class="d-flex ml-2">
                              <input type="radio" id="sim" value="1" v-model="prioridadeDrawing">
                              <label class="ml-1" for="sim" style="margin: auto">Sim</label>
                            </div>
                            <div class="d-flex ml-2" style="vertical-align: middle;">
                              <input type="radio" id="nao" value="0" v-model="prioridadeDrawing">
                              <label class="ml-1" for="nao" style="margin: auto">Não</label>
                            </div>                          
                          </div>
                        </div>
                      </div>
                      <div class="form-group p-0 pr-1 col-lg-6">
                        <label>Respons. do Double Check:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <select class="form-select p-2" 
                                  v-model="doubleDrawing" 
                                  style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                >
                                  <option  value="" selected class="text-center"> Selecione </option>
                                  <option :value="item.id_user" v-for=" item in engineerUser"  class="text-center"> {{item.name_user}} </option>
                          </select>  
                        </div>
                      </div>
                    </div>
                    <div class="d-flex collum-form" >
                      <div class="form-group p-0 pr-1 col-lg-6">
                        <label>Respons. do Triple Check:</label>
                        <div class="input-group d-flex">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                          <select class="form-select p-2" 
                                  v-model="tripleDrawing" 
                                  style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                >
                                  <option  value="" selected class="text-center"> Selecione </option>
                                  <option :value="item.id_user" v-for=" item in engineerUser"  class="text-center"> {{item.name_user}} </option>
                          </select>     
                        </div>
                      </div>  
                      <div class="form-group p-0 pr-1 col-lg-6">
                      </div>
                    </div>
                      <div class="pb-4 mb-5">
                        <arquivo-upload  @filesDrawingSelected='uploadFilesDrawing'> </arquivo-upload>
                      </div>
                  </div>
              </form>
        </div>
      </div>

      <div class="vld-parent">
        <!-- spinner or dots or bars -->
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :loader="typeLoader"
          color="#128ff2"
          background-color="#FFFD"
          :width='150'
          :height='70' 
          :is-full-page="true"
        ></loading>
      </div>

    </div>
</template>

<script>

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import ArquivoUpload from "./arquivo-upload"

const Swal = require("sweetalert2");

export default {

  props:['codProject'],

  data(){
    return {
      isLoading: false,
      typeLoader: 'bars',

      especDrawing:'',
      materialDrawing:'',
      pecasDrawing:'',
      fabricanteDrawing: '',
      prioridadeDrawing: 1,
      tripleDrawing:'',
      doubleDrawing:'',
      engineerUser:'',    
      dataUser: JSON.parse(sessionStorage.getItem('keyPermission')),
      cont: 0,
      drawingData: '',
      novoDrawing: [],
      percent: 0,
      draw: [],
      mod : false,
    }
  },

  components: {
    ArquivoUpload,
    Loading
  },

  Watch: {},

  mounted(){ 
    this.listUserEngineer();
  },

  methods: {

    fecharMod(){
      $('#fileUploadDetails').modal("hide");
    },

  async uploadFilesDrawing(filesDrawing){
      
      this.openLoading();

      await filesDrawing.map( async item => {
        var reader = new FileReader();
        reader.readAsDataURL(item.file);
        reader.onload =  () => {
              const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
              this.draw.push({ file: base64String,
                               name: item.name, 
                               material: item.materialPeca ? item.materialPeca : '', 
                               quant: item.quantPeca ? item.quantPeca : 0,
                            })
        };
      })
    },

    openLoading() {
       this.isLoading = true;
        setTimeout(() => {
          // clearInterval(interval)
          this.salvarDesenho()
        }, 4000)
    },
      
    FilesDrawing() {
        document.getElementById("fileUpload").click()        
    },         
    
    listUserEngineer(){

        let json =  { 
                      department_user: 4,
                      type_leader:0,
                    }          

        console.log("json engineer ---->>", json)


        this.axios.post('/user/bydepartment', json)
        .then((response) => {
          console.log("response engineer ==>>", response)
          let res =  response.data;
            this.engineerUser = res.data;
        })
        .catch((error) => {
          console.log("Erro: connect server") 
        })       
    },

    salvarDesenho(draw){

      let json = {
          cod_project: String(this.codProject),
          desc_drawing: 'descição drawing',
          status_drawing: 0,
          file_name: 'adicionado no back',
          id_user_dcheck: this.doubleDrawing ? Number(this.doubleDrawing) :  0,
          id_user_tcheck: this.tripleDrawing ? Number(this.tripleDrawing) : 0,
          id_user_upload: this.dataUser.id_user ? Number(this.dataUser.id_user) : 0,
          info_drawing: 'informaçao darwing',
          revision_drawing:0,
          check_piece: 0,
          qtd_piece: this.pecasDrawing ? Number(this.pecasDrawing) : 0,
          priority_drawing: Number(this.prioridadeDrawing),
          fabric_drawing: this.fabricanteDrawing,
          material_drawing: this.materialDrawing,
          specific_drawing: this.especDrawing,
          datetime_check_piece: 'datetime check pience',
          id_user_check_piece: 0,
          drawings: this.draw
      }
console.log("json ->", json )
      this.axios.post('/drawing/create', json)
      .then((response) => {
        console.log("response- --->>", response)
        let res =  response.data.status;

        if(res == 'success'){
            this.Msg(
              "Upload salvo com sucesso!",
              "",
              "success",
              3000,
              false,
              "Não",
              false,
              "Sim",
            );
            this.listProject()
            this.isLoading = false;
        
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
           this.isLoading = false;
        }

      })
      .catch((error) => {
         this.isLoading = false;
        // console.log("error" , error)
      })       
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
        timer: time,
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
