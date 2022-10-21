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
                      <!-- PROJETOS  -->
                      <div id="accordion" style="cursor: pointer">    
                       <table style=" width: 100% !important">
                          <thead  class="table-primary" style="padding: 8px !important">
                            <tr class="text-center">
                                <th style="width: 20%; padding:10px 0px"> <div> NOME DO PROJETOS</div> </th>                        
                                <th style="width: 15%"> <div> DATA/HORA</div> </th>                        
                                <th style="width: 20%"> <div> DESIGNER</div> </th>                         
                                <th style="width: 17%"> <div> CÓDIGO DO PROJETO</div> </th>                        
                                <th style="width: 18%"> <div> PRAZO DE ENTREGA</div> </th>                        
                                <th style="width: 16%"> <div> STATUS</div> </th>                        
                              <!--  <th style="width: 3%"> <div> AÇÕES </div> </th>          -->              
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
                                  <thead class="table-secondary">
                                    <tr class="text-center">
                                        <td style="width: 20%">{{item.name_project}}</td>                        
                                        <td style="width: 15%">{{item.date_input_project}}</td>                        
                                        <td style="width: 20%">{{item.pic_project}}</td>                         
                                        <td style="width: 17%">{{item.cod_project}}</td>                        
                                        <td style="width: 18%">{{item.date_finish_project}}</td>                        
                                        <td style="width: 19%"
                                            :class="statusType(item.status_project)"
                                        >
                                          {{projectStatus}}
                                        </td>                                                                
                                    </tr>    
                                  </thead>
                                </table>
                              </div>

                               <div :id="`collapse${item.cod_project}`"
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
                                      <h3> Projeto ainda não tem Desenho </h3>
                                    </div>
                                    <table class="table table-hover" style="margin-bottom: 0; width: 100%" v-for="value in item.drawings" :key="value.id_drawing" >
                                        <tbody  class="table-hover">                                        
                                            <tr class="text-left border-left-0"
                                              >
                                                <td style="width: 35%"  @click.prevent="showModalInfoDrawing(item, value.cod_drawing )">{{value.info_drawing}}</td>
                                                <td style="width: 20%"  @click.prevent="showModalInfoDrawing(item, value.cod_drawing )">{{value.cod_drawing}}</td>
                                                <td style="width: 15%"  @click.prevent="showModalInfoDrawing(item, value.cod_drawing )">{{value.desc_status}}</td>
                                                <div style="display: flex">
                                                  <td v-for="itemDrawing in value.drawing_file" :key="itemDrawing.id_drawing_file" style="width: 100%; display: flex">
                                                    <p v-if="itemDrawing.extension == 'pdf'"  @click="downloadDrawingFile(itemDrawing.id_drawing_file)"> 
                                                      <i class="bi bi-file-earmark-pdf"></i>.{{itemDrawing.extension}} 
                                                    </p> 
                                                    <p v-if="itemDrawing.extension == 'sldasm'" @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                      <i class="bi bi-file-earmark-arrow-down"></i>.{{itemDrawing.extension}}
                                                    </p> 
                                                    <p v-if="itemDrawing.extension == 'sldprt'" @click="downloadDrawingFile(itemDrawing.id_drawing_file)" >
                                                      <i class="bi bi-file-earmark-image"></i>.{{itemDrawing.extension}}
                                                    </p> 
                                                  </td>
                                                </div>
                                                <td v-if="value.status_drawing == 1"  @click.prevent="deleteDrawing(value.id_drawing)">   
                                                  <b-icon icon="trash-fill"
                                                          color="red" 
                                                          class="delete-style text-center m-auto d-flex jistify-content-center" 
                                                          aria-hidden="true"
                                                        >
                                                        </b-icon>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="pt-3 d-flex justify-content-end">
                                        <button class="btn btn-success" 
                                                @click="infoProject=item.cod_project, projectShow=true"
                                                data-bs-target="#adicionar-desenho" 
                                                data-bs-toggle="modal"
                                                >Adicionar desenho
                                        </button> 
                                    </div>
                                  </div>
                                </div>

                            <!--
                              <div  v-if="acoordProject == false"
                                    :id="`collapse${item.cod_project}`" 
                                    class="collapse" 
                                    :aria-labelledby="`headingOne${item.cod_project}`"
                                    data-bs-parent="#accordion"
                                >
                                  <div class="card-body pt-2 pb-3">
                                    <table v-if="item.tasks.length > 0" style="width: 100%">
                                      <thead  class="table-success">
                                        <tr class="text-center">
                                            <th style="width: 33%; padding:4px 0px"> <div>Tarefa</div> </th>                        
                                            <th style="width: 33%"> <div> Tempo de Execução </div> </th>                        
                                            <th style="width: 34%"> <div> Data de início e hora </div> </th>                         
                                        </tr>    
                                      </thead>
                                    </table>  
                                    <div v-else class="text-center color-gray">
                                      <h3> Projeto ainda não tem Desenho</h3>
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
                                    <div class="pt-3 d-flex justify-content-end">
                                      <button class="btn btn-success" 
                                              @click="infoProject=item.cod_project, projectShow=true"
                                              data-bs-target="#adicionar-desenho" 
                                              data-bs-toggle="modal"
                                              >Adicionar desenho
                                      </button>
                                    </div>
                                  </div>
                              </div>
                              -->
                        </div>
                      </div>
                      <!-- FIM PROJETOS  -->

                      <!-- CADASTRAR TAREFA  -->
                      <div  class="modal fade" 
                            tabindex="-1" 
                            id="adicionar-desenho" 
                            aria-labelledby="exampleModalLabelReg" 
                            aria-hidden="true" 
                            style=" overflow: hidden !important"
                            data-bs-backdrop="static" 
                            data-bs-keyboard="false" 
                            role="dialog" 
                          >
                             <adicionar-desenho  @cadastProject="listProject" :codProject="infoProject" style="height: 95% !important; display: flex; position: relative"></adicionar-desenho>
                      </div>
                      <!-- FIM CADASTRAR TAREFA  -->
               
                      <!-- MODAL TAREFAS  -->
                      
                        <div class="modal fade"  tabindex="-1" role="dialog" id="tarefa">
                          <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"> Projeto: MONTAGEM DROP - Ativiade: 1121</h5>
                                <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                  <div class="accordion" id="accordionFlushExample">
                                    <table class="table">
                                          <thead class="table-success">
                                            <tr class="text-center border">
                                              <th class="border p-0" style="vertical-align: middle; width: 3%"> <p style="margin: auto">ID</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">TAREFA</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">DESENHO</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">NOME DO DESENHO</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">PROCESSO</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">OPERADOR</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 18%"><p style="margin: auto">DATA/HORA PROGRAMADA</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 10%"><p style="margin: auto">TEMPO ESTIMADO</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 7%"> <p style="margin: auto">STATUS</p></th>
                                            </tr>
                                          </thead> 
                                    </table>
                                    <table  class="table table-hover">
                                      <thead  class="accordion-item">
                                        <tr class="text-center border">
                                            <td class="border p-0" style="width: 3%">{{projectTask.id_task}} </td>
                                            <td class="border p-0" style="width: 10%">{{projectTask.name_task}}</td>
                                            <td class="border p-0" style="width: 10%">desenho</td>
                                            <td class="border p-0" style="width: 10%">nome do desenho</td>
                                            <td class="border p-0" style="width: 10%">{{process_task}}</td>
                                            <td class="border p-0" style="width: 10%">{{projectTask.name_user}}</td>
                                            <td class="border p-0" style="width: 18%">{{projectTask.date_scheduled_task}}</td>
                                            <td class="border p-0" style="width: 10%">{{projectTask.time_task}}</td>
                                            <td class="border p-0" style="width: 7%">{{status_task}}</td>
                                        </tr>
                                      </thead>
                                    </table>  
                                    <div class="pt-5">
                                      <div class="d-flex justify-content-around">
                                        <div class="d-flex  flex-column border">
                                          <div class="d-flex">
                                            <span class="pr-2">Data Hora Início:</span><h4> {{projectTask.date_scheduled_task}}</h4>
                                          </div>
                                          <div class="d-flex">
                                            <span class="pr-2">Tempo Estimado:</span> <h4>{{projectTask.time_task}}</h4>
                                          </div>
                                          <div class="d-flex">
                                            <span class="pr-2">Status:</span> <h4>{{projectTask.status_task}}</h4>
                                          </div>
                                        </div>
                                        <div class="d-flex flex-column">
                                          <span>Tempo Real</span>
                                          <h3> 00:01:02</h3>
                                        </div>
                                      </div>
                                  <!--<div class="pt-4">
                                      </div>-->
                                    </div>
                                  </div>
                              </div>
                              <div class="modal-footer d-flex p-4 justify-content-start">
                                <div>
                                  <button type="button" class="btn btn-primary p-3"> Histórico de Paradas </button>
                                  <button type="button" class="btn btn-primary p-3"> Histórico de Revisões </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      <!-- FIM MODAL TAREFAS  -->

                               <!-- MODAL DETALHES DRAWING  -->
                       <div class="modal fade"  tabindex="-1" role="dialog" id="drawingInfo">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                              <div class="modal-header">
                                <div class="modal-title" id="exampleModalLabel"> 
                                     <P style="text-transform: uppercase">PROJETO: {{projectDetails.name_project}}</P>
                                </div>
                                <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close" @click="clearPdf()"></button>
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
                                            <td class="border p-0" style="width: 10%">{{projectDetails.pic_project}}</td>
                                            <td class="border p-0" style="width: 10%">{{drawingDetails.cod_drawing}}</td>
                                            <td class="border p-0" style="width: 10%">{{drawingDetails.type_drawing}}</td>
                                            <td class="border p-0" style="width: 15%; white-space: normal">{{drawingDetails.info_drawing}}</td>
                                            <td class="border p-0" style="width: 7%">{{drawingDetails.status_drawing}}</td>
                                        </tr>
                                      </thead>
                                    </table>  
                                        <div class="modal-body">
                                          <iframe  :src="pdfDrawing" width="100%" height="500" style="height: 90vh">No Support</iframe>
                                        </div>
                                    <div class="pt-5">
                                      <div class="d-flex justify-content-around">
                                        <!-- <div class="d-flex  flex-column border">
                                          <div class="d-flex">
                                            <span class="pr-2">Data Hora Início:</span><h4> {{projectTask.date_scheduled_task}}</h4>
                                          </div>
                                          <div class="d-flex">
                                            <span class="pr-2">Tempo Estimado:</span> <h4>{{projectTask.time_task}}</h4>
                                          </div>
                                          <div class="d-flex">
                                            <span class="pr-2">Status:</span> <h4>{{projectTask.status_task}}</h4>
                                          </div>
                                        </div> -->
                                        <!--<div class="d-flex flex-column">
                                          <span>Tempo Real</span>
                                          <h3> 00:01:02</h3>
                                        </div> -->
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              <div class="modal-footer d-flex p-4 justify-content-start">
                                <!-- <div>
                                  <button type="button" class="btn btn-primary p-3"> Histórico de Paradas </button>
                                  <button type="button" class="btn btn-primary p-3"> Histórico de Revisões </button>
                                </div> -->
                              </div>
                            </div>
                          </div>
                        </div> 
                      <!-- FIM MODAL DETALHES DRAWING  -->

                  </div>
              </div>
            </div>
          </div>
        </div>  
    </div>
</template>

<script>

import adicionarDesenho from '../drawing/register-desenho';

// import JQuery from 'jquery'
// let $ = JQuery

const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  data(){
    return {
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
    }
  },

  components: {
    adicionarDesenho,
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
    this.listProject();
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
        // timer: time,
      }).then((result) => {
          console.log("result -->del", result)
        if(icon == 'success' ){
          console.log("aqui-->del")

          this.listProject();
        } else { }
      });
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

          else if(res.data.extension == "sldasm"){

            let fileName = 'arquivo.sldasm'
            let sldasmFileDrawing =  res.data.file
            const linkSource = `data:application/octet-stream;base64,${sldasmFileDrawing}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
          }

          else if(res.data.extension == "sldprt"){

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

    listProject(){
      this.axios.get(`/projects/user/${this.dataUser.id_user}`)
      .then((response) => {
        console.log("todos projeto response -->", response)
        let res =  response.data;
        if(res.status == 'success'){
          this.projects = res.data;
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
