<template lang='html'>
    <!-- Page Title Header Ends-->
    <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary"> Inspeção da Qualidade</h5>
                    <p class="mb-5 mr-auto">Projetos para Inpeção</p>
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
                              <!--  <th style="width: 3%"> <div> AÇÕES </div> </th>          -->              
                            </tr>    
                          </thead>
                        </table>
                  
              <!--    <button class="btn btn-success" @click="infoProject = 'item', projectShow = true"  data-bs-target="#resgister-ativ" data-bs-toggle="modal"  > Cadastrar </button>
-->
                        <div  style=" margin-bottom:10px; width: 100%"
                              class="card"  
                              v-for=" (item, indx) in projects " :key="item.id_project"
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
                                  <!-- @click="listTask(item)"-->
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
                                            >
                                              <td  @click="showModalInfoDrawing(item, value.cod_drawing )" style="width: 35%">{{value.info_drawing}}</td>
                                              <td  @click="showModalInfoDrawing(item, value.cod_drawing )" style="width: 20%">{{value.cod_drawing}}</td>
                                              <td  @click="showModalInfoDrawing(item, value.cod_drawing )" style="width: 15%">{{value.desc_status}}</td>
                                              <div style="display: flex">
                                                <td v-for="itemDrawing in value.drawing_file" :key="itemDrawing.id_drawing_file" style="width: 100%; display: flex ">
                                                  <p v-if="itemDrawing.extension == 'pdf' " @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                       <i class="bi bi-file-earmark-pdf"></i>.{{itemDrawing.extension}} </p> 
                                                  <p v-if="itemDrawing.extension == 'sldasm' " @click="downloadDrawingFile(itemDrawing.id_drawing_file)">
                                                        <i class="bi bi-file-earmark-arrow-down"></i>.{{itemDrawing.extension}} </p> 
                                                  <p v-if="itemDrawing.extension == 'sldprt'" @click="downloadDrawingFile(itemDrawing.id_drawing_file)" >
                                                        <i class="bi bi-file-earmark-image"></i>.{{itemDrawing.extension}} </p> 
                                                </td>
                                              </div>
                                              <!-- <td style="displey: flex">   
                                                    <b-icon icon="trash-fill" color="red" aria-hidden="true" 
                                                            @click="deleteDrawing()" 
                                              ></b-icon> -->                                              
                                              </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                    <div class="pt-3 d-flex justify-content-end">
                                      <!--  <button class="btn btn-success" 
                                                @click="infoProject=item.cod_project, projectShow=true"
                                                data-bs-target="#adicionar-desenho" 
                                                data-bs-toggle="modal"
                                                >Adicionar desenho
                                        </button> -->
                                    </div>
                                  </div>
                                </div>
                            </div>
                      </div>
                      <!-- FIM PROJETOS  -->

                      <!-- MOSTRAR PDF -->
                  <!--    <div class="modal fade" id="modal-agreement" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel">
                        <div class="modal-dialog modal-lg" role="document">
                          <div class="modal-content">
                            <div class="modal-body">
                              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                              <object type="application/pdf" :data="pd" width="100%" height="500" style="height: 85vh">No Support</object>
                            </div>
                          </div>
                        </div>
                      </div> -->
                      <!-- FIM MOSTRAR PDF -->
                                        
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
                                        <div class="modal-body">
                                          <iframe  :src="pdfDrawing" width="100%" height="500" style="height: 90vh">No Support</iframe>
                                        </div>
                                    <div class="mt-4 d-flex justify-content-center">
                                       <div class="d-flex">
                                            <button class="btn btn-danger mr-3" 
                                                    @click="rejectDrawing(drawingDetails.id_drawing)"
                                                  > Rejeitar
                                            </button>
                                            <button class="btn btn-success" @click="drawingAproved = drawingDetails.id_drawing, avaliarDrawing(1)"> Aprovar </button>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                              <div class="modal-footer d-flex p-4 justify-content-start">
                                <div>
                                 <!-- <button type="button" class="btn btn-primary p-3"> Histórico de Paradas </button>
                                  <button type="button" class="btn btn-primary p-3"> Histórico de Revisões </button> -->
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
                                     <P style="text-transform: uppercase">justificativa de Rejeição da Qualidade</P>
                                </div>
                                <button type="button" class="bi bi-x border-0" @click="closeModal(2)"></button>
                              </div>
                              <div class="modal-body">
                                <div>
                                  <textarea id="w3review" name="w3review" rows="6" cols="50" v-model="justDrawing" ></textarea>
                                </div>                                    
                                <div class="d-flex pb-4 collum-form ">
                                 <!-- <div class="d-flex flex-column">
                                      <span clasS="m-auto text-center">Tipo Rejeição</span>
                                      <div>
                                        <div class="form-check pr-3" role="button">
                                          <input class="form-check-input" type="radio" name="flexRadioDefault" value="1" id="flexRadioDefault1" checked v-model="type_leader" role="button">
                                          <label class="form-check-label pl-0" for="flexRadioDefault1" role="button">
                                            Retrabalho
                                          </label>
                                        </div>

                                        <div class="form-check pr-3" role="button">
                                          <input style="border: 1px solid green" class="form-check-input" type="radio" name="flexRadioDefault" value="0" id="flexRadioDefault2" checked v-model="type_leader" role="button">
                                          <label class="form-check-label pl-0" for="flexRadioDefault2" role="button">
                                            Refazer
                                          </label>
                                        </div>
                                      </div>
                                  </div> -->
                                  <div clasS="form-check d-flex mt-0">
                                    <label clasS="text-center  mt-0" style="margin" >Quantidade: </label>                                      
                                    <input type="number" class="form-check-label mr-2 d-flex justify-content-center" placeholder="" v-model="quantPecas"> </div>
                                  </div>
                                  <div clasS=" d-flex justify-content-end">
                                    <button class="btn btn-danger" @click="justDrawing = '', closeModal(2) "> Cancelar </button>
                                    <button class="btn btn-success" style="margin-left: 10px" @click="avaliarDrawing(2)"> Enviar </button>
                                  </div>
                                </div>
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
      dataDouble: [],
      tipoPdf: 'ssss',
      tipoSLDASM: '',
      tipoSLDPRT: '',
      projectDetails: '',
      drawingDetails: '',
      visionPdf:false,
      justDrawing: '',
      drawingReject: '',
      drawingAproved:'',
      quantPecas:'',
     
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
    this.listDrawingQuality();
  },

  methods: {

    closeModal(val){
      if(val == 1){
        $("#drawingInfo").modal("hide");
        this.visionPdf = false;
      } else {
        $("#drawingJustificativa").modal("hide");
         $("#drawingInfo").modal("hide");
      }
    },

    rejectDrawing(idDrawing){
      this.drawingReject = idDrawing;
      $('#drawingJustificativa').modal('show')
    },

    avaliarDrawing(data){

      if(data == 1){

        let listAproved  = [];
            listAproved.push(this.drawingAproved);

        let json =  {
                      drawings: listAproved,
                    }
        console.log("json aproved", json )
        
        this.axios.post('/drawing/approvedrawing', json)
        .then((response) => {
          console.log("revision response -->>", response)
          let res =  response.data;
          if(res.status == true ){
            this.Msg(
                      "Qualidade aprovada com sucesso!",
                      "",
                      "success",
                      3000,
                      false,
                      "Não",
                      false,
                      "Sim",
                      2,
                    );
          } else {
              this.Msg(
                      "Falha ao aprovar qualidade!",
                      "",
                      "success",
                      3000,
                      false,
                      "Não",
                      false,
                      "Sim",
                      2
                    );
          }
        })
        .catch((error) => {
          // console.log("error" , error)
        })  
      } 
      else { //data == 2
        let listReject = [];
            listReject.push(this.drawingReject)
        let  json = {
                      id_drawing: this.drawingDetails.id_drawing,
                      id_user: this.dataUser.id_user,
                      commentary_revision: this.justDrawing,
                      qtd_piece:  Number(this.quantPecas),
                    }

        console.log("json =->", json)
        // return
        this.axios.post('/drawing/ngquality', json)
        .then((response) => {
          console.log("revision response -->>", response)
          let res =  response.data;
          if(res.status == true ){
            this.Msg(
                      "Rejeição enviada com sucesso!",
                      "",
                      "success",
                      3000,
                      false,
                      "Não",
                      false,
                      "Sim",
                      2,
                    );
          } else {
              this.Msg(
                      res.message,
                      "",
                      "warning",
                      3000,
                      false,
                      "Não",
                      false,
                      "Sim",
                      2
                    );
          }
        })
        .catch((error) => {
          // console.log("error" , error)
        })  
      }
    },

  async showModalInfoDrawing(value, val){

    console.log("value", value )
    console.log("val", val )

      this.projectDetails = value;
      this.visionPdf = true;

      value.drawings.map( item => {
        if(item.cod_drawing == val){
          this.drawingDetails = item;
          console.log("desenho reject ->", this.drawingDetails)
          item.drawing_file.map( item2 => {
            if(item2.extension == "pdf" ){
              this.downloadDrawingFile(item2.id_drawing_file)
            }
          })
        }
      })
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

    areaLateral(){
      if( $('.med').hasClass('active')){
          $('.med').removeClass('active');
      }else{
          $('.med').addClass('active');
      }
    },

    listDrawingQuality(){

      let json =  { status_drawing : [10] }

        this.axios.post('/drawing/bystatus', json)
        .then((response) => {
          console.log("response quality", response)
          let res =  response.data;
          if(res.status == true ){
            this.projects = res.data;
            this.isLoading = false;
          }
        })
        .catch((error) => {
          // console.log("error" , error)
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
              this.listDrawingQuality();
            break;

            case 2:
              this.closeModal(2);
              this.listDrawingQuality();
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
