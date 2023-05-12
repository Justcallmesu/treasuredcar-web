<template>
    <div class="min-h-screen pt-32 px-5 pb-20 flex flex-col gap-10">
        <h1 class="text-2xl font-bold">Buy A <span class="text-primary">Car</span></h1>
        <main class="grid grid-cols-5 gap-x-20 gap-y-5 py-10 px-5 shadow-2xl rounded-lg bg-primary">
            <div class="flex flex-col items-center bg-white rounded-xl py-2">
                <h3 class="text-2xl text-primary font-bold">Year</h3>
                <p class="text-xl">{{ car?.year }}</p>
            </div>
            <div class="flex flex-col items-center bg-white rounded-xl py-2">
                <h3 class="text-2xl text-primary font-bold">Model</h3>
                <p class="text-xl">{{ car?.model }}</p>
            </div>
            <div class="flex flex-col items-center bg-white rounded-xl py-2">
                <h3 class="text-2xl text-primary font-bold">Style</h3>
                <p class="text-xl">{{ car?.bodyType }}</p>
            </div>
            <div class="flex flex-col items-center bg-white rounded-xl py-2">
                <h3 class="text-2xl text-primary font-bold">Brand</h3>
                <p class="text-xl">{{ car?.brand }}</p>
            </div>
            <div class="flex flex-col items-center bg-white rounded-xl py-2">
                <h3 class="text-2xl text-primary font-bold">CC</h3>
                <p class="text-xl">{{ car?.cc }}</p>
            </div>
        </main>
        <section>
            <div>
                <h1>Payment Types</h1>
                <select class="border-2 border-black w-44 rounded-lg p-2" v-model="cashType">
                    <option value="cash">Cash</option>
                    <option value="credit">Credit</option>
                </select>
            </div>
            <button class="btn__cta w-64 mt-10" @click="buyCar">Buy</button>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';
export default{
    data(){
        return{
            car:null,
            cashType:""
        }
    },
    methods:{
        async buyCar(){
            if(!this.cashType) return;

            const response = await axios.post(`${process.env.VUE_APP_serverURL}/api/v1/car/${this.$route.params._id}/transactions`,{
                type:this.cashType
            },
            {
                headers:config.headers.Accept,
                withCredentials:true
            }
            );
            
            if(response.status === 200) {
                this.$router.replace("/");
            }

        }
    },
    async beforeCreate() {
        try {
            const response = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/car/${this.$route.params._id}`)
            this.car = response.data.data;
        } catch(error) {
            this.$router.replace("/");
        }
    }
}
</script>