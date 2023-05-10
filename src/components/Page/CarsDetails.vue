<template>
    <div class="mt-24 px-5 pb-20 md:px-20">
        <summary class="flex flex-col gap-10 md:gap-20 md:flex-row">
            <div class="md:w-1/2 h-full rounded-lg" v-if="car">
                <CarCollage :car="car"/>
            </div>
            <div class="md:mt-0">
                <h1 class="text-3xl font-semibold">{{ car?.name }}</h1>
                <CarSummary :car="car"/>
                <div class="mt-8 w-full">
                    <button class="w-full bg-primary py-5 rounded-lg text-2xl text-white">Buy</button>
                </div>
            </div>
        </summary>
        <CarInformation :car="car" v-if="car"/>
    </div>
</template>

<script>
import axios from "axios";

import CarSummary from '../CarDetails/CarSummary.vue';
import CarCollage from '../CarDetails/CarCollage.vue';
import CarInformation from '../CarDetails/CarInformation.vue';

export default{
    data(){
        return{
            car:null,
            lastHovered:null
        }
    },
    components:{
        CarSummary,
        CarCollage,
        CarInformation
    },
    async beforeCreate(){
        const response =  await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/car/${this.$route.params._id}`)
        this.car = response.data.data;
    },
    
}
</script>