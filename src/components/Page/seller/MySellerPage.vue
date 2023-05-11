<template>
    <div class="w-full min-h-screen pt-[8rem] pb-20 px-10">
        <MySellerInformationCard/>
        <MySellerCarList :sellerId="getSellerData._id"/>
    </div>
</template>

<script>
// Ccomponents
import MySellerInformationCard from '@/components/SellerPage/MySellerInformationCard.vue'
import MySellerCarList from '@/components/SellerPage/MySellerCarList.vue'
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers("seller");

export default{
    computed:{
        ...mapGetters(["getSellerData"]),
    },
    components:{
        MySellerInformationCard,
        MySellerCarList
    }
}
</script>