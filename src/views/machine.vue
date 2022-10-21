<template lang='html'>
  <section class='machine' >
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
        <div class='page-header-toolbar justify-content-between'>
          <div class='sort-wrapper btn-group' role='group' style="width: auto !important">
            <button type='button' style="width: 150px !important"  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionMachine = 1"> Listar </button>
             <!-- <button type='button'  class='btn btn-primary toolbar-item p-2 mr-2' @click="optionProject = 2">Cadastrar</button> -->
            <!--<button type='button' class='btn btn-primary toolbar-item'>Máquina</button>-->
          </div>
          <button class="btn rounded-circle d-flex flex-direction-end "  @click="optionMachine = 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" style="color: #15b67d"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
    <div class='row'>
        <list-machine v-if="optionMachine == 1"></list-machine>
        <register-machine v-if="optionMachine == 2"></register-machine>
    </div>

    </div>
  </section>
</template>

<script>

import registerMachine from "../components/machine/register-machine.vue" 
import listMachine from "../components/machine/list-machine.vue" 

// import JQuery from 'jquery'
// let $ = JQuery

export default {
  name: 'machine',
  data(){
    return {
      register: 1,
      option: this.$route.params.option,
      image: '',
      optionMachine: 1,

    }
  },

  components: {
    registerMachine,
    listMachine,
  },

  Watch: {
    

  },

  mounted(){
    // $('input[type="file"]').attr('title', window.webkitURL ? ' ' : '');

    // $('#myInputFile').attr('title', '');

  },

  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

    chooseFiles() {
        document.getElementById("fileUpload").click()
    },

    onFileChange(e) {
      const file = e.target.files[0];
      this.image = URL.createObjectURL(file);
    },


    saveMachine(){ },


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
