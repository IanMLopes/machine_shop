<template lang='html'>
  <section class='dashboard' >
 
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h4 class='page-title'>Usuário</h4>
          <div class='quick-link-wrapper w-100 d-md-flex flex-md-wrap'>
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
                      <h3 class='mb-0 font-weight-semibold'>Dados do Usuário</h3>
                    </div>
              </div>
            <div class='col-lg-12 col-md-12 mt-md-0 mt-4'>
                  <div>
                    <h5 class="  font-weight-medium text-primary">Cadastro</h5>
                    <p class="mb-5 mr-auto">Insira os dados abaixo.</p>
                  </div>
              <div class='d-flex'>
                <div class='wrapper col-lg-12  col-md-12 auto-form-wrapper flex-column '>
                  <form  @submit.prevent="register" class="pt-0"  style="height: auto; width: 100%; max-width: 100%">

                    <div  class="d-flex justify-content-between collum-form">
                      <div> </div>
                      <div class="container-lg col-lg-6 col-md-12 d-flex flex-column  top-0 m-0 border " style="height: auto">
                        <div  class="d-flex flex-column mx-auto px-3 justify-content-center justify-items-center rounded-circle"  
                            role="button" 
                            style="height: 100%; text-align: center; justify-content:center; justify-align: center">
                            <i v-if="!image"
                              :disabled="disabled"
                              @click="chooseFiles()" 
                              class="mdi mdi-account-edit mdi-dark rounded-circle border m-auto d-flex justify-items-center justify-content-center "
                              style="width: 120px; height: 120px; font-size: 70px"
                                ></i>
                            <img v-else 
                                :src="image"  
                                class="rounded-circle mx-auto d-block divbutton" alt="" 
                                style="width: 120px; height: 120px"/> 
                        </div>
                        <input :disabled="disabled"  @change="onFileChange" accept="image/*" class="mx-auto rounded" type="file" title=" " id="fileUpload" hidden />
                        <span v-if="!image && !disabled "  
                              
                              class="   rounded btn-sm mt-1 border-0 w-50 mx-auto text-center text-primary"
                              role="button"
                              style=" text-decoration: underline"
                              @click="chooseFiles()">
                            Foto de Perfil
                        </span>
                        <span v-if="image && !disabled" class="mx-auto mt-3 text-primary" 
                              @click="chooseFiles()"
                              style="text-decoration: underline" 
                              role="button">
                              Editar
                        </span>
                      </div>
                    </div>
                    <div class=" col-lg-12  p-0 " >
                      <div class="d-flex collum-form mt-2 p-0">
                        <div class="form-group p-0 pr-1 col-lg-6 p-form" >
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-outline"></i>
                              </span>
                            </div>
                            <input :disabled="disabled" type="text" class="form-control text-style" placeholder="Nome" v-model="userName"> </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-outline"></i>
                              </span>
                            </div>
                            <input :disabled="disabled" type="number" class="form-control text-style" placeholder="Matrícula" v-model="registration"> </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form">
                        <div class="form-group p-0 pr-1 col-lg-6 p-form ">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <input :disabled="disabled" type="text" class="form-control text-style" placeholder="E-mail" v-model="email" > </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <div class="input-group ">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <input :disabled="disabled" type="number"   class="form-control text-style" placeholder="Setor" v-model="sector"  style="appearance: none" > </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form" >
                        <div class="form-group p-0 pr-1 col-lg-6 p-form">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <input :disabled="disabled" type="text" class="form-control text-style" placeholder="Função" v-model="occupation" > </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <input :disabled="disabled" type="number" class="form-control text-style" placeholder="Cost Center" v-model="cost_center" > </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form">
                        <div class="form-group p-0 pr-1 col-lg-6 p-form">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-lock-outline"></i>
                              </span>
                            </div>
                            <input :disabled="disabled" type="password" class="form-control text-style" placeholder="Senha" v-model="password"> </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-lock-outline"></i>
                              </span>
                            </div>
                            <input :disabled="disabled" type="password" class="form-control text-style" placeholder="Confirmar Senha" v-model="confirmPassword"> </div>
                        </div>
                      </div>                    
                      <div  class="d-flex justify-content-between mt-5 mb-0 collum-form">
                        <!--<div class="d-flex pb-4 collum-form ">
                          <div class="form-check pr-3">
                            <span>Nível</span>
                          </div>
                          <div class="form-check pr-3">
                            <input :disabled="disabled" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label pl-0" for="flexRadioDefault1">
                              Colaborador
                            </label>
                          </div>
                          <div class="form-check pr-3">
                            <input :disabled="disabled" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                            <label class="form-check-label pl-0" for="flexRadioDefault2">
                              Coordenador
                            </label>
                          </div>
                          <div class="form-check pr-3">
                            <input :disabled="disabled" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked>
                            <label class="form-check-label pl-0" for="flexRadioDefault3">
                              supervisor
                            </label>
                          </div>
                        </div>-->
                        <div v-if="!disabled"  class="form-group  d-flex justify-content-end  mt-5 mb-0 form-btn"  style="border: 1px solid ">
                          <button class="btn btn-danger submit-btn mr-3 mt-button " @click="disabled = true, dataUser(2)">CANCELAR</button>
                          <button class="btn btn-success submit-btn mr-3 mt-button" >REGISTRAR</button>
                        </div>
                        <div v-else  class="form-group  d-flex justify-content-end mt-5 mb-0 collum-form">
                          <!--<button class="btn btn-success submit-btn mr-3" @click="disabled = false, dataUser(1)"  >EDITAR</button>-->
                        </div>
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

// import JQuery from 'jquery'
// let $ = JQuery

export default {
  name: 'registration-task',
  // props:['registrationOption'],

  data(){
    return {
      
      userName:'',
      email:'',
      password:'',
      confirmPassword:'',
      registration: '',
      occupation: '',
      sector: '',
      cost_center: '',
      image: '',
      dataUser: JSON.parse(sessionStorage.getItem('keyPermission')),
      data: {},
      disabled: true,
    }
  },

  components: {},

  created(){},
  computed: {},

  Watch: {},

  mounted(){

      this.userName = this.dataUser.name_user,
      this.email = this.dataUser.email_user,
      this.registration = this.dataUser.register,
      this.image = "data:image/png;base64,"+this.dataUser.path_photo,
      console.log("dataUser ->", this.dataUser)

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
      this.image =  URL.createObjectURL(file);
    // "data:image/png;base64,"+
    },

    dataUser(val){
      switch (val) {
        case 1:
            this.data = {
              userName: this.userName,
              email: this.email,
              password: this.password,
              confirmPassword: this.confirmPassword,
              registration: this.registration,
              occupation: this.occupation,
              sector: this.sector,
              cost_center: this.cost_center,
              image: this.image, 
            }
            // console.log("data ->", this.data)
        break;

        case 2:
        // console.log("data case 2 -->", this.data)
            // console.log("cancelar")
            this.userName = this.data.userName; 
            this.email = this.data.email;
            this.password = this.data.password;
            this.confirmPassword = this.data.confirmPassword
            this.registration = this.data.registration;
            this.occupation = this.data.occupation;
            this.sector = this.data.sector; 
            this.cost_center = this.data.cost_center; 
            this.image = this.data.image;  

        break;

        default:
           console.log("Nenhuma opção");
      }
    },

    
    // option(data){
    //   console.log("data registration --->", data)
    //   this.register = data; 
    // }
  }
}
</script>

<style>

@media (max-width: 1024px) {
  .collum-form  {
    flex-direction: column;
  }
  .mt-button {
    margin-top: 10px;
    width: 120px;
    display: flex;
    text-align: center;
  }
  .form-btn {
    display: flex;
    justify-content: space-between;
  }


}

</style>
