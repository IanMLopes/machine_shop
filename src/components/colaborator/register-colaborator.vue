<template lang='html'>
     <!-- Page Title Header Ends-->
      <div class='col-md-12 grid-margin'>
        <div class='card'>
          <div class='card-body'>
              <div class='d-flex'>
                    <div class='wrapper'>
                      <h3 class='mb-0 font-weight-semibold'>Cadastro de Colaborador</h3>
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

                    <div class="d-flex justify-content-center collum-form" >
                      
                      <div class="container-lg col-lg-4 col-md-12 d-flex flex-column  top-0 m-0 border " style="height: auto" >
                        <div class="d-flex flex-column mx-auto px-3 justify-content-center justify-items-center rounded-circle"  
                            role="button" 
                            style="height: 100%; text-align: center; justify-content:center; justify-align: center">
                            <i v-if="!image" 
                              @click="chooseFiles()" 
                              class="mdi mdi-account-edit mdi-dark rounded-circle border m-auto d-flex justify-items-center justify-content-center "
                              style="width: 120px; height: 120px; font-size: 70px"
                                ></i>
                            <img v-else 
                                :src="'data:image/jpeg;base64,' + image"
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
                      </div>
                    </div>
                    <div class=" col-lg-12  p-0 " >
                      <div class="d-flex collum-form mt-2 p-0">
                        <div class="form-group p-0 pr-1 col-lg-6 p-form" >
                          <label>Nome:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-outline"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control text-style" v-model="userName"> </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <label>Matrícula:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-account-outline"></i>
                              </span>
                            </div>
                            <input type="number" class="form-control text-style" v-model="registration"> </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form">
                        <div class="form-group p-0 pr-1 col-lg-6 p-form ">
                          <label>E-mail:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control text-style" v-model="email" > </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <label>Setor:</label>
                          <div class="input-group ">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <select class="form-select p-2" 
                                    v-model="sector" 
                                    placeholder="Setor"
                                    type="number"
                                    style="border: 1px solid #DCDCDC; border-radius:2px; color: #808080"
                                  >
                                <!--   <option value="1" selected class="text-center"> PM </option> -->
                                    <option value="" selected class="text-center"> Selecione </option>
                                    <option :value="item.id_department"
                                            selected
                                            class="text-center"
                                            v-for="item in departament" :key="item.id_department"
                                          >
                                          {{item.ds_department}} 
                                    </option>
                            </select> 
                          </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form" >
                        <div class="form-group p-0 pr-1 col-lg-6 p-form">
                          <label>Função:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control text-style" v-model="occupation" > </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <label label>Centro de Custo:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-email-outline"></i>
                              </span>
                            </div>
                            <input type="number" class="form-control text-style" placeholder="Cost Center" v-model="cost_center" > </div>
                        </div>
                      </div>
                      <div class="d-flex collum-form">
                        <div class="form-group p-0 pr-1 col-lg-6 p-form">
                          <label>Senha:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-lock-outline"></i>
                              </span>
                            </div>
                            <input type="password" class="form-control text-style" placeholder="Senha" v-model="password"> </div>
                        </div>
                        <div class="form-group p-0 col-lg-6">
                          <label>Confirmar Senha:</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="mdi mdi-lock-outline"></i>
                              </span>
                            </div>
                            <input type="password" class="form-control text-style" placeholder="Confirmar Senha" v-model="confirmPassword"> </div>
                        </div>
                      </div>          
                         
                      <div  class="d-flex justify-content-between mt-5 mb-0 collum-form">
                        <div class="d-flex pb-4 collum-form ">
                          <div class="form-check pr-3">
                            <span>Líder</span>
                          </div>
                          <div class="form-check pr-3" role="button">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="1" id="flexRadioDefault1" checked v-model="type_leader" role="button">
                            <label class="form-check-label pl-0" for="flexRadioDefault1" role="button">
                              Sim
                            </label>
                          </div>
                          <div class="form-check pr-3" role="button">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="0" id="flexRadioDefault2" checked v-model="type_leader" role="button">
                            <label class="form-check-label pl-0" for="flexRadioDefault2" role="button">
                             Não
                            </label>
                          </div>
                        </div> 
                        <div  class="form-group  d-flex justify-content-between mt-5 mb-0 collum-form">
                          <button class="btn btn-success submit-btn mr-3">SALVAR</button>
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
</template>

<script lang='js'>

const Swal = require("sweetalert2");

// import JQuery from 'jquery'
// let $ = JQuery
export default {
  name: 'dashboardMs',
  data(){
    return {
      userName:'',
      email:'',
      password:'',
      confirmPassword:'',
      registration:'',
      occupation: '',
      sector:'',
      cost_center:'',
      image: '',
      type_leader: 0,
      departament:[],
      previewProfile: '',
    }
  },

  Watch: {},

  components: {},

  Watch: {},
  mounted(){

      this.axios.get('/department')
      .then((response) => {
        console.log("response colaborator --->>", response)
        let res =  response.data;

        if(res.success){
          this.departament = res.data;
        } else {
       
        }

      })
      .catch((error) => {
        // console.log("error" , error)
      })  

  },

  created(){

    $(document).ready(function () {
      $(document).on('mouseenter', '.divbutton', () => {
          $(this).find("#editar").show();
      }).on('mouseleave', '.divbutton', () => {
        // console.log("auqiaquiaquiaiquaiqauqiauqiaquia")
          $(this).find("#editar").hide();
      });
    });
  },

  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },

    register(evt){

      if(this.sector == 2){
        this.type_leader = 4
      }

      let json = {
        name_user: this.userName,
        email_user: this.email,
        password_user:  String(this.password),
        // confirmPassword: this.confirmPassword,
        register: String(this.registration),
        department_user: Number(this.sector),
        function_user: String(this.occupation),
        cost_center: Number(this.cost_center),
        path_photo: this.image,
        user_level:0,
        type_leader: Number(this.type_leader),
      }

      console.log("json colaborator", json)

      this.axios.post('/user/create', json)
      .then((response) => {
        console.log("response colaborator --->>", response)
        let res =  response.data;

        if(res.success){
           this.Msg(
              "Usuário cadastrado com sucesso.",
              "",
              "success",
              2500,
              false,
              "OK",
              false,
              "",
            );
        } else {
         this.Msg(
              "Falha ao cadastrar usuário",
              "",
              "error",
              2500,
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
          this.$emit('cadProject')
        } else { }

        if (result.isConfirmed) {
        } else {}
      });
    },

    chooseFiles() {
        document.getElementById("fileUpload").click()
    },

    // onFileChange(e) {
    //   const file = e.target.files[0];


    //   this.image = URL.createObjectURL(file);
    // },

      onFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e =>{
          this.previewProfile = reader.result;
          this.image   = reader.result.replace("data:", "").replace(/^.+,/, "");

      };
    },


  }
}
</script>

<style >

.text-style{
  font-family: Arial, Helvetica, sans-serif;
  font-size:15px; 
}

@media (max-width: 1024px) {
  .collum-form  {
    flex-direction: column;
  }
  
  .p-form {
     padding-right: 0 !important;
  }
}

</style>
