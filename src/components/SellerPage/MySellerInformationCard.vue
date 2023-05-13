<template>
    <summary class="flex bg-primary shadow-xl rounded-lg overflow-hidden">
        <section class="flex items-center gap-5 bg-white py-5 px-10">
            <div class="max-w-[9rem] rounded-full overflow-hidden">
                <img :src="getImg" :alt="getSellerData.photo + ' Photo'" class="object-cover object-center">
            </div>
            <h1 class="font-bold text-2xl">{{ getSellerData.name }}</h1>
        </section>
        <section class="text-white px-10 py-5 grid grid-cols-2 gap-2">
            <div>
                <h1 class="text-2xl font-bold">Phone Number</h1>
                <h3 class="text-lg">{{ getSellerData.phoneNumber }}</h3>
            </div>
            <div>
                <h1 class="text-2xl font-bold">Email</h1>
                <h3 class="text-lg">{{ getSellerData.email }}</h3>
            </div>
            <div>
                <h1 class="text-2xl font-bold">Address</h1>
                <h3 class="text-lg">{{ getSellerData.address }}</h3>
            </div>
        </section>
    </summary>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, } = createNamespacedHelpers("seller");

export default {
    computed: {
        ...mapGetters(["getSellerData"]),
        getImg() {
            return `${process.env.VUE_APP_serverURL}/sellers/${this.getSellerData.photo}`;
        }
    }
}
</script>