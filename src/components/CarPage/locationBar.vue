<template>
    <div class="w-1/3 h-12 px-5 rounded-lg relative border-2 border-gray-500 flex items-center">
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
</template>

<script>
export default{
    props:{
        location:{
            type:String,
        },
        setLocation:{
            type:Function,
        },
        reset:{
            type:Function
        }
    },
    methods: {
        getLocation() {
            try {
                navigator.geolocation.getCurrentPosition(this.setLocation);
            } catch {
                return;
            }
        },
        
    }
}
</script>