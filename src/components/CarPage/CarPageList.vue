<template>
    <div>
        <h1 class="text-2xl font-bold text-center">WE FOUND <span class="text-primary">{{ getDataLength }} CARS </span>FOR YOU</h1>
        <section class="grid grid-cols-2 gap-x-10 gap-y-5" v-if="carData.length">
            <BaseCard v-for="car in carData" :key="car._id" :cardData="car"/>
        </section>
        <section v-else>
            <h1 class="py-3 mt-5 bg-primary text-center text-2xl font-bold text-white rounded-xl">No Cars Yet</h1>
        </section>
    </div>
</template>

<script>
import axios from "axios";

// Components
import BaseCard from "../Base/BaseCard.vue";
import config from '@/utils/config';

export default{
    props:{
        brand:{
            type:String
        },
        style:{
            type:String
        },
        coords:{
            type:Array
        }
    },
    data(){
        return{
            page:1,
            carData:[]
        }
    },
    computed:{
        getDataLength(){
            return this.carData.length;
        }
    },  
    async created(){
        await this.getCar();
    },
    methods:{
        async getCar(){
            // Query Object
            const query = {};

            // Target URl
            let url = `${process.env.VUE_APP_serverURL}/api/v1/car`;

            query.status = "Posted";

            if(this.brand) query.brand = this.brand;

            if(this.style) query.bodyType = this.style;

            if(this.coords.length) {
                query.longitude = this.coords[0];
                query.latitude = this.coords[1];
            }

            // Construct Query
            const urlQuery = new URLSearchParams(query).toString();

            url += `?${urlQuery}`;

            const response = await axios.get(url,{
                headers:config.headers,
                withCredentials:true
            })

            const {data} = response;
            
            this.carData = Object.values(data.data);
        }
    },
    watch:{
        async brand(){
            await this.getCar()
        },
        async style(){
            await this.getCar();
        },
        async coords(){
            await this.getCar();
        },
    },
    components:{
        BaseCard
    }
}

</script>