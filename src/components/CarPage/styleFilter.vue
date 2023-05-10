<template>
    <div class="w-full h-full">
        <header>
            <h1 class="font-bold text-xl text-center">STYLE</h1>
        </header>
        <article  class="grid grid-flow-row justify-center gap-2 mt-2 cars">
            <label class="px-6 py-4 border-black border-2 rounded-lg flex justify-center items-center cursor-pointer peer-checked:bg-primary"  ref="none">
                <div class="flex flex-col items-center gap-2 justify-center" for="none">
                    <input type="radio" id="none" value="" v-model="selectedStyle" @click="removeClass('none')" class="invisible absolute">
                    <h4 class="font-bold text-center text-xl">NONE</h4>
                </div>
            </label>
            <label  class="px-6 py-4 border-black border-2 rounded-lg flex justify-center items-center cursor-pointer peer-checked:bg-primary" :for="style" v-for="style in carsStyle" :key="style" :ref="style" >
                <div class="flex flex-col items-center gap-2 justify-center" v-if="style !== 'Other'">
                    <input type="radio" :id="style" :value="style" v-model="selectedStyle" @click="removeClass(style)" class="invisible absolute">
                    <img :src="getImg(style, 'Cars')" :alt="style" class="object-contain aspect-[5/4] w-12 bg-blend-multiply">
                    <h4 class="font-bold text-center text-xl">{{ style }}</h4>
                </div>
                <div v-else>
                    <input type="radio" :id="style" :value="style" v-model="selectedStyle" @click="removeClass(style)" class="invisible absolute"/>
                    <h1 class="text-lg font-bold text-center">{{ style }}</h1>
                </div>
            </label>
        </article>
    </div>
</template>

<script>
export default{
    props: {
        getImg: {
            type: Function
        },
        check: {
            type: Function
        },
        setSelectedStyle:{
            type:Function
        }
    },
    data() {
        return {
            carsStyle: [
                "SUV",
                "MPV",
                "Crossover",
                "Hatchback",
                "Sedan",
                "Convertible",
                "Wagon",
                "Other"
            ],
            selectedStyle: null
        }
    },
    methods: {
        removeClass(style) {
            if(style === "none"){
                const element = this.$refs[style];
                return this.check(element,"cars");
            }

            const [element] = this.$refs[style];
            this.check(element,"cars");
        }
    },
    watch:{
        selectedStyle(){
            this.setSelectedStyle(this.selectedStyle);
        }
    }
}
</script>