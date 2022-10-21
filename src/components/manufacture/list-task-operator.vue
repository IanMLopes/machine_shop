<template lang='html'>
    <!-- Page Title Header Ends-->
    <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary">Operador</h5>
                    <p class="mb-5 mr-auto">Tarefas para executar</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 col-sm-12 auto-form-wrapper flex-column'>
                      <!-- List tarefas  -->
                        <div  style=" margin-bottom:10px; width: 100%"
                              class="card d-flex justify-content-center "  
                            >
                                <table class="table-hover" >
                                  <thead  class="table-success">
                                    <tr class="text-center  col-lg-12  col-md-12 col-sm-12">
                                        <th style="width: 20%;"> <div>Nome da Tarefa</div> </th>                        
                                        <th style="width: 10%"> <div>Código  do Projeto </div> </th>                        
                                        <th style="width: 10%"> <div>Processo</div>                                            
                                        <th style="width: 15%"> <div>Data/hora Início</div>                                            
                                        <th style="width: 15%"> <div>Data/Hora Fim</div>                                            
                                        <th style="width: 10%"> <div>Status da Tarefa</div>                                            
                                        <th style="width: 20%"> <div>Arquivos</div>                                            
                                        </th>                         
                                    </tr>    
                                  </thead>
                                  <tbody class="table-hover"  v-for="item in dataTaskOperator " :key="item.id_task">
                                      <tr class="text-left border-left-0 border-bottom" role="button">
                                          <td style="width: 20%" @click="showModalInfoDrawing(item)">{{item.name_task}}</td>
                                          <td style="width: 10%" @click="showModalInfoDrawing(item)">{{item.id_project}}</td>
                                          <td style="width: 10%" @click="showModalInfoDrawing(item)">{{item.desc_process}}</td>
                                          <td style="width: 15%" @click="showModalInfoDrawing(item)">{{item.date_scheduled_final_task}}</td>
                                          <td style="width: 15%" @click="showModalInfoDrawing(item)">{{item.date_scheduled_task}}</td>
                                          <td style="width: 10%" @click="showModalInfoDrawing(item)">{{item.desc_status}}</td>
                                          <div style="display: flex">
                                            <td  v-for="itemDrawing in item.drawing.drawing_file" :key="itemDrawing.id_drawing_file" style="width: 100%; display: flex ">
                                              <p class="linkHover" v-if="itemDrawing.extension == 'pdf' " @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                <i class="bi bi-file-earmark-pdf"></i>.{{itemDrawing.extension}} </p> 
                                              <p class="linkHover" v-if="itemDrawing.extension == 'sldasm' " @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                <i class="bi bi-file-earmark-arrow-down"></i>.{{itemDrawing.extension}}</p> 
                                              <p class="linkHover" v-if="itemDrawing.extension == 'sldprt'" @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                <i class="bi bi-file-earmark-image"></i>.{{itemDrawing.extension}}</p> 
                                            </td>
                                          </div>
                                      </tr>
                                  </tbody>
                                </table>                                     
                          </div>
                      <!-- FIM list tarefas  -->
                                        
                      <!-- MODAL contagem tarefas  -->
                       <div class="modal fade"  tabindex="-1" role="dialog" id="drawingInfo" data-bs-backdrop="static"  style="overflow-y: auto" >
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                              <div class="modal-header">
                                <div class="modal-title" id="exampleModalLabel"> 
                                     <P style="text-transform: uppercase">PROJETO:</P>
                                </div>
                                <button type="button" class="bi bi-x border-0" data-bs-dismiss="modal" aria-label="Close" @click="closeModal(1)"></button>
                              </div>
                              <div class="modal-body">
                                  <div class="accordion" id="accordionFlushExample">
                                    <table class="table">
                                          <thead class="table-success">
                                            <tr class="text-center border">
                                              <th class="border p-0" style="vertical-align: middle; width: 20%"><p style="margin: auto">Horário Início</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 25%"><p style="margin: auto">Data/Hora Início Estimado</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 25%"><p style="margin: auto">Data/Hora Fim Estimado</p></th>
                                              <th class="border p-0" style="vertical-align: middle; width: 30%"><p style="margin: auto">Tempo Decorrido</p></th>
                                            </tr>
                                          </thead> 
                                    </table>
                                    <table  class="table table-hover" style="white-space: unset; border-spacing: 0;">
                                      <thead  class="accordion-item">
                                        <tr class="text-center border">
                                            <td class="border p-0" style="width: 20%">12:00</td>
                                            <td class="border p-0" style="width: 25%">{{taskDetails.date_scheduled_task}}</td>
                                            <td class="border p-0" style="width: 25%">{{taskDetails.date_scheduled_final_task}}</td>
                                            <td v-if="tempoPausado || taskDetails.status_task == 3" class="border p-0" 
                                                style="width: 30%; color: orange; font-size:32px"> 
                                                <span v-if="tempoPausado" class="p-0 m-0">{{tempoPausado}}</span> 
                                                <span v-else class="p-0 m-0">{{taskDetails.elapsed_time}}</span> 
                                            </td>
                                            <td v-else-if="taskDetails.status_task == 4" class="border p-0" 
                                                style="width: 30%; color: orange; font-size:32px"> 
                                                <span class="p-0 m-0">{{taskDetails.real_time_task}}</span> 
                                            </td>
                                            
                                            <td v-else class="border p-0" style="width: 30%; color: orange; font-size:32px">
                                              <div class="d-flex justify-content-center">
                                                <span class="p-0 m-0">{{day == 0 ? '00 - ' : day+' - '}} </span>
                                                <span class="p-0 m-0">{{ hour  == 0 ? '00:' : hour+':'}}</span>
                                                <span class="p-0 m-0">{{ minute == 0 ? '00:' : minute+':'}}</span>
                                                <span class="p-0 m-0">{{ second == 0 ? '00' : second}}</span>
                                              </div>
                                            </td>
                                        </tr>
                                      </thead>
                                    </table>  
                                        <div>
                                          <iframe  :src="pdfDrawing" width="100%" height="500" style="height: 90vh">No Support</iframe>
                                        </div>
                                  </div>
                              </div>
                              <div class="modal-footer  col-lg-12 d-flex p-4 justify-content-start">
                                <div class="d-flex col-lg-12" >
                                  <button :disabled="taskDetails.status_task == 2 || taskDetails.status_task == 3 || taskDetails.status_task == 4" 
                                          type="button" class="btn btn-success p-3"
                                          @click="readerQR()"> Iniciar 
                                  </button>
                                  <button :disabled="reniciarDis || taskDetails.status_task == 2 || taskDetails.status_task == 1 || taskDetails.status_task == 4"  
                                          type="button" class="btn btn-primary p-3 ml-1" 
                                          @click="startTask()" 
                                        > 
                                          Reniciar
                                  </button>
                                  <!--<button :disabled="taskDetails.status_task == 4" type="button" class="btn btn-primary p-3 ml-1">
                                          Histórico de Revisões 
                                  </button>-->
                                  <button :disabled="tempoPausado != '' || taskDetails.status_task == 3 || taskDetails.status_task == 1 || taskDetails.status_task == 4" 
                                          type="button" class="btn btn-primary p-3 ml-1" 
                                          @click="modalJustStop()" 
                                        > 
                                          Pausar 
                                  </button>
                                  <button :disabled="reniciarDis || taskDetails.status_task == 1 || taskDetails.status_task == 4 " 
                                          type="button" class="btn btn-primary p-3 ml-1" 
                                          @click="finishTask()" 
                                        > 
                                          Finalizar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> 
                    <!--   FIM MODAL ciontagem TAREFAS  -->

                      <!-- MODAL JUSTIFICATIVA parada -->
                        <div class="modal fade"  tabindex="-1" role="dialog" id="cameraQR" data-bs-backdrop="static">
                          <div class="modal-dialog modal-md">
                            <div class="modal-content">
                              <div class="modal-header  pb-0">
                                <div class="modal-title" id="exampleModalLabel">
                                     <P style="text-transform: uppercase"> Escanear QR code da máquina</P></P>
                                </div>
                                <button type="button" class="bi bi-x border-0" @click="closeModal(3)"></button>
                              </div>
                                <div class="modal-body">
                                    <div>
                                      <qrcode-stream :camera="camera" @decode="onDecode" :track="paintOutline" @init="logErrors" ref="qr" flat>

                                        <div v-show="showScanConfirmation" class="scan-confirmation flex-column ">
                                          <!--<img src="../../assets/images/machine-shop/check.svg" alt="Checkmark" width="128px" title="sucesso" />-->
                                          <button class="btn btn-success  p-2 m-auto rounded-1" style=" height: 100px" 
                                                  @click="startTask()" 
                                                >
                                                  CONFIRMAR INÍCIO DE TAREFA
                                          </button>
                                          <button class="btn btn-danger  p-2 m-auto rounded-1" style=" height: 50px" @click="closeModal(3)" >CANCELAR</button>
                                        </div>
                                      </qrcode-stream>
                                    </div>                                    
                                </div>
                              <div class="modal-footer d-flex p-4 justify-content-end">
                              </div>
                            </div>
                          </div>
                        </div> 

                        <!--<qrcode-stream></qrcode-stream>
                         <qrcode-drop-zone></qrcode-drop-zone>
                        <qrcode-capture></qrcode-capture>-->
                      <!-- FIM MODAL JUSTIFICATIVA ´parada -->

                    <!-- MODAL JUSTIFICATIVA STOP -->
                        <div class="modal fade"  tabindex="-1" role="dialog" id="StopJustificativaTask" data-bs-backdrop="static">
                          <div class="modal-dialog modal-md">
                            <div class="modal-content">
                              <div class="modal-header  pb-0">
                                <div class="modal-title" id="exampleModalLabel">
                                     <P style="text-transform: uppercase">justificativa da Parada</P>
                                </div>
                                <button type="button" class="bi bi-x border-0" @click="closeModal(2)"></button>
                              </div>
                                <div class="modal-body">
                                    <div>
                                      <textarea id="w3review" name="w3review" rows="6" cols="50" v-model="justStopTask" ></textarea>
                                    </div>                                    
                                </div>
                              <div class="modal-footer d-flex p-4 justify-content-end">
                                <button class="btn btn-danger" @click="stopTask() "> Cancelar </button>
                                <button class="btn btn-success" @click="sendStopTask()" > Enviar </button>
                              </div>
                            </div>
                          </div>
                        </div> 
                       <!--FIM MODAL JUSTIFICATIVA STOP -->
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
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'


const Swal = require("sweetalert2");

export default {
  name: 'dashboardMs',
  data(){
    return {
      isLoading: false,
      typeLoader: 'bars',
      dataUser: JSON.parse(sessionStorage.getItem('keyPermission')),
      dataTaskOperator: [],

      justStopTask:'',
      taskDetails:'',
      pdfDrawing:'',
      visionPdf: true,
      scanner: null,
      activeCameraId: null,
      cameras: [],
      camera: 'off',
      showScanConfirmation: false,
      loadingQR:'',
      idMachine: '',
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      day: 0,
      time:'',
      iniciarNone: false,
      tempoPausado: '',
      reniciarDis: false,
    }
  },

  components: {
    Loading,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },

  Watch: {
    projectTask(){
      this.optionProcess()
    }
  },

  created(){},

  mounted(){ 
    this.listTask();
    this.isLoading = true;
  },

  methods: {

    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },

    closeModal(val){
      if(val == 1){
        $("#drawingInfo").modal("hide");

          this.visionPdf = true;
          this.viewPDF =  true;

          // setTimeout(() => {
            this.millisecond = 0;
            this.second = 0;
            this.minute = 0;
            this.hour = 0;
            this.day = 0;
          // }, 1000)
          clearTimeout(this.time)
;     } else if(val == 2 ) {
          $("#StopJustificativaTask").modal("hide");
      } else {
        $("#cameraQR").modal("hide");
          this.camera ='off';
          this.showScanConfirmation = false;
      }
    },
    
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

    areaLateral(){
      if( $('.med').hasClass('active')){
          $('.med').removeClass('active');
      }else{0
          $('.med').addClass('active');
      }
    },

    async showModalInfoDrawing(task){
      this.tempoPausado = '';
      this.taskDetails = task;

      console.log("this.taskDetails -->", this.taskDetails)

      if(this.taskDetails.status_task == 2){
         let id_task = this.taskDetails.id_task;
        this.continueTask(id_task);
      }

      task.drawing.drawing_file.map( item => {
            if(item.extension == "pdf" ){
              console.log("achou!")
              this.downloadDrawingFile(item.id_drawing_file)
            }
      })
    },

    openLoadingQR() {
        this.loadingQR = this.$vs.loading({
          target: this.$refs.qr,
          scale: '0.8',
          background: 'white',
          opacity: 0.5,
          color: 'green',
          text:'Carregando...',
          fontsize: '14'
        })
    },

    readerQR(){
      $("#cameraQR").modal("show");
      this.camera ='auto';
    },

    onDecode (decodedString) {

      if(decodedString){
        this.openLoadingQR();
        this.camera ='off';
        this.idMachine = Number(decodedString); 
        setTimeout( () => {
            this.loadingQR.close()
            this.showScanConfirmation = true;
        },2000)
      }
    },

    startTask(){   

          this.isLoading = true;
          let dataInitialTask = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");      
          let json = {
                      id_task: this.taskDetails.id_task ,
                      date_begin_task: dataInitialTask ,
                      id_machine: this.taskDetails.status_task == 3 ? this.taskDetails.id_machine : this.idMachine,
                    }

          console.log("json -->", json)

          this.axios.post('/task/start', json)
          .then((response) => {
            console.log("response start task --->", response)
            let res =  response.data;

            if(res.status == true ){
              this.isLoading = false;
              this.iniciarNone = true;
              this.reniciarDis = true;

              if(this.taskDetails.status_task == 1 ){             
                this.Msg(
                          "Tarefa Iniciada.",
                          "Acompanhe o tempo no cronômetro.", "success", 3000, false,
                          "Não", false, "Sim", 1,
                        );

               
              } else{
                this.Msg(
                          "Tarefa Reiniciada.",
                          "Acompanhe o tempo no cronômetro.", "success", 3000, false,
                          "Não", false, "Sim", 3,
                        );
                let time = res.data.elapsed_time.split(' ')
                let horario = time[1].split(':')
                this.day = time[0];
                this.hour = horario[0]; 
                this.minute = horario[1];
                this.second = horario[2];

                if(this.second < 10 && this.second.length < 2 ){
                  this.second = '0'+this.second
                }     
                if(this.minute < 10 && this.minute.length < 2){
                    this.minute = '0'+this.minute
                }      
                if(this.hour < 10 && this.hour.length < 2 ){
                  console.log("hora reiniciar", this.hour)
                    this.hour = '0'+this.hour
                }   
                if(this.day < 10 && this.day.length < 2 ){
                    this.day = '0'+this.day
                }
              
                this.cronometro();
                this.taskDetails.status_task = 2;
              }
            } else {
              this.isLoading = false;
              if(this.taskDetails.status_task == 1 ){
                this.Msg(
                          "Falha ao iniciar tarefa",
                          "", "error", 3000, false,
                          "Não", false, "Sim", 4
                        );
              } else {
                this.Msg(
                          res.message,
                          "", "error", 3000, false,
                          "Não", false, "Sim", 4
                        );
              }
            }
          })
          .catch((error) => {
            // console.log("error" , error)
          }) 
    },

    continueTask(id_task){
      
      this.axios.get(`/task/${id_task}`)
      .then((response) => {
        console.log("response continue cronometro  --->", response)
        let res =  response.data;
        if(res.status == true ){
          let dataHoraInicial = res.data.date_reboot_task;
          let data_Elapsed_time = res.data.elapsed_time;
            // console.log(" dataHoraInicial -->", dataHoraInicial)
          this.formatDataInitial(dataHoraInicial, data_Elapsed_time)
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })     

    },

    formatDataInitial(data, time_elapsed){
      
      if(time_elapsed == null){
        time_elapsed = '00 00:00:00'
      }

      let dataAtual = new Date();
      let ms = moment(data,"DD/MM/YYYY HH:mm:ss").diff(moment(dataAtual,"DD/MM/YYYY HH:mm:ss"));
      let d = moment.duration(ms);

      let time = time_elapsed.split(' ')
      let horario = time[1].split(':')
      let day = Number(time[0]);
      let hour = Number(horario[0]);
      let minute = Number(horario[1]);
      let second = Number(horario[2]);

      this.day = d._data.days * -1;
      this.day = this.day + day;
      if(this.day < 10){
        this.day = '0'+this.day;
      }

      this.hour = d._data.hours * -1;
      this.hour = this.hour + hour;
      if(this.hour < 10){
        this.hour = '0'+this.hour;
      }

      this.minute = d._data.minutes * -1;
      this.minute = this.minute + minute;
      if(this.minute < 10){
        this.minute = '0'+this.minute;
      }

      this.second = d._data.seconds * -1;
      if(this.second < 10){
        this.second = '0'+this.second;
      }
      this.cronometro()
    },

    cronometro(){
      this.time = setInterval(() => { this.timer(); }, 10);
    },

    timer(){
       if ((this.millisecond += 10) == 1000) {
          this.millisecond = 0;
          this.second++;
          if(this.second < 10){
            this.second = '0'+this.second
          }
        }
        if (this.second == 60) {
          this.second = 0;
          this.minute++;
          if(this.minute < 10){
              this.minute = '0'+this.minute
          }
        }
        if (this.minute >= 60) {
          this.minute = 0;
          this.hour++;
          if(this.hour < 10){
              this.hour = '0'+this.hour
          }
        } 
        if (this.hour >= 24) {
          this.hour = 0;
          this.day++;
          if(this.day < 10){
              this.day = '0'+this.day
          }
      }

    },

    modalJustStop(){
      $("#StopJustificativaTask").modal("show");
    },

    finishTask(){

      let dataFinishTask = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

      console.log("this.day", this.day)
      console.log("this.hour", this.hour)
      console.log("this.minute", this.minute)
      console.log("this.second", this.second)

      console.log("taskDetails.elapsed_time", this.taskDetails.elapsed_time)

      let json = {
        id_task: this.taskDetails.id_task,
        elapsed_time: this.taskDetails.status_task == 2 ? this.day+ ' '+this.hour+':'+this.minute+':'+this.second : this.taskDetails.elapsed_time,
        date_end_task: dataFinishTask,
      }
      console.log("json finish ->", json)
      
      this.axios.post('/task/finish', json)
      .then((response) => {
        console.log("response finish task  --->", response)
        let res =  response.data;
        if(res.status == true ){
            this.Msg(
              "Tarefa finalizada.",
              "", "success", 2500, false,
              "Não", false, "Sim", 3,
            );
            this.taskDetails = res.data;
            
        } else {
            this.Msg(
              "Falha ao finalizar tarefa",
              "", "error", 2500, false,
              "Não", false, "Sim", 3,
            );
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })     

    },

    sendStopTask(){
      let dataStopTask = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
      
      if(this.second < 10 && String(this.second.length) < 2 ){
        this.second = '0'+this.second
      }     
      console.log("second", this.second)

      if(this.minute < 10 && String(this.minute.length) < 2){
          this.minute = '0'+this.minute
      }      
      console.log("minute", this.minute)
      if(this.hour < 10 && String(this.hour.length) < 2 ){
          this.hour = '0'+this.hour
      }   
      console.log("hour", this.hour)
      if(this.day < 10 && String(this.day.length) < 2 ){
          this.day = '0'+this.day
      }
      console.log("day", this.day)

      let json = {
        id_task: this.taskDetails.id_task,
        descr_stop_task: this.justStopTask,
        datetime_stop_task: dataStopTask,
        elapsed_time: this.day+ ' '+this.hour+':'+this.minute+':'+this.second,
      }

      console.log("json stop -->", json)

      this.axios.post('/task/stop', json)
      .then((response) => {
        console.log("response stop task  --->", response)
        let res =  response.data;
        if(res.status == true ){
            this.Msg(
              "Tarefa pausada.",
              "", "success", 2500, false,
              "Não", false, "Sim", 2,
            );
        } else {
            this.Msg(
              "Falha ao pausar tarefa",
              "", "error", 2500, false,
              "Não", false, "Sim", 2,
            );
        }
      })
      .catch((error) => {
        // console.log("error" , error)
      })     

    },

    logErrors (promise) {
      promise.catch(console.error)
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

    listTask(){

      let id = this.dataUser.id_user;

      this.axios.get(`/task/operator/${id}`)
      .then((response) => {
        console.log("response --->", response)
        let res =  response.data;
        if(res.status == true ){
          this.dataTaskOperator = res.data;
          this.isLoading = false;
        }
      })
      .catch((error) => {
         this.isLoading = false;
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
        console.log("result msg", result)

        if(result.dismiss == 'timer' || icon == 'success'){
          switch (option) {
            case 1:
              
              this.taskDetails.status_task = 2;
              this.reniciarDis = false;

              this.closeModal(3);
              this.cronometro();
              this.listTask();
            break;

            case 2:
              $("#StopJustificativaTask").modal("hide");
              this.justStopTask = '';
              this.tempoPausado = this.day+ ' '+this.hour+':'+this.minute+':'+this.second;
              console.log("this.tempoPausado->", this.tempoPausado )
              this.reniciarDis = false;
              clearTimeout(this.time)
              this.taskDetails.status_task = 3;
               this.listTask();
            break;

            case 3:
              this.tempoPausado = '';
              this.reniciarDis = false;
              this.listTask();
            break;
            case 4:
              
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
.linkHover:hover{
  color: blue;
}
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

</style>
