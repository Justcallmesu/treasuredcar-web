<template>
    <div>
        <img :src="getImg" alt="" class="mix-blend-multiply w-full h-80 object-contain">
        <section v-if="car.image">
            <div class="grid h-52 w-full p-5 gap-10 grid-rows-1 grid-flow-col-dense overflow-x-scroll overflow-y-hidden">
                <div class="overflow-hidden rounded-lg w-36" v-for="(image, index) in car.image" :key="image">
                    <img :src="getImgCollage(index)" class="w-full h-full object-cover" @mouseover.self="setIndex(index, $event)">
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props:{
        car:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            currentIndex: 0,
        }
    },
    computed: {
        getImg() {
            if (this.car?.image) {
                return `${process.env.VUE_APP_serverURL}/cars/${this.car.image[this.currentIndex]}`;
            }
            return `${process.env.VUE_APP_serverURL}/cars/car-default.png`;
        },
        getImgCollage() {
            return (index) => {
                if (this.car.image) {
                    return `${process.env.VUE_APP_serverURL}/cars/${this.car.image[index]}`;
                }
            }
        }
    },
    methods: {
        setIndex(index, event) {
            if (this.lastHovered) {
                this.lastHovered.classList.remove("image-collage-active");
            }
            this.currentIndex = index;
            this.lastHovered = event.target.parentNode;
            this.lastHovered.classList.add("image-collage-active");
        }
    }
}
</script>