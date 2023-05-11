<template>
    <div class="min-h-screen pt-32 px-5 pb-20 flex flex-col gap-20">
        <div v-if="car">
            <summary class="py-10 px-10 flex flex-col gap-10 md:gap-20 md:flex-row shadow-xl rounded-lg">
                <div class="md:w-1/2 h-full rounded-lg overflow-hidden" v-if="car">
                        <img :src="getImg" alt="" class="mix-blend-multiply w-full h-80 object-contain">
                    <section v-if="car.image.length">
                        <div class="grid h-52 w-full p-5 gap-10 grid-rows-1 grid-flow-col-dense overflow-x-scroll overflow-y-hidden">
                            <div class="overflow-hidden rounded-lg w-36" v-for="(image, index) in car.image" :key="image">
                                <img :src="getImgCollage(index)" class="w-full h-full object-cover" @mouseover.self="setIndex(index, $event)">
                            </div>
                        </div>
                    </section>
                </div>
                <div class="md:mt-0">
                    <h1 class="text-3xl font-semibold">{{ car?.name }}</h1>
                    <CarSummary :car="car"/>
                    <div class="mt-8 w-full">
                        <button class="w-full bg-primary py-5 rounded-lg text-2xl text-white">Buy</button>
                    </div>
                </div>
            </summary>
            <article class="w-full min-h-[10rem] shadow-xl p-10">
                <h1 class="text-2xl font-bold">Description</h1>
                <div class="mt-5">
                    <p>{{ car?.description }}</p>
                </div>
            </article>
        </div>
        <div class="w-full h-full flex flex-col justify-center items-center" v-else>
            <h1 class="text-2xl font-bold">No Car Found</h1>
            <button @click="goCarList" class="btn__cta">Go To Car List</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import CarSummary from '../../CarDetails/CarSummary.vue';

export default{
    data(){
        return{
            car:null,
            currentIndex:0,
            lastHovered:null
        }
    },
    components:{
        CarSummary
    },
    async beforeCreate(){
        try{
            const response =  await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/car/${this.$route.params._id}`)
            this.car = response.data.data;
        }catch{}
    },
    computed:{
        getImg(){
            if (this.car?.image.length) {
                return `${process.env.VUE_APP_serverURL}/cars/${this.car.image[this.currentIndex]}`;
            }
            return `${process.env.VUE_APP_serverURL}/cars/car-default.png`;
        },
        getImgCollage(){
            return (index)=>{
                if(this.car.image){
                    return `${process.env.VUE_APP_serverURL}/cars/${this.car.image[index]}`;
                }
            }
        }
    },
    methods:{
        setIndex(index,event){
            if(this.lastHovered){
                this.lastHovered.classList.remove("image-collage-active");
            }
            this.currentIndex = index;
            this.lastHovered = event.target.parentNode;
            this.lastHovered.classList.add("image-collage-active");
        },
        goCarList(){
            this.$router.replace("/cars");
        }
    }
}
</script>