<template>
    <main class="w-full py-20">
        <div class="flex items-center justify-center w-full gap-10">
            <hr class="w-14 border-[0.1rem] border-black rounded-lg">
                <h3 class="text-xl tracking-tighter">BRANDS</h3>
            <hr class="w-14 border-[0.1rem] border-black rounded-lg">
        </div>
        <h3 class="text-center font-bold text-2xl mt-4">DISCOVER BY <span class="text-primary">BRANDS</span></h3>
        <div  class="grid grid-rows-1 grid-flow-col px-20 justify-center gap-10 mt-10">
            <BaseLinkCard :url="brand" v-for="brand of brandName" :key="brand" class="px-14 py-4 border-black border-2 rounded-lg flex justify-center items-center">
                <div class="w-14 flex justify-center cursor-pointer">
                    <div class="w-10">
                        <img :src="getImg(brand)" :alt="brand" class="object-contain aspect-[5/4]">
                    </div>
                </div>
            </BaseLinkCard>
        </div>
    </main>
</template>

<script>
import BaseLinkCard from '../Base/BaseLinkCard.vue';

export default{
    data(){
        return {
            brandName:[
                "daihatsu.png",
                "honda.png",
                "mitsubishi.png",
                "nissan.png",
                "suzuki.png",
                "toyota.png"
            ]
        }
    },
    computed:{
        getImg(){
            return (name)=>{
                return require(`../../assets/img/brand/${name}`);
            }
        }
    },
    components:{
        BaseLinkCard
    }
}

</script>