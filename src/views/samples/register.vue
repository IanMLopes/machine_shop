<template lang="html">

  <section class="register">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper auth p-0 theme-two">
          <div class="row d-flex align-items-stretch">
            <div class="col-md-4 banner-section d-none d-md-flex align-items-stretch justify-content-center">
              <div class="slide-content bg-2"> </div>
            </div>
            <div class="col-12 col-md-8  bg-white " style="height: auto !important">
              <div class="auto-form-wrapper d-flex align-items-center justify-content-center flex-column">
                <div class="nav-get-started">
                  <p>Já tem uma conta?</p>
                  <b-button class="btn get-started-btn"  @click="$router.push('/')">ENTRAR</b-button>
                </div>
                <form  @submit.prevent="register" class="pt-0 " style="height: auto; width: 90%; max-width: 90%; overflow-y:auto">

                  <div class="d-flex justify-content-between collum-form">
                    <div>
                      <h3 class="mr-auto">Cadastrar</h3>
                      <p class="mb-5 mr-auto">Insira seus dados abaixo.</p>
                    </div>
                    <div class="container-lg col-lg-6 col-md-12 d-flex flex-column  top-0 m-0 border " style="height: auto">
                      <div class="d-flex flex-column mx-auto px-3 justify-content-center justify-items-center rounded-circle"  
                           role="button" 
                           style="height: 100%; text-align: center; justify-content:center; justify-align: center">
                          <i v-if="!preview" 
                             @click="chooseFiles()" 
                             class="mdi mdi-account-edit mdi-dark mx-auto border rounded-circle"
                             style="width: 120px; height: 120px; font-size: 70px"
                              ></i>
                          <img v-else 
                              :src="preview"  
                              class="rounded-circle mx-auto d-block divbutton" alt="" 
                              style="width: 120px; height: 120px"/> 
                      </div>
                      <!--<input @change="onFileChange" accept="image/*" class="mx-auto rounded" type="file" title=" " id="fileUpload" hidden /> -->
                      <input @change="onFileChange" accept="image/*" class="mx-auto rounded" type="file" title=" " id="fileUpload" hidden />
                      <span v-if="!preview"  
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

                  <div class="d-flex collum-form mt-2">
                    <div class="form-group pl-1">
                      <label>Nome:</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="mdi mdi-account-outline"></i>
                          </span>
                        </div>
                        <input type="text" class="form-control text-style" v-model="userName"> </div>
                    </div>
                    <div class="form-group pl-1">
                      <label>Matrículal:</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="mdi mdi-account-outline"></i>
                          </span>
                        </div>
                        <input type="number" class="form-control text-style"  v-model="registration"> </div>
                    </div>
                  </div>
                  <div class="d-flex collum-form">
                    <div class="form-group pl-1">
                      <label>Email:</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="mdi mdi-email-outline"></i>
                          </span>
                        </div>
                        <input type="text" class="form-control text-style" v-model="email" > </div>
                    </div>
                    <div class="form-group pl-1">
                    <label>Setor:</label>
                      <div class="input-group">
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
                                  <option value="2" selected class="text-center"> Mecânica </option>
                                  <option value="3" selected class="text-center"> Manufatura </option>
                                  <option value="4" selected class="text-center"> Warehouse </option>
                          </select>     
                      </div>
                    </div>
                  </div>
                  <div class="d-flex collum-form">
                    <div class="form-group pl-1">
                      <label>Função:</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="mdi mdi-email-outline"></i>
                          </span>
                        </div>
                        <input type="text" class="form-control text-style"  v-model="occupation" > </div>
                    </div>
                    <div class="form-group pl-1">
                      <label>Centro de Custo:</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="mdi mdi-email-outline"></i>
                          </span>
                        </div>
                        <input type="number" class="form-control text-style"  v-model="cost_center" > </div>
                    </div>
                  </div>
                  <div class="d-flex collum-form">
                    <div class="form-group pl-1">
                      <label>Senha:</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="mdi mdi-lock-outline"></i>
                          </span>
                        </div>
                        <input type="password" class="form-control text-style" v-model="password"> </div>
                    </div>
                    <div class="form-group pl-1">
                      <label>Confirmar Senha:</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="mdi mdi-lock-outline"></i>
                          </span>
                        </div>
                        <input type="password" class="form-control text-style" v-model="confirmPassword"> </div>
                    </div>
                  </div>
                  <div class="form-group text-left">
                    <button class="btn btn-primary submit-btn" style="width: 50%">CADASTRAR</button>
                  </div>
                  <div class="wrapper mt-2 text-gray   ">
                    <p class="footer-text">Copyright © 2022 ICCT. Instituto Cal Comp de Tecnologia.</p>
                    <!-- <ul class="auth-footer text-gray">
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                      <li>
                        <a href="#">Cookie Policy</a>
                      </li>
                    </ul> -->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>

</template>

<script>

const Swal = require("sweetalert2");

export default {
  name: 'register',
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
      preview: '',
      type_leader: ''
    }
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

  mounted(){},


  methods: {

    register(){
      
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
        type_leader: this.sector == 2 ? 4 : 5,    //  4-ENG  5-USER COMUM
      }

      this.axios.post('/user/create', json)
      .then((response) => {
        console.log("response register - --->>", response)
        let res =  response.data;
        let btnConfirmar = true;
        let btnCancelar = true;
        let title = res.message;
        let message =res.error_message;
        let icon 
        let ConfirmButtonText

        if(res.success){
          // btnCancelar = false;
          icon = 'success';
          ConfirmButtonText = 'Login'
        } else {
          btnCancelar = false;
          icon = 'error';
          ConfirmButtonText = 'OK'
        }

        this.$swal.fire({
          position: "center",
          type: icon, //success, warning, error, Info
          title: title,
          text: message,

          showConfirmButton: btnConfirmar,
          confirmButtonText: ConfirmButtonText,
          confirmButtonColor: '#45dd9b',

          showCancelButton: btnCancelar,
          cancelButtonColor: '#cd4949',
          cancelButtonText: 'Cancelar',

        })
        .then((result) => {
          if (result.isConfirmed && btnCancelar) {
            this.$router.push('/')
          }else{
            // alert("Voce cancelou")
          }
        })

      })
      .catch((error) => {
        // console.log("error" , error)
      })       
    },
    
    chooseFiles() {
        document.getElementById("fileUpload").click()
    },

    onFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      let base64String
      reader.readAsDataURL(file);
      reader.onload = e =>{
        this.preview = reader.result;
          this.image = reader.result.replace("data:", "")
                  .replace(/^.+,/, "");
          console.log("image -----==>>", this.image)
      };

    },

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
</style>
