<template>
    <main class="w-full">
        <div v-if="transactionList.length" class="grid grid-cols-2 gap-10">
            <summary v-for="transaction of transactionList" :key="transaction._id" class="flex items-center justify-between bg-primary text-white rounded-lg shadow-lg overflow-hidden">
                <div class="px-5 py-3 flex flex-col gap-2 bg-white text-black">
                <section class="flex flex-col gap-1">
                    <h1 class="font-bold text-xl">Transaction Date</h1>
                    <p>{{ new Date(transaction.createdAt).toLocaleDateString() }}</p>
                </section>
                <section class="flex flex-col gap-1">
                    <h1 class="font-bold text-xl">Transaction Status</h1>
                    <p>{{ transaction.status }}</p>
                </section>
                </div>
                <div class="px-5 flex flex-col gap-5">
                    <router-link :to="getURL(transaction)" class="button_cta bg-white text-black px-3 py-2 rounded-lg">Details</router-link>
                    <button v-if="isProhibited(transaction.status)" class="button_cta bg-white text-black px-3 py-2 rounded-lg" @click="updateData(transaction.car._id,transaction.userId)">Paid</button>
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
export default{
    data(){
        return{
            transactionList:[]
        }
    },
    computed:{
        isProhibited(){
            return (status) => status === 'unpaid' && this.$route.name === "sellerTransactions"
        },
        getURL(){
            return (transaction)=>{

                if(this.$route.name === "sellerTransactions") return `/cars/${transaction.car._id}`;
                return `/cars/${transaction.carId}`
            }
        }
    },
    methods:{
        async getData(){
            const target = this.$route.name === "sellerTransactions" ? "seller" : "user";

            const transactionData = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/${target}/myTransactions`,
                {
                    withCredentials: true,
                    headers: config.headers
                }
            );
            if (!transactionData.status === 200) return;

            const { data } = transactionData.data;
            this.transactionList = Object.values(data)
        },
        async updateData(carId,userId){
            const transactionData = await axios.patch(`${process.env.VUE_APP_serverURL}/api/v1/transaction`,
                {
                    userId,
                    carId
                },
                {
                    withCredentials: true,
                    headers: config.headers
                }
            );
            if (!transactionData.status === 200) return;
            this.getData();
        }
    },
    async created(){
        await this.getData();
    }
}
</script>