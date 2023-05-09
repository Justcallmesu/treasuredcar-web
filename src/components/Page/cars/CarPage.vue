<template>
    <main class="py-28 px-10 flex flex-col gap-10 min-h-screen">
        <section>
            <locationBar :location="location" :setLocation="setPosition" :reset="resetLocation"/>
        </section>
        <section class="flex flex-shrink">
            <div class="w-1/3 h-full flex flex-col gap-10">
                <!-- Brands -->
                <brandFilter :getImg="getImg" :check="check"/>

                <!-- Style -->
                <styleFilter :getImg="getImg" :check="check"/>
            </div>

            <div class="w-full h-full">
                <header>
                    <h1 class="font-bold text-xl text-center">BRANDS</h1>
                </header>
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
        styleFilter
    }
    
}
</script>