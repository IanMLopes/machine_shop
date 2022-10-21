<template lang='html'>
    <!-- Page Title Header Ends-->
    <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary"> Lider de Manufatura</h5>
                    <p class="mb-5 mr-auto">Desenho para retrabalho</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 col-sm-12 auto-form-wrapper flex-column'>
                      <!-- PROJETOS  -->
                      <div id="accordion" style="cursor: pointer">    
                       <table style=" width: 100% !important">
                          <thead  class="table-primary" style="padding: 8px !important">
                            <tr class="text-center">
                                <th style="width: 20%; padding:10px 0px"> <div> NOME DO PROJETO</div> </th>                        
                                <th style="width: 15%"> <div> DATA/HORA</div> </th>                        
                                <th style="width: 20%"> <div> DESIGNER</div> </th>                         
                                <th style="width: 17%"> <div> CÓDIGO DO PROJETO</div> </th>                        
                                <th style="width: 18%"> <div> PRAZO DE ENTREGA</div> </th>                        
                                <th style="width: 16%"> <div> STATUS</div> </th>                        
                            </tr>    
                          </thead>
                        </table>
                  
                        <div  style=" margin-bottom:10px; width: 100%"
                              class="card"  
                              v-for=" (item, indx) in dataManufacture " :key="item.id_project"
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
                                        <td style="width: 20%">{{item.designer_name}}</td>                         
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
                                      <h3> Projeto ainda não tem Desenho </h3>
                                    </div>
                                    <table class="table table-hover" style="margin-bottom: 0; width: 100%" v-for="value in item.drawings" :key="value.id_drawing" >
                                        <tbody  class="table-hover">                                                
                                          <tr class="text-left border-left-0">
                                              <td style="width: 35%"  @click="showModalInfoDrawing(item, value.cod_drawing)">{{value.info_drawing}}</td>
                                              <td style="width: 20%"  @click="showModalInfoDrawing(item, value.cod_drawing)">{{value.cod_drawing}}</td>
                                              <td style="width: 15%"  @click="showModalInfoDrawing(item, value.cod_drawing)">{{value.desc_status}}</td>
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
                            </div>
                      </div>
                      <!-- FIM PROJETOS  -->
                                        
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
                                            <h4 v-if="!cadTarefas" class="mx-auto"> Agenda Tarefa</h4>
                                            <h4 v-else class="mx-auto"> Lista de Retrabalhos</h4>

                                          <div v-if="cadTarefas && viewPDF && !pdfShow " class="m-auto">
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
                                                v-if="drawingDetails.reworks.length == 0"
                                                style="width: 100%;"
                                              >
                                                  <div style="width: 100%"> <p> Não há tarefas </p> </div>
                                              </div>
                                              <tbody
                                                v-else
                                                class="table-hover"
                                                v-for=" item in drawingDetails.reworks" :key="item.id_rework"
                                                >
                                                 <tr class="border-bottom" role="button" @click="cadTarefas = false, taskSelected(item)">
                                                  <td>{{item.id_drawing}}</td>
                                                  <td>{{item.id_rework}}</td>
                                                  <td>{{item.desc_process}}</td>
                                                  <td>{{item.qtd_piece}}</td>
                                                  <td>{{item.cicletime_piece}}</td>
                                                  <td>{{item.time_task}}</td>
                                                  <td>{{item.user_name}}</td>
                                                  <td>{{item.desc_status}}</td>
                                                </tr>
                                              </tbody>  
                                            </table>
                                            <div class=" mt-4 d-flex flex-column justify-content-center text-center">
                                              <div>
                                                <span style="font-weight: bold"> Justificativa de Retrabalho:</span>
                                                <p> {{drawingDetails.revision_quality.commentary_revision}}</p>
                                              </div>
                                              <div clasS=" d-flex justify-content-start">
                                                <p style="font-weight: bold">Qualidade:</p>
                                                <p> {{drawingDetails.revision_quality.user_quality}}</p>
                                              </div>
                                            </div>
                                          </div>



                                          <form v-if="!cadTarefas"  @submit.prevent="adicionarTarefas(tarefas)" class="pt-0 col-lg-12 m-auto"  style="height: auto;">
                                            <div class="p-0">
                                              <div class="d-flex collum-form mt-2 p-0">
                                                <div class="form-group p-0 pr-1 col-lg-6">
                                                    <label>Quantidade de peças:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-account-outline"></i>
                                                      </span>
                                                    </div>
                                                      <input disabled type="number" class="form-control text-style" placeholder="Quantidade" v-model="tarefaSelecionada.qtd_piece"> </div>
                                                </div>
                                                <div class="form-group p-0 col-lg-6">
                                                    <label>Processo:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-format-list-numbers"></i>
                                                      </span>
                                                    </div>
                                                    <input disabled type="text" class="form-control text-style" placeholder="Quantidade" v-model="tarefaSelecionada.desc_process"> 
                                                  </div>
                                                </div>
                                              </div>
                                              <div class="d-flex collum-form">
                                                <div class="form-group p-0 pr-1 col-lg-6 ">
                                                    <label>Cicle Time:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-account-network"></i>
                                                      </span>
                                                    </div>
                                                    <input type="time"  step="1" class="form-control text-style" placeholder="Prazo de entrega"  @blur="handleBlur()"   v-model="tempoTarefa"> </div>
                                                </div>
                                                <div class="form-group p-0 pr-1 col-lg-6  ">
                                                  <label>Tempo total:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-email-outline"></i>
                                                      </span>
                                                    </div>
                                                          <input disabled type="text" step="1" class="form-control text-style" v-model="tempoTotalEdit"> 
                                                  </div>
                                                </div>
                                              </div>
                                              <div class="d-flex collum-form">
                                                <div class="form-group p-0 pr-1 col-lg-6 ">
                                                    <label>Nome do Operador:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-account-network"></i>
                                                      </span>
                                                    </div>
                                                      <select  class="form-select p-2" 
                                                                v-model="colaboratorSelected" 
                                                                placeholder="Setor"
                                                                type="number"
                                                                style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080; height: 45px; width: 80%"
                                                                @change="operatorSelected()"
                                                              >
                                                        <option value="" selected class="text-center">
                                                                  <span> Selecione </span>
                                                        </option>
                                                        <option :value="item.id_user" 
                                                                selected class="text-center"
                                                                v-for="(item, index) in colaborator" 
                                                                :key="index"
                                                              >
                                                                <span> {{item.name_user}}</span>
                                                        </option>
                                                      </select>                                                    
                                                    </div>
                                                </div>
                                                <div class="form-group p-0 pr-1 col-lg-6  ">
                                                  <label>Data Início:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-email-outline"></i>
                                                      </span>
                                                    </div>
                                                      <input disabled type="text" class="form-control text-style"  @blur="onblur()" v-model="dataStartTask" >
                                                  </div>
                                                </div>
                                              </div>
                                              <div class="d-flex collum-form">
                                                <div class="form-group p-0 pr-1 col-lg-6 ">
                                                    <label>Hora Início:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-account-network"></i>
                                                      </span>
                                                    </div>
                                                      <input type="time" step="1" class="form-control text-style"  @blur="onblur(), handleBlur()" v-model="time_start">                                        
                                                    </div>
                                                </div>
                                                <div class="form-group p-0 pr-1 col-lg-6">
                                                  <label>Data/Hora Final:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-email-outline"></i>
                                                      </span>
                                                    </div>
                                                          <input disabled type="text" class="form-control text-style" v-model="horaFinalCalculada" > 
                                                  </div>
                                                </div>
                                              </div>
                                              <b-col md="auto">
                                                <b-calendar 
                                                    block
                                                    class="border rounded"
                                                    style=" border: 2px solid green "
                                                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                                    nav-button-variant="success" 
                                                    locale="pt"
                                                    @context="onContext"
                                                    hide-header
                                                ></b-calendar>
                                              </b-col>

                                              <table v-if=" colaboratorSelected && (taskOperator.length > 0)" class="table text-center table-hover">
                                                <thead class="table-info">
                                                  <tr>
                                                    <td>Nome da Tarefa</td>
                                                    <td>Horário de Início</td>
                                                    <td>Horário final</td>
                                                    <td>Status</td>
                                                  </tr>
                                                </thead>
                                                <tbody 
                                                      class="table-hover"
                                                      v-for="task in taskOperator" :key="task.id_task"
                                                    >
                                                  <tr class="border-bottom" role="button">
                                                    <td>{{task.name_task}}</td>
                                                    <td>{{task.date_scheduled_task}}</td>
                                                    <td>{{task.date_scheduled_final_task}}</td>
                                                    <td>{{task.desc_status}}</td>
                                                  </tr>
                                                </tbody>  
                                              </table>
                                              <div
                                                v-if="colaboratorSelected && taskOperator.length == 0 && (dataStartTask != 'Selecione no Calendario')"
                                                style="width: 100%; text-align: center; margin-top:10px"
                                              >
                                                  <div style="width: 100%"> <p class="text-danger"> Não há tarefas para esse Operador nesta data</p> </div>
                                              </div>
                                              
                                              </table>

                                              <div class="form-group text-left d-flex justify-content-end mt-5 mb-2">
                                                <button class="btn btn-danger submit-btn mr-3 py-2" @click="cadTarefas = true">Cancelar</button>
                                                <button class="btn btn-success submit-btn mr-3 py-2" @click="agendarTarefa()" >Agendar Tarefa</button>
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                  </div>
                              </div>
                              <div class="modal-footer  col-lg-12 d-flex p-4 justify-content-start" >
                                <div class="d-flex col-lg-12">
                                 <!-- <button type="button" class="btn btn-primary p-3"> Histórico de Paradas </button>
                                  <button type="button" class="btn btn-primary p-3 ml-1"> Histórico de Revisões </button> -->
                                  <button  v-if="optionBtn" class="btn btn-info btn-lg ml-1" @click="viewPDF = true, pdfShow = true"> Visualizar Arquivo PDF </button>
                                  <button  v-if="optionBtn" class="btn btn-info btn-lg ml-1" @click="viewPDF = true, pdfShow = false, cadTarefas = true"> Tarefas </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> 
                      <!-- FIM MODAL TAREFAS  -->

                      <!-- MODAL JUSTIFICATIVA -->
                        <div class="modal fade"  tabindex="-1" role="dialog" id="drawingJustificativa" data-bs-backdrop="static">
                          <div class="modal-dialog modal-md">
                            <div class="modal-content">
                              <div class="modal-header  pb-0">
                                <div class="modal-title" id="exampleModalLabel">
                                     <P style="text-transform: uppercase">justificativa da Rejeição</P>
                                </div>
                                <button type="button" class="bi bi-x border-0" @click="closeModal(2)"></button>
                              </div>
                                <div class="modal-body">
                                    <div>
                                      <textarea id="w3review" name="w3review" rows="6" cols="50" v-model="justDrawing" ></textarea>
                                    </div>                                    
                                </div>
                              <div class="modal-footer d-flex p-4 justify-content-end">
                                <button class="btn btn-danger" @click="justDrawing = '', closeModal(2) "> Cancelar </button>
                                <button class="btn btn-success" @click="avaliarDrawing(2)" > Enviar </button>
                              </div>
                            </div>
                          </div>
                        </div> 
                      <!-- FIM MODAL JUSTIFICATIVA -->
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
      dataUser: JSON.parse(sessionStorage.getItem('keyPermission')),
      pdfDrawing:'',
      dataManufacture: [],
      tipoSLDASM: '',
      tipoSLDPRT: '',
      projectDetails: '',
      drawingDetails: '',
      visionPdf:false,
      justDrawing: '',
      drawingReject: '',
      drawingAproved:'',
      viewPDF: true,
      btnAvaliarDrawing: true,
      viewTarefas: false,
      taskDesable: true,
      pdfShow: true,
      optionBtn: false,
      tarefaSelecionada: '',
      processoManuf: '',
      colaborator: [],
      colaboratorSelected:'',

      tarefas :{
        quantPecas:'',
        processo: '',
        cicloTime: '',
        tempoTotal: '',
      },
      listTarefas: [],
      cadTarefas: true,
      dataStartTask: '',
      horaFinalCalculada: '',
      time_start: '',
      tempoTotalEdit:'',
      tempoTarefa: '',
      taskOperator:[],
      textQuality: 'teste texto retrabalho', 
    }
  },

  components: {
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
    this.listProjectMFG();
    this.searchColaborator();
    // this.BlurClicleTime();
    this.isLoading = true;

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

    onContext(data){

      if(data.selectedFormatted == 'No date selected'){
         this.dataStartTask= 'Selecione no Calendario';
      } else {
        this.dataStartTask =  data.selectedFormatted;
        this.onblur();
          if(this.colaboratorSelected){
              this.searchTask();
          }
      }
    },

    operatorSelected(){

      if(this.colaboratorSelected && (this.dataStartTask != 'Selecione no Calendario')){
        console.log("buscar tarefas")
              this.searchTask();
          }
    },

    taskSelected(item){
      console.log("taskSelected ->", item)
      this.limparCampos();
      this.tarefaSelecionada = item;
      this.tempoTotalEdit = this.tarefaSelecionada.time_task,
      this.tempoTarefa  = this.tarefaSelecionada.cicletime_piece
    },

    limparCampos(){
      this.time_start = '';
      this.horaFinalCalculada = '';
      this.colaboratorSelected = '';
    },

    onblur(){
      if(this.time_start && (this.dataStartTask !='No date selected')){
        this.calculetend()
      }
    },

    calculetend(){
       let json = { 
                    time_task: this.tempoTotalEdit,
                    date_scheduled_task: this.dataStartTask + ' ' + this.time_start,
                  }        
      this.axios.post('/task/calculetendtask', json)
      .then((response) => {
        let res =  response.data;
        this.horaFinalCalculada = res.date_scheduled_final_task; 
      })
      .catch((error) => {
        // console.log("error" , error)
      }) 
    },

    // BlurClicleTime(){

    //   this.tempoTotalEdit = Number(this.tarefaSelecionada.qtd_piece) * Number(this.tempoTarefa);
    //   console.log("tempoTotalEdit --->", this.tempoTotalEdit)
    // },

    searchTask(){
       let json = { 
                    id_user: this.colaboratorSelected,
                    date_scheduled: this.dataStartTask,
                  }  
      this.axios.post('/task/operatordate', json)
      .then((response) => {
        let res =  response.data;
        if(res.status == true){
          this.taskOperator = res.data;
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      }) 
    },

    searchColaborator(){
        let json =  { 
                      department_user: 6,
                      type_leader:0,
                    }   
      this.axios.post('/user/bydepartment', json)
      .then((response) => {
        let res =  response.data;
        if(res.status == true){
          this.colaborator = res.data; 
        } else {
          this.colaborator = 'Não foi possivél buscar Designer';
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },

    handleBlur(){
      console.log("tempoTotalEdit --->>>", this.tempoTotalEdit)
      let date = this.tempoTarefa.split(':');
      let hora = Number(date[0]);
      let min = Number(date[1]);

      let horaCal = (hora * 60 );
      let minTotal = horaCal + min;
      let mult = minTotal * Number(this.tarefaSelecionada.qtd_piece);

      let resulHora = Math.floor(mult / 60);
      let restMin = Math.floor(mult % 60);

      if(restMin == 0){
        restMin = '00';
      } 
      else if(restMin < 10){
        restMin = '0' + restMin; 
      } 

      if(resulHora == 0){
        resulHora = '00';
      } 
      else if(resulHora < 10){
        resulHora = '0' + resulHora;
      }
      this.tempoTotalEdit =  resulHora + ':' + restMin + ':00';
    },

    rejectDrawing(idDrawing){
      this.drawingReject = idDrawing;
      $('#drawingJustificativa').modal('show')
    },

    adicionarTarefas(tarefas){

      this.listTarefas.push({
                        id_project: this.projectDetails.cod_project,
                        type_process: tarefas.processo.id,
                        name_process: tarefas.processo.process,
                        id_drawing: this.drawingDetails.id_drawing,
                        time_task: tarefas.tempoTotal,
                        qtd_piece: Number(tarefas.quantPecas),
                        cicletime_piece: tarefas.cicloTime + ':00',
                      })

      this.Msg(
                "Tarefa Inserida!",
                "", "success", 1500,
                false, "Não", false,
                "Sim", 3
              );
      this.taskDesable = true;
    },

    agendarTarefa(){

        let json =  { 
                      id_rework: this.tarefaSelecionada.id_rework,
                      id_user: this.colaboratorSelected,
                      date_scheduled_task: this.dataStartTask + ' ' + this.time_start,
                      date_scheduled_final_task: this.horaFinalCalculada,
                      time_task: this.tempoTotalEdit,
                      cicletime_piece: this.tempoTarefa,
                    }   
      console.log("json-->", json)
              
      this.axios.post('/rework/updatemfg', json)
      .then( response => {
        console.log("response ->", response)
          let res =  response.data;
          if(res.status == true ){
            this.Msg(
                      "Tarefas agendada com sucesso!",
                      "", "success", 3000, false,"Não",
                      false, "Sim", 4
                    );
            this.listProjectMFG()
          } else {
              this.Msg(
                        // res.message,
                        "Erro ao agendar tarefa",
                        "", "error", 3500, false,
                        "Não", false, "Sim", 0
                      );
          }
      })
      .catch( (e) => {
      })
    },

    avaliarDrawing(data){
      if(data == 1){
        let listAproved  = [];
            listAproved.push(this.drawingAproved);

        let json =  {
                      drawings: listAproved,
                    }
        
        this.axios.post('/drawing/approvedrawing', json)
        .then((response) => {
          let res =  response.data;
          if(res.status == true ){
            this.Msg(
                      "Aprovação enviada com sucesso!",
                      "", "success", 3000, false,
                      "Não", false, "Sim", 2,
                    );

            this.btnAvaliarDrawing = false;
            this.viewPDF = true;
            this.pdfShow = false;
            this.optionBtn = true;
          } else {
              this.Msg(
                        "Falha ao aprovar desenho!",
                        "", "success", 3000, false,
                        "Não", false, "Sim", 2
                      );
          }
        })
        .catch((error) => {
          // console.log("error" , error)
        })  
      } 
      else {
        let listReject = [];
            listReject.push(this.drawingReject)
        let  json = {
                      drawings: listReject,
                      commentary: this.justDrawing,
                    }
        this.axios.post('/revisiondrawing/ngdoublecheck', json)
        .then((response) => {
          console.log("revision response -->>", response)
          let res =  response.data;
          if(res.status == true ){
            this.Msg(
                      "Rejeição enviada com sucesso!",
                      "", "success", 3000, false,
                      "Não", false, "Sim", 2,
                    );
          } else {
              this.Msg(
                        "Falha ao rejeitar desenho!",
                        "", "success", 3000, false,
                        "Não", false, "Sim", 2
                      );
          }
        })
        .catch((error) => {
          // console.log("error" , error)
        })  
      }
    },

  async showModalInfoDrawing(value, val){

    console.log("value -->", value)
    console.log("val -->", val)

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

    clearCamposTarefas(){
        this.tarefas = {  quantPecas:'', processo: '', cicloTime: '', tempoTotal: ''}
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

    listProjectMFG(){

      let json =  { status_drawing : [12] }

      this.axios.post('/drawing/bystatus', json)
      .then((response) => {
        console.log(" project manufacture rework-> ", response)
        let res =  response.data;
        if(res.status == true ){
          this.dataManufacture = res.data;
          this.isLoading = false;
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },


    downloadDrawingFile(id_file){
      let id_drawing_file = id_file;
      let pdfFileDrawing = '';''

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
    
    Msg(
      title,
      msg,  
      icon,
      time,
      btnCancelar,
      titleBtnCancelar,
      btnConfirmar,
      titleBtnConfirmar,
      option
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

        if(icon == 'success'){
          switch (option) {
            case 1:
              this.listProject();
            break;

            case 2:
              this.closeModal(2);
              this.listProjectMFG();
            break;

            case 3:
              this.clearCamposTarefas()
              this.cadTarefas = true;
            break;

            case 4:
              this.clearCamposTarefas()
              this.listTarefas = [];
              this.cadTarefas = true;
            break;

            default:
              console.log("erro!")
            break;
          }

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
