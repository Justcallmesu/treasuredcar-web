<template>
    <main class="w-full py-20">
        <div class="flex items-center justify-center w-full gap-10">
            <hr class="w-14 border-[0.1rem] border-black rounded-lg">
                <h3 class="text-xl tracking-tighter">Cars</h3>
            <hr class="w-14 border-[0.1rem] border-black rounded-lg">
        </div>
        <h3 class="text-center font-bold text-2xl mt-4">GET YOUR <span class="text-primary">CAR TO BUY</span></h3>
        <div class="w-full grid grid-cols-3 px-5 gap-x-10 mt-10 pb-10" v-if="carList.length">
            <BaseCard :cardData="car" v-for="car of carList" :key="car._id"/>
        </div>
        <div class="mt-10 px-10" v-else>
            <h1 class="py-3 mt-5 bg-primary text-center text-2xl font-bold text-white rounded-xl">No Cars Yet</h1>
        </div>
    </main>
</template>

<script>
// NPM
import axios from 'axios';
import config from "../../utils/config.js";

// Components
import BaseCard from '../Base/BaseCard.vue';

export default{
    data(){
        return{
            carList:[]
        }
    },
    async beforeMount(){
        const response = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/car?status=Posted&page=1&itemsPerPage=3`,{headers:{...config.headers}});
        this.carList = Object.values(response.data.data);
    },
    components:{
        BaseCard
    }

}
</script>