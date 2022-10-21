<template lang='html'>
    <!-- Page Title Header Ends-->
  <div class='col-md-12 grid-margin'>
    <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary">Máquinas</h5>
                    <p class="mb-5 mr-auto">Máquina Cadastrados</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 col-sm-12 auto-form-wrapper flex-column'>
                      <!-- MACHINE  -->
                        <table class="table table-hover" style=" width: 100% !important">
                          <thead  class="table-primary" style="padding: 8px !important">
                            <tr class="text-center">
                                  <th style="width: 20%; padding:10px 0px"> <div> NOME DA MÁQUINA</div> </th>                        
                                  <th style="width: 15%"> <div> TIPO DE PEOCESSO</div> </th>                        
                              </tr>    
                            </thead>
                            <tbody>
                              <tr class="text-center cursor-pointer" 
                                  style="cursor: pointer"
                                  v-for=" item in machines"
                                  :key="item.id_machine" 
                                  @click="showModalInfoMachine(item)"  
                                  data-bs-target="#machine"
                                  data-bs-toggle="modal"
                              >
                                  <td style="width: 20%">{{item.name_machine}}</td>                        
                                  <td style="width: 15%">
                                    <span v-if="item.id_process == 1">Corte</span>
                                    <span v-else-if="item.id_process == 2">Torneamento</span>
                                    <span v-else-if="item.id_process == 3">Fresagem</span>
                                    <span v-else-if="item.id_process == 4">CNC</span>
                                    <span v-else-if="item.id_process == 5">Montagem</span>
                                    <span v-else-if="item.id_process == 6">Geral</span>
                                  </td>                        
                              </tr>    
                            </tbody>
                        </table>
                  </div>
                      <!-- FIM MACHINE  -->                     
                </div>
              </div>
            </div>
          </div>

        <!-- FIM MODAL INFO MACHINE -->
          <div  class="modal fade" role="dialog" id="machine" 
                data-bs-backdrop="static" data-bs-keyboard="false" 
                tabindex="-1" aria-labelledby="machineLabel" 
                aria-hidden="true"
              >
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <div></div>
                <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <table  class="table table-hover">
                      <thead class="table-success">
                        <tr class="text-center border">
                          <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">id</p></th>
                          <th class="border p-0" style="vertical-align: middle; width: 40%"><p style="margin: auto">MÁQUINA</p></th>
                          <th class="border p-0" style="vertical-align: middle; width: 30%"><p style="margin: auto">TIPO DE PROCESSO</p></th>
                          <th class="border p-0" style="vertical-align: middle; width: 20%"><p style="margin: auto">IMAGEM</p></th>
                        </tr>
                      </thead> 
                  <tbody>
                    <tr class="text-center border">
                        <td class="border p-0" style="width: 10%">{{machineModal.id_machine}}</td>
                        <td class="border p-0" style="width: 40%">{{machineModal.name_machine}}</td>
                        <td class="border p-0" style="width: 30%">{{type_machine}}</td>
                        <td class="border p-0" style="width: 20%; cursor: pointer; display: absolute; z-index:999" >
                            <img  :src="'data:image/jpeg;base64,' + machineModal.path_photo_machine" 
                                  data-bs-target="#machineImageModal"
                                  data-bs-toggle="modal"
                                />
                        </td>
                    </tr>
                  </tbody>
                </table>              
              </div>
              <div class="modal-footer d-flex p-3 justify-content-end">
                      <div>
                        <button type="button" class="btn btn-primary" 
                                @click="showEdit = true"   
                              > 
                               <!-- data-bs-target="#machine-edit" 
                                data-bs-toggle="modal" -->
                                Editar 
                              </button>
                        <button type="button" class="btn btn-danger" @click="deletMachine(machineModal.id_machine)" > Excluir </button>
                      </div>
              </div> 
            </div>
          </div>
        </div>     
      <!-- FIM MODAL INFO MACHINE -->

      <!--  MODAL AMPLIAR IMAGEM -->
        <div class="modal fade modal-img" role="dialog" id="machineImageModal"
            data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" 
            aria-labelledby="machineImageModalLabel"
            aria-hidden="true"
          >
            <template>
              <div class="modal-header border-0">
                  <div class="text-white " style="width: 100%; text-align: center"> <span> {{machineModal.name_machine}}</span> </div>
                  <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close" data-bs-target="#machine" data-bs-toggle="modal"></button>
                </div>
            </template>
            <div class=" modal-dialog modal-xl">
                    <div class="d-flex justify-content-center">
                          <img :src="'data:image/jpeg;base64,' + machineModal.path_photo_machine"/> 
                    </div>  
            </div>
        </div>
      <!-- FIM  MODAL AMPLIAR IMAGEM -->
        
      <!-- MODAL EDITAR -->
        <div v-if="showEdit" >
            <edit-machine  @closeMachine="closeMachineEdit" :dataMachine="machineModal"></edit-machine>
        </div>
      <!-- FIM MODAL EDITAR -->
    
    </div>  
  </div>
</template>

<script>

import EditMachine from './edit-machine'

const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  data(){
    return {
      machines: [],
      type_machine: '',
      machineModal:'',
      machineImage: '',
      showEdit: false,
    }
  },

  components: {
    EditMachine,
  },

  Watch: {},

  created(){},

  mounted(){ 
    this.listMachine();
  },

  methods: {
    closeMachineEdit(){
      console.log("close emit -->>>")
      this.showEdit = false;
    },

    
    listMachine(){
      this.axios.get('/machines')
      .then((response) => {
        console.log("response machine --->", response)
        let res =  response.data;
        if(res.status == 'success'){
          this.machines = res.data;
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },

    deletMachine(value){
      this.$swal.fire({
          position: "center",
          type: 'warning', //success, warning, error
          title: 'Aviso!',
          text: 'Deseja realmante excluir?',

          showCancelButton: true,
          cancelButtonText: 'Não',
          cancelButtonColor: "#cd4949",

          showConfirmButton: true,
          confirmButtonText: 'Sim',
          confirmButtonColor: "#32a976",
          // timer: time,
        }).then((result) => {

          if(result.isConfirmed){
            this.axios.delete(`/machine/delete/${value}`)
            .then((response) => {
              $('#machine').modal("hide");
              let res =  response.data.status;
              if(res == 'success'){
                  this.Msg(
                    "Máquina excluída com sucesso!",
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
                    "Falha ao excluir Máquina!",
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

          } else { }
        });
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
          this.listMachine();
        } else { }
      });
    },

  async showModalInfoMachine(value){

      this.machineModal = value;
      this.machineType(value.id_process)
        // $("#tarefa").modal({
        //   show: true,
        //   backdrop: "static"
        // });
    },

    machineType(val){
      switch (val) {
        case 1: this.type_machine = 'Corte'; break;
        case 2: this.type_machine = 'Torneamento'; break;
        case 3: this.type_machine = 'Fresagem'; break;
        case 4: this.type_machine = 'CNC'; break;
        case 5: this.type_machine = 'Montagem'; break;
        case 6: this.type_machine = 'Geral'; break;
        default: console.log(`Sem status  ${value}.`);
      }
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

.modal-img.modal-dialog { /* Width */
    max-width: 100%;
    width: auto !important;
    display: inline-block;
}
/*
.modal {
  z-index: -1;
  display: flex !important;
  justify-content: center;
  align-items: center;
} 

.modal-open .modal {
   z-index: 1050;
} */

</style>
