<template>
    <div class="w-full">
        <header>
            <h1 class="font-bold text-xl text-center">BRANDS</h1>
        </header>
        <article  class="grid grid-flow-row justify-center gap-2 mt-2 brands">
            <label class="px-6 py-4 border-black border-2 rounded-lg flex justify-center items-center cursor-pointer peer-checked:bg-primary"  ref="none">
                <div class="flex flex-col items-center gap-2 justify-center" for="none">
                    <input type="radio" id="none" value="" v-model="selectedBrand" @click="removeClass('none')" class="invisible absolute">
                    <h4 class="font-bold text-center text-xl">NONE</h4>
                </div>
            </label>
            <label  class="px-14 py-4 border-black border-2 rounded-lg flex justify-center items-center cursor-pointer peer-checked:bg-primary" :for="brand" v-for="brand in brandName" :key="brand" :ref="brand" >
                <input type="radio" :id="brand" :value="brand" v-model="selectedBrand" @click="removeClass(brand)" class="invisible absolute">
                <img :src="getImg(brand, 'brand')" :alt="brand" class="object-contain aspect-[5/4] w-12 bg-blend-multiply">
            </label>
        </article>
    </div>        
</template>

<script>
export default{
    props:{
        getImg:{
            type:Function
        },
        check:{
            type:Function
        },
        setSelectedBrand:{
            type:Function
        }
    },
    data(){
        return{
            brandName: [
                "daihatsu",
                "honda",
                "mitsubishi",
                "nissan",
                "suzuki",
                "toyota"
            ],
            selectedBrand:null
        }
    },
    methods:{
        removeClass(brand){
            if (brand === "none") {
                const element = this.$refs[brand];
                return this.check(element, "brands");
            }

            const [element] = this.$refs[brand];
            this.check(element,"brands");
        }
    },
    watch:{
        selectedBrand(){
            this.setSelectedBrand(this.selectedBrand);
        }
    }
}
</script>