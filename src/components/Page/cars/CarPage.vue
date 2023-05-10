<template>
    <main class="py-28 px-10 flex flex-col gap-10 min-h-screen">
        <section>
            <locationBar :location="location" :setLocation="setPosition" :reset="resetLocation"/>
        </section>
        <section class="flex flex-shrink">
            <div class="w-1/3 h-full flex flex-col gap-10">
                <!-- Brands -->
                <brandFilter :getImg="getImg" :check="check" :setSelectedBrand="setSelectedBrand"/>

                <!-- Style -->
                <styleFilter :getImg="getImg" :check="check" :setSelectedStyle="setSelectedStyle"/>
            </div>

            <div class="w-full h-full">
                <CarPageList :style="selectedStyle" :brand="selectedBrand" :coords="coords"/>
            </div>
        </section>
    </main>
</template>

<script>
// NPM
import axios from 'axios';

// Components
import locationBar from '@/components/CarPage/locationBar.vue';
import brandFilter from '@/components/CarPage/brandFilter.vue';
import styleFilter from '@/components/CarPage/styleFilter.vue';
import CarPageList from '@/components/CarPage/CarPageList.vue';

export default{
    data() {
        return {
            location: null,
            coords: [],
            selectedBrand:null,
            selectedStyle:null
        }
    },
    methods:{
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
        check(element, location){
            if(document.querySelector(`.${location} .selected`)){
                document.querySelector(`.${location} .selected`).classList.remove("selected");
            }
            element.classList.add("selected");
        },
        setSelectedBrand(brand){
            this.selectedBrand = brand;
        },
        setSelectedStyle(style){
            this.selectedStyle = style;
        }
    },
    computed:{
        getImg() {
            return (name,path) => {
                return require(`../../../assets/img/${path}/${name}.png`);
            }
        }
    },
    components:{
        locationBar,
        brandFilter,
        styleFilter,
        CarPageList
    }
    
}
</script>