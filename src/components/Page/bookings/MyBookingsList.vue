<template>
    <main class="w-full">
        <div v-if="bookingList.length" class="grid grid-cols-2 gap-10">
            <summary v-for="booking of bookingList" :key="booking._id"
                class="flex items-center justify-between bg-primary text-white rounded-lg shadow-lg overflow-hidden">
                <div class="px-5 py-3 flex flex-col gap-2 bg-white text-black">
                    <section class="flex flex-col gap-1">
                        <h1 class="font-bold text-xl">Bookings Date</h1>
                        <p>{{ new Date(booking.date).toLocaleDateString() }}</p>
                    </section>
                    <section class="flex flex-col gap-1">
                        <h1 class="font-bold text-xl">Bookings Status</h1>
                        <p>{{ booking.status }}</p>
                    </section>
                </div>
                <div class="px-5 flex flex-col gap-5">
                    <router-link :to="getURL(booking)"
                        class="button_cta bg-white text-black px-3 py-2 rounded-lg">Details</router-link>
                    <button v-if="isProhibited(booking.status)"
                        class="button_cta bg-white text-black px-3 py-2 rounded-lg"
                        @click="updateData(booking.transactionId)">Delivered</button>
                </div>
            </summary>
        </div>
        <div v-else class="w-full flex justify-center items-center">
            <h1 class="text-2xl font-bold">No Transactions Yet</h1>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

import config from '@/utils/config';
export default {
    data() {
        return {
            bookingList: []
        }
    },
    computed: {
        isProhibited() {
            return (status) => status === 'Undelivered' && this.$route.name === "userBookings"
        },
        getURL() {
            return (booking) => {

                if (this.$route.name === "sellerTransactions") return `/cars/${booking.car._id}`;
                return `/cars/${booking.carId}`
            }
        }
    },
    methods: {
        async getData() {
            const target = this.$route.name === "sellerBookings" ? "seller" : "user";

            const transactionData = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/${target}/myBookings`,
                {
                    withCredentials: true,
                    headers: config.headers
                }
            );
            if (!transactionData.status === 200) return;

            const { data } = transactionData.data;
            this.bookingList = Object.values(data)
        },
        async updateData(transactionId) {
            const bookingData = await axios.patch(`${process.env.VUE_APP_serverURL}/api/v1/user/updateMyBookings`,
                {
                    transactionId
                },
                {
                    withCredentials: true,
                    headers: config.headers
                }
            );
            if (!bookingData.status === 200) return;
            await this.getData();
        }
    },
    async created() {
        await this.getData();
    }
}
</script>