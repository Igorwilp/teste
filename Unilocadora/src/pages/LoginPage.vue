<template>
    <q-page class="flex flex-center">
      
      <div class="row">
        <div>
          <div class="text-h4 text-bold">Faça seu Login</div>
          <div class="column">
            <q-input v-model = "email" outlined label="Digite seu Email">
                <template v-slot:append>
                  <q-icon name="email"></q-icon>
                </template>
             </q-input>
             <q-input v-model ="senha" type="password" outlined label="Digite sua senha">
                <template v-slot:append>
                  <q-icon name="lock"></q-icon>
                </template>
             </q-input>
          </div>
          <div class="column">
            <q-btn 
              color="green"
              @click="login">
              Login
            </q-btn>
            <q-btn
              @click="cadastro">
              Novo Cliente
            </q-btn>
          </div>
        </div>
      </div>
    </q-page>
  </template>
<script>
    import services from 'src/services';
    export default {
        name: 'LoginPage',
        data(){
            return{
                email:" ",
                senha:" ",
            };
        },
        methods:{
            login(){
                services.login(this.email, this.senha, (response) => {
                    if (response){
                        this.$router.push("/filmes");
                    } else {
                        alert("Tente novamente");
                    }
                })
            },
            cadastro(){
              this.$router.push("/cadastro")
            }
        }
    };
</script>
  