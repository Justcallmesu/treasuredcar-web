<template>
    <div class="w-full">
        <header>
            <h1 class="font-bold text-xl text-center">BRANDS</h1>
        </header>
        <article  class="grid grid-flow-row justify-center gap-2 mt-2 brands">
            <label  class="px-14 py-4 border-black border-2 rounded-lg flex justify-center items-center cursor-pointer peer-checked:bg-primary" :for="brand" v-for="brand in brandName" :key="brand" :ref="brand" @click="removeClass(brand)">
                <input type="radio" :id="brand" :value="brand" v-model="selectedBrand" class="invisible absolute">
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
            const [element] = this.$refs[brand];
            this.check(element,"brands");
        }
    }
}
</script>