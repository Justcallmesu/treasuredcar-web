<template>
    <div class="w-full h-80 bg-white rounded-2xl overflow-hidden">
        <div class="card-header">
            <img :src="getImage">
        </div>
        <div class="card-content">
            <div class="flex justify-between font-semibold">
                <h4 class="text-xl">{{ cardData.year }}</h4>
                <h4 class="text-lg">Rp {{ cardData.price.toLocaleString("id-ID") }}</h4>
            </div>
            <div class="flex justify-between items-center">
                <button class="mt-2 px-5 py-2 bg-primary text-xl rounded-xl font-semibold hover:opacity-90" @click="movePage()">
                    <p class="text-white">
                        Details
                    </p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default{
    props:{
        cardData:{
            type:Object,
            required:true
        },
        
    },
    computed:{
        getImage(){
            if(this.cardData.imageCover){
                return `${process.env.VUE_APP_serverURL}/cars/${this.cardData.imageCover}`;
            }
            return `${process.env.VUE_APP_serverURL}/cars/car-default.png`; 
        },
    },
    methods:{
        movePage(){
            this.$router.push({name:"details",params:{_id:this.cardData._id}});
        },
    }
}
</script>