<template>
    <div class="w-full min-h-screen bg-slate-200 py-6 px-5">
        <h1 class="text-2xl text-center relative font-semibold">Explore Posted Cars</h1>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-10">
            <BaseCard  v-for="data of carList" :key="data._id" :cardData="data"></BaseCard>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import config from "../../utils/config.js";

import { createNamespacedHelpers } from 'vuex';

const {mapMutations} = createNamespacedHelpers("cars");

export default{
    data(){
        return{
            carList:null
        }
    },
    async beforeMount(){
        const response = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/car`,{headers:{...config.headers}});
        this.carList = response.data.data;
        this.setCar(this.carList);
    },
    methods:{
        ...mapMutations(["setCar"])
    },

}
</script>