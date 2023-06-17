<script>
import { ref } from "vue";
import Services from "src/services";
import { appStore } from "src/stores/appStore";
import { defineComponent } from "vue";
import FilmeCard from "../components/FilmeCard.vue";
import CardCarrinho from "src/components/CardCarrinho.vue";

const form= ref({
    email: {
      value:'',
      email: true,
      required: true
    },
    password: {
      value:'',
      required: true
    }
  })

export default defineComponent({
  components: { FilmeCard, CardCarrinho },
  name: "IndexPage",
  data() {
    return {
      filmes: Array,
      showCarrinho: false,
      carrinho: appStore.carrinho,
    };
  },
  created() {
    Services.getAllFilmes((data) => {
      this.filmes = data;
    });
    Services.checarLogin()
  },
  methods: {
    logout(){
      Services.logout();
      this.$router.push("/");
    },
    onLocarFilme(filme) {
      appStore.carrinho.cliente = appStore.cliente;
      appStore.carrinho.filmes.push(filme);
      appStore.carrinho.data = new Date();
    },
    naoLogado() {
      console.log(appStore.cliente == null);
      return appStore.cliente == null;
    },
  },
});
</script>

<template>
  <q-page class="flex flex-center">
    <div v-if="showCarrinho">
      <CardCarrinho :carrinho="carrinho"></CardCarrinho>
    </div>
    <div v-if="!naoLogado()">
      <q-btn @click="logout"> Sair </q-btn>
    </div>
    <div v-if="!naoLogado()">
      <q-btn @click="showCarrinho = !showCarrinho"> Carrinho </q-btn>
    </div>

    <FilmeCard
      :logado="!naoLogado()"
      v-for="f in filmes"
      v-bind:key="f.id"
      :filme="f"
      @locarFilme="onLocarFilme"
      @comparFilme="onLocarFilme"
    /> 
    
  </q-page>
</template>

