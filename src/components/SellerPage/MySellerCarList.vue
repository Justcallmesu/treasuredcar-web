<template>
    <div class="w-full min-h-[20rem] mt-10 shadow-2xl px-10 py-5 rounded-lg">
        <div>
            <h1 class="text-primary text-4xl font-bold">Car List</h1>
            <hr class="border-primary border-2"/>
        </div>
        <div class="w-full h-full py-10" v-if="carData.length">
            <div v-if="carData.length" class="grid grid-cols-3 gap-x-10 gap-y-5">
                <div class="w-full h-fit py-10 bg-primary text-white rounded-2xl overflow-hidden" v-for="car in carData" :key="car._id">
                    <div class="card-header">
                        <img :src="getImage(car.imageCover)">
                    </div>
                    <div class="card-content">
                        <div class="flex justify-between font-semibold">
                            <h4 class="text-xl">{{ car.model }}</h4>
                            <h4 class="text-lg">Rp {{ car.price.toLocaleString("id-ID") }}</h4>
                        </div>
                        <div class="mt-2 flex justify-between items-center">
                            <router-link :to="`/cars/${car._id}`" class=" px-5 py-2 bg-white text-primary text-xl rounded-xl font-semibold hover:opacity-90">
                                <p class="text-black">
                                    Details
                                </p>
                            </router-link>
                            <div class="flex gap-5">
                                <button class="px-5 py-2 bg-white text-black text-xl rounded-xl font-semibold hover:opacity-90" @click="deleteCar(car._id)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex justify-center items-center py-10" v-else>
            <h1 class="text-2xl font-bold text-center">No Cars Yet</h1>
        </div>
    </div>
</template>

<script>

// NPM
import axios from 'axios';

// Config
import config from '@/utils/config';

export default{
    props:{
        sellerId:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            carData:[]
        }
    },
    inject: ["setModalVisible", "setModalData"],
    methods:{
        async getCar() {
            const response = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/car?sellerId=${this.sellerId}`, {
                headers: config.headers,
                withCredentials: true
            })

            const { data } = response;

            this.carData = Object.values(data.data);
        },
        async deleteCar(carId){

            this.setModalData({callback:()=>{},
            title:"Delete Car",
            message:"Do You Want To Delete This Car ?",
            modalYesNo:true,
            yesCallback:async ()=>{
                const response = await axios.delete(`${process.env.VUE_APP_serverURL}/api/v1/car/${carId}`, {
                        headers: config.headers,
                        withCredentials: true
                    })

                    if (response.status === 204) return this.getCar();
            }});
            this.setModalVisible(true);
        }
    },
    computed:{
        getImage() {
            return (url) => {
                if(url)return `${process.env.VUE_APP_serverURL}/cars/${url}`;
                return `${process.env.VUE_APP_serverURL}/cars/car-default.png`;
            }
        },
    },
    async created(){
        await this.getCar();
    }
}
</script>