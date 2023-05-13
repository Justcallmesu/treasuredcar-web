<template>
    <main class="w-full py-20">
        <div class="flex items-center justify-center w-full gap-10">
            <hr class="w-14 border-[0.1rem] border-black rounded-lg">
                <h3 class="text-xl tracking-tighter">STYLE</h3>
            <hr class="w-14 border-[0.1rem] border-black rounded-lg">
        </div>
        <h3 class="text-center font-bold text-2xl mt-4">DISCOVER BY <span class="text-primary">STYLE</span></h3>
        <div class="grid grid-rows-1 grid-flow-col px-5 gap-10 mt-10 overflow-scroll pb-10">
            <BaseLinkCard :url="style" v-for="style of carsStyle" :key="style" class="px-4 py-4 border-black border-[1.2px] rounded-lg flex justify-center items-center">
                <div class="w-40 flex justify-center cursor-pointer">
                    <div class="w-full px-5" v-if="style !== 'Other'">
                        <img :src="getImg(style)" :alt="style" class="object-contain aspect-[1/1]">
                        <h4 class="font-bold text-center text-xl">{{ style.split(".")[0] }}</h4>
                    </div>
                    <div class="w-full px-5" v-else>
                        <h1 class="text-3xl font-bold text-center">{{ style }}</h1>
                    </div>
                </div>
            </BaseLinkCard>
        </div>
    </main>
</template>

<script>
import BaseLinkCard from '../Base/BaseLinkCard.vue';

export default {
    data() {
        return {
            carsStyle: [
                "SUV.png",
                "MPV.png",
                "Crossover.png",
                "Hatchback.png",
                "Sedan.png",
                "Convertible.png",
                "Wagon.png",
                "Other"
            ]
        }
    },
    computed: {
        getImg() {
            return (name) => {
                return require(`../../assets/img/Cars/${name}`);
            }
        }
    },
    components: {
        BaseLinkCard
    }
}

</script>