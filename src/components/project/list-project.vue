<template lang='html'>
    <!-- Page Title Header Ends-->
    <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary">Projetos</h5>
                    <p class="mb-5 mr-auto">Projetos Cadastrados</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 col-sm-12 auto-form-wrapper flex-column'>
                      <!-- PROJETOS  -->
                      <div id="accordion" style="cursor: pointer">    
                       <table style=" width: 100% !important">
                          <thead  class="table-primary" style="padding: 8px !important">
                            <tr class="text-center table-title">
                                <th style="width: 20%; padding:10px 0px"> <div> NOME DO PROJETO</div> </th>                        
                                <th style="width: 15%"> <div> DATA/HORA</div> </th>                        
                                <th style="width: 20%"> <div> DESIGNER</div> </th>                         
                                <th style="width: 17%"> <div> CÓDIGO DO PROJETO</div> </th>                        
                                <th style="width: 18%"> <div> PRAZO DE ENTREGA</div> </th>                        
                                <th style="width: 16%"> <div> STATUS</div> </th>                        
                                <th style="width: 3%"> <div> AÇÕES </div> </th>                        
                            </tr>    
                          </thead>
                        </table>
                  
                        <div  style=" margin-bottom:10px; width: 100%"
                              class="card"  
                              v-for=" (item, indx) in projects" :key="item.cod_project"
                            >
                            <div  style="display: flex; justify-content: space-between; padding:8px 0px; width: 100%" 
                                  class="card-header proj"  
                                  :id="`headingOne${item.cod_project}`" 
                                  data-bs-toggle="collapse" 
                                  :data-bs-target="`#collapse${item.cod_project}`" 
                                  aria-expanded="true" 
                                  :aria-controls="`${item.cod_project}`"
                                  ref="content"
                                >
                               <table style="margin-bottom: 0; width: 100%">
                                  <thead class="table-secondary"></thead>
                                    <tr class="text-center">
                                        <td style="width: 20%">{{item.name_project}}</td>                        
                                        <td style="width: 15%">{{item.date_input_project}}</td>                        
                                        <td style="width: 20%">{{item.designer_name}}</td>                         
                                        <td style="width: 17%">{{item.cod_project}}</td>                        
                                        <td style="width: 18%">{{item.date_finish_project}}</td>                        
                                        <td style="width: 19%"
                                            :class="statusType(item.status_project)"
                                        >
                                          {{projectStatus}}
                                        </td>                                                                
                                        <th class="action" style="width: 3%">
                                            <div>
                                              <div class="btn-group">
                                                <button class="btn btn-seundary  border" @click="acoordProject = true" data-bs-toggle="dropdown" aria-expanded="false">
                                                 <span>...</span>
                                                  <b-icon icon="caret-down-fill" aria-hidden="true"> </b-icon>
                                                </button>
                                                
                                                <ul class="dropdown-menu">
                                                  <li><a class="dropdown-item" @click="deletProject(item.cod_project)"> Excluir </a></li>
                                                  <li><a class="dropdown-item" @click="$emit('editProject', item)"> Editar </a></li>
                                                </ul>
                                              </div>
                                            </div> 
                                        </th>                        
                                    </tr>    
                                  </thead>
                                </table>
                            </div>

                            <!-- INICIO LIST DRAWING -->

                            <div  v-if="acoordProject == false"
                                    :id="`collapse${item.cod_project}`" 
                                    class="collapse" 
                                    :aria-labelledby="`headingOne${item.cod_project}`"
                                    data-bs-parent="#accordion"
                                >
                                  <div class="card-body pt-2 pb-3">
                                    <table v-if="item.drawings.length > 0" style="width: 100%">
                                      <thead  class="table-success">
                                        <tr class="text-center">
                                            <th style="width: 35%; padding:1px 0px"> <div>Nome</div> </th>                        
                                            <th style="width: 20%"> <div> Código </div> </th>                        
                                            <th style="width: 15%"> <div> Status </div> </th>                         
                                            <th style="width: 30%"> <div>Arquivos</div>                                            
                                            </th>                         
                                        </tr>    
                                      </thead>
                                    </table>  
                                    <div v-else class="text-center color-gray">
                                      <h4> Projeto ainda não tem Desenho </h4>
                                    </div>
                                    <table class="table table-hover" style="margin-bottom: 0; width: 100%" v-for="value in item.drawings" :key="value.id_drawing" >
                                        <tbody  class="table-hover"
                                        >                                                
                                          <tr class="text-left border-left-0">
                                              <td style="width: 35%" @click="showModalInfoDrawing(item, value.cod_drawing)">{{value.info_drawing}}</td>
                                              <td style="width: 20%" @click="showModalInfoDrawing(item, value.cod_drawing)">{{value.cod_drawing}}</td>
                                              <td style="width: 15%" @click="showModalInfoDrawing(item, value.cod_drawing)">{{value.desc_status}}</td>
                                              <div style="display: flex">
                                                <td v-for="itemDrawing in value.drawing_file" :key="itemDrawing.id_drawing_file" style="width: 100%; display: flex ">
                                                  <p v-if="itemDrawing.extension == 'pdf' " @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                    <i class="bi bi-file-earmark-pdf"></i>.{{itemDrawing.extension}} </p> 
                                                  <p v-if="itemDrawing.extension == 'sldasm' " @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                    <i class="bi bi-file-earmark-arrow-down"></i>.{{itemDrawing.extension}}</p> 
                                                  <p v-if="itemDrawing.extension == 'sldprt'" @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                    <i class="bi bi-file-earmark-image"></i>.{{itemDrawing.extension}}</p> 
                                                </td>
                                              </div>
                                              </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                  </div>
                                </div>   
                                <!-- LIST DRAWINGS -->

                                   <!-- MODAL TAREFAS  -->
                            <div class="modal fade"  tabindex="-1" role="dialog" id="drawingInfo" data-bs-backdrop="static">
                              <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <div class="modal-title" id="exampleModalLabel"> 
                                          <P style="text-transform: uppercase">PROJETO: {{projectDetails.name_project}}</P>
                                    </div>
                                    <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close" @click="closeModal(1)"></button>
                                  </div>
                                  <div class="modal-body">
                                      <div class="accordion" id="accordionFlushExample">
                                        <table class="table">
                                              <thead class="table-success">
                                                <tr class="text-center border">
                                                  <th class="border p-0" style="vertical-align: middle; width: 15%"><p style="margin: auto">CÓDIGO DO PROJETO</p></th>
                                                  <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">NOME  DO PROJETO</p></th>
                                                  <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">DESIGNER</p></th>
                                                  <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">CÓDIGO DO DESENHO</p></th>
                                                  <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">TIPO DESENHO</p></th>
                                                  <th class="border p-0" style="vertical-align: middle; width: 15%"><p style="margin: auto">INFOR.</p></th>
                                                  <th class="border p-0" style="vertical-align: middle; width: 7%"> <p style="margin: auto">STATUS</p></th>
                                                </tr>
                                              </thead> 
                                        </table>
                                        <table  class="table table-hover">
                                          <thead  class="accordion-item">
                                            <tr class="text-center border">
                                                <td class="border p-0" style="width: 15%">{{projectDetails.cod_project}} </td>
                                                <td class="border p-0" style="width: 10%">{{projectDetails.name_project}}</td>
                                                <td class="border p-0" style="width: 10%">{{projectDetails.designer_name}}</td>
                                                <td class="border p-0" style="width: 10%">{{drawingDetails.cod_drawing}}</td>
                                                <td class="border p-0" style="width: 10%">{{drawingDetails.type_drawing}}</td>
                                                <td class="border p-0" style="width: 15%; white-space: normal">{{drawingDetails.info_drawing}}</td>
                                                <td class="border p-0" style="width: 7%">{{drawingDetails.desc_status}}</td>
                                            </tr>
                                          </thead>
                                        </table>  
                                            <div v-if="viewPDF && pdfShow">
                                              <iframe  :src="pdfDrawing" width="100%" height="500" style="height: 90vh">No Support</iframe>
                                            </div>
                                            <div v-if="viewPDF && !pdfShow" class="col-lg-10 col-md-12 border mt-4 d-flex flex-column mx-auto" >
                                                <h4 class="mx-auto"> Lista de Tarefas</h4>
                                              <div v-if=" viewPDF && !pdfShow " class="m-auto">
                                                <table class="table text-center table-hover m-auto ">
                                                  <thead class="table-info">
                                                    <tr>
                                                      <td>Código do Desenho</td>
                                                      <td>Código da Tarefa</td>
                                                      <td>Tipo de processo</td>
                                                      <td>Quantidade de Preça</td>
                                                      <td>Cicle Time/Un</td>
                                                      <td>Tempo Total</td>
                                                      <td>Operador</td>
                                                      <td>Status</td>
                                                    </tr>
                                                  </thead>
                                                  <div
                                                    v-if="drawingDetails.tasks.length == 0"
                                                    style="width: 100%"
                                                  >
                                                      <div style="width: 100%"> <p> Não há tarefas </p> </div>
                                                  </div>
                                                  <tbody
                                                    v-else
                                                    class="table-hover"
                                                    v-for=" item in drawingDetails.tasks" :key="item.id_task"
                                                    >
                                                      <tr class="border-bottom">
                                                      <td>{{item.id_drawing}}</td>
                                                      <td>{{item.id_task}}</td>
                                                      <td>{{item.desc_process}}</td>
                                                      <td>{{item.qtd_piece}}</td>
                                                      <td>{{item.cicletime_piece}}</td>
                                                      <td>{{item.time_task}}</td>
                                                      <td>{{item.user_name}}</td>
                                                      <td>{{item.desc_status}}</td>
                                                    </tr>
                                                  </tbody>  
                                                </table>
                                              </div>
                                            </div>
                                      </div>
                                  </div>
                                  <div class="modal-footer  col-lg-12 d-flex p-4 justify-content-start" >
                                    <div class="d-flex col-lg-12">
                                    <!--  <button type="button" class="btn btn-primary p-3"> Histórico de Paradas </button>
                                      <button type="button" class="btn btn-primary p-3 ml-1"> Histórico de Revisões </button> -->
                                      <button  v-if="optionBtn" class="btn btn-info btn-lg ml-1" @click="viewPDF = true, pdfShow = true"> Visualizar Arquivo PDF </button>
                                      <button  v-if="optionBtn" class="btn btn-info btn-lg ml-1" @click="viewPDF = true, pdfShow = false"> Tarefas </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> 
                      <!-- FIM MODAL TAREFAS  -->




                            <!--  <div  v-if="acoordProject == false"
                                    :id="`collapse${item.cod_project}`" 
                                    class="collapse" 
                                    :aria-labelledby="`headingOne${item.cod_project}`"
                                    data-bs-parent="#accordion"

                                >
                                  <div class="card-body pt-2 pb-3">
                                    <table style="width: 100%">-->
                                    <!-- <table v-if="item.tasks.length > 0" style="width: 100%"> -->
                                 <!--     <thead  class="table-success">
                                        <tr class="text-center">
                                            <th style="width: 33%; padding:4px 0px"> <div>Tarefa</div> </th>                        
                                            <th style="width: 33%"> <div> Tempo de Execução </div> </th>                        
                                            <th style="width: 34%"> <div> Data de início e hora </div> </th>                         
                                        </tr>    
                                      </thead>
                                    </table>  
                                    <div  class="text-center color-gray">
                                      <h3> Projeto sem desenho </h3>
                                    </div>
                                    <table class="table table-hover" style="margin-bottom: 0; width: 100%" v-for="value in item.tasks" :key="value.id_task" >
                                        <tbody  class="table-hover"
                                                @click="showModalInfoTask(value)"
                                                data-bs-target="#tarefa"
                                                data-bs-toggle="modal"
                                        >
                                          <tr class="text-center border-left-0">
                                              <td style="width: 33%">{{value.name_task}}</td>
                                              <td style="width: 33%">{{value.time_task}}</td>
                                              <td style="width: 34%">{{value.date_scheduled_task}}</td>
                                          </tr>
                                        </tbody>
                                    </table>
                                  
                                  </div>
                              </div>-->
                        </div>
                      </div>
                   
                  </div>
              </div>
            </div>
          </div>
        </div>  

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

import registerTask from '../task/register-task';

// import JQuery from 'jquery'
// let $ = JQuery

const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  data(){
    return {
      isLoading: false,
      typeLoader: 'bars',

      acoordProject: false,
      projShow: false,
      projectShow: false,
      projects: [],
      atv_tarefas: [],
      registerTaskShow: false,
      infoProject: [],
      tasks: [],
      cod_proj: '',
      projectTask: '',      
      process_task: '',
      status_task:'',
      projectStatus:'',

      projectDetails:'',
      visionPdf: false,
      drawingDetails: '',
      pdfShow: true,
      btnAvaliarDrawing: true,
      optionBtn: false,

    }
  },

  components: {
    registerTask,
    Loading,
  },

  Watch: {
    projectTask(){
      this.optionProcess()
    }
  },

  created(){

    $(document).mouseup((e) => {
        var containerInfo = $(".action");
        if (!containerInfo.is(e.target) && containerInfo.has(e.target).length === 0 ){
              this.acoordProject = false;            
        } else { }
    });  
  },

  mounted(){ 
    this.listProject();
  },

  methods: {

    closeModal(val){
      if(val == 1){
        $("#drawingInfo").modal("hide");
        this.visionPdf = false;
        this.viewPDF =  true;
      } else {
        $("#drawingJustificativa").modal("hide");
      }
    },

  async showModalInfoTask(value){
      // console.log("value ->", value)
     await this.optionProcess(value.type_process)
     await this.optionStatus(value.status_task)
      // console.log("detalhes da tarefa ->", value)
      this.projectTask = value;
        $("#tarefa").modal({
          show: true,
          backdrop: "static"
        });
    },
    
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

   async showModalInfoDrawing(value, val){

      this.projectDetails = value;
      this.visionPdf = true;

      value.drawings.map( item => {
        if(item.cod_drawing == val){
          this.drawingDetails = item;
          if( this.drawingDetails.status_drawing == 5){
            this.pdfShow = true;
            this.btnAvaliarDrawing = true;
            this.optionBtn = false;
          } else {
            this.pdfShow = false;
            this.optionBtn = true;
          }
          console.log("drawingDetails ->", this.drawingDetails)
          item.drawing_file.map( item2 => {
            if(item2.extension == "pdf" ){
              this.downloadDrawingFile(item2.id_drawing_file)
            }
          })
        }
      })
    },

    downloadDrawingFile(id_file){
      let id_drawing_file = id_file;
      let pdfFileDrawing = '';

      this.axios.get(`/drawingfile/download/${id_drawing_file}`)
      .then((response) => { 
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

    listProject(){
      this.isLoading = true;

      let json =  { status_drawing : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], }

      this.axios.post('/drawing/bystatus', json)
      .then((response) => {
        console.log("projeto response --------->>", response)
        let res =  response.data;
        if(res.status == true){
          this.isLoading = false;
          this.projects = res.data;
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.Msg(
              "Erro no servidor",
              "",
              "error",
              2000,
              false,
              "OK",
              false,
              "",
            );
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
@media (max-width: 1300px) {
  .table-title  {
    font-size:11px;
  }
  table  {
    font-size:10.5px;
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

</style>
