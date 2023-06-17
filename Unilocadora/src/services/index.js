import api from "./api";
import { appStore } from "src/stores/appStore";
const storage = window.localStorage;

const services = {
  getAllFilmes(callback) {
    if (appStore.filmes.length == 0) {
      console.log("getAllFilmes zerado");
      api
        .get("/filmes")
        .then((response) => {
          appStore.setFilmes(response.data);
          if (callback != null) {
            callback(appStore.filmes);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      console.log("getAllFilmes com dados");
      if (callback != null) {
        console.log("getAllFilmes com dados e callback ");
        console.log(appStore.filmes);
        callback(appStore.filmes);
      } else {
        return appStore.filmes;
      }
    }
  },
  login (email, senha, callback){
    api.get("/logins/"+email).then ((response) => {
      if (response.data.id == undefined){
        callback (false);
      } else {
        if (response.data.senha == senha){
          api.get("/logins/" + response.data.id).then((response) => {
            appStore.setCliente(response.data);
            storage.setItem("cliente", JSON.stringify(response.data));
            callback (true);
          })
        } else {
          callback (false);
        }
      }
    }).catch((error) => {callback(false);})
  },
  logout(){
    storage.removeItem("cliente");
    appStore.setCliente(null);
  },
  checarLogin(){
    if (storage.getItem("cliente") != null){
      appStore.setCliente(JSON.parse(storage.getItem("cliente")));
    }
  },
  saveCliente(cliente, callback) {
    api
      .post("/clientes", cliente)
      .then((response) => {
        console.log(response.data);
        appStore.setCliente(response.data);
        if (callback != null) {
          console.log("saveCliente com callback");
          callback(true);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  },
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
    const req = await fetch("http://localhost:3000/logins",{
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: dataJson
    });
    const res = await req.json();
    console.log(res);
    alert("Cadastro realizado com sucesso!")
    this.$router.push("/");
  },
};


export default services;
