<template lang='html'>
    <!-- Page Title Header Ends-->
  <div class='col-md-12 grid-margin'>
    <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary">Colaboradoes</h5>
                    <p class="mb-5 mr-auto">Colaboradoes Cadastrados</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 col-sm-12 auto-form-wrapper flex-column'>
                      <!-- MACHINE  -->
                        <table class="table table-hover" style=" width: 100% !important">
                          <thead  class="table-primary" style="padding: 8px !important">
                            <tr class="text-center">
                                  <th style="width: 3%; padding:10px 0px"> 
                                    <div> N° </div> 
                                  </th>                        
                                  <th style="width: 25%; padding:10px 0px"> 
                                    <div> COLABORADOR </div> 
                                  </th>                        
                                  <th style="width: 25%">
                                    <div> DEPARTAMENTO </div> 
                                  </th>                        
                                  <th style="width: 25%"> 
                                    <div> FUNÇÃO </div> 
                                  </th>                        
                                  <th style="width: 22%"> 
                                    <div> MATRÍCULA </div> 
                                  </th>                        
                              </tr>    
                            </thead>
                            <tbody>
                              <tr class="text-center cursor-pointer" 
                                  style="cursor: pointer"
                                  v-for=" (item, index) in colaborators"
                                  :key="item.id_user" 
                                  @click="showModalInfoColaborator(item.register)"  
                                  data-bs-target="#colaborator"
                                  data-bs-toggle="modal"
                              >
                                  <td style="width: 3%">{{index + 1}}</td>                        
                                  <td style="width: 25%">{{item.name_user}}</td>                        
                                  <td style="width: 25%">
                                      <span class="ml-2" v-if="item.department_user == 1">ADMINISTRAÇÃO</span>
                                      <span class="ml-2" v-if="item.department_user == 2">SOFTWARE</span>
                                      <span class="ml-2" v-if="item.department_user == 3">ENGENHARIA ELÉTRICA</span>
                                      <span class="ml-2" v-if="item.department_user == 4">ENGENHARIA MECANICA</span>
                                      <span class="ml-2" v-if="item.department_user == 5">CONTABILIDADE</span>
                                      <span class="ml-2" v-if="item.department_user == 6">MANUFATURA</span>
                                      <span class="ml-2" v-if="item.department_user == 7">{{P&D}}</span>
                                      <span class="ml-2" v-if="item.department_user == 8">QUALIDADE</span>
                                      <span class="ml-2" v-if="item.department_user == 9">ENGENHARIA</span>
                                  </td>                        
                                  <td style="width: 25%">{{item.function_user}}</td>                        
                                  <td style="width: 22%">{{item.register}}</td>                        
                              </tr>    
                            </tbody>
                        </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!--  MODAL DETAILS COLABORATOR -->
          <div  class="modal fade" role="dialog" id="colaborator" 
                data-bs-backdrop="static" data-bs-keyboard="false" 
                tabindex="-1" aria-labelledby="machineLabel" 
                aria-hidden="true"
              >
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <div class='page-title'> 
                    <h4>Dados do Colaborador</h4> 
                </div>
                <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close" @click="closeModalColaborator"></button>
              </div>
              <div class="modal-body d-flex justify-content-center">
                <div class="d-flex col-lg-8 col-md-12 justify-content-around border">
                  <div>
                    <div class="p-1 d-flex">
                      <h5 class="m-0"><strong> Colaborador: </strong></h5>
                      <span class="ml-2">{{colaborator.name_user}}</span>
                    </div>
                    <div class="p-1 d-flex">
                      <h5 class="m-0"><strong> Departamento: </strong></h5>
                      <span class="ml-2" v-if="dep == 1 ? desc_depart = 'ADMINISTRAÇÃO' : dep == 2 ? desc_depart = 'SOFTWARE' : dep == 3 ? desc_depart = 'ENGENHARIA ELÉTRICA' : dep == 4 ? desc_depart = 'ENGENHARIA MECANICA' : dep == 5 ? desc_depart = 'CONTABILIDADE' : dep == 6 ? desc_depart = 'MANUFATURA' : dep == 7 ? desc_depart = 'P&D' : dep == 8 ? desc_depart = 'QUALIDADE' : desc_depart = 'ENGENHARIA'  "  >{{desc_depart}}</span>
                    </div>
                    <div class="p-1 d-flex">
                      <h5 class="m-0" ><strong> Função: </strong></h5>
                      <span class="ml-2">{{colaborator.function_user}}</span>
                    </div>
                    <div class="p-1 d-flex">
                      <h5 class="m-0"><strong> Centro de Custo: </strong></h5>
                      <span class="ml-2">{{colaborator.cost_center}}</span>
                    </div>
                    <div class="p-1 d-flex">
                      <h5 class="m-0"><strong> Email: </strong></h5>
                      <span class="ml-2">{{colaborator.email_user}}</span>
                    </div>
                    <div class="p-1 d-flex">
                      <h5 class="m-0"><strong> Registro: </strong></h5>
                      <span class="ml-2">{{colaborator.register}}</span>
                    </div>
                    <div class="p-1 d-flex">
                      <h5 class="m-0"><strong> Premissão: </strong></h5>
                      <span class="ml-2" v-if="colaborator.type_leader == 0"> Colaborador </span>
                      <span class="ml-2" v-else-if="colaborator.type_leader == 1"> Lider </span>
                    </div>
                  </div>

                  <div class="text-center p-1" >
                      <h5><strong>Foto</strong></h5>
                       <i  v-if="!colaborator.path_photo || colaborator.path_photo.length < 1000" 
                                @click="chooseFiles()" 
                                class="mdi mdi-account-edit mdi-dark  border m-auto d-flex justify-items-center justify-content-center "
                                style="width: 120px; height: 120px; font-size: 70px"
                              > </i>
                      <img v-else :src="'data:image/jpeg;base64,' + colaborator.path_photo" class="imgContent" alt="Foto de Perfil" />
                  </div>
                </div>
              </div>

              <div class="modal-footer d-flex p-3 justify-content-end">
                  <div>
                    <button type="button" class="btn btn-primary" 
                            @click="showEdit = true"   
                          >
                            Editar 
                          </button>
                    <button type="button" class="btn btn-danger" @click="deleteColaborator(colaborator.id_user)">Excluir</button>
                  </div>
              </div> 
            </div>
          </div>
        </div>     
      <!-- FIM MODAL INFO MACHINE -->

      <!-- MODAL EDITAR -->
        <div v-if="showEdit">
          <edit-colaborator  @closeColaborator="closeColaboratorEdit" @codRegister="codRegist" :dataColaborator="colaborator" ></edit-colaborator>
        </div>
      <!-- FIM MODAL EDITAR -->
    
    </div>  
  </div>
</template>

<script>

import EditColaborator from './edit-colaborator'

const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  data(){
    return {
      colaborators: [],
      colaborator:'',
      type_machine: '',
      machineModal:'',
      machineImage: '',
      showEdit: false,
      dep: '',
      desc_depart: '',
    }
  },

  components: {
    EditColaborator,
  },

  Watch: {},

  created(){},

  mounted(){ 
    this.listColaborator();
  },

  methods: {
    closeColaboratorEdit(){
      this.showEdit = false;
    },

    closeModalColaborator(){
        $("#ModalAlerta").modal("hide");
        this.listColaborator();
    },

    codRegist(register){
      this.showEdit = false;
      this.showModalInfoColaborator(register)
    },

    deleteColaborator(userId){

      this.$swal.fire({
          position: "center",
          type: 'warning', //success, warning, error
          title: 'Aviso!',
          text: 'Deseja realmante excluir colaborador?',

          showCancelButton: true,
          cancelButtonText: 'Não',
          cancelButtonColor: "#cd4949",

          showConfirmButton: true,
          confirmButtonText: 'Sim',
          confirmButtonColor: "#32a976",
          // timer: time,
        }).then((result) => {


          if(result.value == true){
            
            this.axios.delete(`/user/delete/${userId}`)
            .then((response) => {
              $('#colaborator').modal("hide");
              let res =  response.data.status;
              if(res == 'success'){
                  this.Msg(
                    "Colaborador excluído com sucesso!",
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
                    "Falha ao excluir Colaborador!",
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
        timer: time,
      }).then((result) => {
        if(icon == 'success' ){
          this.listColaborator();
        } else { }
      });
    },

  showModalInfoColaborator(register){
    console.log("user selected -->", register)
      this.axios.get(`/user/${register}`)
      .then((response) => {
        console.log(" response selected ", response)
        let res =  response.data;
        if(res.status == 'success'){
          this.colaborator = res.data;
          this.dep = this.colaborator.department_user;
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      }) 
    },

    machineType(val){
      switch (val) {
        case 1: this.type_machine = 'Corte'; break;
        case 2: this.type_machine = 'Torneamento'; break;
        case 3: this.type_machine = 'Fresagem'; break;
        case 4: this.type_machine = 'CNC'; break;
        case 5: this.type_machine = 'Montagem'; break;
        case 6: this.type_machine = 'Geral'; break;
        default: console.log(`Sem status  ${val}.`);
      }
    },

    listColaborator(){
      this.axios.get('/users')
      .then((response) => {
        console.log("response user -->>>", response)
        let res =  response.data;
        if(res.status == 'success'){
          this.colaborators = res.data;
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })       
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

.imgContent {
  max-width: 220px;
  max-height: 220px;
  min-width: 180px;
  min-height: 200px;
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
