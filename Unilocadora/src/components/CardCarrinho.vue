<template>
    <q-card class="bg-secondary text-white">
        
    {{ carrinho }}

    <FilmeCard :filme="filme" :logado="true" v-for="filme in carrinho.filmes" v-bind:key="filme.id"/>


    </q-card>
</template>
<script>
    import FilmeCard from './FilmeCard.vue';
    export default {
       name: "CardCarrinho",
       components:{
        FilmeCard
       },
       props: {
        carrinho: Object,
       },
    }

</script>