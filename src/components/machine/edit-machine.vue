<template>
    <!-- Page Title Header Ends-->
    <div  class="modal fade" tabindex="-1" id="machine-edit" 
          data-bs-backdrop="static" data-bs-keyboard="false" 
          aria-labelledby="exampleModalLabelMachine" aria-hidden="true"
        >
        <div class="modal-dialog modal-xl">
          <div  class="modal-content">
              <div class="modal-header">
                <div></div>
                <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close" @click="$emit('closeMachine')"></button>
              </div>
            <div class='card-body'>
                <div class='d-flex'>
                  <div class='wrapper'>
                    <h3 class='mb-0 font-weight-semibold'>Máquina</h3>
                  </div>
                </div>
              <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                <form  @submit.prevent="saveMachine" class="pt-0">
                    <h5 class="mr-auto  font-weight-medium text-primary">Editar</h5> 
                    <p class="mb-5 mr-auto">Insira seus dados abaixo.</p>
                    <div class="d-flex collum-form">
                      <div class=" collum-form col-lg-6  col-md-12">
                        <div class="form-group pl-1">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-rename-box"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control text-style" placeholder="Nome da Máquina:" v-model="nameMachine"></div>
                        </div>
                        <div class="form-group p-0 pr-1 col-lg-6 ">
                          <label>Tipo do Processo:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-network"></i>
                            </span>
                          </div>
                            <select class="form-select p-2" 
                                    v-model="processMachine" 
                                    style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                  >
                                    <option value="1" selected class="text-center"> Corte </option>
                                    <option value="2" class="text-center"> Torneamento </option>
                                    <option value="3" class="text-center"> Fresagem </option>
                                    <option value="4" class="text-center"> CNC </option>
                                    <option value="5" class="text-center"> Montagem </option>
                                    <option value="6" class="text-center"> Geral </option>
                            </select>
                        </div>
                        </div>
                      </div>
                      <div class="container-lg justify-content-center  col-lg-6 col-md-12 d-flex  flex-column  m-0 top-0  border" style="height: 290px; width: 100%">
                        <div class="d-flex flex-column mx-auto px-3 justify-content-center justify-items-center"  role="button" style="height: 80%" >
                              <i v-if="!previewMachine" @click="chooseFiles()" class="mdi mdi-48px mdi-file-image mdi-dark mx-auto"></i>
                              <img v-else-if="imageMachine" :src="'data:image/jpeg;base64,' + imageMachine" class="rounded mx-auto mx-auto d-block" alt="" style="width: 90%; height: 90%" />
                              <img v-else :src="'data:image/jpeg;base64,' + previewMachine" class="rounded mx-auto mx-auto d-block" alt="" style="width: 90%; height: 90%" />
                              <!-- <span class="mx-auto ">Imagem</span> -->
                        </div>
                              <input @change="onFileChange" accept="image/*"  class="mx-auto myInputFile" type="file" title=" " id="fileUpload" hidden />
                              <button  type="button" class="bnt btn-primary rounded btn-sm mt-3 border-0 w-50 mx-auto" @click="chooseFiles()">Selecionar Imagem</button>
                      </div>
                    </div>
                    <div class="form-group text-left d-flex justify-content-end mt-5 mb-0">
                      <button class="btn btn-success submit-btn mr-3 py-2" style="">Salvar</button>
                      <button class="btn btn-danger submit-btn mr-3 py-2"  @click="$emit('closeMachine'), close()">Cancelar</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props:['dataMachine'],
  name: 'dashboardMs',
  data(){
    return {
      register: 1,
      option: this.$route.params.option,
      imageMachine: '',
      previewMachine: '',
      nameMachine: '',
      processMachine: '',
      idMachine: '',
    }
  },

  components: {},
  Watch: {},

  mounted(){
    $('#machine-edit').modal("show");
      this.idMachine      = this.dataMachine.id_machine
      this.nameMachine    = this.dataMachine.name_machine;
      this.processMachine = this.dataMachine.id_process;
      this.previewMachine = this.dataMachine.path_photo_machine;
  },

  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

    chooseFiles() {
        document.getElementById("fileUpload").click()
    },

    close(){
      $('#machine-edit').modal("hide");
    },

    onFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e =>{
          this.previewMachine = reader.result;
          this.imageMachine = reader.result.replace("data:", "").replace(/^.+,/, "");
      };
    },

    saveMachine(evt){

      let json = {
      	    id_machine: this.idMachine,
            name_machine: this.nameMachine,
            path_photo_machine: this.imageMachine ? this.imageMachine : this.previewMachine,
            id_process: Number(this.processMachine),
      }

      console.log("data machine edit -->>", json)

      this.axios.put('/machine/update', json)
      .then((response) => {
        console.log("response created machine ---")
        // console.log("response- --->>", response)
        let res =  response.data.status;

        if(res == 'success'){
            this.Msg(
              "Máquina alterada com sucesso!",
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
              "Falha ao alterar Máquina!",
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
    /* color: #45dd9b; */
  }
}
  
input[type="file"]{
  font-size: 15px;
}

</style>
