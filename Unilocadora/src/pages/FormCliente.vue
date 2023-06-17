<template>
  <q-page class="q-ma-md q-pa-md shadow-10">
    <h3>Digite suas informações:</h3>
    {{ cliente }}
    <q-form>
      <q-input outlined v-model="nome" label="Nome"></q-input>
      <q-input
        outlined
        v-model="id"
        label="E-mail"
      ></q-input>
      <q-input outlined v-model="senha" label="Senha"></q-input>
      <q-input
        outlined
        v-model="telefone"
        mask="(##)#####.####"
        fill-mask="_"
        label="Telefone"
      ></q-input>
      <q-input outlined v-model="cpf" label="CPF"></q-input>

      <q-btn
        color="primary"
        label="Salvar"
        class="q-mt-md"
        @click="cadastrarCliente"
      ></q-btn>
    </q-form>
  </q-page>
</template>

<script>
import api from "src/services/api";
import services from "src/services";
export default {
  name: "FormCliente",
  props: {
    cliente: Object,
  },
  data() {
    return {
        nome: null,
        idCliente: null,
        senha: null,
        telefone: null,
        cpf: null,
    }
  },
  created() {
    if (this.cliente) {
      this.clienteData = this.cliente;
    }
  },
  methods: {
    async cadastrarCliente(e){
      e.preventDefault();
      const data = {
        nome: this.nome,
        id: this.id,
        senha: this.senha,
        telefone: this.telefone,
        cpf: this.cpf
      }

      const dataJson = JSON.stringify(data);
      console.log(dataJson)
      const req = await fetch("http://localhost:3000/logins",{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: dataJson
      });
      const res = await req.json();
      console.log(res);
      alert("Cadastro realizado com sucesso!")
      this.$router.push("/");
    }
  },
}
</script>

<style></style>
