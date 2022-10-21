<template lang='html'>
    <!-- Page Title Header Ends-->
    <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary">Projetos do Usuário logado</h5>
                    <p class="mb-5 mr-auto">Projetos Cadastrados</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 col-sm-12 auto-form-wrapper flex-column'>
                      <!-- REVISÃO  -->
                      <div id="accordion" style="cursor: pointer">    
                       <table style=" width: 100% !important">
                          <thead  class="table-primary" style="padding: 8px !important">
                            <tr class="text-center">
                                <th style="width: 25%; padding:10px 0px"> <div> PROJETO</div> </th>                        
                                <th style="width: 25%; padding:10px 0px"> <div> DESENHO</div> </th>                        
                                <th style="width: 25%; padding:10px 0px"> <div> NOME DO DESENHO</div> </th>                        
                                <th style="width: 25%"> <div> DOUBLE CHECK</div> </th>                        
                               <!-- <th style="width: 40%"> <div> JUSTIFICATIVA</div> </th>  -->                       
                            </tr>    
                          </thead>
                        </table>                  
                        <div  style=" margin-bottom:10px; width: 100%"
                              class="card"  
                              v-for=" (item, indx) in revision" :key="item.id_revision"
                            >
                              <div  style="display: flex; justify-content: space-between; padding:8px 0px; width: 100%" 
                                    class="card-header proj"  
                                >
                               <table style="margin-bottom: 0; width: 100%">
                                  <thead class="table-secondary">
                                    <tr class="text-center" @click="revisionModal(1, item)" >
                                        <td style="width: 25%">{{item.drawing.cod_project}}</td>                        
                                        <td style="width: 25%">{{item.drawing.cod_drawing}}</td>                        
                                        <td style="width: 25%">{{item.info_drawing}}</td>                        
                                        <td style="width: 25%">{{item.designer_name}}</td>                        
                                       <!-- <td style="width: 40%">{{item.commentary_revision}}</td> -->                         
                                    </tr>    
                                  </thead>
                                </table>
                              </div>
                        </div>
                      </div>
                      <!-- FIM REVISÃO  -->
                  </div>
              </div>
            </div>
          </div>
        </div>  

  <!-- MODAL TAREFAS  -->
              <div class="modal fade"  tabindex="-1" role="dialog" id="item-revision" data-bs-backdrop="static">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel"> Desenho: {{detailsDrawingRevsion.info_drawing}}</h5>
                      <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="accordion" id="accordionFlushExample">
                          <table class="table">
                                <thead class="table-success">
                                  <tr class="text-center border">
                                    <th class="border p-0" style="vertical-align: middle; width: 20%"> <p style="margin: auto">CÓDIGO DESENHO</p></th>
                                    <th class="border p-0" style="vertical-align: middle; width: 80%"><p style="margin: auto">JUSTIFICATIVA DE REJEIÇÃO</p></th>
                                  </tr>
                                </thead> 
                          </table>
                          <table  class="table table-hover">
                            <thead  class="accordion-item">
                              <tr class="text-center border">
                                  <td class="border p-0" style="width: 20%">{{codDrawing}}</td>
                                  <td class="border p-0" style="width: 80%">
                                     <textarea disabled name="w3review" style="border: 0;  color: #000 " v-model="detailsDrawingRevsion.commentary_revision"></textarea>
                                  </td>
                              </tr>
                            </thead>
                          </table>  
                          <div class="pt-2">

                            <div class="modal-body" v-if="!uploadRevision">
                              <iframe  :src="pdfDrawing" width="100%" height="500" style="height: 70vh">No Support</iframe>
                            </div>
                            <div v-else>
                                <revision-upload :btnUpload="uploadSave" @filesDrawingRevision="filesRevision" > </revision-upload>
                            </div>
                            <div class="d-flex justify-content-around">
                              <div class="d-flex flex-column">
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="modal-footer d-flex p-4 justify-content-start">
                      <div>
                       <!-- <button type="button" class="btn btn-primary btn-lg"> Histórico de Paradas </button>
                        <button type="button" class="btn btn-primary btn-lg"> Histórico de Revisões </button> -->
                        <button v-if="!uploadRevision" class="btn btn-info btn-lg" @click="revisionModal(2)"> Anexar Novo Arquivo </button>
                        <button v-else class="btn btn-info btn-lg" @click="uploadRevision = false"> Visualizar Arquivo PDF </button>
                        <button class="btn btn-success btn-lg" @click="uploadSave = true"> Upload </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      <!-- FIM MODAL TAREFAS  -->

            <!-- INICIO LOADING -->
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

import revisionUpload from '../drawing/revision-upload';

const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  data(){
    return {
      isLoading: false,
      typeLoader: 'bars',

      projShow: false,
      projectShow: false,
      revision: [],
      atv_tarefas: [],
      registerTaskShow: false,
      infoProject: [],
      tasks: [],
      cod_proj: '',
      projectTask: '',      
      process_task: '',
      status_task:'',
      projectStatus:'',
      dataUser: JSON.parse(sessionStorage.getItem('keyPermission')),
      dataDrawingDesigner: [],
      pdfDrawing:'',
      dataDouble: [],
      tipoPdf: 'ssss',
      tipoSLDASM: '',
      tipoSLDPRT: '',
      projectDetails: '',
      drawingDetails: '',
      visionPdf:false,
      detailsDrawingRevsion: '',
      codDrawing: '',
      uploadRevision: false,
      uploadSave: false,
      drawRevision: [],
      idRevision: '',
    }
  },

  components: {
    revisionUpload,
    Loading
  },

  Watch: {
    projectTask(){
      this.optionProcess()
    }
  },

  created(){

    // $(document).mouseup((e) => {
    //   console.log("aqui evento")
    //     var containerInfo = $(".action");
    //           console.log("acoorddrawing", this.acoorddrawing)
    //     if (!containerInfo.is(e.target) && containerInfo.has(e.target).length === 0 ){

    //           this.acoorddrawing = false;            
    //           console.log("acoorddrawing dentro", this.acoorddrawing)
    //     } else { }
    // });  
  },

  mounted(){ 
    this.listDrawingRevision();
    // this.listProjectDrawing();
  },

  methods: {
    // closeModal(){
    //     $("#ModalAlerta").modal("hide");
    // },

  // async showModalInfoTask(value){
  //     // console.log("value ->", value)
  //    await this.optionProcess(value.type_process)
  //    await this.optionStatus(value.status_task)
  //     // console.log("detalhes da tarefa ->", value)
  //     this.projectTask = value;
  //       $("#tarefa").modal({
  //         show: true,
  //         backdrop: "static"
  //       });
  //   },
    
  async  optionProcess(option){
    console.log("opion -->", this.process_task)
      switch (option) {
        case 1: this.process_task = 'Corte'; break;
        case 2: this.process_task = 'Torneamento'; break;
        case 3: this.process_task = 'Fresagem'; break;
        case 4: this.process_task = 'CNC'; break;
        case 5: this.process_task = 'Montagem'; break;
        case 6: this.process_task = 'Geral'; break;
        default: console.log(`Sem processo  ${option}.`);
      }
    },

    statusType(value){
      switch (value) {
        case 1: this.projectStatus = 'Agendadas'; break;
        case 2: this.projectStatus = 'Iniciadas'; break;
        case 3: this.projectStatus = 'Paradas'; break;
        case 4: this.projectStatus = 'Finalizadas'; break;
        default: console.log(`Sem status  ${value}.`);
      }
    },

    optionStatus(value){
      switch (value) {
        case 1: this.status_task = 'Agendadas'; break;
        case 2: this.status_task = 'Iniciadas'; break;
        case 3: this.status_task = 'Paradas'; break;
        case 4: this.status_task = 'Finalizadas'; break;
        default: console.log(`Sem status  ${value}.`);
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

    clearPdf(){
      
      $("#drawingInfo").modal("hide");
      this.visionPdf = false;
    },

    async filesRevision(filesDrawing){

      console.log("filesDrawing -->" , filesDrawing)
    
      this.openLoading();
      await filesDrawing.map( async item => {
        var reader = new FileReader();
        reader.readAsDataURL(item.file);
        reader.onload =  () => {
              const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
              this.drawRevision.push({  
                                        file: base64String,
                                        name: item.name, 
                                    })
        };
      })
    },

     openLoading() {
       this.isLoading = true;
       
        setTimeout(() => {
          this.salvarDesenhoRevisao()
        }, 3000)
    },

     salvarDesenhoRevisao(draw){

      let json = {
        id_revision: Number(this.idRevision),
        files: this.drawRevision,
      }

      this.axios.post('/revisiondrawing/reviewdrawing', json)
      .then((response) => {
        let res =  response.data.status;
        if(res == true){
            this.Msg(
              "Upload de revisão salvo com sucesso!",
              "",
              "success",
              2000,
              false,
              "Não",
              false,
              "Sim",
            );
            $('#item-revision').modal('hide');
            this.listDrawingRevision();
            this.isLoading = false;
        
        } else {
          this.Msg(
              "Falha ao enviar arquivo de revisão!",
              "",
              "error",
              2000,
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
      
    revisionModal(val, data){
      if(val == 1){
        let pdfFileDrawing
        $("#item-revision").modal('show');
        this.detailsDrawingRevsion = data;
        this.idRevision = this.detailsDrawingRevsion.id_revision;
        this.codDrawing = this.detailsDrawingRevsion.drawing.cod_drawing;

        this.detailsDrawingRevsion.drawing.drawing_file.map( item => {
              if(item.extension == 'pdf'){
                  pdfFileDrawing = item.file
              }  
        })
        
        this.pdfDrawing = `data:application/pdf;base64,${pdfFileDrawing}`;

      } else {
        this.uploadRevision = true;
        $("#revisao-desenho").modal('show');
      }

    },

    async showModalInfoDrawing(value, val){
      this.projectDetails = value;
      this.visionPdf = true;

      value.drawings.map( item => {
        if(item.cod_drawing == val){
          this.drawingDetails = item;
          item.drawing_file.map( item2 => {
            if(item2.extension == "pdf" ){
              this.downloadDrawingFile(item2.id_drawing_file)
            }
          })
        }
      })
    },

    deleteDrawing(id){      
      let id_drawing = id; 

      this.$swal.fire({
          position: "center",
          type: 'warning', //success, warning, error
          title: 'Aviso!',
          text: 'Deseja realmante excluir este Arquivo?',

          showCancelButton: true,
          cancelButtonText: 'Não',
          cancelButtonColor: "#cd4949",

          showConfirmButton: true,
          confirmButtonText: 'Sim',
          confirmButtonColor: "#32a976",
          // timer: time,
        }).then((result) => {

          if(result.isConfirmed){
            this.axios.delete(`/drawing/delete/${id_drawing}`)
            .then((response) => {

              console.log("response del -->", response)
              let res =  response.data;
              if(res.status == true){
                  this.Msg(
                    "Arquivo excluído com sucesso!",
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
                    "Falha ao excluir Arquivo!",
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
          console.log("result -->del", result)
        if(icon == 'success' ){
          console.log("aqui-->del")

          this.listProject();
        } else { }
      });
    },

    downloadDrawingFile(id_file){
      console.log("id file --->", id_file)

      let id_drawing_file = id_file;
      let pdfFileDrawing = '';

      this.axios.get(`/drawingfile/download/${id_drawing_file}`)
      .then((response) => { 
        console.log("response 0---->", response)
        let res =  response.data;
        if(res.status == true){

          if(res.data.extension == "pdf"){
            pdfFileDrawing =  res.data.file
            this.pdfDrawing = ''

            console.log("this.visionPdf", this.visionPdf)

            if(this.visionPdf){
              this.pdfDrawing = `data:application/pdf;base64,${pdfFileDrawing}`;
              $("#drawingInfo").modal("show");
              
            } else {
            let fileName = 'arquivo.pdf'
              const linkSource = `data:application/pdf;base64,${pdfFileDrawing}`;
              const downloadLink = document.createElement("a");
              downloadLink.href = linkSource;
              downloadLink.download = fileName;
              downloadLink.click();
            }
          }

          else if(res.data.extension == "SLDASM"){

            let fileName = 'arquivo.sldasm'
            let sldasmFileDrawing =  res.data.file
            const linkSource = `data:application/octet-stream;base64,${sldasmFileDrawing}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
          }

          else if(res.data.extension == "SLDPRT"){

            let fileName = 'arquivo.sldprt'
            let sldprtFileDrawing =  res.data.file
            const linkSource = `data:application/pdf;base64,${sldprtFileDrawing}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
          }
        
        } else {
        
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },

    listDrawingRevision(){

      let id_designer = this.dataUser.id_user;     

      this.axios.get(`/revisiondrawing/findpendingbydesigner/${id_designer}`)
      .then((response) => {
        console.log("todos revision response -->", response)
        let res =  response.data;
        if(res.status == true){
          this.revision = res.data;
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },

    // listTask(codProject){
    //   console.log("cod_proj", this.cod_proj )
    //   console.log("cod", codProject )
    //   if(this.cod_proj != codProject){
    //       this.cod_proj = codProject;
    //       this.axios.get(`/tasks/${codProject}`)
    //       .then((response) => {
    //         console.log("tasks -->", response)
    //         let res =  response.data;
    //         if(res.status == 'success'){
    //           this.tasks = res.data;
    //         }
    //     })
    //     .catch((error) => {
    //       console.log("erro: " , error)
    //     })
    //   } else {
    //     // this.tasks = []
    //   }
    // },

    deletProject(value){

       let json = {
        cod_project: value,
      }

      console.log("json -->>", json)

      this.axios.delete(`/project/delete/${value}`, json)
      .then((response) => {
        // console.log("response- --->>", response)
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

.delete-style:hover {

  background: #CDCDCD !important;
  border-radius: 50px; 


}

</style>
