<template>
    <main class="w-full py-20">
        <div class="flex items-center justify-center w-full gap-10">
            <hr class="w-14 border-[0.1rem] border-black rounded-lg">
                <h3 class="text-xl tracking-tighter">Cars</h3>
            <hr class="w-14 border-[0.1rem] border-black rounded-lg">
        </div>
        <h3 class="text-center font-bold text-2xl mt-4">GET YOUR <span class="text-primary">CAR TO BUY</span></h3>
        <div class="grid grid-rows-1 grid-flow-col px-5 gap-10 mt-10 overflow-scroll pb-10" v-if="carList?.length">
            
        </div>
        <div class="mt-10" v-else>
            <h1 class="text-center text-2xl font-bold text-primary">No Cars Yet</h1>
        </div>
    </main>
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