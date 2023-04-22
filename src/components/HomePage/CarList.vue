<template>
    <div class="w-full min-h-screen bg-slate-200 py-6 px-5">
        <h1 class="text-2xl text-center relative font-semibold">Explore Posted Cars</h1>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-10">
            <BaseCard></BaseCard>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import config from "../../utils/config.js";

export default{
    data(){
        return{
            carList:null
        }
    },
    async created(){
        const response = await axios.get("http://localhost:3000/api/v1/car",{withCredentials:true,headers:{...config.headers}});
        this.carList = response.data.data;
    }
}
</script>