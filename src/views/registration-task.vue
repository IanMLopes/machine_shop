<template lang='html'>
  <section class='dashboard' >
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Dashboard</h4>
          <div class='quick-link-wrapper w-100 d-md-flex flex-md-wrap'>
            <ul class='quick-links'>
              <li><a href='#'>ICE Market data</a></li>
              <li><a href='#'>Own analysis</a></li>
              <li><a href='#'>Historic market data</a></li>
            </ul>
            <ul class='quick-links ml-auto'>
              <li><a href='#'>Settings</a></li>
              <li><a href='#'>Analytics</a></li>
              <li><a href='#'>Watchlist</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class='col-md-12'>
        <div class='page-header-toolbar'>
          <div class='sort-wrapper btn-group' role='group'>
            <button type='button'  class='btn btn-primary toolbar-item p-2 mr-2'>Colaborator</button>
            <button type='button'  class='btn btn-primary toolbar-item p-2 mr-2'>Machine</button>
            <button type='button' class='btn btn-primary toolbar-item'>Projeto</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
    <div class='row'>
      <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
              <div class='d-flex'>
                    <div class='wrapper'>
                      <h3 class='mb-0 font-weight-semibold'>Tarefa</h3>
                    </div>
              </div>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                 <div>
                    <h5 class="  font-weight-medium text-primary">Cadastro</h5>
                    <p class="mb-5 mr-auto">Insira os dados abaixo.</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 auto-form-wrapper flex-column'>

                  <form  @submit.prevent="register" class="pt-0"  style="height: auto; width: 100%; max-width: 100%">

                  <!--  <div class="d-flex justify-content-between collum-form">
                      <div> </div>
                      <div class="container-lg col-lg-6 col-md-12 d-flex flex-column  top-0 m-0 border " style="height: auto">
                        <div class="d-flex flex-column mx-auto px-3 justify-content-center justify-items-center rounded-circle"  
                            role="button" 
                            style="height: 100%; text-align: center; justify-content:center; justify-align: center">
                            <i v-if="!image" 
                              @click="chooseFiles()" 
                              class="mdi mdi-account-edit mdi-dark rounded-circle border m-auto d-flex justify-items-center justify-content-center "
                              style="width: 120px; height: 120px; font-size: 70px"
                                ></i>
                            <img v-else 
                                :src="image"  
                                class="rounded-circle mx-auto d-block divbutton" alt="" 
                                style="width: 120px; height: 120px"/> 
                        </div>
                        <input @change="onFileChange" accept="image/*" class="mx-auto rounded" type="file" title=" " id="fileUpload" hidden />
                        <span v-if="!image"  
                              class=" rounded btn-sm mt-1 border-0 w-50 mx-auto text-center text-primary"
                              role="button"
                              style=" text-decoration: underline"
                              @click="chooseFiles()">
                            Foto de Perfil
                        </span>
                        <span v-else class="mx-auto mt-3 text-primary" 
                              @click="chooseFiles()"
                              style="text-decoration: underline" 
                              role="button">
                              Editar
                        </span>
                      </div> -->
                    <div class=" col-lg-12  p-0 " >
                      <div class="d-flex collum-form mt-2 p-0">
                        <div class="form-group p-0 pr-1 col-lg-6 p-form" >
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-qrcode"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control text-style" placeholder="ID da Tarefa" v-model="idTarefa"> </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-timer"></i>
                              </span>
                            </div>
                            <input type="number" class="form-control text-style" placeholder="Tempo estimado" v-model="tempoEst"> </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form">
                        <div class="form-group p-0 pr-1 col-lg-6 p-form ">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-format-list-bulleted"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control text-style" placeholder="Descrição da tarefa" v-model="descTarefa" > </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <div class="input-group ">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-calendar-text"></i>
                              </span>
                            </div>
                            <input type="number"   class="form-control text-style" placeholder="Data inicio" v-model="dataInicio"  style="appearance: none" > </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form" >
                        <div class="form-group p-0 pr-1 col-lg-6 p-form">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-rename-box"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control text-style" placeholder="Nome do operador" v-model="nomeOperador" > </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-update"></i>
                              </span>
                            </div>
                            <input type="number" class="form-control text-style" placeholder="hora de inicio" v-model="horaInicio" > </div>
                        </div>
                      </div>
                      <div class="form-group text-left d-flex justify-content-end mt-5 mb-0">
                        <button class="btn btn-success submit-btn mr-3 py-2" style="" >REGISTRAR</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>

import JQuery from 'jquery'
let $ = JQuery
export default {
  name: 'registration-task',
  data(){
    return {
      register: 1,
      option: this.$route.params.option,
      idTarefa:'',
      descTarefa: '',
      dataInicio: '',
      nomeOperador: '',
      horaInicio: ''
    }
  },

  components: {},

  Watch: {},

  mounted(){  },

  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

    // option(data){
    //   console.log("data registration --->", data)
    //   this.register = data; 
    // }
  }
}
</script>

<style scoped lang='scss'>
</style>
