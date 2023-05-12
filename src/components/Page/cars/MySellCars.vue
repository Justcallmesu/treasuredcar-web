<template>
    <div  class="py-28 px-10 flex flex-col gap-10 min-h-screen">
        <h1 class="text-2xl font-bold">Sell A <span class="text-primary">Car</span></h1>
        <form @submit.prevent class="grid grid-cols-2 gap-x-20 gap-y-5">

            <div class="form-control">
                <label for="year">Year</label>
                <input type="number" id="year" class="form-input" v-model="year">
            </div>
            <div class="form-control">
                <label for="cc">CC</label>
                <input type="number" id="cc" class="form-input" v-model="cc">
            </div>
            <div class="form-control">
                <label for="plateNumber">Plat Kendaraan</label>
                <input type="text" id="plateNumber" class="form-input" v-model="plateNumber">
            </div>
            <div class="form-control">
                <label for="model">Model</label>
                <input type="text" id="model" class="form-input" v-model="model">
            </div>

            <div class="form-control">
                <label for="ATMT">AT/MT</label>
                <input type="text" id="ATMT" class="form-input" v-model="ATMT">
            </div>
            
            <div class="form-control">
                <label for="price">Price</label>
                <input type="number" id="price" class="form-input" v-model="price">
            </div>
            
            <div class="form-control">
                <label for="bodyType">Style</label>
                <select id="bodyType" class="border-black border-2 rounded-lg" v-model="selectedStyle">
                    <option :value="style" v-for="style in styleList" :key="style">{{ style }}</option>
                </select>
            </div>

            <div class="form-control">
                <label for="brand">Brand</label>
                <select id="brand" class="border-black border-2 rounded-lg" v-model="selectedBrand">
                        <option :value="brand" v-for="brand in brandsList" :key="brand">{{ brand }}</option>
                </select>
            </div>

            <!-- Location -->
            <div>
                <label>Locations</label>
                <div class="w-full h-12 px-5 rounded-lg relative border-2 border-gray-500 flex items-center">
                    <div v-if="!location">
                        <p>Currently No Location</p>
                    </div>
                    <div v-if="location">
                        <p>{{ location }}</p>
                    </div>
                    <button @click="getLocation" v-if="!location">
                        <i class="bi bi-geo-alt absolute text-xl text-white right-2 top-1 rounded-full bg-primary px-2 py-1"></i>
                    </button>
                    <button @click="reset" v-if="location">
                        <i class="bi bi-x-lg absolute text-xl text-white right-2 top-1 rounded-full bg-primary px-2 py-1"></i>
                    </button>
                </div>        
            </div>

            <div class="form-control">
                <label for="carImage">Car Images</label>
                <input type="file" multiple accept="image/*" id="carImage" ref="fileInput">
            </div>

            <div class="form-control col-span-2">
                <label for="description">Description</label>
                <textarea id="description" class="form-input resize-none h-56" v-model="description"></textarea>
            </div>

            <button class="btn__cta" @click="postCar">POST</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return{
            // Dsiplay
            location:"",
            brandsList: [
                "Daihatsu",
                "Honda",
                "Mitsubishi",
                "Nissan",
                "Suzuki",
                "Toyota"
            ],
            styleList: [
                "SUV",
                "MPV",
                "Crossover",
                "Hatchback",
                "Sedan",
                "Convertible",
                "Wagon",
                "Other"
            ],

            // Submit Data
            coords:[],
            year:"",
            cc:"",
            plateNumber:"",
            model:"",
            ATMT:"",
            price:"",
            selectedStyle:"",
            selectedBrand:"",
            description:""
        }
    },
    methods: {
        getLocation() {
            try {
                navigator.geolocation.getCurrentPosition(this.setPosition);
            } catch {
                return;
            }
        },
        async setPosition(position) {
            const [longitude, latitude] = [position.coords.longitude, position.coords.latitude];
            const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?longitude=${longitude}&latitude=${latitude}`);

            this.coords = [longitude, latitude];
            this.location = `${data.city}, ${data.locality}`;
        },
        resetLocation() {
            this.location = null;
            this.coords = [];
        },
        async postCar(){
            if(!this.price || !this.year || !this.cc || !this.plateNumber || !this.model || !this.ATMT || !this.selectedStyle || !this.selectedBrand || !this.description) {
                return;
            }

            const formData = new FormData();
            formData.append("year",this.year);
            formData.append("cc",this.cc);
            formData.append("plateNumber",this.plateNumber);
            formData.append("model",this.model);
            formData.append("ATMT",this.ATMT);
            formData.append("price",this.price);
            formData.append("bodyType",this.selectedStyle);
            formData.append("description",this.description);
            formData.append("brand",this.selectedBrand);

            if(this.coords.length) formData.append("location", JSON.stringify({coordinates:this.coords}));

            if (Object.values(this.$refs.fileInput.files).length) {
                Object.values(this.$refs.fileInput.files).forEach((value)=>{
                    formData.append("image", value);
                })
            }

            const response = await axios.post(`${process.env.VUE_APP_serverURL}/api/v1/car`,formData
            ,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            }
            )
            
        }
    }
}

</script>