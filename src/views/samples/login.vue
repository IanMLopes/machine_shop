<template lang="html">

  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
                 <div class="d-flex justify-content-center">
                  <img   src="../../assets/images/LOGO_ICCT1.png">  
              </div>
                <form   @submit.prevent="login" class="pb-4">
                  <div class="form-group">
                    <label class="label">E-mail</label>
                    <div class="input-group">
                      <input type="text" class="form-control text-style" placeholder="E-mail" v-model="userName">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label">Senha</label>
                    <div class="input-group">
                      <input type="password" class="form-control text-style password" id="password" name="password" placeholder="*********" v-model="password">
                      <div class="input-group-append">
                        <span class="input-group-text senha" role="button">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group pt-2">
                    <button class="btn btn-primary submit-btn btn-block" >Login</button>
                  </div>
                  <!--<div class="form-group d-flex justify-content-between">
                    <a href="#" class="text-small forgot-password text-black">Esqueci minha senha</a>
                  </div>
                  <div class="text-block text-center my-3">
                    <span class="text-small font-weight-semibold">Não é um membro?</span>  
                    <a @click="$router.push('/register')" class="text-black text-small" role="button" style="font-size: 12px">Criar nova conta</a>
                  </div>-->
                </form>
              </div>
              <!-- <ul class="auth-footer">
                <li>
                  <a href="#">Conditions</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
              </ul> -->
              <p class="footer-text text-center mt-2">copyright © 2022 ICCT. Instituto Cal Comp de Tecnologia.</p>
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

import jwt from "jsonwebtoken";
import { chave_jwt } from "../../../config/api.env.js"; 
import {bus} from "../../main"

const Swal = require("sweetalert2");

export default {
  name: 'login',

  data(){
    return {
      userName:'',
      password:'',
      btn: '',
    }
  },

  mounted(){


  },

  created(){

  },

  methods:{

    login(){
      if (
        !this.userName || this.userName.length <= 0 ||
        !this.password || this.password.length <= 0
      ) {
        this.Msg(
          "Aviso!",
          "Você precisa inserir suas credenciais!",
          "warning",
          3000,
          false,
          "Confirmar",
          false,
          "Cancelar"
        );
      } else {

        let json = {
          user: this.userName.trim().toLowerCase(),
          password: this.password,
        }
        let jsonJwt = jwt.sign(json, `${chave_jwt}`);
    
        this.axios.post('/auth/login', {token: jsonJwt})
        .then((response) => {
          console.log("login erro response ->", response)
          let res = response.data; 
          if(res.status == 'success'){
            this.decodedData(res.data)
            console.log("if decode")
          }
          else {
              console.log("ilse msg")
              this.Msg(
                "Falha ao realizar login.",
                "Usuário ou senha incorreta!",
                "error",
                3000,
                false,
                "Confirmar",
                false,
                "Cancelar"
              );
            }
          console.log("fim else ")
        })
        .catch((err) => {
          console.log("error" , err)
        })    
      }
    },

    decodedData(data){

      jwt.verify( data, `${chave_jwt}`, (err, decoded) => {
        if (decoded.register) { 
          console.log("decoded", decoded)
            sessionStorage.setItem('keyPermission', JSON.stringify(decoded));
            this.$session.start();
            bus.$emit('decoded', decoded);

            console.log("sucesso ->")
            
            this.Msg(
              "Successo!",
              "Login realizado com sucesso!",
              "success",
              2000,
              false,
              "Confirmar",
              false,
              "Cancelar"
            );
            
              console.log("sucesso dashboard ->")
          
            this.$router.push({path: '/dashboard'})
        } 
        else {
          console.log("", err)
        }        
      });
    },

    Msg(
      title,
      msg,
      icon,
      time,
      btnConfirmar,
      titleBtnConfirmar,
      btnCancelar,
      titleBtnCancelar
    ) {
      console.log("alerta ->")
      this.$swal.fire({
        position: "center",
        type: icon, //success, warning, error
        title: title,
        text: msg,

        showConfirmButton: btnConfirmar,
        confirmButtonText: titleBtnConfirmar,
        confirmButtonColor: "#32a976",

        showCancelButton: btnCancelar,
        cancelButtonColor: "#cd4949",
        cancelButtonText: titleBtnCancelar,

        timer: time,
      }).then((result) => {
        console.log("teste result -->", result)
        if (result) {
          // alert("Voce confirmou")
        } else {
          // alert("Voce cancelou")
        }
      });
    },

  }
}
</script>

<style>
.text-style{
  font-family: Arial, Helvetica, sans-serif;
  font-size:15px; 
}
</style>
