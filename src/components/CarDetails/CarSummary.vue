<template>
    <main class="grid grid-cols-2 gap-x-20 gap-y-5 mt-5">
        <div>
            <p class="font-semibold">Price</p>
            <h3>Rp {{ car?.price.toLocaleString("id-ID")  }}</h3>
        </div>
        <div>
            <p class="font-semibold">AT/MT</p>
            <h3> {{ car?.ATMT }}</h3>
        </div>
        <div>
            <p class="font-semibold">Brand</p>
            <h3>{{ car?.brand }}</h3>
        </div>
        <div>
            <p class="font-semibold">Model</p>
            <h3>{{ car?.model }}</h3>
        </div>
        <div>
            <p class="font-semibold">City</p>
            <h3>{{ city }}</h3>
        </div>
        <div>
            <p class="font-semibold">Locality</p>
            <h3>{{ locality }}</h3>
        </div>
    </main>
</template>

<script>
import axios from "axios";

export default{
    data(){
        return{
            city: "",
            locality: ""
        }
    },
    methods:{
        async setData(){
            const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?longitude=${this.car.location.coordinates[0]}&latitude=${this.car.location.coordinates[1]}`);
            this.city = data.city;
            this.locality = data.locality;
        }
    }, 
    props:{
        car:Object,
        required:true
    },
    watch:{
        car(){
            if (this.car) {
                this.setData();
            }
        }
    },
    async created(){
        await this.setData();
    }
}
</script>