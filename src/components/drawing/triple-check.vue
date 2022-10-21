<template lang='html'>
    <!-- Page Title Header Ends-->
    <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary"> Triple Check</h5>
                    <p class="mb-5 mr-auto">Projetos para avaliação</p>
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
                              v-for=" (item, indx) in dataTriple " :key="item.id_project"
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
                                        <tbody  class="table-hover"
                                        >                                                
                                          <tr class="text-left border-left-0"
                                              @click="showModalInfoDrawing(item, value.cod_drawing )"
                                            >
                                              <td style="width: 35%">{{value.info_drawing}}</td>
                                              <td style="width: 20%">{{value.cod_drawing}}</td>
                                              <td style="width: 15%">{{value.desc_drawing}}</td>
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
                                            <td class="border p-0" style="width: 10%">{{projectDetails.pic_project}}</td>
                                            <td class="border p-0" style="width: 10%">{{drawingDetails.cod_drawing}}</td>
                                            <td class="border p-0" style="width: 10%">{{drawingDetails.type_drawing}}</td>
                                            <td class="border p-0" style="width: 15%; white-space: normal">{{drawingDetails.info_drawing}}</td>
                                            <td class="border p-0" style="width: 7%">{{drawingDetails.status_drawing}}</td>
                                        </tr>
                                      </thead>
                                    </table>  
                                        <div v-if="viewPDF">
                                          <iframe  :src="pdfDrawing" width="100%" height="500" style="height: 90vh">No Support</iframe>
                                        </div>
                                        <div v-if="!viewPDF" class="col-lg-8 border mt-4 d-flex flex-column mx-auto">
                                            <h4 v-if="!cadTarefas" class="mx-auto"> Cadastrar Tarefas</h4>
                                            <h4 v-else class="mx-auto"> Lista de Tarefas</h4>
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
                                                      <input type="number" class="form-control text-style" placeholder="Quantidade" v-model="tarefas.quantPecas"> </div>
                                                </div>
                                                <div class="form-group p-0 col-lg-6">
                                                    <label>Processo:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-format-list-numbers"></i>
                                                      </span>
                                                    </div>
                                                    <select  class="form-select p-2" 
                                                              v-model="tarefas_processo" 
                                                              placeholder="Setor"
                                                              type="number"
                                                              style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080; height: 45px; width: 80%"
                                                            >
                                                      <option value="" selected class="text-center">
                                                                <span> Selecione </span>
                                                      </option>
                                                      <option :value="item" 
                                                              selected class="text-center"
                                                              v-for="item in processoManuf" :key="item.id_type_process"
                                                            >
                                                              <span> {{item.desc_process}}</span>
                                                      </option>
                                                    </select>
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
                                                    <input type="time" step="1" class="form-control text-style" placeholder="Prazo de entrega" @blur="handleBlur" v-model="tarefas.cicloTime"> </div>
                                                </div>
                                                <div class="form-group p-0 pr-1 col-lg-6  ">
                                                  <label>Tempo total:</label>
                                                  <div class="input-group">
                                                    <div class="input-group-prepend">
                                                      <span class="input-group-text">
                                                        <i class="mdi mdi-email-outline"></i>
                                                      </span>
                                                    </div>
                                                          <input type="text" class="form-control text-style" v-model="tarefas.tempoTotal"> 
                                                  </div>
                                                </div>
                                              </div>
                                              <div class="form-group text-left d-flex justify-content-end mt-5 mb-2">
                                                <button class="btn btn-danger submit-btn mr-3 py-2" @click="cadTarefas = true">Cancelar</button>
                                                <button class="btn btn-success submit-btn mr-3 py-2" >Adicionar Tarefa</button>
                                              </div>
                                            </div>
                                          </form>

                                          <div v-else >
                                            <table class="table text-center">
                                              <thead class="table-info">
                                                <tr>
                                                  <td>Código do Desenho</td>
                                                  <td>Tipo de processo</td>
                                                  <td>Quantidade de Preça</td>
                                                  <td>Tempo por Peça</td>
                                                  <td>Tempo Total</td>
                                                </tr>
                                              </thead>
                                              <div
                                                v-if="listTarefas.length == 0"
                                                class="table-hover"
                                                style="width: 100%;"
                                              >
                                                   <div style="width: 100%"> <p> Não há tarefas </p> </div>
                                              </div>
                                              <tbody
                                                v-else
                                                class="table-hover"
                                                v-for=" item in listTarefas" :key="item.id_drawing"
                                                >
                                                 <tr class="border-bottom">
                                                  <td>{{item.id_drawing}}</td>
                                                  <td>{{item.name_process}}</td>
                                                  <td>{{item.qtd_piece}}</td>
                                                  <td>{{item.cicletime_piece}}</td>
                                                  <td>{{item.time_task}}</td>
                                                </tr>
                                              </tbody>  
                                              
                                            </table>
                                          </div>
                                          <vs-button v-if="cadTarefas"
                                                     circle icon floating 
                                                     style="width: 50px; height: 50px; position: relative; margin-left: 94%; margin-top:10px"
                                                      @click="viewPDF = false, cadTarefas = false"
                                                     > 
                                              <b-icon icon="plus-lg" aria-hidden="true"></b-icon>
                                          </vs-button>
                                        </div>
                                        
                                        <div v-if="btnAvaliarDrawing" class="mt-4 d-flex justify-content-center">
                                          <div class="d-flex">
                                                <button class="btn btn-danger mr-3" 
                                                        @click="rejectDrawing(drawingDetails.id_drawing)"
                                                      > Rejeitar
                                                </button>
                                                <button class="btn btn-success" 
                                                        @click="drawingAproved = drawingDetails.id_drawing, avaliarDrawing(1)"
                                                      > Aprovar 
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="!btnAvaliarDrawing && cadTarefas && !viewPDF"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           mmmmmmmmm class="mt-4 d-flex justify-content-center">
                                          <div class="d-flex">
                                                <button class="btn btn-success" 
                                                        @click="saveTasks()"
                                                        :disabled="!taskDesable && listTarefas.length == 0 "
                                                      > Enviar Tarefas 
                                                </button>
                                            </div>
                                        </div>
                                  </div>
                              </div>
                              <div class="modal-footer  col-lg-12 d-flex p-4 justify-content-start" >
                                <div class="d-flex col-lg-12">
                                 <!-- <button type="button" class="btn btn-primary p-3"> Histórico de Paradas </button>
                                  <button type="button" class="btn btn-primary p-3 ml-1"> Histórico de Revisões </button> -->
                                  <button  v-if="!btnAvaliarDrawing" class="btn btn-info btn-lg ml-1" @click="viewPDF = true"> Visualizar Arquivo PDF </button>
                                  <button  v-if="!btnAvaliarDrawing" class="btn btn-info btn-lg ml-1" @click="viewPDF = false"> Tarefas </button>
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
    </div>
</template>

<script>

// import JQuery from 'jquery'
// let $ = JQuery

const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  data(){
    return {
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
      dataTriple: [],
      tipoPdf: 'ssss',
      tipoSLDASM: '',
      tipoSLDPRT: '',
      projectDetails: '',
      drawingDetails: '',
      visionPdf:false,
      justDrawing: '',
      drawingReject: '',
      drawingAproved:'',
      viewPDF: true, //true
      btnAvaliarDrawing: true,
      viewTarefas: false,
      taskDesable: true,
      tarefas :{
        quantPecas:'',
        cicloTime: '',
        tempoTotal: '',
      },
      tarefas_processo: '',
      processoManuf:[],
      listTarefas: [],
      cadTarefas: false,
    }
  },

  components: {
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
    this.listProjectTriple();
    this.processo();
  },

  methods: {

    closeModal(val){
      if(val == 1){
        $("#drawingInfo").modal("hide");
        this.visionPdf = false;
      } else {
        $("#drawingJustificativa").modal("hide");
      }
    },

    handleBlur(){
      let date = this.tarefas.cicloTime.split(':');
      let hora = Number(date[0]);
      let min = Number(date[1]);

      let horaCal = (hora * 60 );
      let minTotal = horaCal + min;
      let mult = minTotal * Number(this.tarefas.quantPecas);

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
      this.tarefas.tempoTotal =  resulHora + ':' + restMin + ':00';
    },

    rejectDrawing(idDrawing){
      this.drawingReject = idDrawing;
      $('#drawingJustificativa').modal('show')
    },

    processo(){
       this.axios.get('/typeProcess')
      .then( response => {
         console.log("process response -->>", response)
          let res =  response.data;
          if(res.status == "success" ){
            this.processoManuf = res.data;
          } else {
          }
      })
      .catch( (e) => {
      })
    },


    adicionarTarefas(tarefas){

      this.listTarefas.push({
                        id_project: this.projectDetails.cod_project,
                        type_process: this.tarefas_processo.id_type_process,
                        name_process: this.tarefas_processo.desc_process,
                        id_drawing: this.drawingDetails.id_drawing,
                        time_task: tarefas.tempoTotal,
                        qtd_piece: Number(tarefas.quantPecas),
                        cicletime_piece: tarefas.cicloTime,
                      })
      this.Msg(
                "Tarefa Inserida!",
                "", "success", 1500,
                false, "Não", false,
                "Sim", 3
              );
      this.taskDesable = true;

    },

    saveTasks(){

      this.taskDesable = false;

      console.log("listTarefas -->", this.listTarefas)

      this.axios.post('/task/createtriplecheck', this.listTarefas)
      .then( response => {
         console.log("tasks response -->>", response)
          let res =  response.data;
          if(res.status == true ){
            this.Msg(
                      "Tarefas cadastradas com sucesso!",
                      "", "success", "3000", false,"Não",
                      false, "Sim", 4
                    );
          } else {
              this.Msg(
                        "Falha ao cadastrar tarefas!",
                        "", "success", 3000, false,
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
          console.log("aproved response triple -->>", response)
          let res =  response.data;
          if(res.status == true ){
            this.Msg(
                      "Aprovação enviada com sucesso!",
                      "", "success", 3000, false,
                      "Não", false, "Sim", 2,
                    );

            this.btnAvaliarDrawing = false;
            this.viewPDF = false;
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

      this.projectDetails = value;
      this.visionPdf = true;

      value.drawings.map( item => {
        if(item.cod_drawing == val){
          this.drawingDetails = item;
          if(item.status_drawing == 9){
            this.btnAvaliarDrawing = false;
          } else {
            this.btnAvaliarDrawing = true;
          }
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

    // optionStatus(value){
    //   switch (value) {
    //     case 1: this.status_task = 'Agendadas'; break;
    //     case 2: this.status_task = 'Iniciadas'; break;
    //     case 3: this.status_task = 'Paradas'; break;
    //     case 4: this.status_task = 'Finalizadas'; break;
    //     default: console.log(`Sem status  ${value}.`);
    //   }
    // },

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

    listProjectTriple(){

      let id_user_dcheck = this.dataUser.id_user;

      this.axios.get(`/drawing/bytriplecheck/${id_user_dcheck}`)
      .then((response) => {
        console.log("data double response -->>", response)
        let res =  response.data;
        if(res.status == true ){
          this.dataTriple = res.data;
          console.log("dataTriple", this.dataTriple)
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

        console.log("result alert triple ->", result)

        if(icon == 'success'){
          switch (option) {
            case 1:
              this.listProject();
            break;

            case 2:
              this.closeModal(2)
            break;

            case 3:
              this.clearCamposTarefas()
              this.cadTarefas = true;
            break;

            case 4:
            console.log("aquiaqui --=->", this.taskDesable)
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

</style>
